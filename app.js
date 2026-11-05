const ui = {
  hu: {
    title: "Git műhely — tanulj gyakorlással",
    brand: "Git műhely kezdőlap",
    brandName: "műhely",
    offline: "Helyben fut Dockerban · minden parancs a konténerben",
    import: "Import",
    importAria: "Feladatfájl importálása",
    importTitle: "JSON vagy YAML feladatfájl betöltése",
    importSuccess: "{count} feladat importálva. Az oldal újratöltése után is megmarad.",
    importLoaded: "{count} saját feladat betöltve.",
    clearImported: "Eltávolítás",
    clearSuccess: "Az importált feladatok eltávolítva.",
    importError: "Importálási hiba: {message}",
    reset: "Újrakezdés",
    resetTitle: "Lecke újrakezdése",
    path: "TANULÁSI ÚTVONAL",
    lessons: "Leckék",
    courseSummary: "{lessons} lecke · {exercises} gyakorlat",
    tip: "A Git pillanatképeket ment. A branchek csak könnyű, mozgatható hivatkozások a commitokra.",
    footer: "Önálló gyakorlókörnyezet",
    goal: "Feladat",
    concept: "GONDOLJ ERRE",
    previous: "Előző",
    next: "Következő lecke",
    finish: "Útvonal befejezése",
    courseComplete: "Végigértél a tanulási útvonalon. Most már szabadon gyakorolhatsz.",
    playground: "Git gyakorlófelület",
    graph: "Commitgráf",
    graphLegend: "commit-történet",
    graphAria: "A Git repository commitgráfja",
    repoStatus: "Munkakönyvtár tiszta",
    detachedStatus: "Leválasztott HEAD",
    terminal: "Parancssor",
    dockerPlayground: "Docker környezet",
    dockerTitle: "Valódi Git a helyi Dockerben",
    dockerKicker: "HELYI DOCKER FUTTATÓKÖRNYEZET",
    dockerIntro: "Az egész alkalmazás a helyi Docker konténerben fut. A terminálba írt parancsok valódi rendszerparancsokként a konténerben hajtódnak végre, és a feladatok ellenőrzése is a konténer valós repository-állapotából történik — nincs szimuláció. A gazda gép fájljai nincsenek becsatolva; egy törölhető Docker-kötet tárolja a gyakorló repository-kat.",
    dockerStepOne: "A repository gyökérkönyvtárából építsd fel és indítsd el a környezetet:",
    dockerStepTwo: "Nyisd meg az alkalmazást a böngészőben:",
    dockerStepThree: "A terminálba írt parancsok azonnal a konténerben futnak. Az Újrakezdés gomb újraépíti az aktuális feladat repository-ját; a bal oldali listában lépkedhetsz a leckék között.",
    dockerExample: "Példa valós parancsokkal",
    dockerReset: "A környezet és az összes gyakorlófájl törlése:",

    dockerClose: "Kész",
    dockerCloseAria: "Bezárás",
    help: "Parancsok",
    terminalAria: "Parancssori kimenet",
    commandAria: "Git parancs",
    runAria: "Parancs futtatása",
    placeholder: 'git commit -m "Első változtatás"',
    pressEnter: "Nyomj",
    runHint: "-t a futtatáshoz",
    historyHint: "előző parancs",
    completionHint: "kiegészítés",
    welcome: "Gépeld be a git parancsot, majd nyomj Entert. A `help` megmutatja az elérhető parancsokat.",
    containerNote: "Valós parancsok futnak a Docker konténerben ({id}).",
    notAllowed: "A '{command}' parancs itt nem engedélyezett. Engedélyezett programok: git, ls, pwd, cat, echo, mkdir, touch, rm, cp, mv, head, tail, wc, grep, cd. Írd be: help.",
    serverError: "Nem sikerül elérni a Docker konténerben futó szervert. Indítsd el: docker compose up --build -d",
    dirtyStatus: "{count} módosított fájl",
    hintButton: "Súgás",
    checkTask: "Feladat ellenőrzése",
    checkNext: "Következő feladat →",
    hintSolution: "MEGOLDÁS — a konténerben futtatható parancsok:",
    hintNoMore: "További súgás nincs. Ha kész vagy, a Feladat ellenőrzése gombbal jelezheted a teljesítést.",
    verifyPass: "✓ Teljesítve: a konténer valós repository-állapota megfelel ({count} valós git parancs futott a lecke betöltése óta). Nyomd meg újra a gombot a következő feladathoz.",
    verifyFailState: "✗ Még nem teljesül: a konténer repository-ja nem felel meg a feladat feltételének. Kérj újabb hintet a Súgás gombbal.",
    verifyFailCommands: "✗ A feltétel megfelelne, de a lecke betöltése óta nem futott valós git parancs a konténerben. Futtass egy valós git parancsot.",
    example: 'Példa: git commit -m "Első változtatás"',






































    completed: "Szép munka — teljesítetted a feladatot. Léphetsz tovább a következő leckére.",
    allCompleted: "Szép munka — teljesítetted az utolsó leckét is. Most már szabadon gyakorolhatsz.",
    helpFirst: 'git config --global user.name "Név"  ·  git config --global user.email "email"  ·  git remote add origin <URL>',
    helpSecond: 'git commit -m "üzenet"  ·  git branch <név>  ·  git switch <ág>  ·  git merge <ág>  ·  git rebase <ág>  ·  git cherry-pick <commit>  ·  git log  ·  git status  ·  git config  ·  ls  ·  cd <könyvtár>  ·  clear',
    commitCount: "{count} commit",
    language: "EN",
    languageAria: "Switch language to English",
    // Email & Progress dialogs
    progressTitle: "Tanulási előrehaladás",
    progressClose: "Bezárás",
    progressReset: "Előrehaladás törlése",
    progressResetConfirm: "Biztosan törölni szeretnéd az előrehaladásod? Ez a művelet nem vonható vissza.",
    progressNoData: "Nincs elmentett előrehaladás.",
    progressCompleted: "Befejezett leckék",
    progressCurrent: "Jelenlegi lecke",
    progressTotal: "Összes lecke",
    progressButton: "Előrehaladás",
  },
  en: {
    title: "Git Workshop — learn by doing",
    brand: "Git Workshop home",
    brandName: "workshop",
    offline: "Runs locally in Docker · every command executes in the container",
    import: "Import",
    importAria: "Import exercise file",
    importTitle: "Load an exercise file in JSON or YAML format",
    importSuccess: "Imported {count} exercises. They will remain available after reload.",
    importLoaded: "Loaded {count} custom exercises.",
    clearImported: "Remove",
    clearSuccess: "Imported exercises removed.",
    importError: "Import error: {message}",
    reset: "Restart",
    resetTitle: "Restart lesson",
    path: "LEARNING PATH",
    lessons: "Lessons",
    courseSummary: "{lessons} lessons · {exercises} exercises",
    tip: "Git saves snapshots. Branches are lightweight, movable references to commits.",
    footer: "Self-guided learning environment",
    goal: "Your task",
    concept: "THE IDEA",
    previous: "Previous",
    next: "Next lesson",
    finish: "Finish learning path",
    courseComplete: "You completed the learning path. Feel free to keep practicing.",
    playground: "Git practice area",
    graph: "Commit graph",
    graphLegend: "commit history",
    progressTitle: "Learning Progress",
    progressClose: "Close",
    progressReset: "Clear Progress",
    progressResetConfirm: "Are you sure you want to clear your progress? This cannot be undone.",
    progressNoData: "No saved progress found.",
    progressCompleted: "Completed Lessons",
    progressCurrent: "Current Lesson",
    progressTotal: "Total Lessons",
    progressButton: "Progress",
    title: "Git Workshop — learn by doing",
    brand: "Git Workshop home",
    brandName: "workshop",
    offline: "Runs locally in Docker · every command executes in the container",
    import: "Import",
    importAria: "Import exercise file",
    importTitle: "Load an exercise file in JSON or YAML format",
    importSuccess: "Imported {count} exercises. They will remain available after reload.",
    importLoaded: "Loaded {count} custom exercises.",
    clearImported: "Remove",
    clearSuccess: "Imported exercises removed.",
    importError: "Import error: {message}",
    reset: "Restart",
    resetTitle: "Restart lesson",
    path: "LEARNING PATH",
    lessons: "Lessons",
    courseSummary: "{lessons} lessons · {exercises} exercises",
    tip: "Git saves snapshots. Branches are lightweight, movable references to commits.",
    footer: "Self-guided learning environment",
    goal: "Your task",
    concept: "THE IDEA",
    previous: "Previous",
    next: "Next lesson",
    finish: "Finish learning path",
    courseComplete: "You completed the learning path. Feel free to keep practicing.",
    playground: "Git practice area",
    graph: "Commit graph",
    graphLegend: "commit history",
    graphAria: "Git repository commit graph",
    repoStatus: "Working tree clean",
    detachedStatus: "Detached HEAD",
    terminal: "Terminal",
    dockerPlayground: "Docker environment",
    dockerTitle: "Real Git in local Docker",
    dockerKicker: "LOCAL DOCKER ENVIRONMENT",
    dockerIntro: "The whole application runs in a local Docker container. Commands typed into the terminal execute as real system commands inside the container, and exercises are verified against the container's real repository state — no simulation. No host files are mounted; a single disposable Docker volume stores the practice repositories.",
    dockerStepOne: "From the repository root, build and start the environment:",
    dockerStepTwo: "Open the application in your browser:",
    dockerStepThree: "Commands you type run inside the container immediately. The Restart button rebuilds the current exercise's repository; use the list on the left to move between lessons.",
    dockerExample: "Example with real commands",
    dockerReset: "Delete the environment and all practice files:",

    dockerClose: "Done",
    dockerCloseAria: "Close",
    help: "Commands",
    terminalAria: "Terminal output",
    commandAria: "Git command",
    runAria: "Run command",
    placeholder: 'git commit -m "First change"',
    pressEnter: "Press",
    runHint: " to run",
    historyHint: "previous command",
    completionHint: "complete",
    welcome: "Type a Git command and press Enter. Type `help` to see the available commands.",
    containerNote: "Real commands are running inside the Docker container ({id}).",
    notAllowed: "The '{command}' command is not allowed here. Allowed programs: git, ls, pwd, cat, echo, mkdir, touch, rm, cp, mv, head, tail, wc, grep, cd. Type: help.",
    serverError: "Cannot reach the server running in the Docker container. Start it with: docker compose up --build -d",
    dirtyStatus: "{count} changed file(s)",
    hintButton: "Hint",
    checkTask: "Check task",
    checkNext: "Next task →",
    hintSolution: "SOLUTION — commands you can run in the container:",
    hintNoMore: "No further hints. When you are done, the Check task button verifies completion.",
    verifyPass: "✓ Complete: the container's real repository state matches ({count} real git command(s) ran since the lesson loaded). Press the button again to continue.",
    verifyFailState: "✗ Not complete yet: the container repository does not satisfy the task. Ask for another hint with the Hint button.",
    verifyFailCommands: "✗ The state would match, but no real git command has run in the container since the lesson loaded. Run a real git command.",
    example: 'Example: git commit -m "First change"',






































    completed: "Nice work — task complete. You can move on to the next lesson.",
    allCompleted: "Nice work — you completed the final lesson. Feel free to keep practicing.",
    helpFirst: 'git config --global user.name "Name"  ·  git config --global user.email "email"  ·  git remote add origin <URL>',
    helpSecond: 'git commit -m "message"  ·  git branch <name>  ·  git switch <branch>  ·  git merge <branch>  ·  git rebase <branch>  ·  git cherry-pick <commit>  ·  git log  ·  git status  ·  git config  ·  ls  ·  cd <directory>  ·  clear',
    commitCount: "{count} commits",
    language: "HU",
    languageAria: "Váltás magyar nyelvre",
    // Email & Progress dialogs
    progressTitle: "Learning Progress",
    progressClose: "Close",
    progressReset: "Clear Progress",
    progressResetConfirm: "Are you sure you want to clear your progress? This cannot be undone.",
    progressNoData: "No saved progress found.",
    progressCompleted: "Completed Lessons",
    progressCurrent: "Current Lesson",
    progressTotal: "Total Lessons",
  },
};

const { lessons, builtinCount: builtInLessonCount } = GitLessons.createLessons();
const { validateImportedFile } = GitLessons;
const importedStorageKey = "git-workshop-imported-lessons-v1";
const progressStorageKey = "git-workshop-progress-v1";
let importedSources = [];

function stripYamlComment(text) {
  let quote = null;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quote === '"' && character === "\\") {
      index += 1;
      continue;
    }
    if ((character === '"' || character === "'") && (!quote || quote === character)) {
      quote = quote ? null : character;
    } else if (character === "#" && !quote && (index === 0 || /\s/.test(text[index - 1]))) {
      return text.slice(0, index).trimEnd();
    }
  }
  return text;
}

function splitYamlPair(text) {
  let quote = null;
  let depth = 0;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quote === '"' && character === "\\") {
      index += 1;
      continue;
    }
    if ((character === '"' || character === "'") && (!quote || quote === character)) {
      quote = quote ? null : character;
    } else if (!quote && (character === "[" || character === "{")) {
      depth += 1;
    } else if (!quote && (character === "]" || character === "}")) {
      depth -= 1;
    } else if (!quote && depth === 0 && character === ":") {
      return [text.slice(0, index).trim(), text.slice(index + 1).trim()];
    }
  }
  return null;
}

function parseYamlScalar(value) {
  const text = value.trim();
  if (text.startsWith('"')) {
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(`Invalid quoted string: ${text}`);
    }
  }
  if (text.startsWith("'")) {
    if (!text.endsWith("'")) throw new Error(`Unclosed quoted string: ${text}`);
    return text.slice(1, -1).replaceAll("''", "'");
  }
  if (text.startsWith("[") || text.startsWith("{")) {
    try {
      return JSON.parse(text);
    } catch {
      throw new Error("Inline YAML arrays and objects must use valid JSON syntax.");
    }
  }
  if (text === "true") return true;
  if (text === "false") return false;
  if (text === "null" || text === "~") return null;
  if (/^-?\d+(?:\.\d+)?$/.test(text)) return Number(text);
  return text;
}

function parseYaml(text) {
  const lines = text.split(/\r?\n/).map((raw, lineIndex) => {
    if (/\t/.test(raw.match(/^\s*/)[0])) throw new Error(`Tabs are not supported for YAML indentation (line ${lineIndex + 1}).`);
    const content = stripYamlComment(raw.trimStart());
    return { indent: raw.length - raw.trimStart().length, content: content.trimEnd(), raw: raw.trimEnd(), line: lineIndex + 1 };
  }).filter((line) => line.content.length > 0 && line.content !== "---" && line.content !== "...");
  if (!lines.length) throw new Error("The YAML file is empty.");

  function parseValue(value, index, parentIndent) {
    if (value === "|" || value === ">") {
      const block = [];
      let next = index;
      let blockIndent = null;
      while (next < lines.length && lines[next].indent > parentIndent) {
        blockIndent ??= lines[next].indent;
        if (lines[next].indent < blockIndent) break;
        block.push(lines[next].raw.slice(blockIndent));
        next += 1;
      }
      return { value: value === "|" ? block.join("\n") : block.join(" "), next };
    }
    if (value !== "") return { value: parseYamlScalar(value), next: index };
    if (index >= lines.length || lines[index].indent <= parentIndent) return { value: null, next: index };
    return parseBlock(index, lines[index].indent);
  }

  function parsePair(pairText, index, parentIndent) {
    const pair = splitYamlPair(pairText);
    if (!pair || !pair[0]) throw new Error(`Expected a key/value pair near line ${lines[Math.max(index - 1, 0)]?.line || 1}.`);
    let key = parseYamlScalar(pair[0]);
    if (typeof key !== "string") throw new Error("YAML object keys must be strings.");
    if (["__proto__", "prototype", "constructor"].includes(key)) throw new Error(`Unsafe YAML key: ${key}`);
    const parsed = parseValue(pair[1], index, parentIndent);
    return { key, value: parsed.value, next: parsed.next };
  }

  function parseMap(index, indent, result = {}, firstPair = null) {
    let cursor = index;
    if (firstPair) {
      const entry = parsePair(firstPair, cursor, indent);
      result[entry.key] = entry.value;
      cursor = entry.next;
    }
    while (cursor < lines.length && lines[cursor].indent === indent && !lines[cursor].content.startsWith("-")) {
      const entry = parsePair(lines[cursor].content, cursor + 1, indent);
      if (Object.hasOwn(result, entry.key)) throw new Error(`Duplicate YAML key "${entry.key}" near line ${lines[cursor].line}.`);
      result[entry.key] = entry.value;
      cursor = entry.next;
    }
    return { value: result, next: cursor };
  }

  function parseList(index, indent) {
    const result = [];
    let cursor = index;
    while (cursor < lines.length && lines[cursor].indent === indent && lines[cursor].content.startsWith("-")) {
      const rest = lines[cursor].content.slice(1).trim();
      const lineNumber = lines[cursor].line;
      cursor += 1;
      if (!rest) {
        if (cursor >= lines.length || lines[cursor].indent <= indent) throw new Error(`Empty YAML list item near line ${lineNumber}.`);
        const nested = parseBlock(cursor, lines[cursor].indent);
        result.push(nested.value);
        cursor = nested.next;
      } else if (splitYamlPair(rest)) {
        const parsed = parseMap(cursor, indent + 2, {}, rest);
        result.push(parsed.value);
        cursor = parsed.next;
      } else {
        const parsed = parseValue(rest, cursor, indent);
        result.push(parsed.value);
        cursor = parsed.next;
      }
    }
    return { value: result, next: cursor };
  }

  function parseBlock(index, indent) {
    const line = lines[index];
    if (!line || line.indent !== indent) throw new Error(`Unexpected YAML indentation near line ${line?.line || "end of file"}.`);
    return line.content.startsWith("-") ? parseList(index, indent) : parseMap(index, indent);
  }

  const parsed = parseBlock(0, lines[0].indent);
  if (parsed.next !== lines.length) throw new Error(`Unexpected YAML content near line ${lines[parsed.next].line}.`);
  return parsed.value;
}


const $ = (selector) => document.querySelector(selector);
const appVersion = document.querySelector('meta[name="application-version"]').content;
const lessonList = $("#lesson-list");
const graph = $("#graph");
const terminal = $("#terminal-output");
let language = "en";
const t = (key, values = {}) => Object.entries(values).reduce(
  (text, [name, value]) => text.replaceAll(`{${name}}`, value),
  ui[language][key],
);
let lessonIndex = 0;
let state = null;
let sessionId = null;
let commandHistory = [];
let commandHistoryIndex = 0;
let commandBusy = false;
let lastTabCompletion = null;
let hintStep = 0;
const completedLessons = new Set();

async function api(pathname, body) {
  const options = body === undefined ? {} : {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const response = await fetch(pathname, options);
  if (!response.ok) {
    let code = null;
    try {
      code = (await response.json()).code || null;
    } catch {
      code = null;
    }
    throw Object.assign(new Error(`HTTP ${response.status}`), { code });
  }
  return response.json();
}

function addOutput(text, kind = "result") {
  const line = document.createElement("div");
  line.className = `output-line output-${kind}`;
  line.textContent = text;
  terminal.append(line);
  terminal.scrollTop = terminal.scrollHeight;
}

function setWelcome() {
  terminal.replaceChildren();
  addOutput(`${language === "hu" ? "Git műhely" : "Git Workshop"} — ${lessons[lessonIndex].content[language].title}`, "success");
  const containerId = state?.meta?.container;
  if (containerId) addOutput(t("containerNote", { id: containerId.slice(0, 12) }));
  addOutput(t("welcome"));
  if (lessonIndex === 0) addOutput(t("example"));
}

function applyServerState(nextState) {
  state = nextState;
  if (Array.isArray(state?.meta?.verifiedLessons)) {
    for (const id of state.meta.verifiedLessons) {
      const index = lessons.findIndex((lesson) => lesson.id === id);
      if (index !== -1) completedLessons.add(index);
    }
  }
}

function promptText() {
  if (!state?.meta) return "$";
  const cwd = state.meta.cwd && state.meta.cwd !== "." ? `~/${state.meta.cwd}` : "~";
  return `${state.meta.user || "user"}@${state.meta.host || "docker"}:${cwd}$`;
}

function stripLessonMarkup(text) {
  return String(text).replace(/\[\[([^\]]+)\]\]/g, "$1").replace(/`([^`]+)`/g, "$1");
}

async function runCommand(raw) {
  const command = raw.trim();
  if (!command) return;
  const [program] = command.split(/\s+/);
  if (program === "help") {
    addOutput(command, "command");
    addOutput(t("helpFirst"));
    addOutput(t("helpSecond"));
    return;
  }
  if (program === "clear") {
    terminal.replaceChildren();
    return;
  }
  addOutput(command, "command");
  if (!sessionId || commandBusy) return;
  commandBusy = true;
  const requestedLesson = lessonIndex;
  try {
    const result = await api("/api/command", { sessionId, command, language });
    if (result.code === "not-allowed") {
      addOutput(t("notAllowed", { command: program }), "error");
    } else if (result.output) {
      addOutput(result.output, result.error ? "error" : "result");
    }
    if (requestedLesson === lessonIndex) {
      applyServerState(result.state);
      render();
      checkLesson();
      saveProgress();
    }
  } catch (error) {
    addOutput(t("serverError"), "error");
  } finally {
    commandBusy = false;
  }
}

function quoteCompletion(value) {
  return /\s/.test(value) ? `"${value}"` : value;
}

function commonCompletionPrefix(values) {
  if (!values.length) return "";
  let length = values[0].length;
  for (const value of values.slice(1)) {
    length = Math.min(length, value.length);
    let index = 0;
    while (index < length && values[0][index] === value[index]) index += 1;
    length = index;
  }
  return values[0].slice(0, length);
}

async function completeCommand(input) {
  if (!sessionId || commandBusy) return;
  const cursor = input.selectionStart ?? input.value.length;
  const line = input.value.slice(0, cursor);
  try {
    const result = await api("/api/complete", { sessionId, line: input.value, cursor });
    if (input.selectionStart !== cursor || input.value.slice(0, cursor) !== line) return;
    const candidates = result.candidates || [];
    if (!candidates.length) {
      lastTabCompletion = null;
      return;
    }

    const repeated = lastTabCompletion
      && lastTabCompletion.line === line
      && lastTabCompletion.cursor === cursor
      && performance.now() - lastTabCompletion.at < 1000;
    if (repeated) {
      const labels = candidates.map(({ value, directory }) => `${value}${directory ? "/" : ""}`);
      addOutput(labels.join("  "));
      lastTabCompletion = null;
      return;
    }

    if (candidates.length === 1) {
      const candidate = candidates[0];
      const insertion = `${quoteCompletion(candidate.value)}${candidate.directory ? "/" : ""}`;
      const suffix = input.value.slice(result.wordEnd);
      const separator = candidate.directory || suffix ? "" : " ";
      input.value = `${input.value.slice(0, result.wordStart)}${insertion}${separator}${suffix}`;
      const keepTypingInsideQuotes = candidate.directory && /\s/.test(candidate.value);
      const nextCursor = result.wordStart + insertion.length - Number(keepTypingInsideQuotes) + separator.length;
      input.setSelectionRange(nextCursor, nextCursor);
      lastTabCompletion = null;
      return;
    }

    const commonPrefix = commonCompletionPrefix(candidates.map(({ value }) => value));
    if (commonPrefix.length > result.word.length) {
      const insertion = quoteCompletion(commonPrefix);
      input.value = `${input.value.slice(0, result.wordStart)}${insertion}${input.value.slice(result.wordEnd)}`;
      const nextCursor = result.wordStart + insertion.length - Number(/\s/.test(commonPrefix));
      input.setSelectionRange(nextCursor, nextCursor);
      lastTabCompletion = {
        line: input.value.slice(0, nextCursor),
        cursor: nextCursor,
        at: performance.now(),
      };
      return;
    }

    lastTabCompletion = { line, cursor, at: performance.now() };
  } catch (error) {
    lastTabCompletion = null;
    addOutput(t("serverError"), "error");
  }
}

function renderGraph() {
  graph.replaceChildren();
  const laneCount = Math.max(1, ...state.commits.map((commit) => commit.lane + 1));
  const rowHeight = 68;
  const laneWidth = 160;
  const left = 32;
  const top = 33;
  const width = Math.max(410, left + laneCount * laneWidth + 205);
  const height = Math.max(155, top + (state.commits.length - 1) * rowHeight + 48);
  graph.style.width = `${width}px`;
  graph.style.height = `${height}px`;
  const positions = new Map(state.commits.map((commit, index) => [
    commit.id,
    { x: left + commit.lane * laneWidth, y: top + index * rowHeight },
  ]));

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  for (const item of state.commits) {
    const child = positions.get(item.id);
    item.parents.forEach((parentId, parentIndex) => {
      const parent = positions.get(parentId);
      if (!parent || !child) return;
      const edge = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const middleY = parent.y + (child.y - parent.y) * 0.5;
      edge.setAttribute("d", `M ${parent.x} ${parent.y} C ${parent.x} ${middleY}, ${child.x} ${middleY}, ${child.x} ${child.y}`);
      edge.setAttribute("class", `graph-edge${parentIndex === 0 ? " edge-first-parent" : ""}`);
      svg.append(edge);
    });
  }
  graph.append(svg);

  for (const item of state.commits) {
    const position = positions.get(item.id);
    const node = document.createElement("div");
    node.className = `commit-node${item.parents.length === 2 ? " merge" : ""}${item.parents.length === 0 ? " root" : ""}`;
    node.style.left = `${position.x}px`;
    node.style.top = `${position.y}px`;
    node.style.width = `${laneWidth + 25}px`;
    const dot = document.createElement("span");
    dot.className = "commit-dot";
    const details = document.createElement("span");
    details.className = "commit-details";
    const hash = document.createElement("span");
    hash.className = "commit-hash";
    hash.textContent = item.id;
    const message = document.createElement("span");
    message.className = "commit-message";
    message.textContent = item.translations?.[language] || item.message;
    details.append(hash, message);
    node.append(dot, details);

    const refs = Object.entries(state.branches).filter(([, id]) => id === item.id).map(([name]) => name);
    if (state.detached === item.id) refs.push("HEAD");
    if (refs.length) {
      const tags = document.createElement("span");
      tags.className = "ref-tags";
      for (const name of refs) {
        const tag = document.createElement("span");
        tag.className = `ref-tag${name === state.current ? " head" : ""}${name === "HEAD" ? " detached" : ""}`;
        tag.textContent = name === state.current ? `HEAD · ${name}` : name;
        tags.append(tag);
      }
      node.append(tags);
    }
    graph.append(node);
  }
}

function render() {
  renderGraph();
  $("#terminal-prompt").textContent = promptText();
  $("#commit-count").textContent = language === "en" && state.commits.length === 1
    ? "1 commit"
    : t("commitCount", { count: state.commits.length });
  $("#repo-status").textContent = state.detached
    ? t("detachedStatus")
    : state.meta?.dirty
      ? t("dirtyStatus", { count: state.meta.dirty })
      : t("repoStatus");
  renderLessons();
}

function appendGoalParameter(parent, value) {
  const parameter = document.createElement("mark");
  parameter.className = "goal-parameter";
  parameter.textContent = value;
  parent.append(parameter);
}

function appendGoalCode(parent, value) {
  const code = document.createElement("code");
  const parameterPattern = /\[\[([^\]]+)\]\]/g;
  let lastIndex = 0;
  let match;
  while ((match = parameterPattern.exec(value)) !== null) {
    code.append(document.createTextNode(value.slice(lastIndex, match.index)));
    appendGoalParameter(code, match[1]);
    lastIndex = parameterPattern.lastIndex;
  }
  code.append(document.createTextNode(value.slice(lastIndex)));
  parent.append(code);
}

function renderGoal(element, text) {
  const tokenPattern = /\[\[([^\]]+)\]\]|\x60([^\x60]+)\x60/g;
  let lastIndex = 0;
  let match;
  element.replaceChildren();
  while ((match = tokenPattern.exec(text)) !== null) {
    element.append(document.createTextNode(text.slice(lastIndex, match.index)));
    if (match[1] !== undefined) appendGoalParameter(element, match[1]);
    else appendGoalCode(element, match[2]);
    lastIndex = tokenPattern.lastIndex;
  }
  element.append(document.createTextNode(text.slice(lastIndex)));
}

function renderLessons() {
  lessonList.replaceChildren();
  $("#course-summary").textContent = t("courseSummary", {
    lessons: lessons.length,
    exercises: lessons.filter((lesson) => (lesson.type || "exercise") === "exercise").length,
  });
  lessons.forEach((lesson, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.lessonType = lesson.type || "exercise";
    button.className = `lesson-item${index === lessonIndex ? " active" : ""}${completedLessons.has(index) ? " complete" : ""}`;
    button.setAttribute("aria-current", index === lessonIndex ? "step" : "false");
    const number = document.createElement("span");
    number.className = "lesson-number";
    number.textContent = completedLessons.has(index) ? "✓" : String(index + 1).padStart(2, "0");
    const name = document.createElement("span");
    name.className = "lesson-name";
    name.textContent = lesson.content[language].title;
    button.append(number, name);
    button.addEventListener("click", () => loadLesson(index));
    lessonList.append(button);
  });
  const content = lessons[lessonIndex].content[language];
  $("#lesson-category").textContent = content.category;
  $("#lesson-counter").textContent = `${String(lessonIndex + 1).padStart(2, "0")} / ${String(lessons.length).padStart(2, "0")}`;
  $("#lesson-title").textContent = content.title;
  $("#lesson-description").textContent = content.description;
  renderGoal($("#lesson-goal"), content.goal);
  $("#lesson-hint").textContent = content.hint;
  $("#prev-lesson").disabled = lessonIndex === 0;
  const lesson = lessons[lessonIndex];
  const isLast = lessonIndex === lessons.length - 1;
  const lessonType = lesson.type || "exercise";
  $("#next-label").textContent = isLast ? t("finish") : t("next");
  $("#next-lesson").disabled = lessonType === "exercise"
    ? !state?.meta?.verification?.verified
    : isLast && completedLessons.has(lessonIndex);
  $("#verify-button").textContent = lessonType !== "exercise" || state?.meta?.verification?.verified
    ? t("checkNext")
    : t("checkTask");
}

// Progress saving/loading functions
function getProgressKey() {
  return progressStorageKey;
}

function saveProgress() {
  const progress = {
    lessonIndex,
    completedLessons: Array.from(completedLessons),
    commandHistory,
    commandHistoryIndex,
    sessionId,
    timestamp: Date.now(),
  };
  localStorage.setItem(getProgressKey(), JSON.stringify(progress));
}

function loadProgress() {
  const key = getProgressKey();
  const stored = localStorage.getItem(key);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse progress:", e);
    return null;
  }
}

function clearProgress() {
  const key = getProgressKey();
  localStorage.removeItem(key);
}

function applyProgress(progress) {
  if (!progress) return false;
  commandHistory = progress.commandHistory || [];
  commandHistoryIndex = progress.commandHistoryIndex ?? commandHistory.length;
  return true;
}

function showProgressDialog() {
  renderProgressDialog();
  $("#progress-dialog").showModal();
}

function hideProgressDialog() {
  $("#progress-dialog").close();
}

function renderProgressDialog() {
  const content = $("#progress-content");
  const progress = loadProgress();

  if (!progress) {
    content.innerHTML = `<p style="color: var(--muted); text-align: center; padding: 40px;">${t("progressNoData")}</p>`;
    return;
  }

  const completedCount = progress.completedLessons?.length || 0;
  const currentLessonNum = (progress.lessonIndex || 0) + 1;
  const totalLessons = lessons.length;

  let html = `
    <div class="progress-summary">
      <div class="progress-stats">
        <div><span style="color: var(--accent); font-weight: 700;">${completedCount}</span> / ${totalLessons} ${t("progressCompleted")}</div>
        <div>${t("progressCurrent")}: <strong>${currentLessonNum}</strong></div>
      </div>
    </div>
    <div class="progress-lessons">
  `;

  lessons.forEach((lesson, index) => {
    const isComplete = progress.completedLessons?.includes(index) || false;
    const isCurrent = index === progress.lessonIndex;
    const lessonTitle = lesson.content[language]?.title || lesson.content.hu?.title || "Ismeretlen";
    const number = isComplete ? "✓" : String(index + 1).padStart(2, "0");
    const classes = `progress-lesson${isComplete ? " complete" : ""}${isCurrent ? " current" : ""}`;
    html += `
      <div class="${classes}">
        <div class="progress-lesson-number">${number}</div>
        <div class="progress-lesson-name">${lessonTitle}</div>
      </div>
    `;
  });

  html += `</div>`;
  content.innerHTML = html;
}

function checkLesson() {
  if ((lessons[lessonIndex].type || "exercise") !== "exercise") return;
  const verification = state?.meta?.verification;
  if (!verification?.verified) {
    completedLessons.delete(lessonIndex);
    renderLessons();
    return;
  }
  completedLessons.add(lessonIndex);
  renderLessons();
  saveProgress();
  if (!$("#next-lesson").dataset.announced) {
    addOutput(t(lessonIndex === lessons.length - 1 ? "allCompleted" : "completed"), "success");
    $("#next-lesson").dataset.announced = "true";
  }
}

function showImportStatus(message, isError = false) {
  const status = $("#import-status");
  $("#import-message").textContent = message;
  status.classList.add("visible");
  status.classList.toggle("error", isError);
  $("#clear-imported").hidden = importedSources.length === 0;
  $("#clear-imported").textContent = t("clearImported");
}

function importSources(sources) {
  const existingIds = new Set(lessons.map((lesson) => lesson.id));
  const normalized = validateImportedFile({ lessons: sources }, existingIds, language);
  const nextSources = [...importedSources, ...sources];
  localStorage.setItem(importedStorageKey, JSON.stringify(nextSources));
  importedSources = nextSources;
  lessons.push(...normalized);
  renderLessons();
  showImportStatus(t("importSuccess", { count: normalized.length }));
}

function adoptImportedSources(sources) {
  try {
    const normalized = validateImportedFile({ lessons: sources }, new Set(lessons.map((lesson) => lesson.id)), language);
    importedSources = sources;
    localStorage.setItem(importedStorageKey, JSON.stringify(sources));
    lessons.push(...normalized);
    renderLessons();
  } catch (error) {
    showImportStatus(t("importError", { message: error.message }), true);
  }
}

function rebuildImportedLessons() {
  if (!importedSources.length) return;
  lessons.splice(builtInLessonCount);
  try {
    lessons.push(...validateImportedFile(
      { lessons: importedSources },
      new Set(lessons.map((lesson) => lesson.id)),
      language,
    ));
  } catch (error) {
    showImportStatus(t("importError", { message: error.message }), true);
  }
}

function restoreImportedLessons() {
  try {
    const stored = localStorage.getItem(importedStorageKey);
    if (!stored) return;
    const sources = JSON.parse(stored);
    const normalized = validateImportedFile({ lessons: sources }, new Set(lessons.map((lesson) => lesson.id)), language);
    importedSources = sources;
    lessons.push(...normalized);
    showImportStatus(t("importLoaded", { count: normalized.length }));
  } catch (error) {
    showImportStatus(t("importError", { message: error.message }), true);
  }
}

function clearImportedLessons() {
  try {
    localStorage.removeItem(importedStorageKey);
    importedSources = [];
    lessons.splice(builtInLessonCount);
    for (const index of completedLessons) {
      if (index >= builtInLessonCount) completedLessons.delete(index);
    }
    if (lessonIndex >= builtInLessonCount) loadLesson(builtInLessonCount - 1);
    else renderLessons();
    showImportStatus(t("clearSuccess"));
  } catch (error) {
    showImportStatus(t("importError", { message: error.message }), true);
  }
}

async function handleImportFile(file) {
  if (!file) return;
  try {
    if (file.size > 1_000_000) throw new Error("Exercise files must be smaller than 1 MB.");
    const text = await file.text();
    const isJson = /\.json$/i.test(file.name);
    const data = isJson ? JSON.parse(text) : parseYaml(text);
    if (!data || !Array.isArray(data.lessons)) throw new Error('The input file must contain a "lessons" array.');
    if (importedSources.length + data.lessons?.length > 200) {
      throw new Error("A maximum of 200 imported lessons is supported.");
    }
    importSources(data.lessons);
  } catch (error) {
    showImportStatus(t("importError", { message: error.message }), true);
  } finally {
    $("#import-file").value = "";
  }
}

function applyLanguage() {
  const text = ui[language];
  $("#version-badge").textContent = `v${appVersion}`;
  $("#footer-version").textContent = `v${appVersion}`;
  document.documentElement.lang = language;
  document.title = text.title;
  $("#brand-link").setAttribute("aria-label", text.brand);
  $("#brand-name").textContent = text.brandName;
  $("#offline-note").textContent = text.offline;
  $("#import-button").textContent = text.import;
  $("#import-button").setAttribute("aria-label", text.importAria);
  $("#import-button").title = text.importTitle;
  $("#language-button").textContent = text.language;
  $("#language-button").setAttribute("aria-label", text.languageAria);
  $("#reset-button").textContent = text.reset;
  $("#reset-button").title = text.resetTitle;
  $("#path-label").textContent = text.path;
  $("#lesson-list").setAttribute("aria-label", text.lessons);
  $("#sidebar-tip").textContent = text.tip;
  $("#sidebar-footer").textContent = text.footer;
  $("#goal-label").textContent = text.goal;
  $("#concept-label").textContent = text.concept;
  $("#prev-label").textContent = text.previous;
  $("#next-label").textContent = text.next;
  $("#playground").setAttribute("aria-label", text.playground);
  $("#graph-title").textContent = text.graph;
  $("#graph-legend").textContent = text.graphLegend;
  $("#graph").setAttribute("aria-label", text.graphAria);
  $("#terminal-title").textContent = text.terminal;
  $("#docker-playground-button").textContent = text.dockerPlayground;
  $("#docker-dialog-title").textContent = text.dockerTitle;
  $("#docker-dialog-kicker").textContent = text.dockerKicker;
  $("#docker-dialog-intro").textContent = text.dockerIntro;
  $("#docker-step-one").textContent = text.dockerStepOne;
  $("#docker-step-two").textContent = text.dockerStepTwo;
  $("#docker-step-three").textContent = text.dockerStepThree;
  $("#docker-example-title").textContent = text.dockerExample;
  $("#docker-reset-copy").textContent = text.dockerReset;
  $("#docker-dialog-done").textContent = text.dockerClose;
  $("#docker-dialog-close").setAttribute("aria-label", text.dockerCloseAria);
  $("#help-button").textContent = text.help;
  $("#hint-button").textContent = text.hintButton;
  $("#progress-button").textContent = text.progressButton;
  $("#terminal-output").setAttribute("aria-label", text.terminalAria);
  $("#command-input").setAttribute("aria-label", text.commandAria);
  $("#command-input").placeholder = text.placeholder;
  $("#run-command").setAttribute("aria-label", text.runAria);
  $("#terminal-hint").textContent = text.pressEnter;
  $("#run-hint").textContent = text.runHint;
  $("#history-hint").textContent = text.historyHint;
  $("#completion-hint").textContent = text.completionHint;
  $("#clear-imported").textContent = text.clearImported;
  if (state) render();
  setWelcome();
}

async function loadLesson(index, options = {}) {
  if (!sessionId) return;
  lessonIndex = index;
  hintStep = 0;
  $("#next-lesson").dataset.announced = "";
  const input = $("#command-input");
  input.disabled = true;
  $("#verify-button").disabled = true;
  $("#hint-button").disabled = true;
  try {
    const result = await api("/api/lesson", {
      sessionId,
      lessonIndex: index,
      lessonId: lessons[index].id,
      language,
      sources: importedSources,
      clearProgress: Boolean(options.clearProgress),
    });
    applyServerState(result.state);
    setWelcome();
    render();
    checkLesson();
    saveProgress();
  } catch (error) {
    addOutput(t("serverError"), "error");
  } finally {
    input.disabled = false;
    $("#verify-button").disabled = false;
    $("#hint-button").disabled = false;
    input.focus();
  }
}

async function init() {
  const saved = loadProgress();
  applyProgress(saved);
  const input = $("#command-input");
  input.disabled = true;
  try {
    const session = await api("/api/session", {
      sessionId: saved?.sessionId || null,
      lessonIndexHint: saved?.lessonIndex ?? 0,
      language,
      sources: importedSources,
    });
    sessionId = session.sessionId;
    if (Array.isArray(session.importedSources) && session.importedSources.length && !importedSources.length) {
      adoptImportedSources(session.importedSources);
    }
    const serverIndex = lessons.findIndex((lesson) => lesson.id === session.lessonId);
    if (serverIndex !== -1) lessonIndex = serverIndex;
    completedLessons.clear();
    applyServerState(session.state);
    (saved?.completedLessons || []).forEach((index) => {
      const lesson = lessons[index];
      if (lesson && (lesson.type || "exercise") !== "exercise") completedLessons.add(index);
    });
    setWelcome();
    if (saved?.sessionId) {
      addOutput(`${t("progressCurrent")}: ${lessons[lessonIndex].content[language].title}`);
    }
    render();
    saveProgress();
    input.disabled = false;
    $("#verify-button").disabled = false;
    $("#hint-button").disabled = false;
    input.focus();
  } catch (error) {
    addOutput(t("serverError"), "error");
  }
}

restoreImportedLessons();

$("#command-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = $("#command-input");
  const command = input.value.trim();
  if (!command) return;
  commandHistory.push(command);
  commandHistoryIndex = commandHistory.length;
  input.value = "";
  runCommand(command);
});

$("#command-input").addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    completeCommand(event.currentTarget);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    lastTabCompletion = null;
    commandHistoryIndex = Math.max(0, commandHistoryIndex - 1);
    event.currentTarget.value = commandHistory[commandHistoryIndex] || "";
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    lastTabCompletion = null;
    commandHistoryIndex = Math.min(commandHistory.length, commandHistoryIndex + 1);
    event.currentTarget.value = commandHistory[commandHistoryIndex] || "";
  }
});

$("#command-input").addEventListener("input", () => {
  lastTabCompletion = null;
});

$("#reset-button").addEventListener("click", () => loadLesson(lessonIndex));
$("#import-button").addEventListener("click", () => $("#import-file").click());
$("#clear-imported").addEventListener("click", clearImportedLessons);
$("#import-file").addEventListener("change", (event) => {
  handleImportFile(event.currentTarget.files[0]);
});
$("#language-button").addEventListener("click", () => {
  language = language === "hu" ? "en" : "hu";
  rebuildImportedLessons();
  applyLanguage();
});
$("#prev-lesson").addEventListener("click", () => {
  if (lessonIndex > 0) loadLesson(lessonIndex - 1);
});
function advanceLesson() {
  const lesson = lessons[lessonIndex];
  if ((lesson.type || "exercise") === "exercise" && !state?.meta?.verification?.verified) return;
  completedLessons.add(lessonIndex);
  if (lessonIndex < lessons.length - 1) {
    loadLesson(lessonIndex + 1);
  } else {
    $("#next-lesson").disabled = true;
    addOutput(t("courseComplete"), "success");
    renderLessons();
    saveProgress();
  }
}

$("#next-lesson").addEventListener("click", () => {
  advanceLesson();
});

$("#verify-button").addEventListener("click", async () => {
  if (!sessionId || commandBusy) return;
  const lesson = lessons[lessonIndex];
  const isExercise = (lesson.type || "exercise") === "exercise";
  if (!isExercise || state?.meta?.verification?.verified) {
    advanceLesson();
    return;
  }
  commandBusy = true;
  const input = $("#command-input");
  input.disabled = true;
  $("#verify-button").disabled = true;
  try {
    const result = await api("/api/verify", { sessionId, language });
    applyServerState(result.state);
    render();
    const verification = result.verification;
    if (verification.verified) {
      addOutput(t("verifyPass", { count: verification.realGitCommands }), "success");
      checkLesson();
    } else if (verification.checkPassed) {
      addOutput(t("verifyFailCommands"), "error");
    } else {
      addOutput(t("verifyFailState"), "error");
    }
    saveProgress();
  } catch (error) {
    addOutput(t("serverError"), "error");
  } finally {
    commandBusy = false;
    input.disabled = false;
    renderLessons();
    $("#verify-button").disabled = false;
    $("#hint-button").disabled = false;
    input.focus();
  }
});

$("#hint-button").addEventListener("click", () => {
  if (!sessionId) return;
  const lesson = lessons[lessonIndex];
  hintStep += 1;
  if (hintStep === 1) {
    addOutput(`${t("goal")}: ${stripLessonMarkup(lesson.content[language].goal)}`);
  } else if (hintStep === 2) {
    addOutput(`${t("concept")}: ${stripLessonMarkup(lesson.content[language].hint)}`);
  } else if (lesson.solution && lesson.solution.length) {
    addOutput(t("hintSolution"), "success");
    for (const command of lesson.solution) addOutput(command, "command");
  } else {
    hintStep = 2;
    addOutput(t("hintNoMore"));
  }
});
$("#help-button").addEventListener("click", () => {
  addOutput(t("helpFirst"));
  addOutput(t("helpSecond"));
});
$("#docker-playground-button").addEventListener("click", () => {
  $("#docker-playground-dialog").showModal();
});
$("#docker-dialog-close").addEventListener("click", () => {
  $("#docker-playground-dialog").close();
});
$("#docker-dialog-done").addEventListener("click", () => {
  $("#docker-playground-dialog").close();
});
$("#docker-playground-dialog").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) event.currentTarget.close();
});

// Progress dialog events
$("#progress-button").addEventListener("click", () => {
  showProgressDialog();
});

$("#progress-dialog-close").addEventListener("click", () => {
  hideProgressDialog();
});

$("#progress-close").addEventListener("click", () => {
  hideProgressDialog();
});

$("#progress-dialog").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) hideProgressDialog();
});

$("#progress-reset").addEventListener("click", () => {
  if (confirm(t("progressResetConfirm"))) {
    clearProgress();
    completedLessons.clear();
    commandHistory = [];
    commandHistoryIndex = 0;
    hideProgressDialog();
    loadLesson(0, { clearProgress: true });
  }
});

applyLanguage();
init();
