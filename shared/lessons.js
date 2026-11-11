/*
 * Shared lesson definitions, exercise builders and import validators for
 * Git Workshop. Loaded unchanged by the browser (window.GitLessons) and by
 * the Node backend so both sides use the same exercise checks.
 */
(function (globalScope) {
  "use strict";

  function findCommit(state, id) {
    return state.commits.find((commit) => commit.id === id);
  }

  function isAncestor(state, ancestorId, commitId) {
    if (ancestorId === commitId) return true;
    const stack = [commitId];
    const visited = new Set();
    while (stack.length) {
      const current = stack.pop();
      if (visited.has(current)) continue;
      visited.add(current);
      const commit = findCommit(state, current);
      if (!commit) continue;
      if (commit.parents.includes(ancestorId)) return true;
      stack.push(...commit.parents);
    }
    return false;
  }

  function createLessons() {
const lessons = [
  {
    type: "reading",
    content: {
      hu: {
        title: "Git, commitok és munkaterületek", category: "ALAPOK · 01",
        description: "A Git egy elosztott verziókezelő rendszer: követi a változásokat, segít korábbi állapotot visszaállítani, és lehetővé teszi a párhuzamos fejlesztést. Megoldja a „melyik a legfrissebb fájl?” problémát; a teljes helyi előzmény miatt sok művelet internet nélkül is működik.\n\nHárom munkaterületet különböztess meg:\n• Working directory: a fájlok, amelyeken épp dolgozol.\n• Staging area (index): a következő commitba kiválasztott változtatások (`git add`).\n• Local repository: az elmentett commitok és teljes helyi előzmény.\n\nAz útvonal: szerkesztés → `git add` → `git commit`.",
        goal: "Értsd meg, milyen problémákra ad megoldást a Git, és hogyan kapcsolódik a három munkaterület.",
        hint: "A staging area segítségével fájlonként vagy akár fájlrészletenként válogathatsz. A `git status` megmutatja, mi módosult, mi staged, és mi került már commitba.",
      },
      en: {
        title: "Git, commits, and work areas", category: "THE BASICS · 01",
        description: "Git is a distributed version control system: it tracks changes, helps restore earlier states, and enables parallel development. It solves the “which file is the latest?” problem; the complete local history also makes many operations work offline.\n\nKnow the three work areas:\n• Working directory: files you are editing.\n• Staging area (index): changes selected for the next commit (`git add`).\n• Local repository: saved commits and complete local history.\n\nThe path is edit → `git add` → `git commit`.",
        goal: "Understand what problems Git solves and how its three work areas relate.",
        hint: "The staging area lets you select files—or even parts of files—for a commit. `git status` shows what changed, what is staged, and what is committed.",
      },
    },
    initial: [{ id: "C0", parents: [], message: { hu: "Projekt indul", en: "Project starts" }, lane: 0 }],
    branches: { main: "C0" },
    current: "main",
    check: (s) => s.commits.length >= 3 && s.branches.main !== "C0",
  },
  {
    content: {
      hu: {
        title: "Feature branchek", category: "BRANCHEK · 02",
        description: "A feature branch rövid életű ág egy jól körülhatárolt feladathoz. Elkülöníti a kísérletezést a stabil főágtól, és megkönnyíti a code review-t.\n\nA `git switch -c feature/search` létrehozza az ágat és rögtön át is vált rá. Kétlépéses forma: `git branch feature/search`, majd `git switch feature/search`.",
        goal: "Legyen egy `[[feature]]` ág, amely legalább egy saját commitra mutat.",
        hint: "Az ág létrehozása nem vált át rá. Két külön lépés: `git branch feature`, majd `git switch feature`.",
      },
      en: {
        title: "Feature branches", category: "BRANCHES · 02",
        description: "A feature branch is a short-lived branch for a focused task. It isolates experimentation from the stable main branch and makes code review easier.\n\n`git switch -c feature/search` creates the branch and switches to it. The two-step form is `git branch feature/search`, then `git switch feature/search`.",
        goal: "Create a `[[feature]]` branch with at least one commit of its own.",
        hint: "Creating a branch does not switch to it. These are two separate steps: `git branch feature`, then `git switch feature`.",
      },
    },
    initial: [{ id: "C0", parents: [], message: { hu: "Projekt indul", en: "Project starts" }, lane: 0 }],
    branches: { main: "C0" },
    current: "main",
    pendingChange: true,
    solution: ["git branch feature", "git switch feature", 'git commit -m "Feature work"'],
    check: (s) => Boolean(s.branches.feature && s.branches.feature !== "C0"),
  },
  {
    content: {
      hu: {
        title: "Merge vagy rebase?", category: "TÖRTÉNET · 03",
        description: "Mindkettő integrál változásokat, de más történetet eredményez.\n\n• `git merge feature` megőrzi az ágak elágazását, és szükség esetén merge commitot készít. Jó választás megosztott ágakhoz és auditálható integrációhoz.\n• `git rebase main` új alapra játssza át a saját commitjaidat, így lineárisabb történetet ad. Saját, még nem megosztott feature ágon használható kényelmesen.\n\nNe rebase-eld át mások által használt, megosztott commitok történetét: átírja az azonosítókat.",
        goal: "Egyesítsd a `[[feature]]` ágat a `[[main]]` ágba merge committal.",
        hint: "Válts arra az ágra, amelyikbe be szeretnéd emelni a változásokat, aztán futtasd: `git merge feature`.",
      },
      en: {
        title: "Merge or rebase?", category: "HISTORY · 03",
        description: "Both integrate changes, but produce different histories.\n\n• `git merge feature` preserves the branch structure and creates a merge commit when needed. It is useful for shared branches and auditable integration.\n• `git rebase main` replays your commits onto a new base for a more linear history. It works well on your own, unpublished feature branch.\n\nAvoid rebasing commits that others already use: rewriting history changes their commit IDs.",
        goal: "Merge the `[[feature]]` branch into `[[main]]` with a merge commit.",
        hint: "Switch to the branch that should receive the changes, then run: `git merge feature`.",
      },
    },
    initial: [
      { id: "C0", parents: [], message: { hu: "Projekt indul", en: "Project starts" }, lane: 0 },
      { id: "C1", parents: ["C0"], message: { hu: "Főág változása", en: "Main branch update" }, lane: 0 },
      { id: "C2", parents: ["C0"], message: { hu: "Feature elkészült", en: "Feature complete" }, lane: 1 },
    ],
    branches: { main: "C1", feature: "C2" },
    current: "main",
    solution: ["git switch main", "git merge feature"],
    check: (s) => {
      const head = s.commits.find((c) => c.id === s.branches.main);
      return Boolean(head && head.parents.length === 2);
    },
  },
  {
    content: {
      hu: {
        title: "Rebase alapok", category: "TÖRTÉNET · 04",
        description: "A rebase az ág commitjait egy másik alapra helyezi át. A tartalom megmarad, de az új helyen új commitazonosítók keletkeznek.",
        goal: "Helyezd át a `[[feature]]` ágat a `[[main]]` legfrissebb commitja után.",
        hint: "Válts a `feature` ágra, majd futtasd: `git rebase main`. A main ág nem változik, a feature commitjai új alapot kapnak.",
      },
      en: {
        title: "Rebase fundamentals", category: "HISTORY · 04",
        description: "Rebase moves a branch's commits onto a new base. The changes remain, but Git creates new commit IDs at the new location.",
        goal: "Move the `[[feature]]` branch so it starts after the latest commit on `[[main]]`.",
        hint: "Switch to `feature`, then run `git rebase main`. The main branch stays put while feature's commits get a new base.",
      },
    },
    initial: [
      { id: "C0", parents: [], message: { hu: "Projekt indul", en: "Project starts" }, lane: 0 },
      { id: "C1", parents: ["C0"], message: { hu: "Alapfunkció elkészült", en: "Core feature complete" }, lane: 0 },
      { id: "C2", parents: ["C0"], message: { hu: "Új kereső hozzáadva", en: "Add new search" }, lane: 1 },
    ],
    branches: { main: "C1", feature: "C2" },
    current: "feature",
    solution: ["git switch feature", "git rebase main"],
    check: (s) => {
      const head = s.commits.find((c) => c.id === s.branches.feature);
      return Boolean(head && head.parents.length === 1 && head.parents[0] === s.branches.main);
    },
  },
  {
    type: "reading",
    content: {
      hu: {
        title: "Clone, fetch vagy pull?", category: "TÁVOLI REPOK · 05",
        description: "Mindhárom távoli repositoryval dolgozik, de mást csinál.\n\n• `git clone <url>` letölti a repositoryt, létrehozza a helyi példányt, és beállítja az `origin` távoli nevet.\n• `git fetch origin` letölti az új commitokat és frissíti a remote-tracking ágakat (például `origin/main`), de nem módosítja az aktív ágadat.\n• `git pull` fetch-et végez, majd integrálja a kapott változásokat az aktuális ágba (általában merge-gel, konfigurációtól függően rebase-szel).\n\nÓvatos munkamenet: `git fetch`, áttekintés `git log HEAD..origin/main`, majd tudatos merge vagy rebase.",
        goal: "Különböztesd meg a másolat készítését, a távoli frissítések letöltését és azok integrálását.",
        hint: "A `fetch` után még nem változott meg a working directoryd. A `pull` integrál is — előtte ellenőrizd az aktuális ágat és a beérkező commitokat.",
      },
      en: {
        title: "Clone, fetch, or pull?", category: "REMOTES · 05",
        description: "All three work with a remote repository, but they do different things.\n\n• `git clone <url>` downloads a repository, creates a local copy, and sets up the `origin` remote.\n• `git fetch origin` downloads commits and updates remote-tracking branches (such as `origin/main`) without changing your checked-out branch.\n• `git pull` fetches, then integrates those changes into the current branch (usually by merging, or by rebasing if configured).\n\nA cautious workflow: `git fetch`, inspect with `git log HEAD..origin/main`, then deliberately merge or rebase.",
        goal: "Distinguish creating a copy, downloading remote updates, and integrating them.",
        hint: "`fetch` does not change your working directory. `pull` also integrates changes—check your current branch and incoming commits first.",
      },
    },
  },
  {
    type: "exercise",
    scenario: {
      type: "merge-conflict",
      file: "settings.txt",
      base: "mode=default\n",
      feature: "mode=feature\n",
      main: "mode=stable\n",
      resolution: "mode=stable+feature\n",
    },
    content: {
      hu: {
        title: "Merge conflict feloldása", category: "EGYESÍTÉS · 06",
        description: "Konfliktus akkor keletkezik, ha Git nem tudja automatikusan összeegyeztetni a módosításokat — gyakran két ág ugyanazokat a sorokat írta át.\n\n1. Futtasd a `git status` parancsot, és keresd az unmerged fájlokat.\n2. Nyisd meg az érintett fájlt. A `<<<<<<<`, `=======` és `>>>>>>>` jelölések mutatják a változatokat.\n3. Döntsd el, mi legyen a végleges tartalom; szerkeszd a fájlt, távolítsd el az összes jelölőt.\n4. Futtass teszteket, ellenőrizd a diffet (`git diff`), majd jelöld megoldottnak: `git add <fájl>`.\n5. Merge esetén fejezd be `git commit` paranccsal; rebase esetén `git rebase --continue`. Megszakításhoz: `git merge --abort` vagy `git rebase --abort`.",
        goal: "Oldd fel a settings.txt konfliktust úgy, hogy a végleges érték `[[mode=stable+feature]]` legyen, majd fejezd be a merge-et.",
        hint: "Nézd meg a `git status` kimenetét, írd a megadott végleges értéket a settings.txt fájlba, majd `git add settings.txt` és `git commit`.",
      },
      en: {
        title: "Resolving a merge conflict", category: "INTEGRATION · 06",
        description: "A conflict occurs when Git cannot automatically reconcile changes—often because two branches changed the same lines.\n\n1. Run `git status` and find the unmerged files.\n2. Open each file. `<<<<<<<`, `=======`, and `>>>>>>>` mark the competing versions.\n3. Decide on the intended result, edit the file, and remove every conflict marker.\n4. Run tests, review the diff with `git diff`, then mark it resolved: `git add <file>`.\n5. For a merge, finish with `git commit`; for a rebase, run `git rebase --continue`. Abort with `git merge --abort` or `git rebase --abort`.",
        goal: "Resolve the conflict in settings.txt to `[[mode=stable+feature]]`, then complete the merge.",
        hint: "Inspect `git status`, write the intended value to settings.txt, then run `git add settings.txt` and `git commit`.",
      },
    },
    initial: [{ id: "C0", parents: [], message: { hu: "Projekt indul", en: "Project starts" }, lane: 0 }],
    branches: { main: "C0" },
    current: "main",
    solution: [
      'printf "mode=stable+feature\\n" > settings.txt',
      "git add settings.txt",
      'git commit -m "Resolve merge conflict"',
    ],
    check: (state) => {
      const head = findCommit(state, state.branches.main);
      return Boolean(head
        && head.parents.length === 2
        && state.unmergedPaths.length === 0
        && state.dirtyPaths.length === 0
        && state.files?.["settings.txt"] === "mode=stable+feature\n");
    },
  },
  {
    type: "exercise",
    scenario: {
      type: "restore-file",
      file: "README.md",
      dirtyContent: "Unsaved local draft\n",
      expectedContent: "Project starts\n",
    },
    content: {
      hu: {
        title: "Reset, revert és restore", category: "VISSZAVONÁS · 07",
        description: "Három hasonló nevű parancs, különböző hatókörrel.\n\n• `git restore <fájl>` visszaállít egy fájlt a working directoryban; `git restore --staged <fájl>` kiveszi a staging area-ból. A nem mentett tartalom elveszhet.\n• `git reset` egy korábbi commitra mozgatja az ágat/HEAD-et, és opcionálisan módosítja a staging area-t vagy a working directoryt (`--soft`, `--mixed`, `--hard`). A `--hard` helyi munkát törölhet.\n• `git revert <commit>` új commitot készít, amely visszafordít egy korábbi commitot. Megosztott történetnél ez általában biztonságosabb.\n\nMegosztott ágon részesítsd előnyben a `revert`-et. A reset előtt ellenőrizd a célt és legyen mentésed.",
        goal: "Állítsd vissza a módosított README.md fájlt az utolsó commitban mentett állapotára.",
        hint: "Ellenőrizd a módosítást `git diff` paranccsal, majd futtasd: `git restore README.md`. A `restore` fájlokra hat; a `reset` és `revert` más célra való.",
      },
      en: {
        title: "Reset, revert, and restore", category: "UNDOING · 07",
        description: "Three similarly named commands with different scopes.\n\n• `git restore <file>` restores files in the working directory; `git restore --staged <file>` removes them from the staging area. Uncommitted content can be lost.\n• `git reset` moves the branch/HEAD to an earlier commit and optionally changes the staging area or working directory (`--soft`, `--mixed`, `--hard`). `--hard` can destroy local work.\n• `git revert <commit>` creates a new commit that reverses an earlier commit's changes. This is generally safer for shared history.\n\nPrefer `revert` on shared branches. Check the target and make a backup before resetting.",
        goal: "Restore the modified README.md file to the version in the latest commit.",
        hint: "Inspect the change with `git diff`, then run `git restore README.md`. `restore` acts on files; `reset` and `revert` serve different purposes.",
      },
    },
    initial: [{ id: "C0", parents: [], message: { hu: "Projekt indul", en: "Project starts" }, lane: 0 }],
    branches: { main: "C0" },
    current: "main",
    solution: ["git restore README.md"],
    check: (state) => state.files?.["README.md"] === (
      state.meta.language === "hu" ? "Projekt indul\n" : "Project starts\n"
    )
      && !state.dirtyPaths.includes("README.md")
      && !state.stagedPaths.includes("README.md"),
  },
  {
    type: "exercise",
    content: {
      hu: {
        title: "Cherry-pick", category: "CÉLZOTT ÁTVÉTEL · 08",
        description: "A `git cherry-pick <commit>` egy kiválasztott commit változtatását új commitként alkalmazza az aktuális ágon. Hasznos például sürgős javítás átvitelére, ha nem akarod az egész feature ágat merge-elni.\n\nA célágon állj, majd add meg az átvenni kívánt commit azonosítóját. Az új commit más azonosítót kap, mert a szülője az aktuális HEAD lesz. Konfliktus esetén oldd fel, stage-eld a fájlokat, majd `git cherry-pick --continue`; megszakításhoz `git cherry-pick --abort`.",
        goal: "Vedd át a `[[C2]]` javító commitot a `[[main]]` ágra `git cherry-pick [[C2]]` paranccsal.",
        hint: "Cherry-pick előtt válts a célágra (`main`). Ez egyetlen commitot másol át; nem mozgatja a forráságat, és nem helyettesíti a rendszeres merge-et.",
      },
      en: {
        title: "Cherry-pick", category: "TARGETED INTEGRATION · 08",
        description: "`git cherry-pick <commit>` applies one selected commit as a new commit on your current branch. It is useful for bringing in a targeted fix without merging an entire feature branch.\n\nCheck out the destination branch, then provide the commit ID. The new commit gets a different ID because its parent is the current HEAD. If there is a conflict, resolve and stage the files, then run `git cherry-pick --continue`; abort with `git cherry-pick --abort`.",
        goal: "Bring the `[[C2]]` fix onto `[[main]]` with `git cherry-pick [[C2]]`.",
        hint: "Switch to the destination (`main`) first. Cherry-pick copies one commit's changes; it does not move the source branch and is not a substitute for regular merges.",
      },
    },
    initial: [
      { id: "C0", parents: [], message: { hu: "Projekt indul", en: "Project starts" }, lane: 0 },
      { id: "C1", parents: ["C0"], message: { hu: "Főág frissítve", en: "Update main" }, lane: 0 },
      { id: "C2", parents: ["C0"], message: { hu: "Sürgős javítás", en: "Critical fix" }, lane: 1 },
    ],
    branches: { main: "C1", fix: "C2" },
    current: "main",
    solution: ["git switch main", "git cherry-pick C2"],
    check: (s) => {
      const head = s.commits.find((commit) => commit.id === s.branches.main);
      const fix = s.commits.find((commit) => commit.id === "C2");
      return Boolean(head && fix && head.parents.length === 1 && head.parents[0] === "C1" && head.message === fix.message);
    },
  },
  {
    type: "reading",
    content: {
      hu: {
        title: "Együttműködés csapatként", category: "CSAPATMUNKA · 09",
        description: "Megbízható közös munkamenet:\n\n1. `git clone` egyszer, majd a munka kezdetén `git fetch` és frissítés a `main` ágról.\n2. Rövid, egy feladatra fókuszáló `feature/<ticket>-<név>` ágon dolgozz.\n3. Készíts kis, érthető commitokat; pushold az ágat a távoli repositoryba.\n4. Nyiss pull/merge requestet. Kérj review-t, és várd meg a CI tesztek, lint és biztonsági ellenőrzések sikerét.\n5. Válaszolj a review-ra, tartsd naprakészen az ágat, majd merge-öld a csapat szabályai szerint. Töröld a kész feature ágat.\n\nA csapat egyezzen meg a merge/rebase szabályokról és a review követelményeiről.",
        goal: "Írd le a clone → feature branch → commit/push → review/CI → merge folyamatot.",
        hint: "Oszd kicsire a változtatásokat, gyakran integrálj, kommunikálj korán, és kezeld a pull requestet együttműködési felületként.",
      },
      en: {
        title: "Collaborating as a team", category: "TEAMWORK · 09",
        description: "A dependable collaboration workflow:\n\n1. `git clone` once; at the start of a work session, `git fetch` and update from `main`.\n2. Work on a short-lived, focused `feature/<ticket>-<name>` branch.\n3. Make small, clear commits and push the branch to the remote repository.\n4. Open a pull/merge request. Request review and wait for CI tests, lint, and security checks to pass.\n5. Respond to feedback, keep the branch current, then merge according to team policy. Delete the completed feature branch.\n\nAgree as a team on merge/rebase conventions and review requirements.",
        goal: "Describe the clone → feature branch → commit/push → review/CI → merge workflow.",
        hint: "Keep changes small, integrate often, communicate early, and treat a pull request as a collaboration space.",
      },
    },
  },
  {
    type: "reading",
    content: {
      hu: {
        title: "Titok került a repositoryba", category: "BIZTONSÁG · 10",
        description: "Ha jelszó, API-kulcs vagy token került be, kezeld incidensként:\n\n1. Azonnal vond vissza/forgasd le a titkot a kibocsátó rendszerben. A repositoryból való törlés önmagában nem teszi használhatatlanná.\n2. Értesítsd a biztonsági vagy üzemeltetési csapatot; ellenőrizzétek a hozzáférési naplókat és az esetleges visszaélést.\n3. Tüntesd el a titkot a jelenlegi fájlból, használj secret managert vagy környezeti változót.\n4. Szükség esetén tisztítsd ki az előzményt jóváhagyott eszközzel, például `git filter-repo`. Ez átírja az előzményeket: egyeztess minden kollaborátorral, készíts mentést, és koordináld a push/új klónozás lépéseit.\n5. Adj hozzá secret scanninget és megelőző ellenőrzést CI-hez.\n\nNe másold be a titkot hibajegybe, chatbe vagy új commitba.",
        goal: "Először a hitelesítő adatot érvénytelenítsd; az előzménytisztítás csak ezutáni, koordinált lépés.",
        hint: "Az előzményből törlés nem helyettesíti a kulcs visszavonását. Kövesd a szervezet incidenskezelési folyamatát.",
      },
      en: {
        title: "A secret entered the repository", category: "SECURITY · 10",
        description: "If a password, API key, or token was committed, treat it as an incident:\n\n1. Revoke/rotate the credential immediately at its issuing service. Deleting it from the repository does not invalidate it.\n2. Notify your security or operations team; review access logs and check for misuse.\n3. Remove it from current files and use a secret manager or environment variable.\n4. If needed, clean history with an approved tool such as `git filter-repo`. This rewrites history: coordinate with all collaborators, make backups, and plan the push/re-clone steps.\n5. Add secret scanning and preventive checks to CI.\n\nNever paste the secret into an issue, chat, or another commit.",
        goal: "Invalidate the credential first; history cleanup comes later as a coordinated step.",
        hint: "Removing a secret from history does not replace revoking the key. Follow your organization's incident response process.",
      },
    },
  },
  {
    type: "reading",
    content: {
      hu: {
        title: "Branching stratégia folyamatos telepítéshez", category: "CSAPATSTRATÉGIA · 11",
        description: "Több csapat folyamatos telepítéséhez jó kiindulópont a trunk-based fejlesztés: védett `main`, rövid életű feature ágak, gyors PR review és gyakori integráció.\n\n• A `main` mindig telepíthető állapotú; legyen kötelező CI, review és branch protection.\n• Feature flaggel fokozatosan aktiválható egy funkció külön kódtelepítés nélkül.\n• CODEOWNERS és tulajdonosi szabályok segítik a csapatok közti review-t; a közös komponensek változásait korán integráljátok.\n• Legyen automatizált, kis kockázatú release/rollback, megfigyelhetőség és adatbázis-változtatási terv.\n• Hosszú release ág csak indokolt támogatási vagy auditkövetelmény esetén; egyébként drága eltérést okoz.\n\nA stratégia függ a termék, szabályozás és telepítési környezet igényeitől. Mérjétek a lead time-ot, hibaarányt és helyreállítási időt, majd finomítsatok.",
        goal: "Tervezd meg, ki védheti/merge-elheti a main ágat, milyen CI kell, és hogyan kapcsoltok ki egy hibás feature-t.",
        hint: "Gyakori integrációval csökken a merge-költség. A feature flag nem helyettesíti a tesztet vagy a hozzáférés-ellenőrzést.",
      },
      en: {
        title: "Branching for continuous delivery", category: "TEAM STRATEGY · 11",
        description: "A strong starting point for multiple teams shipping continuously is trunk-based development: protected `main`, short-lived feature branches, fast PR reviews, and frequent integration.\n\n• Keep `main` deployable; require CI, review, and branch protection.\n• Use feature flags to release functionality gradually without a separate code deployment.\n• Ownership rules and CODEOWNERS support cross-team review; integrate shared-component changes early.\n• Provide automated, low-risk releases/rollbacks, observability, and a database-change plan.\n• Keep long-lived release branches only when support or audit requirements justify them; otherwise they create costly divergence.\n\nThe right strategy depends on product, regulatory, and deployment needs. Measure lead time, failure rate, and recovery time, then adapt.",
        goal: "Design who can protect/merge `main`, which CI checks are required, and how to disable a faulty feature.",
        hint: "Frequent integration into one healthy trunk reduces merge cost across teams. Feature flags do not replace testing or access control.",
      },
    },
  },
];

function practiceLesson({ title, description, goal, hint, category, initial, branches, current, check, pendingChange, solution }) {
  return {
    type: "exercise",
    content: {
      hu: { title: title.hu, category: category.hu, description: description.hu, goal: goal.hu, hint: hint.hu },
      en: { title: title.en, category: category.en, description: description.en, goal: goal.en, hint: hint.en },
    },
    initial,
    branches,
    current,
    check,
    pendingChange: Boolean(pendingChange),
    ...(solution ? { solution } : {}),
  };
}

function practiceCommit(title, enTitle, message, enMessage, minimum) {
  const solution = [];
  if (minimum <= 1) {
    solution.push(`git commit -m "${enMessage}"`);
  } else {
    solution.push('git commit -m "First step"');
    for (let index = 1; index < minimum - 1; index += 1) {
      solution.push('echo "another change" >> README.md', 'git add README.md', 'git commit -m "Another step"');
    }
    solution.push('echo "final change" >> README.md', 'git add README.md', `git commit -m "${enMessage}"`);
  }
  return practiceLesson({
    title: { hu: title, en: enTitle },
    category: { hu: "COMMIT · GYAKORLAT", en: "COMMITS · PRACTICE" },
    description: {
      hu: `Gyakorold a commitok létrehozását és a történet olvasását. Készíts rövid, önálló lépéseket a main ágon, majd nézd meg a gráfon a sorrendjüket.`,
      en: "Practice creating commits and reading history. Make small, focused steps on main, then inspect their order in the graph.",
    },
    goal: {
      hu: `Készíts legalább ${minimum} új commitot a main ágon; az egyik üzenet legyen: „[[${message}]]”.`,
      en: `Create at least ${minimum} new commits on main; use this message for one: "[[${enMessage}]]".`,
    },
    hint: {
      hu: `Használd a git commit -m "${message}" parancsot. A gráfon minden új commit külön csomópont.`,
      en: `Use git commit -m "${enMessage}". Each new commit appears as a separate node in the graph.`,
    },
    initial: [{ id: "C0", parents: [], message: { hu: "Projekt indul", en: "Project starts" }, lane: 0 }],
    branches: { main: "C0" },
    current: "main",
    pendingChange: true,
    check: (s) => s.commits.length >= minimum + 1 && s.commits.some((c) => c.message === message || c.message === enMessage),
    solution,
  });
}

function practiceBranch(title, enTitle, branch, enBranch) {
  const solution = [`git branch ${branch}`, `git switch ${branch}`, 'git commit -m "Branch work"'];
  return practiceLesson({
    title: { hu: title, en: enTitle },
    category: { hu: "FEATURE BRANCH · GYAKORLAT", en: "FEATURE BRANCH · PRACTICE" },
    description: {
      hu: `Indíts külön fejlesztési ágat a \`${branch}\` néven. Válts át rá, és készíts rajta saját commitot; a main ág maradjon érintetlen.`,
      en: `Create an isolated development branch named \`${enBranch}\`. Switch to it and make a commit there; leave main untouched.`,
    },
    goal: { hu: `Legyen egy \`[[${branch}]]\` ág, amely a main ágtól eltérő commitra mutat.`, en: `Create a \`[[${enBranch}]]\` branch that points to a commit different from main.` },
    hint: { hu: `Két parancs: git branch ${branch}, majd git switch ${branch}. Az ág létrehozása nem jelent automatikus átváltást.`, en: `Two commands: git branch ${enBranch}, then git switch ${enBranch}. Creating a branch does not switch to it.` },
    initial: [{ id: "C0", parents: [], message: { hu: "Kiinduló állapot", en: "Starting point" }, lane: 0 }],
    branches: { main: "C0" },
    current: "main",
    pendingChange: true,
    check: (s) => Boolean(s.branches[branch]
      && s.branches[branch] !== "C0"
      && s.branches[branch] !== s.branches.main
      && isAncestor(s, "C0", s.branches[branch])),
    solution,
  });
}

function practiceMerge(title, enTitle, change, enChange) {
  const solution = ["git switch main", "git merge feature"];
  return practiceLesson({
    title: { hu: title, en: enTitle },
    category: { hu: "MERGE · GYAKORLAT", en: "MERGE · PRACTICE" },
    description: {
      hu: `A main és a feature ág egymástól függetlenül fejlődött. Őrizd meg mindkét commitot, és egyesítsd a feature ágat a mainbe.`,
      en: "Main and feature have progressed independently. Preserve both commits and merge feature into main.",
    },
    goal: { hu: `Egyesítsd a feature ágat a mainbe; a merge commit üzenete említse: „[[${change}]]”.`, en: `Merge feature into main; include "[[${enChange}]]" in the merge commit message.` },
    hint: { hu: "Állj a main ágra, majd futtasd: git merge feature. Az eredmény két szülővel rendelkező commit.", en: "Check out main, then run: git merge feature. The result is a commit with two parents." },
    initial: [
      { id: "C0", parents: [], message: { hu: "Projekt indul", en: "Project starts" }, lane: 0 },
      { id: "C1", parents: ["C0"], message: { hu: "Főág változása", en: "Main branch update" }, lane: 0 },
      { id: "C2", parents: ["C0"], message: { hu: change, en: enChange }, lane: 1 },
    ],
    branches: { main: "C1", feature: "C2" },
    current: "main",
    check: (s) => {
      const head = s.commits.find((c) => c.id === s.branches.main);
      return Boolean(head && head.parents.length === 2);
    },
    solution,
  });
}

function practiceRebase(title, enTitle, change, enChange) {
  const solution = ["git switch feature", "git rebase main"];
  return practiceLesson({
    title: { hu: title, en: enTitle },
    category: { hu: "REBASE · GYAKORLAT", en: "REBASE · PRACTICE" },
    description: {
      hu: "A main ág azóta előrelépett. Játszd át a feature saját commitját a main aktuális csúcsa után, és figyeld meg a commit gráfon az új történetet.",
      en: "Main has moved ahead. Replay the feature commit on top of the latest main commit and inspect the rewritten history in the graph.",
    },
    goal: { hu: "Rebase-eld a `[[feature]]` ágat a `[[main]]` ágra.", en: "Rebase `[[feature]]` onto `[[main]]`." },
    hint: { hu: "A feature ágon állva futtasd: git rebase main. Ez a még nem megosztott feature commit új azonosítóját hozza létre.", en: "On feature, run: git rebase main. This creates a new ID for the unpublished feature commit." },
    initial: [
      { id: "C0", parents: [], message: { hu: "Közös alap", en: "Common base" }, lane: 0 },
      { id: "C1", parents: ["C0"], message: { hu: "Main frissítése", en: "Main update" }, lane: 0 },
      { id: "C2", parents: ["C0"], message: { hu: change, en: enChange }, lane: 1 },
    ],
    branches: { main: "C1", feature: "C2" },
    current: "feature",
    check: (s) => {
      const head = s.commits.find((c) => c.id === s.branches.feature);
      return Boolean(head && head.parents.length === 1 && head.parents[0] === s.branches.main);
    },
    solution,
  });
}

function practiceCherryPick(title, enTitle, fix, enFix) {
  const solution = ["git switch main", "git cherry-pick C2"];
  return practiceLesson({
    title: { hu: title, en: enTitle },
    category: { hu: "CHERRY-PICK · GYAKORLAT", en: "CHERRY-PICK · PRACTICE" },
    description: {
      hu: "Egy másik ágon elkészült egy önálló javítás. Vedd át kizárólag ezt a commitot a main ágra a teljes ág merge-elése nélkül.",
      en: "A focused fix is ready on another branch. Bring only that commit onto main without merging the entire branch.",
    },
    goal: { hu: `Válts a \`[[main]]\` ágra, és cherry-pickeld a \`[[C2]]\` commitot („[[${fix}]]”).`, en: `Switch to \`[[main]]\` and cherry-pick commit \`[[C2]]\` ("[[${enFix}]]").` },
    hint: { hu: "A célágon állva használd: git cherry-pick C2. Az új commit a main HEAD-et kapja szülőként.", en: "On the destination branch, run: git cherry-pick C2. The new commit has main's HEAD as its parent." },
    initial: [
      { id: "C0", parents: [], message: { hu: "Projekt indul", en: "Project starts" }, lane: 0 },
      { id: "C1", parents: ["C0"], message: { hu: "Main előkészítve", en: "Prepare main" }, lane: 0 },
      { id: "C2", parents: ["C0"], message: { hu: fix, en: enFix }, lane: 1 },
    ],
    branches: { main: "C1", fix: "C2" },
    current: "main",
    check: (s) => {
      const head = s.commits.find((c) => c.id === s.branches.main);
      const source = s.commits.find((c) => c.id === "C2");
      return Boolean(head && source && head.parents[0] === "C1" && head.message === source.message);
    },
    solution,
  });
}

function practiceGitConfig({ title, description, goal, hint, category, check, solution }) {
  return {
    type: "exercise",
    content: {
      hu: { title: title.hu, category: category.hu, description: description.hu, goal: goal.hu, hint: hint.hu },
      en: { title: title.en, category: category.en, description: description.en, goal: goal.en, hint: hint.en },
    },
    initial: [{ id: "C0", parents: [], message: { hu: "Új repository", en: "New repository" }, lane: 0 }],
    branches: { main: "C0" },
    current: "main",
    check,
    solution,
  };
}

lessons.unshift(
  practiceGitConfig({
    title: { hu: "Git-identitás beállítása", en: "Configure your Git identity" },
    category: { hu: "GIT BEÁLLÍTÁSOK · 01", en: "GIT CONFIGURATION · 01" },
    description: {
      hu: "A Git a commitok szerzőjeként a nevet és az e-mail-címet rögzíti. Ezek beállíthatók felhasználói szinten (`--global`) vagy csak az aktuális repositoryhoz.\n\nÁllíts be tetszőleges, nem üres globális nevet és e-mail-címet.",
      en: "Git records a name and email address as the author of each commit. These can be configured globally (`--global`) or just for the current repository.\n\nChoose any non-empty global name and email address.",
    },
    goal: {
      hu: "Állítsd be a globális `user.name` és `user.email` értékét egy általad választott, nem üres stringre.",
      en: "Set global `user.name` and `user.email` to any non-empty strings of your choice.",
    },
    hint: {
      hu: 'Használd a `git config --global user.name "A saját neved"` és a `git config --global user.email "a-sajat-cimed@example.test"` parancsot. Mindkét érték szabadon választható; ellenőrizd őket a `git config --global --list` paranccsal.',
      en: 'Run `git config --global user.name "Your Name"` and `git config --global user.email "you@example.test"`. Choose both values freely, then verify them with `git config --global --list`.',
    },
    solution: [
      'git config --global user.name "Learner Example"',
      "git config --global user.email learner@example.test",
    ],
    check: (s) => ["user.name", "user.email"].every((key) => (
      typeof s.config.global[key] === "string" && s.config.global[key].trim().length > 0
    )),
  }),
  practiceGitConfig({
    title: { hu: "Repository-beállítások", en: "Repository-level settings" },
    category: { hu: "GIT BEÁLLÍTÁSOK · 02", en: "GIT CONFIGURATION · 02" },
    description: {
      hu: "A repository-specifikus beállításokat a `.git/config` tárolja, és ezek felülírhatják a globális értékeket. A `--local` az aktuális repositoryra korlátozza a módosítást.\n\nÁllíts be `main` alapértelmezett branch-nevet az új repositorykhoz, és kapcsold ki a pull automatikus rebase-ét ebben a repositoryban.",
      en: "Repository-specific settings live in `.git/config` and can override global values. `--local` limits a change to the current repository.\n\nSet `main` as the default branch name for new repositories, and disable automatic pull rebasing for this repository.",
    },
    goal: {
      hu: "Állítsd be lokálisan az `init.defaultBranch` értékét `[[main]]`-re és a `pull.rebase` értékét `[[false]]`-ra.",
      en: "Set local `init.defaultBranch` to `[[main]]` and `pull.rebase` to `[[false]]`.",
    },
    hint: {
      hu: "Használd a `git config --local init.defaultBranch main` és `git config --local pull.rebase false` parancsokat. A `git config --list` megmutatja a beállított értékeket.",
      en: "Run `git config --local init.defaultBranch main` and `git config --local pull.rebase false`. Use `git config --list` to inspect configured values.",
    },
    solution: [
      "git config --local init.defaultBranch main",
      "git config --local pull.rebase false",
    ],
    check: (s) => s.config.local["init.defaultBranch"] === "main"
      && s.config.local["pull.rebase"] === "false",
  }),
  practiceGitConfig({
    title: { hu: "Remote origin beállítása", en: "Configure the origin remote" },
    category: { hu: "GIT BEÁLLÍTÁSOK · 03", en: "GIT CONFIGURATION · 03" },
    description: {
      hu: "A remote egy névvel ellátott kapcsolat egy másik repositoryhoz. Az `origin` a klónozáskor általában automatikusan létrejövő, elterjedt alapértelmezett név.\n\nAdd hozzá az `origin` remote-ot a gyakorló URL-lel, listázd a remote-okat, majd próbáld ki az URL módosítását a `git remote set-url` paranccsal.",
      en: "A remote is a named connection to another repository. `origin` is the conventional default name, usually created automatically when you clone.\n\nAdd `origin` with the practice URL, list remotes, then try changing its URL with `git remote set-url`.",
    },
    goal: {
      hu: "Adj hozzá egy `[[origin]]` nevű remote-ot, amely egy általad választott Git repository URL-jére mutat.",
      en: "Add a remote named `[[origin]]` pointing to any Git repository URL of your choice.",
    },
    hint: {
      hu: "Add hozzá a saját repository URL-jével: `git remote add origin <repository-URL>`. Ellenőrizd `git remote -v` paranccsal. URL-módosítás: `git remote set-url origin <új-URL>`.",
      en: "Add it with `git remote add origin <repository-URL>`, replacing the placeholder with your repository's URL. Verify with `git remote -v`. To change it, use `git remote set-url origin <new-URL>`.",
    },
    solution: ["git remote add origin https://github.com/example/git-practice.git"],
    check: (s) => typeof s.remotes.origin === "string" && s.remotes.origin.trim().length > 0,
  }),
);

const extraPractice = [
  ...[
    ["Kis, világos commitok", "Small, focused commits", "Navigáció javítva", "Fix navigation"],
    ["Beszédes commitüzenet", "Write a clear commit message", "Dokumentáció pontosítva", "Clarify documentation"],
    ["Commitok egymás után", "Build a commit sequence", "Teszt hozzáadva", "Add a test"],
    ["Egy feladat, egy commit", "One task, one commit", "Hibaüzenet javítva", "Fix error message"],
    ["Commit és gráfolvasás", "Commit and read the graph", "Gomb felirata frissítve", "Update button label"],
    ["Újabb kis változtatás", "Another small change", "Űrlap ellenőrzése", "Validate the form"],
    ["Refaktor commit", "A refactoring commit", "Függvény egyszerűsítve", "Simplify function"],
  ].map(([title, enTitle, message, enMessage]) => practiceCommit(title, enTitle, message, enMessage, 2)),
  ...[
    ["Kereső feature ág", "Search feature branch", "feature/search", "feature/search"],
    ["Profil feature ág", "Profile feature branch", "feature/profile", "feature/profile"],
    ["Űrlap feature ág", "Form feature branch", "feature/form", "feature/form"],
    ["Sötét mód külön ágon", "Dark mode on its own branch", "feature/dark-mode", "feature/dark-mode"],
    ["API-változtatás izolálása", "Isolate an API change", "feature/api", "feature/api"],
    ["Fizetési funkció ága", "Payment feature branch", "feature/payment", "feature/payment"],
    ["Kísérleti ág készítése", "Create an experiment branch", "experiment/layout", "experiment/layout"],
    ["Önálló javító ág", "Create an isolated fix branch", "fix/date-format", "fix/date-format"],
  ].map(([title, enTitle, branch, enBranch]) => practiceBranch(title, enTitle, branch, enBranch)),
  ...[
    ["Dokumentáció merge", "Merge documentation work", "Dokumentáció bővítve", "Expand documentation"],
    ["Kereső merge", "Merge search work", "Kereső elkészült", "Complete search"],
    ["Profil merge", "Merge profile work", "Profiloldal elkészült", "Complete profile page"],
    ["API merge", "Merge API work", "API végpont elkészült", "Complete API endpoint"],
    ["Tesztelési ág merge", "Merge test coverage", "Tesztlefedettség bővítve", "Expand test coverage"],
    ["Két csapat munkájának merge-e", "Merge two teams' work", "Csapatfunkció integrálva", "Integrate team feature"],
    ["Feature integrálása", "Integrate a feature", "Új funkció kész", "New feature complete"],
    ["Kiadás előtti merge", "Merge before release", "Kiadási javítás kész", "Release fix complete"],
  ].map(([title, enTitle, change, enChange]) => practiceMerge(title, enTitle, change, enChange)),
  ...[
    ["Keresőág frissítése", "Rebase the search branch", "Kereső szűrő", "Search filter"],
    ["Profilág frissítése", "Rebase the profile branch", "Profil validáció", "Profile validation"],
    ["API-ág frissítése", "Rebase the API branch", "API válaszformátum", "API response format"],
    ["Tesztág frissítése", "Rebase the test branch", "Regressziós teszt", "Regression test"],
    ["Űrlapág új alapra helyezése", "Rebase the form branch", "Űrlap validáció", "Form validation"],
    ["Feature ág naprakészen tartása", "Keep a feature branch current", "Feature befejezve", "Finish feature"],
    ["Saját commitok átjátszása", "Replay your own commits", "Gyorsítótár javítva", "Fix cache"],
  ].map(([title, enTitle, change, enChange]) => practiceRebase(title, enTitle, change, enChange)),
  ...[
    ["Sürgős javítás átvétele", "Cherry-pick a hotfix", "Null hiba javítva", "Fix null error"],
    ["Validációs javítás átvétele", "Cherry-pick a validation fix", "Validáció javítva", "Fix validation"],
    ["Biztonsági frissítés átvétele", "Cherry-pick a security fix", "Jogosultság ellenőrizve", "Check permissions"],
    ["Kiadási javítás átvétele", "Cherry-pick a release fix", "Kiadási hiba javítva", "Fix release issue"],
    ["Egyetlen commit átvétele", "Pick a single commit", "Lokalizáció frissítve", "Update localization"],
    ["Kiválasztott változtatás átvétele", "Pick a selected change", "Határérték javítva", "Fix boundary case"],
  ].map(([title, enTitle, fix, enFix]) => practiceCherryPick(title, enTitle, fix, enFix)),
];

lessons.push(...extraPractice);

const builtInLessonCount = lessons.length;
lessons.forEach((lesson, index) => {
  lesson.id = `builtin-${String(index + 1).padStart(2, "0")}`;
});

    return { lessons, builtinCount: builtInLessonCount };
  }

function localizedText(value, field, lessonId) {
  if (typeof value === "string" && value.trim()) return { hu: value, en: value };
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Lesson "${lessonId}": "${field}" must be a string or a { hu, en } object.`);
  }
  for (const languageCode of ["hu", "en"]) {
    if (typeof value[languageCode] !== "string" || !value[languageCode].trim()) {
      throw new Error(`Lesson "${lessonId}": "${field}.${languageCode}" is required.`);
    }
  }
  return { hu: value.hu, en: value.en };
}

function validateImportedLesson(source, knownIds, language = "en") {
  if (!source || typeof source !== "object" || Array.isArray(source)) throw new Error("Each lesson must be an object.");
  if (typeof source.id !== "string" || !/^[a-z0-9][a-z0-9_-]{1,63}$/.test(source.id)) {
    throw new Error("Each lesson needs a 2–64 character id using lowercase letters, numbers, hyphens, or underscores.");
  }
  if (knownIds.has(source.id) || source.id.startsWith("builtin-")) throw new Error(`Lesson id "${source.id}" is already in use.`);
  knownIds.add(source.id);
  const content = {
    title: localizedText(source.title, "title", source.id),
    category: localizedText(source.category || { hu: "SAJÁT FELADAT", en: "CUSTOM EXERCISE" }, "category", source.id),
    description: localizedText(source.description, "description", source.id),
    goal: localizedText(source.goal, "goal", source.id),
    hint: localizedText(source.hint, "hint", source.id),
  };
  const initial = source.initial ?? [{
    id: "C0",
    parents: [],
    message: { hu: "Kiinduló állapot", en: "Starting point" },
    lane: 0,
  }];
  if (!Array.isArray(initial) || initial.length === 0) throw new Error(`Lesson "${source.id}": initial must be a non-empty array.`);
  const commitIds = new Set();
  const commits = initial.map((commit, index) => {
    if (!commit || typeof commit !== "object" || Array.isArray(commit)) throw new Error(`Lesson "${source.id}": initial[${index}] must be an object.`);
    if (typeof commit.id !== "string" || !/^[A-Za-z0-9_-]+$/.test(commit.id) || commitIds.has(commit.id)) {
      throw new Error(`Lesson "${source.id}": initial[${index}].id must be unique and contain only letters, numbers, _ or -.`);
    }
    const parents = commit.parents ?? [];
    if (!Array.isArray(parents) || parents.some((parent) => typeof parent !== "string" || !commitIds.has(parent))) {
      throw new Error(`Lesson "${source.id}": parents must refer to earlier commits in initial.`);
    }
    const lane = commit.lane ?? 0;
    if (!Number.isInteger(lane) || lane < 0 || lane > 20) throw new Error(`Lesson "${source.id}": commit lane must be an integer from 0 to 20.`);
    const message = localizedText(commit.message, `initial[${index}].message`, source.id);
    commitIds.add(commit.id);
    return {
      id: commit.id,
      parents: [...parents],
      message,
      lane,
    };
  });
  const branches = source.branches ?? { main: commits.at(-1).id };
  if (!branches || typeof branches !== "object" || Array.isArray(branches) || !Object.keys(branches).length) {
    throw new Error(`Lesson "${source.id}": branches must be a non-empty object.`);
  }
  for (const [name, commitId] of Object.entries(branches)) {
    if (!/^[A-Za-z0-9/_-]+$/.test(name) || !commitIds.has(commitId)) {
      throw new Error(`Lesson "${source.id}": branch "${name}" must point to an existing initial commit.`);
    }
  }
  const current = source.current ?? Object.keys(branches)[0];
  if (typeof current !== "string" || !Object.hasOwn(branches, current)) {
    throw new Error(`Lesson "${source.id}": current must name an initial branch.`);
  }
  const check = source.check;
  if (!check || typeof check !== "object" || Array.isArray(check)) throw new Error(`Lesson "${source.id}": check must be an object.`);
  let checker;
  let solution;
  switch (check.type) {
    case "commit-count": {
      const minimum = check.minimum;
      if (!Number.isInteger(minimum) || minimum < 1 || minimum > 100) throw new Error(`Lesson "${source.id}": commit-count.minimum must be 1–100.`);
      checker = (state) => state.commits.length - initial.length >= minimum;
      solution = [];
      if (minimum <= 1) {
        solution.push('git commit -m "Change"');
      } else {
        solution.push('git commit -m "First step"');
        for (let index = 1; index < minimum - 1; index += 1) {
          solution.push('echo "another change" >> README.md', 'git add README.md', 'git commit -m "Another step"');
        }
        solution.push('echo "final change" >> README.md', 'git add README.md', 'git commit -m "Change"');
      }
      break;
    }
    case "commit-message": {
      const initialCommitIds = new Set(commits.map((commit) => commit.id));
      checker = (state) => state.commits.some((commit) => (
        !initialCommitIds.has(commit.id)
        && typeof commit.message === "string"
        && commit.message.trim().length > 0
      ));
      break;
    }
    case "config-value": {
      const scope = check.scope;
      const key = typeof check.key === "string" ? check.key.trim() : "";
      if (!["local", "global"].includes(scope) || !key) {
        throw new Error(`Lesson "${source.id}": config-value needs scope "local" or "global" and a non-empty key.`);
      }
      checker = (state) => Object.entries(state.config?.[scope] || {}).some(([configuredKey, value]) => (
        configuredKey.toLowerCase() === key.toLowerCase()
        && typeof value === "string"
        && value.trim().length > 0
      ));
      break;
    }
    case "branch-ahead": {
      const branch = check.branch;
      const base = check.base ?? current;
      if (!Object.hasOwn(branches, branch) || !Object.hasOwn(branches, base)) throw new Error(`Lesson "${source.id}": branch-ahead needs existing check.branch and check.base branches.`);
      const initialHead = branches[branch];
      checker = (state) => state.branches[branch] !== state.branches[base]
        && state.branches[branch] !== initialHead
        && isAncestor(state, state.branches[base], state.branches[branch]);
      solution = [`git switch ${branch}`, 'git commit -m "Advance branch"'];
      break;
    }
    case "merge-commit": {
      const branch = check.branch ?? current;
      if (!Object.hasOwn(branches, branch)) throw new Error(`Lesson "${source.id}": merge-commit needs an existing check.branch.`);
      checker = (state) => Boolean(findCommit(state, state.branches[branch])?.parents.length === 2);
      {
        const mergeSource = Object.keys(branches).find((name) => name !== branch);
        if (mergeSource) solution = [`git switch ${branch}`, `git merge ${mergeSource}`];
      }
      break;
    }
    case "rebase": {
      const branch = check.branch;
      const onto = check.onto;
      if (!Object.hasOwn(branches, branch) || !Object.hasOwn(branches, onto)) throw new Error(`Lesson "${source.id}": rebase needs existing check.branch and check.onto branches.`);
      checker = (state) => {
        const head = findCommit(state, state.branches[branch]);
        return Boolean(head && head.parents.length === 1 && head.parents[0] === state.branches[onto]);
      };
      solution = [`git switch ${branch}`, `git rebase ${onto}`];
      break;
    }
    case "cherry-pick": {
      const branch = check.branch ?? current;
      const sourceCommit = check.source;
      const onto = check.onto;
      if (!Object.hasOwn(branches, branch) || !commitIds.has(sourceCommit) || !commitIds.has(onto)) {
        throw new Error(`Lesson "${source.id}": cherry-pick needs an existing check.branch, check.source commit, and check.onto commit.`);
      }
      const sourceMessage = commits.find((commit) => commit.id === sourceCommit).message;
      checker = (state) => {
        const head = findCommit(state, state.branches[branch]);
        return Boolean(head && head.parents[0] === onto
          && (head.translations?.[language] || head.message) === sourceMessage[language]);
      };
      solution = [`git switch ${branch}`, `git cherry-pick ${sourceCommit}`];
      break;
    }
    case "config-value": {
      const { scope, key } = check;
      if (!["local", "global"].includes(scope) || typeof key !== "string" || !key.trim()) {
        throw new Error(`Lesson "${source.id}": config-value needs scope "local" or "global" and a non-empty key.`);
      }
      checker = (state) => Object.entries(state.config?.[scope] || {}).some(([configuredKey, value]) => (
        configuredKey.toLowerCase() === key.toLowerCase()
        && typeof value === "string"
        && value.trim().length > 0
      ));
      break;
    }
    default:
      throw new Error(`Lesson "${source.id}": check.type must be commit-count, commit-message, config-value, branch-ahead, merge-commit, rebase, or cherry-pick.`);
  }
  return {
    id: source.id,
    type: "exercise",
    content: Object.fromEntries(["hu", "en"].map((languageCode) => [languageCode, {
      title: content.title[languageCode],
      category: content.category[languageCode],
      description: content.description[languageCode],
      goal: content.goal[languageCode],
      hint: content.hint[languageCode],
    }])),
    initial: commits,
    branches: { ...branches },
    current,
    check: checker,
    imported: true,
    pendingChange: check.type === "commit-count" || check.type === "commit-message" || check.type === "branch-ahead",
    ...(solution && solution.length ? { solution } : {}),
  };
}

function validateImportedFile(data, existingIds, language = "en") {
  if (!data || typeof data !== "object" || Array.isArray(data) || !Array.isArray(data.lessons) || !data.lessons.length) {
    throw new Error('The input file must contain a non-empty "lessons" array.');
  }
  const ids = new Set(existingIds);
  return data.lessons.map((lesson) => validateImportedLesson(lesson, ids, language));
}

  const api = { createLessons, validateImportedFile, validateImportedLesson };
  if (typeof module === "object" && module.exports) module.exports = api;
  else globalScope.GitLessons = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
