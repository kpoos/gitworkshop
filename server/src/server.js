"use strict";

/*
 * Git Workshop backend.
 *
 * Runs inside the Docker container: every command arriving from the web UI is
 * executed as a real process (real `git`) in the session's repository, and
 * exercises are verified server-side against the resulting repository state
 * plus the log of commands that were actually executed. Nothing is simulated.
 */

const http = require("http");
const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const { spawn } = require("child_process");
const { createLessons, validateImportedFile } = require("../../shared/lessons.js");

const PORT = Number(process.env.PORT || 3000);
const ROOT = path.resolve(__dirname, "..", "..");
const WORKSPACE = process.env.GIT_WORKSHOP_WORKSPACE || path.join(ROOT, ".workspace");
const SESSIONS_DIR = path.join(WORKSPACE, "sessions");
const COMMAND_TIMEOUT_MS = 15000;
const MAX_OUTPUT_BYTES = 200_000;
const MAX_BODY_BYTES = 1_500_000;
const MAX_IMPORTS = 200;
const MAX_COMMAND_LENGTH = 10_000;
const SESSION_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const EMPTY_TREE = "4b825dc642cb6eb9a060e54bf8d69288fbee4904";

const { lessons: builtinLessons, builtinCount } = createLessons();
const builtinIds = new Set(builtinLessons.map((lesson) => lesson.id));
const SHELL_HOST = os.hostname();
const SHELL_USER = (() => {
  try {
    return os.userInfo().username;
  } catch {
    return process.env.USER || "user";
  }
})();

// Common command names shown by Tab completion; Bash can execute other commands too.
const COMMAND_COMPLETIONS = new Set([
  "git", "ls", "pwd", "cat", "echo", "mkdir", "rmdir", "touch", "rm", "cp", "mv",
  "head", "tail", "wc", "grep", "tree", "find", "date", "whoami", "uname", "env",
  "printenv", "stat", "du", "df", "sort", "uniq", "basename", "dirname", "which",
  "true", "false", "test",
]);

const sessions = new Map();

/* ------------------------------------------------------------------ */
/* Process execution                                                   */
/* ------------------------------------------------------------------ */

function baseEnv(session) {
  return {
    PATH: process.env.PATH,
    // HOME is the session directory itself, so the repository lives at
    // ~/repo and shell prompts can show a real ~-relative path.
    HOME: session.dir,
    LANG: "C.UTF-8",
    LC_ALL: "C.UTF-8",
    TERM: "dumb",
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_TERMINAL_PROMPT: "0",
    GIT_PAGER: "cat",
    PAGER: "cat",
  };
}

function identityEnv() {
  return {
    GIT_AUTHOR_NAME: "Learner",
    GIT_AUTHOR_EMAIL: "learner@example.test",
    GIT_COMMITTER_NAME: "Learner",
    GIT_COMMITTER_EMAIL: "learner@example.test",
  };
}

function runProcess(program, args, options = {}) {
  return new Promise((resolve) => {
    let stdout = "";
    let stderr = "";
    let control = "";
    let bytes = 0;
    let controlBytes = 0;
    let truncated = false;
    let timedOut = false;
    let fileStream = null;

    const child = spawn(program, args, {
      cwd: options.cwd,
      env: options.env,
      detached: Boolean(options.processGroup),
      stdio: options.captureControl ? ["pipe", "pipe", "pipe", "pipe"] : ["pipe", "pipe", "pipe"],
    });

    if (options.stdoutFile) {
      fileStream = fs.createWriteStream(options.stdoutFile, { flags: options.append ? "a" : "w" });
    }

    child.stdout.on("data", (chunk) => {
      if (fileStream) {
        fileStream.write(chunk);
        return;
      }
      bytes += chunk.length;
      if (bytes > MAX_OUTPUT_BYTES) {
        truncated = true;
        return;
      }
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      bytes += chunk.length;
      if (bytes > MAX_OUTPUT_BYTES) {
        truncated = true;
        return;
      }
      stderr += chunk.toString();
    });
    if (options.captureControl) {
      child.stdio[3].on("data", (chunk) => {
        controlBytes += chunk.length;
        if (controlBytes <= MAX_OUTPUT_BYTES) control += chunk.toString();
      });
    }

    if (options.input !== undefined) child.stdin.end(options.input);
    else child.stdin.end();

    const timer = setTimeout(() => {
      timedOut = true;
      if (options.processGroup && child.pid) {
        try {
          process.kill(-child.pid, "SIGKILL");
        } catch (error) {
          if (error.code !== "ESRCH") child.kill("SIGKILL");
        }
      } else {
        child.kill("SIGKILL");
      }
    }, options.timeout || COMMAND_TIMEOUT_MS);

    const finish = (result) => {
      clearTimeout(timer);
      if (fileStream) fileStream.end();
      resolve(result);
    };

    child.on("error", (error) => {
      finish({
        code: 127,
        stdout,
        stderr: `${stderr}${error.message}\n`,
        control,
        truncated,
        timedOut,
        pid: null,
      });
    });
    child.on("close", (code) => {
      let output = stdout;
      if (truncated) output += `\n[output truncated after ${MAX_OUTPUT_BYTES} bytes]`;
      if (timedOut) output += `\n[timed out after ${COMMAND_TIMEOUT_MS / 1000}s]`;
      finish({
        code: code === null ? 1 : code,
        stdout: output,
        stderr,
        control,
        controlTruncated: controlBytes > MAX_OUTPUT_BYTES,
        truncated,
        timedOut,
        pid: child.pid,
      });
    });
  });
}

function runGit(session, args, options = {}) {
  return runProcess("git", args, {
    cwd: options.cwd || session.repoDir,
    env: { ...baseEnv(session), ...(options.env || {}) },
    input: options.input,
    timeout: options.timeout,
    stdoutFile: options.stdoutFile,
    append: options.append,
  });
}

/* ------------------------------------------------------------------ */
/* Sessions                                                            */
/* ------------------------------------------------------------------ */

function sessionDir(sessionId) {
  return path.join(SESSIONS_DIR, sessionId);
}

function freshMeta(lessonId, lessonIndex, language, imported) {
  return {
    lessonId,
    lessonIndex,
    language,
    imported,
    verifiedLessons: [],
    stage: 0,
    stageRootShas: [],
    idMap: {},
    nextId: 1,
    execLog: [],
    execSinceSeed: 0,
    gitSuccessSinceSeed: 0,
    cwd: "repo",
  };
}

async function saveMeta(session) {
  const target = path.join(session.dir, "meta.json");
  const tmp = `${target}.tmp`;
  await fsp.writeFile(tmp, JSON.stringify(session.meta, null, 2));
  await fsp.rename(tmp, target);

  const gitDir = path.join(session.repoDir, ".git");
  try {
    await fsp.access(gitDir);
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
  const progressDir = path.join(gitDir, "git-workshop");
  await fsp.mkdir(progressDir, { recursive: true });
  const progressPath = path.join(progressDir, "progress.json");
  const progressTmp = `${progressPath}.tmp`;
  await fsp.writeFile(progressTmp, JSON.stringify({
    lessonId: session.meta.lessonId,
    lessonIndex: session.meta.lessonIndex,
    verifiedLessons: session.meta.verifiedLessons,
  }, null, 2));
  await fsp.rename(progressTmp, progressPath);
}

function normalizeLanguage(value) {
  return value === "hu" ? "hu" : "en";
}

function normalizeLessonIndex(value) {
  const index = Number.parseInt(value, 10);
  return Number.isInteger(index) && index >= 0 ? index : 0;
}

function applySources(session, sources) {
  if (!Array.isArray(sources)) return; // keep whatever the session already has
  if (sources.length === 0) {
    session.meta.imported = [];
    return;
  }
  if (sources.length > MAX_IMPORTS) throw new Error(`At most ${MAX_IMPORTS} imported lessons are supported.`);
  validateImportedFile({ lessons: sources }, builtinIds, session.meta.language || "en");
  session.meta.imported = sources;
}

function importLessons(session) {
  if (!Array.isArray(session.meta.imported) || session.meta.imported.length === 0) return [];
  try {
    return validateImportedFile({ lessons: session.meta.imported }, builtinIds, session.meta.language || "en");
  } catch {
    return [];
  }
}

function resolveLessonByIndex(session, index) {
  const idx = normalizeLessonIndex(index);
  if (idx < builtinCount) return builtinLessons[idx];
  return importLessons(session)[idx - builtinCount] || null;
}

function resolveLesson(session) {
  const { lessonId } = session.meta;
  if (builtinIds.has(lessonId)) return builtinLessons.find((lesson) => lesson.id === lessonId) || null;
  return importLessons(session).find((lesson) => lesson.id === lessonId) || null;
}

function lessonClientIndex(session, lesson) {
  if (!lesson) return normalizeLessonIndex(session.meta.lessonIndex);
  if (builtinIds.has(lesson.id)) return builtinLessons.indexOf(lesson);
  const importedIndex = importLessons(session).findIndex((item) => item.id === lesson.id);
  return importedIndex === -1 ? builtinCount : builtinCount + importedIndex;
}

async function ensureSession(sessionId) {
  if (sessionId) {
    const existing = await loadSession(sessionId);
    if (existing) return { session: existing, isNew: false };
  }
  const id = sessionId || crypto.randomUUID();
  const dir = sessionDir(id);
  await fsp.mkdir(dir, { recursive: true });
  const session = {
    id,
    dir,
    repoDir: path.join(dir, "repo"),
    meta: freshMeta("builtin-01", 0, "en", []),
    queue: Promise.resolve(),
  };
  sessions.set(id, session);
  return { session, isNew: true };
}

async function loadSession(sessionId) {
  if (sessions.has(sessionId)) return sessions.get(sessionId);
  const dir = sessionDir(sessionId);
  let raw;
  try {
    raw = await fsp.readFile(path.join(dir, "meta.json"), "utf8");
  } catch {
    return null;
  }
  let meta;
  try {
    meta = JSON.parse(raw);
  } catch {
    return null;
  }
  // Migrate the global git config from the old per-session home layout so
  // existing sessions keep their configuration after the HOME change.
  const legacyGitconfig = path.join(dir, "home", ".gitconfig");
  if (fs.existsSync(legacyGitconfig) && !fs.existsSync(path.join(dir, ".gitconfig"))) {
    try {
      await fsp.rename(legacyGitconfig, path.join(dir, ".gitconfig"));
    } catch {
      // best effort
    }
  }
  const session = {
    id: sessionId,
    dir,
    repoDir: path.join(dir, "repo"),
    meta: { ...freshMeta("builtin-01", 0, "en", []), ...meta },
    queue: Promise.resolve(),
  };
  sessions.set(sessionId, session);
  return session;
}

function enqueue(session, work) {
  const run = session.queue.then(work, work);
  session.queue = run.catch(() => {});
  return run;
}

/* ------------------------------------------------------------------ */
/* Seeding a real repository for a lesson                              */
/* ------------------------------------------------------------------ */

function commitSubject(commit, language) {
  const message = commit.message;
  if (typeof message === "string") return message;
  return (message && (message[language] || message.en || message.hu)) || "Commit";
}

async function archiveBranches(session, stage) {
  const refs = await runGit(session, [
    "for-each-ref",
    "refs/heads",
    "--format=%(refname:short)\x1f%(objectname)",
  ]);
  if (refs.code !== 0) throw new Error(`git for-each-ref failed: ${refs.stderr || refs.stdout}`);
  for (const line of refs.stdout.split("\n").filter(Boolean)) {
    const [name, sha] = line.split("\x1f");
    const archived = await runGit(session, ["update-ref", `refs/git-workshop/archive/${stage}/${name}`, sha]);
    if (archived.code !== 0) throw new Error(`Failed to archive branch ${name}: ${archived.stderr || archived.stdout}`);
    const removed = await runGit(session, ["update-ref", "-d", `refs/heads/${name}`]);
    if (removed.code !== 0) throw new Error(`Failed to archive branch ${name}: ${removed.stderr || removed.stdout}`);
  }
}

async function clearWorkingTree(repoDir) {
  for (const entry of await fsp.readdir(repoDir)) {
    if (entry !== ".git") await fsp.rm(path.join(repoDir, entry), { recursive: true, force: true });
  }
}

async function clearGitOperationState(repoDir) {
  const gitDir = path.join(repoDir, ".git");
  for (const entry of [
    "MERGE_HEAD",
    "MERGE_MSG",
    "MERGE_MODE",
    "CHERRY_PICK_HEAD",
    "REVERT_HEAD",
    "sequencer",
    "rebase-apply",
    "rebase-merge",
  ]) {
    await fsp.rm(path.join(gitDir, entry), { recursive: true, force: true });
  }
}

async function seed(session, lesson, language, { resetRepository = false } = {}) {
  const initial = lesson.initial || [{
    id: "C0",
    parents: [],
    message: { hu: "Gyakorló repository", en: "Practice repository" },
    lane: 0,
  }];
  const branches = lesson.branches || { main: initial.at(-1).id };
  const current = lesson.current || Object.keys(branches)[0] || "main";
  const imported = session.meta.imported;
  const verifiedLessons = resetRepository ? [] : [...(session.meta.verifiedLessons || [])];
  let previousHead = null;
  const stage = resetRepository ? 0 : (session.meta.stage || 0) + 1;

  if (resetRepository) {
    for (const entry of await fsp.readdir(session.dir)) {
      if (entry !== "meta.json") await fsp.rm(path.join(session.dir, entry), { recursive: true, force: true });
    }
  } else {
    const head = await runGit(session, ["rev-parse", "--verify", "HEAD"]);
    if (head.code !== 0) throw new Error(`Cannot preserve repository history before loading a lesson: ${head.stderr || head.stdout}`);
    previousHead = head.stdout.trim();
    await archiveBranches(session, stage);
    await clearWorkingTree(session.repoDir);
    await clearGitOperationState(session.repoDir);
    const tags = await runGit(session, ["for-each-ref", "refs/tags", "--format=%(refname:short)"]);
    if (tags.code !== 0) throw new Error(`git for-each-ref tags failed: ${tags.stderr || tags.stdout}`);
    for (const tag of tags.stdout.split("\n").filter((name) => /^C\d+$/.test(name))) {
      const removed = await runGit(session, ["tag", "-d", tag]);
      if (removed.code !== 0) throw new Error(`Failed to replace lesson tag ${tag}: ${removed.stderr || removed.stdout}`);
    }
  }
  await fsp.mkdir(session.repoDir, { recursive: true });

  session.meta = {
    ...freshMeta(lesson.id, lessonClientIndex(session, lesson), language, imported),
    verifiedLessons,
    stage,
  };

  const init = await runGit(session, ["init", "--quiet"], { cwd: session.repoDir });
  if (init.code !== 0) throw new Error(`git init failed: ${init.stderr || init.stdout}`);

  if (lesson.id !== "builtin-01") {
    for (const [key, value] of [["user.name", "Learner"], ["user.email", "learner@example.test"]]) {
      const identity = await runGit(session, ["config", "--local", key, value], { cwd: session.repoDir });
      if (identity.code !== 0) throw new Error(`git config ${key} failed: ${identity.stderr || identity.stdout}`);
    }
  }

  // Build real commits with real content so Git operations produce genuine
  // diffs; scenario fixtures can edit an existing project file across commits.
  const emptyTree = await runGit(session, ["mktree"], { input: "" });
  const baseTree = emptyTree.code === 0 && emptyTree.stdout.trim() ? emptyTree.stdout.trim() : EMPTY_TREE;

  const treeById = {};
  const idToSha = {};
  for (let index = 0; index < initial.length; index += 1) {
    const commit = initial[index];
    const parent = (commit.parents || [])[0];
    const readTree = parent
      ? await runGit(session, ["read-tree", treeById[parent]])
      : await runGit(session, ["read-tree", "--empty"]);
    if (readTree.code !== 0) throw new Error(`git read-tree failed: ${readTree.stderr || readTree.stdout}`);

    const subject = commitSubject(commit, language);
    const scenarioFiles = lesson.scenario?.type === "cherry-pick"
      ? lesson.scenario.commits?.[commit.id]
      : null;
    if (scenarioFiles) {
      for (const [filePath, content] of Object.entries(scenarioFiles)) {
        const target = path.resolve(session.repoDir, filePath);
        if (!isInside(session.repoDir, target)) throw new Error(`Invalid scenario file path: ${filePath}`);
        const blob = await runGit(session, ["hash-object", "-w", "--stdin"], { input: content });
        if (blob.code !== 0) throw new Error(`git hash-object failed for ${filePath}: ${blob.stderr || blob.stdout}`);
        const update = await runGit(session, ["update-index", "--add", "--cacheinfo", `100644,${blob.stdout.trim()},${filePath}`]);
        if (update.code !== 0) throw new Error(`git update-index failed for ${filePath}: ${update.stderr || update.stdout}`);
      }
    } else {
      const blob = await runGit(session, ["hash-object", "-w", "--stdin"], { input: `${subject}\n` });
      if (blob.code !== 0) throw new Error(`git hash-object failed: ${blob.stderr || blob.stdout}`);
      const filePath = index === 0 ? "README.md" : `file-${index}.txt`;
      const update = await runGit(session, ["update-index", "--add", "--cacheinfo", `100644,${blob.stdout.trim()},${filePath}`]);
      if (update.code !== 0) throw new Error(`git update-index failed: ${update.stderr || update.stdout}`);
    }
    const tree = await runGit(session, ["write-tree"]);
    if (tree.code !== 0) throw new Error(`git write-tree failed: ${tree.stderr || tree.stdout}`);
    treeById[commit.id] = tree.stdout.trim();

    const args = ["commit-tree", treeById[commit.id]];
    for (const parentId of commit.parents || []) args.push("-p", idToSha[parentId]);
    if (!resetRepository && index === 0 && !(commit.parents || []).length && previousHead) {
      args.push("-p", previousHead);
    }
    args.push("-m", subject);
    const result = await runGit(session, args, {
      cwd: session.repoDir,
      env: identityEnv(),
    });
    if (result.code !== 0) throw new Error(`git commit-tree failed: ${result.stderr || result.stdout}`);
    idToSha[commit.id] = result.stdout.trim();
  }

  for (const [name, commitId] of Object.entries(branches)) {
    const sha = idToSha[commitId];
    if (!sha) throw new Error(`Lesson ${lesson.id}: branch ${name} points at unknown commit ${commitId}`);
    const result = await runGit(session, ["update-ref", `refs/heads/${name}`, sha], { cwd: session.repoDir });
    if (result.code !== 0) throw new Error(`git update-ref failed: ${result.stderr || result.stdout}`);
  }

  const head = await runGit(session, ["symbolic-ref", "HEAD", `refs/heads/${current}`], { cwd: session.repoDir });
  if (head.code !== 0) throw new Error(`git symbolic-ref failed: ${head.stderr || head.stdout}`);

  const checkout = await runGit(session, ["reset", "--hard", "--quiet"], { cwd: session.repoDir });
  if (checkout.code !== 0) throw new Error(`git reset failed: ${checkout.stderr || checkout.stdout}`);

  // Lessons that expect the learner to create commits start with one staged
  // change so the documented `git commit -m ...` command works right away.
  if (lesson.pendingChange) {
    await fsp.writeFile(path.join(session.repoDir, "notes.txt"), "Pending change ready to be committed.\n");
    const staged = await runGit(session, ["add", "notes.txt"], { cwd: session.repoDir });
    if (staged.code !== 0) throw new Error(`git add failed: ${staged.stderr || staged.stdout}`);
  }

  if (lesson.scenario?.type === "merge-conflict") {
    const { file, base, feature, main } = lesson.scenario;
    const scenarioPath = path.resolve(session.repoDir, file);
    if (!isInside(session.repoDir, scenarioPath)) throw new Error(`Invalid scenario file path: ${file}`);
    const runScenarioGit = async (args) => {
      const result = await runGit(session, args, { cwd: session.repoDir });
      if (result.code !== 0) throw new Error(`Scenario git ${args.join(" ")} failed: ${result.stderr || result.stdout}`);
    };

    await fsp.writeFile(scenarioPath, base);
    await runScenarioGit(["add", file]);
    await runScenarioGit(["commit", "-m", "Add shared setting"]);
    await runScenarioGit(["switch", "-c", "feature"]);
    await fsp.writeFile(scenarioPath, feature);
    await runScenarioGit(["add", file]);
    await runScenarioGit(["commit", "-m", "Set feature mode"]);
    await runScenarioGit(["switch", current]);
    await fsp.writeFile(scenarioPath, main);
    await runScenarioGit(["add", file]);
    await runScenarioGit(["commit", "-m", "Set stable mode"]);
    const merge = await runGit(session, ["merge", "feature"], { cwd: session.repoDir });
    const unmerged = await runGit(session, ["diff", "--name-only", "--diff-filter=U"], { cwd: session.repoDir });
    if (merge.code === 0 || unmerged.code !== 0 || !unmerged.stdout.split("\n").includes(file)) {
      throw new Error(`Failed to prepare merge conflict for ${file}: ${merge.stderr || merge.stdout || unmerged.stderr}`);
    }
  } else if (lesson.scenario?.type === "restore-file") {
    const { file, dirtyContent } = lesson.scenario;
    const scenarioPath = path.resolve(session.repoDir, file);
    if (!isInside(session.repoDir, scenarioPath)) throw new Error(`Invalid scenario file path: ${file}`);
    await fsp.writeFile(scenarioPath, dirtyContent);
  }

  // Tag every seeded commit with its lesson id so commands like
  // `git cherry-pick C2` from the exercise text work against real git.
  for (const [commitId, sha] of Object.entries(idToSha)) {
    await runGit(session, ["tag", commitId, sha], { cwd: session.repoDir });
  }

  session.meta.idMap = Object.fromEntries(Object.entries(idToSha).map(([id, sha]) => [sha, id]));
  session.meta.stageRootShas = initial
    .filter((commit) => !(commit.parents || []).length)
    .map((commit) => idToSha[commit.id]);
  session.meta.nextId = Math.max(0, ...initial.map((commit) => (
    /^C\d+$/.test(commit.id) ? Number(commit.id.slice(1)) : 0
  ))) + 1;
  session.meta.cwd = "repo";
  await saveMeta(session);
}

/* ------------------------------------------------------------------ */
/* Real repository state -> the state shape used by the checks         */
/* ------------------------------------------------------------------ */

// `git config --list` lowercases variable names, but the exercise checks use
// the canonical spelling (`init.defaultBranch`). Recover the original case
// from the config files themselves while keeping git's authoritative values.
function configCaseMap(files) {
  const map = new Map();
  for (const file of files) {
    let content;
    try {
      content = fs.readFileSync(file, "utf8");
    } catch {
      continue;
    }
    let section = null;
    for (const rawLine of content.split("\n")) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#") || line.startsWith(";")) continue;
      const sectionMatch = /^\[([^\]]+)\]$/.exec(line);
      if (sectionMatch) {
        const parts = sectionMatch[1].split(" ");
        const name = parts[0].toLowerCase();
        const subsection = parts.slice(1).join(" ").replace(/^"|"$/g, "");
        section = subsection ? `${name}.${subsection}` : name;
        continue;
      }
      const eq = line.indexOf("=");
      if (eq > 0 && section) {
        const key = `${section}.${line.slice(0, eq).trim()}`;
        map.set(key.toLowerCase(), key);
      }
    }
  }
  return map;
}

function parseConfigList(output, caseMap) {
  const config = {};
  for (const line of output.split("\n")) {
    const eq = line.indexOf("=");
    if (eq <= 0) continue;
    const key = line.slice(0, eq);
    config[caseMap.get(key.toLowerCase()) || key] = line.slice(eq + 1);
  }
  return config;
}

function computeLanes(commits, branchTips, current, detached) {
  const byId = new Map(commits.map((commit) => [commit.id, commit]));
  const laneOf = new Map();

  const ordered = [];
  if (branchTips.main !== undefined) ordered.push(branchTips.main);
  for (const [name, tip] of Object.entries(branchTips)) {
    if (name !== "main" && !ordered.includes(tip)) ordered.push(tip);
  }
  if (current && branchTips[current] !== undefined && !ordered.includes(branchTips[current])) {
    ordered.unshift(branchTips[current]);
  }
  if (current === null && detached) ordered.unshift(detached);

  let nextLane = 0;
  for (const tip of ordered) {
    let cursor = tip;
    const chain = [];
    while (cursor !== undefined && !laneOf.has(cursor)) {
      chain.push(cursor);
      const commit = byId.get(cursor);
      if (!commit) break;
      cursor = commit.parents[0];
    }
    for (const id of chain) if (!laneOf.has(id)) laneOf.set(id, nextLane);
    nextLane += 1;
  }

  // Anything not reached through a branch's first-parent chain inherits its
  // first parent's lane, falling back to lane 0.
  for (const commit of commits) {
    if (laneOf.has(commit.id)) continue;
    const parentLane = commit.parents.map((id) => laneOf.get(id)).find((value) => value !== undefined);
    laneOf.set(commit.id, parentLane ?? 0);
  }
  return laneOf;
}

async function buildState(session) {
  const meta = session.meta;

  const log = await runGit(session, ["log", "--branches", "HEAD", "--topo-order", "--reverse", "--format=%H%x1f%P%x1f%s"]);
  const commits = [];
  const parentsBySha = new Map();
  if (log.code === 0) {
    for (const line of log.stdout.split("\n")) {
      if (!line.trim()) continue;
      const [sha, parentsRaw, ...subjectParts] = line.split("\x1f");
      const subject = subjectParts.join("\x1f");
      const parentShas = (parentsRaw || "").split(" ").filter(Boolean);
      parentsBySha.set(sha, parentShas);
      if (!meta.idMap[sha]) meta.idMap[sha] = `C${meta.nextId++}`;
      const parents = parentShas.map((parentSha) => {
        if (!meta.idMap[parentSha]) meta.idMap[parentSha] = `C${meta.nextId++}`;
        return meta.idMap[parentSha];
      });
      commits.push({ id: meta.idMap[sha], sha, parents, message: subject, lane: 0 });
    }
  }

  const refs = await runGit(session, ["for-each-ref", "refs/heads", "--format=%(refname:short)\x1f%(objectname)"]);
  const branches = {};
  const branchTips = {};
  if (refs.code === 0) {
    for (const line of refs.stdout.split("\n")) {
      if (!line.trim()) continue;
      const [name, sha] = line.split("\x1f");
      if (!meta.idMap[sha]) meta.idMap[sha] = `C${meta.nextId++}`;
      branches[name] = meta.idMap[sha];
      branchTips[name] = meta.idMap[sha];
    }
  }

  let current = null;
  let detached = null;
  const symbolic = await runGit(session, ["symbolic-ref", "-q", "--short", "HEAD"]);
  if (symbolic.code === 0) {
    current = symbolic.stdout.trim() || null;
  } else {
    const head = await runGit(session, ["rev-parse", "-q", "--verify", "HEAD"]);
    if (head.code === 0) {
      const sha = head.stdout.trim();
      if (!meta.idMap[sha]) meta.idMap[sha] = `C${meta.nextId++}`;
      detached = meta.idMap[sha];
    }
  }

  const localConfig = await runGit(session, ["config", "--list", "--local"]);
  const globalConfig = await runGit(session, ["config", "--list", "--global"]);
  const localCase = configCaseMap([path.join(session.repoDir, ".git", "config")]);
  const globalCase = configCaseMap([
    path.join(session.dir, ".gitconfig"),
    path.join(session.dir, ".config", "git", "config"),
  ]);

  const remotes = {};
  const remoteList = await runGit(session, ["remote", "-v"]);
  if (remoteList.code === 0) {
    for (const line of remoteList.stdout.split("\n")) {
      const match = /^(\S+)\s+(\S+)\s+\((?:fetch|push)\)/.exec(line.trim());
      if (match && !(match[1] in remotes)) remotes[match[1]] = match[2];
    }
  }

  const status = await runGit(session, ["status", "--porcelain"]);
  const statusLines = status.code === 0 ? status.stdout.split("\n").filter((line) => line.trim()) : [];
  const dirtyPaths = statusLines.map((line) => line.slice(3));
  const stagedPaths = statusLines
    .filter((line) => line[0] !== " " && line[0] !== "?")
    .map((line) => line.slice(3));
  const unstagedPaths = statusLines
    .filter((line) => line[1] !== " " && line[0] !== "?")
    .map((line) => line.slice(3));
  const unmerged = await runGit(session, ["diff", "--name-only", "--diff-filter=U"]);
  const unmergedPaths = unmerged.code === 0 ? unmerged.stdout.split("\n").filter(Boolean) : [];
  const lesson = resolveLesson(session);
  const files = {};
  if (lesson?.scenario?.file) {
    const file = lesson.scenario.file;
    const target = path.resolve(session.repoDir, file);
    if (!isInside(session.repoDir, target)) throw new Error(`Invalid scenario file path: ${file}`);
    try {
      files[file] = await fsp.readFile(target, "utf8");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      files[file] = null;
    }
  }
  const dirty = statusLines.length;

  const laneOf = computeLanes(commits, branchTips, current, detached);
  const cwd = sessionCwd(session);
  const cwdInHome = path.relative(session.dir, cwd);
  const displayedCwd = isInside(session.dir, cwd)
    ? (cwdInHome ? `~/${cwdInHome}` : "~")
    : cwd;
  const initialById = new Map((lesson?.initial || []).map((commit) => [commit.id, commit]));
  for (const commit of commits) {
    commit.lane = laneOf.get(commit.id) ?? 0;
    const seeded = initialById.get(commit.id);
    if (seeded && typeof seeded.message === "object") commit.translations = { ...seeded.message };
  }

  return {
    commits,
    branches,
    current,
    detached,
    config: {
      local: parseConfigList(localConfig.code === 0 ? localConfig.stdout : "", localCase),
      global: parseConfigList(globalConfig.code === 0 ? globalConfig.stdout : "", globalCase),
    },
    remotes,
    files,
    dirtyPaths,
    stagedPaths,
    unstagedPaths,
    unmergedPaths,
    meta: {
      source: "docker-container",
      container: SHELL_HOST,
      user: SHELL_USER,
      host: SHELL_HOST,
      dirty,
      language: meta.language,
      cwd: displayedCwd,
      verifiedLessons: [...meta.verifiedLessons],
      recentExecutions: [...meta.execLog].slice(-6).reverse(),
    },
  };
}

/* ------------------------------------------------------------------ */
/* Task verification (server side)                                     */
/* ------------------------------------------------------------------ */

function verify(session, state) {
  const meta = session.meta;
  const lesson = resolveLesson(session);
  if (!lesson) {
    return {
      lessonId: meta.lessonId,
      verified: false,
      checkPassed: false,
      realGitCommands: meta.gitSuccessSinceSeed,
      source: "container-git",
      reason: "unknown-lesson",
    };
  }
  const isExercise = (lesson.type || "exercise") === "exercise";
  const checkPassed = isExercise ? Boolean(lesson.check(state)) : true;
  const realGitCommands = meta.gitSuccessSinceSeed;
  const verified = isExercise ? checkPassed && realGitCommands >= 1 : true;

  if (isExercise) {
    const position = meta.verifiedLessons.indexOf(lesson.id);
    if (verified && position === -1) meta.verifiedLessons.push(lesson.id);
  }

  return {
    lessonId: lesson.id,
    type: isExercise ? "exercise" : "reading",
    checkPassed,
    realGitCommands,
    verified,
    source: "container-git",
  };
}

function attachVerification(session, state) {
  const verification = verify(session, state);
  state.meta.verification = verification;
  state.meta.verifiedLessons = [...session.meta.verifiedLessons];
  return verification;
}

async function snapshot(session) {
  await syncTags(session);
  const state = await buildState(session);
  const verification = attachVerification(session, state);
  await saveMeta(session);
  return { state, verification };
}

/* ------------------------------------------------------------------ */
/* Command execution inside the container                              */
/* ------------------------------------------------------------------ */

function parseCompletionInput(input) {
  const words = [];
  let word = "";
  let wordStart = input.length;
  let active = false;
  let quote = null;
  let escaped = false;

  const pushWord = () => {
    words.push(word);
    word = "";
    active = false;
    quote = null;
    escaped = false;
    wordStart = input.length;
  };

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    if (escaped) {
      word += character;
      escaped = false;
      continue;
    }
    if (quote === "'") {
      if (character === "'") quote = null;
      else word += character;
      continue;
    }
    if (quote === "\"") {
      if (character === "\"") quote = null;
      else if (character === "\\") escaped = true;
      else word += character;
      continue;
    }
    if (character === "\\") {
      if (!active) wordStart = index;
      active = true;
      escaped = true;
      continue;
    }
    if (character === "'" || character === "\"") {
      if (!active) wordStart = index;
      active = true;
      quote = character;
      continue;
    }
    if (/\s/.test(character)) {
      if (active) pushWord();
      continue;
    }
    const operator = ["&&", "||", "|&", ">>", "<<", "&>"]
      .find((candidate) => input.startsWith(candidate, index));
    if (operator) {
      if (active) pushWord();
      words.push(operator);
      index += operator.length - 1;
      wordStart = index + 1;
      continue;
    }
    if ([";", "|", ">", "<", "&"].includes(character)) {
      if (active) pushWord();
      words.push(character);
      wordStart = index + 1;
      continue;
    }
    if (!active) wordStart = index;
    active = true;
    word += character;
  }

  return {
    words,
    word: active ? word : "",
    wordStart: active ? wordStart : input.length,
    quote,
    escaped,
  };
}

function completionWordEnd(input, cursor, initialQuote, initiallyEscaped) {
  let quote = initialQuote;
  let escaped = initiallyEscaped;
  for (let index = cursor; index < input.length; index += 1) {
    const character = input[index];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (quote === "'") {
      if (character === "'") quote = null;
      continue;
    }
    if (quote === "\"") {
      if (character === "\"") quote = null;
      else if (character === "\\") escaped = true;
      continue;
    }
    if (character === "\\") {
      escaped = true;
      continue;
    }
    if (character === "'" || character === "\"") {
      quote = character;
      continue;
    }
    if ([";", "|", ">", "<", "&"].includes(character) ||
        ["&&", "||", "|&", ">>", "<<", "&>"].some((operator) => input.startsWith(operator, index))) {
      return index;
    }
    if (/\s/.test(character)) return index;
  }
  return input.length;
}

async function pathCompletions(session, word) {
  if (word === "~") return [{ value: "~", directory: true }];
  const slash = word.lastIndexOf("/");
  const typedDirectory = slash === -1 ? "" : word.slice(0, slash + 1);
  const namePrefix = slash === -1 ? word : word.slice(slash + 1);
  const cwd = sessionCwd(session);
  let directory;

  if (typedDirectory.startsWith("~/")) {
    directory = path.resolve(session.dir, typedDirectory.slice(2));
  } else if (typedDirectory === "~") {
    directory = session.dir;
  } else if (path.isAbsolute(typedDirectory)) {
    directory = path.resolve(typedDirectory);
  } else {
    directory = path.resolve(cwd, typedDirectory || ".");
  }

  let realDirectory;
  try {
    realDirectory = await fsp.realpath(directory);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR" || error.code === "EACCES") return [];
    throw error;
  }
  let entries;
  try {
    entries = await fsp.readdir(realDirectory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "ENOTDIR" || error.code === "EACCES") return [];
    throw error;
  }

  return entries
    .filter((entry) => (
      entry.name.startsWith(namePrefix)
      && (!entry.name.startsWith(".") || namePrefix.startsWith("."))
      && !/["'\\\n\r]/.test(entry.name)
      && (entry.isFile() || entry.isDirectory())
    ))
    .map((entry) => ({ value: `${typedDirectory}${entry.name}`, directory: entry.isDirectory() }))
    .sort((left, right) => left.value.localeCompare(right.value));
}

async function handleCompletion(session, payload) {
  if (!payload || typeof payload.line !== "string") {
    throw httpError(400, "invalid-completion", "Completion input must be a string");
  }
  const line = payload.line;
  if (line.length > MAX_COMMAND_LENGTH) throw httpError(400, "command-too-long", "Completion input is too long");
  const cursor = Number.isInteger(payload.cursor) ? payload.cursor : line.length;
  if (cursor < 0 || cursor > line.length) {
    throw httpError(400, "invalid-completion", "Completion cursor is outside the input");
  }

  const parsed = parseCompletionInput(line.slice(0, cursor));
  const separator = parsed.words.reduce(
    (lastIndex, token, index) => ["&&", "||", "|", "|&", ";", "&"].includes(token) ? index : lastIndex,
    -1,
  );
  const words = parsed.words.slice(separator + 1);
  const word = parsed.word;
  const candidates = new Map();
  const add = (value, directory = false) => {
    if (value.startsWith(word) && !/["'\\\n\r]/.test(value)) {
      candidates.set(`${value}\0${directory}`, { value, directory });
    }
  };

  if (words.length === 0) {
    for (const command of ["cd", "clear", "help", ...COMMAND_COMPLETIONS].sort()) add(command);
    const commandList = await runProcess(
      "/bin/bash",
      ["--noprofile", "--norc", "-c", "compgen -c"],
      { cwd: sessionCwd(session), env: baseEnv(session) },
    );
    if (commandList.code !== 0) {
      throw new Error(`Bash command completion failed: ${commandList.stderr || commandList.stdout}`);
    }
    for (const command of commandList.stdout.split("\n").filter(Boolean)) add(command);
  } else if (words[0] === "git" && words.length === 1) {
    for (const command of [
      "add", "branch", "checkout", "cherry-pick", "clone", "commit", "config", "diff",
      "fetch", "init", "log", "merge", "mv", "pull", "push", "rebase", "remote",
      "reset", "restore", "revert", "rm", "show", "status", "switch", "tag",
    ]) add(command);
  } else {
    const program = words[0];
    const args = words.slice(1);
    const gitCommand = program === "git" ? args[0] : "";
    const branchCommands = new Set(["checkout", "switch", "merge", "rebase", "cherry-pick"]);
    const wantsBranch = program === "git" && (
      (branchCommands.has(gitCommand) && !args.includes("--") && args.length >= 1)
      || (gitCommand === "branch" && args.some((arg) => ["-d", "-D", "--delete"].includes(arg)))
    );

    if (wantsBranch) {
      const branches = await runGit(session, ["for-each-ref", "--format=%(refname:short)", "refs/heads"]);
      if (branches.code === 0) {
        for (const branch of branches.stdout.split("\n").filter(Boolean)) add(branch);
      }
    }

    const pathCommands = new Set([
      "cd", "ls", "cat", "mkdir", "rmdir", "touch", "rm", "cp", "mv", "head", "tail",
      "wc", "grep", "tree", "find", "stat", "du", "sort", "uniq", "basename", "dirname",
    ]);
    const gitPathCommands = new Set(["add", "checkout", "diff", "mv", "restore", "rm"]);
    const wantsPath = program === "git"
      ? gitPathCommands.has(gitCommand) && (gitCommand !== "checkout" || args.includes("--"))
      : pathCommands.has(program);
    if (wantsPath) {
      for (const item of await pathCompletions(session, word)) add(item.value, item.directory);
    }
  }

  return {
    wordStart: parsed.wordStart,
    wordEnd: completionWordEnd(line, cursor, parsed.quote, parsed.escaped),
    word,
    candidates: [...candidates.values()].slice(0, 100),
  };
}

function isInside(root, target) {
  const resolvedRoot = path.resolve(root);
  const resolvedTarget = path.resolve(target);
  return resolvedTarget === resolvedRoot || resolvedTarget.startsWith(`${resolvedRoot}${path.sep}`);
}

function sessionCwd(session) {
  const stored = session.meta.cwd || "repo";
  return path.isAbsolute(stored) ? path.resolve(stored) : path.resolve(session.dir, stored);
}

function recordExecution(session, entry) {
  session.meta.execLog.push({ ...entry, at: new Date().toISOString(), real: true });
  if (session.meta.execLog.length > 100) session.meta.execLog = session.meta.execLog.slice(-100);
  session.meta.execSinceSeed += 1;
  if (entry.program === "git" && entry.exitCode === 0) session.meta.gitSuccessSinceSeed += 1;
}

async function usableSessionCwd(session) {
  const cwd = sessionCwd(session);
  try {
    const stat = await fsp.stat(cwd);
    if (stat.isDirectory()) return cwd;
  } catch (error) {
    if (error.code !== "ENOENT" && error.code !== "ENOTDIR") throw error;
  }

  session.meta.cwd = "repo";
  await saveMeta(session);
  return session.repoDir;
}

async function executeInSession(session, command) {
  const cwd = await usableSessionCwd(session);
  const shellScript = [
    'readonly __git_workshop_state_file="$GIT_WORKSHOP_STATE_FILE"',
    "readonly __git_workshop_command=$1",
    "shift",
    'if [[ -e "$__git_workshop_state_file" ]]; then source "$__git_workshop_state_file" || exit $?; fi',
    "shopt -s expand_aliases",
    "__git_workshop_save_state() {",
    "  local __gw_status=$1 __gw_umask",
    "  shift",
    "  trap - EXIT",
    "  __gw_umask=$(umask)",
    "  umask 077",
    '  if ! exec 4>| "$__git_workshop_state_file"; then',
    '    printf "Failed to save shell state to %s\\n" "$__git_workshop_state_file" >&2',
    '    printf "cwd\\0%s\\0" "$PWD" >&3',
    "    exit 1",
    "  fi",
    '  umask "$__gw_umask"',
    "  unset -f __git_workshop_save_state",
    "  for __gw_name in $(compgen -v); do",
    "    case \"$__gw_name\" in",
    "      __gw_*|__git_workshop_*|GIT_WORKSHOP_*|BASH*|COMP_*|DIRSTACK|EPOCHREALTIME|EPOCHSECONDS|FUNCNAME|GROUPS|HISTCMD|LINENO|PIPESTATUS|RANDOM|SECONDS|SHELLOPTS|SRANDOM|UID|EUID|PPID|_) continue ;;",
    "    esac",
    '    __gw_declaration=$(declare -p "$__gw_name" 2>/dev/null) || continue',
    "    __gw_flags=${__gw_declaration#declare -}",
    "    __gw_flags=${__gw_flags%% *}",
    '    [[ "$__gw_flags" == *r* ]] && continue',
    '    printf "%s\\n" "$__gw_declaration" >&4',
    "  done",
    "  declare -f >&4",
    "  alias -p >&4",
    "  set +o >&4",
    "  shopt -p >&4",
    '  printf "set --" >&4',
    '  printf " %q" "$@" >&4',
    '  printf "\\n" >&4',
    '  printf "umask %s\\n" "$__gw_umask" >&4',
    "  exec 4>&-",
    "  unset __gw_umask __gw_name __gw_declaration __gw_flags",
    '  printf "cwd\\0%s\\0" "$PWD" >&3',
    '  return "$__gw_status"',
    "}",
    "trap '__git_workshop_save_state \"$?\" \"$@\"' EXIT",
    'eval "$__git_workshop_command"',
  ].join("\n");
  const result = await runProcess("/bin/bash", [
    "--noprofile",
    "--norc",
    "-c",
    shellScript,
    "bash",
    command,
  ], {
    cwd,
    env: {
      ...baseEnv(session),
      PATH: `/opt/git-workshop/bin:${process.env.PATH}`,
      GIT_WORKSHOP_GIT_LOG_FD: "3",
      GIT_WORKSHOP_STATE_FILE: path.join(session.dir, ".bash-state"),
    },
    captureControl: true,
    processGroup: true,
  });

  recordExecution(session, {
    command,
    program: "bash",
    exitCode: result.code,
    spawned: true,
    pid: result.pid,
  });

  const fields = result.control.split("\0");
  let finalCwd = null;
  for (let index = 0; index + 1 < fields.length; index += 2) {
    if (fields[index] === "git") {
      const exitCode = Number(fields[index + 1]);
      if (Number.isInteger(exitCode)) {
        recordExecution(session, {
          command: "git",
          program: "git",
          exitCode,
          spawned: true,
        });
      }
    } else if (fields[index] === "cwd") {
      finalCwd = fields[index + 1];
    }
  }

  if (finalCwd && path.isAbsolute(finalCwd)) session.meta.cwd = path.resolve(finalCwd);
  await saveMeta(session);
  return {
    output: result.stdout + (result.stderr ? `${result.stdout ? "\n" : ""}${result.stderr}` : ""),
    error: result.code !== 0,
    exitCode: result.code,
    execution: session.meta.execLog.at(-1) || null,
  };
}

/* ------------------------------------------------------------------ */
/* Keep lesson-id tags in sync with the real repository                */
/* ------------------------------------------------------------------ */

async function syncTags(session) {
  const meta = session.meta;
  const idSet = new Set(Object.values(meta.idMap));
  if (idSet.size === 0) return;

  const live = new Set();
  const branchesRev = await runGit(session, ["rev-list", "--branches"]);
  if (branchesRev.code === 0) {
    for (const sha of branchesRev.stdout.split("\n")) if (sha.trim()) live.add(sha.trim());
  }
  const headRev = await runGit(session, ["rev-list", "HEAD"]);
  if (headRev.code === 0) {
    for (const sha of headRev.stdout.split("\n")) if (sha.trim()) live.add(sha.trim());
  }

  const tags = await runGit(session, ["for-each-ref", "refs/tags", "--format=%(refname:short)\x1f%(objectname)"]);
  const existingTags = new Map();
  if (tags.code === 0) {
    for (const line of tags.stdout.split("\n")) {
      if (!line.trim()) continue;
      const [name, sha] = line.split("\x1f");
      existingTags.set(name, sha);
    }
  }

  // Drop lesson-id tags for commits that no longer exist in the real history
  // (for example after a rebase or reset), so the state cannot go stale.
  for (const [name, sha] of [...existingTags]) {
    if (idSet.has(name) && !live.has(sha)) {
      await runGit(session, ["tag", "-d", name]);
      existingTags.delete(name);
    }
  }

  const ordered = await runGit(session, ["log", "--all", "--topo-order", "--reverse", "--format=%H"]);
  if (ordered.code === 0) {
    for (const sha of ordered.stdout.split("\n")) {
      if (sha.trim() && !meta.idMap[sha]) meta.idMap[sha] = `C${meta.nextId++}`;
    }
  }

  for (const [sha, id] of Object.entries(meta.idMap)) {
    if (!live.has(sha) || existingTags.has(id)) continue;
    await runGit(session, ["tag", id, sha]);
  }
  await saveMeta(session);
}

/* ------------------------------------------------------------------ */
/* HTTP layer                                                          */
/* ------------------------------------------------------------------ */

const STATIC_FILES = {
  "/": { file: "index.html", type: "text/html; charset=utf-8" },
  "/index.html": { file: "index.html", type: "text/html; charset=utf-8" },
  "/app.js": { file: "app.js", type: "text/javascript; charset=utf-8" },
  "/style.css": { file: "style.css", type: "text/css; charset=utf-8" },
  "/shared/lessons.js": { file: "shared/lessons.js", type: "text/javascript; charset=utf-8" },
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  res.end(JSON.stringify(payload));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("Request body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      if (!chunks.length) return resolve({});
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

async function serveStatic(res, urlPath) {
  const entry = STATIC_FILES[urlPath];
  if (!entry) {
    sendJson(res, 404, { error: "Not found" });
    return;
  }
  try {
    const content = await fsp.readFile(path.join(ROOT, entry.file));
    res.writeHead(200, {
      "Content-Type": entry.type,
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    });
    res.end(content);
  } catch {
    sendJson(res, 500, { error: "Static file unavailable" });
  }
}

function httpError(status, code, message) {
  return Object.assign(new Error(message), { status, code });
}

async function requireSession(payload) {
  const sessionId = payload && typeof payload.sessionId === "string" ? payload.sessionId : "";
  if (!SESSION_ID_RE.test(sessionId)) throw httpError(400, "no-session", "Unknown session");
  const session = await loadSession(sessionId);
  if (!session) throw httpError(400, "no-session", "Unknown session");
  return session;
}

/* ------------------------------------------------------------------ */
/* Request handlers                                                    */
/* ------------------------------------------------------------------ */

async function handleSessionCreate(payload) {
  const language = normalizeLanguage(payload.language);
  const requestedId = typeof payload.sessionId === "string" && SESSION_ID_RE.test(payload.sessionId)
    ? payload.sessionId
    : null;
  const { session, isNew } = await ensureSession(requestedId);

  await enqueue(session, async () => {
    if (isNew) {
      applySources(session, payload.sources);
      session.meta.language = language;
      const lesson = resolveLessonByIndex(session, payload.lessonIndexHint) || builtinLessons[0];
      await seed(session, lesson, language, { resetRepository: true });
    } else {
      applySources(session, payload.sources);
      session.meta.language = language;
      await saveMeta(session);
    }
  });

  return enqueue(session, async () => {
    const lesson = resolveLesson(session)
      || resolveLessonByIndex(session, session.meta.lessonIndex)
      || builtinLessons[0];
    const { state } = await snapshot(session);
    return {
      sessionId: session.id,
      lessonId: lesson.id,
      lessonIndex: lessonClientIndex(session, lesson),
      verifiedLessons: [...session.meta.verifiedLessons],
      importedSources: session.meta.imported || [],
      state,
    };
  });
}

async function handleLesson(session, payload) {
  const language = normalizeLanguage(payload.language);
  session.meta.language = language;
  applySources(session, payload.sources);

  let lesson = null;
  if (typeof payload.lessonId === "string" && payload.lessonId) {
    if (builtinIds.has(payload.lessonId)) lesson = builtinLessons.find((item) => item.id === payload.lessonId);
    else lesson = importLessons(session).find((item) => item.id === payload.lessonId) || null;
  }
  if (!lesson) lesson = resolveLessonByIndex(session, payload.lessonIndex);
  if (!lesson) throw httpError(400, "unknown-lesson", "Unknown lesson");

  if (payload.clearProgress) session.meta.verifiedLessons = [];
  await seed(session, lesson, language);
  const { state, verification } = await snapshot(session);
  return {
    lessonId: lesson.id,
    lessonIndex: lessonClientIndex(session, lesson),
    verifiedLessons: [...session.meta.verifiedLessons],
    state,
    verification,
  };
}

async function handleCourseReset(session, payload) {
  const language = normalizeLanguage(payload.language);
  const imported = session.meta.imported;
  session.meta.language = language;
  const lesson = builtinLessons[0];
  await seed(session, lesson, language, { resetRepository: true });
  session.meta.imported = imported;
  const { state, verification } = await snapshot(session);
  return {
    lessonId: lesson.id,
    lessonIndex: 0,
    verifiedLessons: [...session.meta.verifiedLessons],
    importedSources: session.meta.imported || [],
    state,
    verification,
  };
}

async function handleProgress(session, payload) {
  const lessonId = typeof payload.lessonId === "string" ? payload.lessonId : "";
  const lesson = builtinLessons.find((item) => item.id === lessonId)
    || importLessons(session).find((item) => item.id === lessonId);
  if (!lesson || lesson.id !== session.meta.lessonId) {
    throw httpError(400, "unknown-lesson", "Only the current lesson can be marked complete");
  }
  if ((lesson.type || "exercise") === "exercise" && !session.meta.verifiedLessons.includes(lesson.id)) {
    throw httpError(409, "unverified-lesson", "Exercise completion must be verified first");
  }
  if (!session.meta.verifiedLessons.includes(lesson.id)) {
    session.meta.verifiedLessons.push(lesson.id);
  }
  if (payload.language) session.meta.language = normalizeLanguage(payload.language);
  const { state } = await snapshot(session);
  return {
    state,
    verifiedLessons: [...session.meta.verifiedLessons],
  };
}

async function handleCommand(session, payload) {
  const command = typeof payload.command === "string" ? payload.command.trim() : "";
  if (!command) throw httpError(400, "empty-command", "Empty command");
  if (payload.language) session.meta.language = normalizeLanguage(payload.language);

  if (command.length > MAX_COMMAND_LENGTH) {
    const { state } = await snapshot(session);
    return {
      output: "",
      error: true,
      code: "command-too-long",
      execution: null,
      state,
    };
  }

  const executed = await executeInSession(session, command);
  const { state, verification } = await snapshot(session);

  return {
    output: executed.output,
    error: Boolean(executed.error),
    code: null,
    execution: executed.execution,
    state,
    verification,
    verifiedLessons: [...session.meta.verifiedLessons],
  };
}

async function handleVerify(session, payload) {
  if (payload.language) session.meta.language = normalizeLanguage(payload.language);
  const { state, verification } = await snapshot(session);
  return {
    state,
    verification,
    verifiedLessons: [...session.meta.verifiedLessons],
  };
}

async function handleHealth() {
  const version = await fsp.readFile(path.join(ROOT, "server", "package.json"), "utf8")
    .then((raw) => JSON.parse(raw).version)
    .catch(() => "unknown");
  const gitVersion = await runProcess("git", ["--version"], { cwd: ROOT, env: { PATH: process.env.PATH } });
  return {
    ok: true,
    version,
    git: (gitVersion.stdout || "").trim(),
    container: os.hostname(),
    workspace: WORKSPACE,
  };
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  try {
    if (req.method === "GET" && url.pathname === "/api/health") {
      sendJson(res, 200, await handleHealth());
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/session") {
      sendJson(res, 200, await handleSessionCreate(await readJson(req)));
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/complete") {
      const payload = await readJson(req);
      const session = await requireSession(payload);
      sendJson(res, 200, await enqueue(session, () => handleCompletion(session, payload)));
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/lesson") {
      const payload = await readJson(req);
      const session = await requireSession(payload);
      sendJson(res, 200, await enqueue(session, () => handleLesson(session, payload)));
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/reset") {
      const payload = await readJson(req);
      const session = await requireSession(payload);
      sendJson(res, 200, await enqueue(session, () => handleCourseReset(session, payload)));
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/progress") {
      const payload = await readJson(req);
      const session = await requireSession(payload);
      sendJson(res, 200, await enqueue(session, () => handleProgress(session, payload)));
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/command") {
      const payload = await readJson(req);
      const session = await requireSession(payload);
      sendJson(res, 200, await enqueue(session, () => handleCommand(session, payload)));
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/verify") {
      const payload = await readJson(req);
      const session = await requireSession(payload);
      sendJson(res, 200, await enqueue(session, () => handleVerify(session, payload)));
      return;
    }
    if (req.method === "GET") {
      await serveStatic(res, url.pathname);
      return;
    }
    sendJson(res, 404, { error: "Not found" });
  } catch (error) {
    sendJson(res, error.status || 500, { error: error.message, code: error.code || "server-error" });
  }
});

fsp.mkdir(SESSIONS_DIR, { recursive: true })
  .then(() => {
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Git Workshop server listening on port ${PORT}`);
      console.log(`Workspace: ${WORKSPACE}`);
      console.log(`Container: ${os.hostname()}`);
    });
  })
  .catch((error) => {
    console.error("Failed to prepare workspace:", error);
    process.exit(1);
  });
