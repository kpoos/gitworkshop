const ui = {
  hu: {
    title: "Git műhely — tanulj gyakorlással",
    brand: "Git műhely kezdőlap",
    brandName: "műhely",
    offline: "Helyben fut · nincs szükség internetre",
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
    dockerPlayground: "Dockeres játszótér",
    dockerTitle: "Valódi Git Dockerben",
    dockerKicker: "HELYI DOCKERES HOMOKOZÓ",
    dockerIntro: "A helyi konténerben valódi Linux-parancsokat futtathatsz, és Git-et telepíthetsz az apk add git paranccsal. Nincsenek becsatolva a géped fájljai vagy a Docker socket. Csak a /workspace nevű, törölhető Docker-kötet marad meg.",
    dockerStepOne: "A repository gyökérkönyvtárából indítsd el az izolált konténert:",
    dockerStepTwo: "A felhasználónév git; másold ki a jelszót a naplóból:",
    dockerStepThree: "Nyisd meg a terminált, majd használd a git telepítéséhez és gyakorlásához az alábbi parancsokat. A port csak a saját gépeden érhető el.",
    dockerExample: "Git telepítése és első repository",
    dockerReset: "A konténer és minden gyakorlófájl törlése:",
    dockerOpen: "Terminál megnyitása",
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
    welcome: "Gépeld be a git parancsot, majd nyomj Entert. A `help` megmutatja az elérhető parancsokat.",
    example: 'Példa: git commit -m "Első változtatás"',
    unknownCommand: "Nem ismert parancs. A Git parancsok `git` szóval kezdődnek; írd be: help.",
    noUndo: "Nincs mit visszavonni.",
    undone: "Az utolsó állapot visszaállítva.",
    status: "Aktív ág: {branch}\nMunkakönyvtár tiszta.\nHEAD -> {head}",
    commitUsage: 'Használd így: git commit -m "commit üzenet".',
    emptyMessage: "A commit üzenete nem lehet üres.",
    branchUsage: "Használat: git branch <ág-név>.",
    branchExists: "Már létezik ilyen ág: {name}.",
    branchCreated: "Létrehozva az ág: {name}",
    switchUsage: "Használat: git switch <ág-név>.",
    switched: "Átváltás erre: '{name}'",
    detached: "Leválasztott HEAD állapot: {name}",
    refNotFound: "Nem található ilyen ág vagy commit: {name}.",
    branchNotFound: "Nem található ilyen ág: {name}.",
    mergeSwitch: "Merge előtt válts egy ágra.",
    upToDate: "Már naprakész, nincs egyesítendő commit.",
    fastForward: "Gyors előretekerés: {ours} → {theirs}",
    merged: "Merge commit létrehozva: {id} (közös alap: {base})",
    rebaseSwitch: "Rebase előtt válts egy ágra.",
    noCommon: "A két ágnak nincs közös commitja.",
    alreadyBased: "Az ág már az alap commitján van.",
    rebaseFailed: "A commit-történet nem fűzhető újra.",
    rebased: "{count} commit áthelyezve erre az alapra: {base}",
    cherryPickUsage: "Használat: git cherry-pick <commit-azonosító>.",
    cherryPickMissing: "Nem található ilyen commit: {id}.",
    cherryPicked: "Commit átvéve: {source} → {id}",
    configUsage: "Használat: git config [--global|--local] [--get|--unset] <kulcs> [érték].",
    configMissing: "Nincs beállítva ez a kulcs: {key}.",
    configSet: "{scope} beállítva: {key} = {value}",
    configUnset: "Beállítás törölve: {key}",
    configEmpty: "Még nincs beállítás a kiválasztott hatókörben.",
    remoteUsage: "Használat: git remote add|set-url|remove|get-url <név> [URL], vagy git remote -v.",
    remoteExists: "Már létezik ilyen remote: {name}.",
    remoteMissing: "Nem található ilyen remote: {name}.",
    remoteAdded: "Remote hozzáadva: {name} → {url}",
    remoteUpdated: "Remote URL frissítve: {name} → {url}",
    remoteRemoved: "Remote eltávolítva: {name}",
    unknownGitCommand: "A '{command}' parancs még nem érhető el. Írd be: help.",
    completed: "Szép munka — teljesítetted a feladatot. Léphetsz tovább a következő leckére.",
    allCompleted: "Szép munka — teljesítetted az utolsó leckét is. Most már szabadon gyakorolhatsz.",
    helpFirst: 'git config --global user.name "Név"  ·  git config --global user.email "email"  ·  git remote add origin <URL>',
    helpSecond: 'git commit -m "üzenet"  ·  git branch <név>  ·  git switch <ág>  ·  git merge <ág>  ·  git rebase <ág>  ·  git cherry-pick <commit>  ·  git log  ·  git status  ·  undo',
    commitCount: "{count} commit",
    language: "EN",
    languageAria: "Switch language to English",
  },
  en: {
    title: "Git Workshop — learn by doing",
    brand: "Git Workshop home",
    brandName: "workshop",
    offline: "Runs locally · no internet required",
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
    dockerPlayground: "Docker playground",
    dockerTitle: "Real Git in Docker",
    dockerKicker: "LOCAL DOCKER SANDBOX",
    dockerIntro: "Run real Linux commands in a local container and install Git with apk add git. No host files or Docker socket are mounted. Only the disposable Docker volume named /workspace persists.",
    dockerStepOne: "From the repository root, start the isolated container:",
    dockerStepTwo: "The username is git; copy the password from the logs:",
    dockerStepThree: "Open the terminal, then use the commands below to install Git and practice. The port is reachable only from your own computer.",
    dockerExample: "Install Git and create your first repository",
    dockerReset: "To remove the container and all practice files:",
    dockerOpen: "Open terminal",
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
    welcome: "Type a Git command and press Enter. Type `help` to see the available commands.",
    example: 'Example: git commit -m "First change"',
    unknownCommand: "Unknown command. Git commands start with `git`; type: help.",
    noUndo: "Nothing to undo.",
    undone: "Restored the previous state.",
    status: "On branch: {branch}\nWorking tree clean.\nHEAD -> {head}",
    commitUsage: 'Usage: git commit -m "commit message".',
    emptyMessage: "The commit message cannot be empty.",
    branchUsage: "Usage: git branch <branch-name>.",
    branchExists: "Branch already exists: {name}.",
    branchCreated: "Created branch: {name}",
    switchUsage: "Usage: git switch <branch-name>.",
    switched: "Switched to branch '{name}'",
    detached: "HEAD is now detached at {name}",
    refNotFound: "No such branch or commit: {name}.",
    branchNotFound: "No such branch: {name}.",
    mergeSwitch: "Switch to a branch before merging.",
    upToDate: "Already up to date; nothing to merge.",
    fastForward: "Fast-forward: {ours} → {theirs}",
    merged: "Created merge commit: {id} (common ancestor: {base})",
    rebaseSwitch: "Switch to a branch before rebasing.",
    noCommon: "The branches have no commit in common.",
    alreadyBased: "This branch is already at its base commit.",
    rebaseFailed: "The commit history could not be replayed.",
    rebased: "Rebased {count} commit(s) onto {base}",
    cherryPickUsage: "Usage: git cherry-pick <commit-id>.",
    cherryPickMissing: "No such commit: {id}.",
    cherryPicked: "Cherry-picked: {source} → {id}",
    configUsage: "Usage: git config [--global|--local] [--get|--unset] <key> [value].",
    configMissing: "No value is configured for: {key}.",
    configSet: "{scope} config set: {key} = {value}",
    configUnset: "Removed config: {key}",
    configEmpty: "No settings in the selected scope.",
    remoteUsage: "Usage: git remote add|set-url|remove|get-url <name> [URL], or git remote -v.",
    remoteExists: "Remote already exists: {name}.",
    remoteMissing: "No such remote: {name}.",
    remoteAdded: "Added remote: {name} → {url}",
    remoteUpdated: "Updated remote URL: {name} → {url}",
    remoteRemoved: "Removed remote: {name}",
    unknownGitCommand: "The '{command}' command is not available yet. Type: help.",
    completed: "Nice work — task complete. You can move on to the next lesson.",
    allCompleted: "Nice work — you completed the final lesson. Feel free to keep practicing.",
    helpFirst: 'git config --global user.name "Name"  ·  git config --global user.email "email"  ·  git remote add origin <URL>',
    helpSecond: 'git commit -m "message"  ·  git branch <name>  ·  git switch <branch>  ·  git merge <branch>  ·  git rebase <branch>  ·  git cherry-pick <commit>  ·  git log  ·  git status  ·  undo',
    commitCount: "{count} commits",
    language: "HU",
    languageAria: "Váltás magyar nyelvre",
  },
};

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
    type: "reading",
    content: {
      hu: {
        title: "Merge conflict feloldása", category: "EGYESÍTÉS · 06",
        description: "Konfliktus akkor keletkezik, ha Git nem tudja automatikusan összeegyeztetni a módosításokat — gyakran két ág ugyanazokat a sorokat írta át.\n\n1. Futtasd a `git status` parancsot, és keresd az unmerged fájlokat.\n2. Nyisd meg az érintett fájlt. A `<<<<<<<`, `=======` és `>>>>>>>` jelölések mutatják a változatokat.\n3. Döntsd el, mi legyen a végleges tartalom; szerkeszd a fájlt, távolítsd el az összes jelölőt.\n4. Futtass teszteket, ellenőrizd a diffet (`git diff`), majd jelöld megoldottnak: `git add <fájl>`.\n5. Merge esetén fejezd be `git commit` paranccsal; rebase esetén `git rebase --continue`. Megszakításhoz: `git merge --abort` vagy `git rebase --abort`.",
        goal: "A szándékos végleges tartalmat állítsd elő — ne csak töröld a konfliktusjelölőket.",
        hint: "Ne fogadj el vakon egyik oldalt sem. Értsd meg mindkét módosítás célját, egyeztesd a csapattal, majd futtasd a releváns teszteket.",
      },
      en: {
        title: "Resolving a merge conflict", category: "INTEGRATION · 06",
        description: "A conflict occurs when Git cannot automatically reconcile changes—often because two branches changed the same lines.\n\n1. Run `git status` and find the unmerged files.\n2. Open each file. `<<<<<<<`, `=======`, and `>>>>>>>` mark the competing versions.\n3. Decide on the intended result, edit the file, and remove every conflict marker.\n4. Run tests, review the diff with `git diff`, then mark it resolved: `git add <file>`.\n5. For a merge, finish with `git commit`; for a rebase, run `git rebase --continue`. Abort with `git merge --abort` or `git rebase --abort`.",
        goal: "Resolve the conflict by choosing the intended final content—not merely by deleting the markers.",
        hint: "Do not blindly accept one side. Understand both changes, coordinate with the team, and run relevant tests.",
      },
    },
  },
  {
    type: "reading",
    content: {
      hu: {
        title: "Reset, revert és restore", category: "VISSZAVONÁS · 07",
        description: "Három hasonló nevű parancs, különböző hatókörrel.\n\n• `git restore <fájl>` visszaállít egy fájlt a working directoryban; `git restore --staged <fájl>` kiveszi a staging area-ból. A nem mentett tartalom elveszhet.\n• `git reset` egy korábbi commitra mozgatja az ágat/HEAD-et, és opcionálisan módosítja a staging area-t vagy a working directoryt (`--soft`, `--mixed`, `--hard`). A `--hard` helyi munkát törölhet.\n• `git revert <commit>` új commitot készít, amely visszafordít egy korábbi commitot. Megosztott történetnél ez általában biztonságosabb.\n\nMegosztott ágon részesítsd előnyben a `revert`-et. A reset előtt ellenőrizd a célt és legyen mentésed.",
        goal: "Válassz a fájl-visszaállítás, helyi történet-átmozgatás és visszafordító commit között.",
        hint: "`restore` fájlokra, `reset` az aktuális hivatkozásra/stagingre, `revert` új commitot készít. Különösen a `reset --hard` destruktív.",
      },
      en: {
        title: "Reset, revert, and restore", category: "UNDOING · 07",
        description: "Three similarly named commands with different scopes.\n\n• `git restore <file>` restores files in the working directory; `git restore --staged <file>` removes them from the staging area. Uncommitted content can be lost.\n• `git reset` moves the branch/HEAD to an earlier commit and optionally changes the staging area or working directory (`--soft`, `--mixed`, `--hard`). `--hard` can destroy local work.\n• `git revert <commit>` creates a new commit that reverses an earlier commit's changes. This is generally safer for shared history.\n\nPrefer `revert` on shared branches. Check the target and make a backup before resetting.",
        goal: "Choose between restoring files, moving local history, and creating an undo commit.",
        hint: "`restore` operates on files, `reset` on the current reference/index, and `revert` creates a new commit. `reset --hard` is especially destructive.",
      },
    },
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

function practiceLesson({ title, description, goal, hint, category, initial, branches, current, check }) {
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
  };
}

function practiceCommit(title, enTitle, message, enMessage, minimum) {
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
    check: (s) => s.commits.length >= minimum + 1 && s.commits.some((c) => c.message === message || c.message === enMessage),
  });
}

function practiceBranch(title, enTitle, branch, enBranch) {
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
    check: (s) => Boolean(s.branches[branch]
      && s.branches[branch] !== "C0"
      && s.branches[branch] !== s.branches.main
      && isAncestor("C0", s.branches[branch])),
  });
}

function practiceMerge(title, enTitle, change, enChange) {
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
  });
}

function practiceRebase(title, enTitle, change, enChange) {
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
  });
}

function practiceCherryPick(title, enTitle, fix, enFix) {
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
  });
}

function practiceGitConfig({ title, description, goal, hint, category, check }) {
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
  };
}

lessons.unshift(
  practiceGitConfig({
    title: { hu: "Git-identitás beállítása", en: "Configure your Git identity" },
    category: { hu: "GIT BEÁLLÍTÁSOK · 01", en: "GIT CONFIGURATION · 01" },
    description: {
      hu: "A Git a commitok szerzőjeként a nevet és az e-mail-címet rögzíti. Ezek beállíthatók felhasználói szinten (`--global`) vagy csak az aktuális repositoryhoz.\n\nÁllíts be egy globális nevet és e-mail-címet. A mintacím fenntartott `.test` tartományt használ, nem valódi postafiók.",
      en: "Git records a name and email address as the author of each commit. These can be configured globally (`--global`) or just for the current repository.\n\nSet a global name and email. The sample address uses the reserved `.test` domain and is not a real mailbox.",
    },
    goal: {
      hu: 'Állítsd be: `git config --global user.name "[[Learner Example]]"` és `git config --global user.email "[[learner@example.test]]"`.',
      en: 'Set `git config --global user.name "[[Learner Example]]"` and `git config --global user.email "[[learner@example.test]]"`.',
    },
    hint: {
      hu: 'Ellenőrizd az értékeket a `git config --global --list` vagy a `git config --global --get user.email` paranccsal. A szimulátorban ezek próbaadatok.',
      en: 'Verify the values with `git config --global --list` or `git config --global --get user.email`. These are sample values in the simulator.',
    },
    check: (s) => s.config.global["user.name"] === "Learner Example"
      && s.config.global["user.email"] === "learner@example.test",
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
      hu: "Az `[[origin]]` URL-je legyen `[[https://github.com/example/git-practice.git]]`.",
      en: "Set the `[[origin]]` URL to `[[https://github.com/example/git-practice.git]]`.",
    },
    hint: {
      hu: "Add hozzá: `git remote add origin https://github.com/example/git-practice.git`. Ellenőrizd `git remote -v` paranccsal. URL-módosítás: `git remote set-url origin <új-URL>`.",
      en: "Add it with `git remote add origin https://github.com/example/git-practice.git`. Verify with `git remote -v`. To change it, use `git remote set-url origin <new-URL>`.",
    },
    check: (s) => s.remotes.origin === "https://github.com/example/git-practice.git",
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
const importedStorageKey = "git-workshop-imported-lessons-v1";
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

function validateImportedLesson(source, knownIds) {
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
  switch (check.type) {
    case "commit-count": {
      const minimum = check.minimum;
      if (!Number.isInteger(minimum) || minimum < 1 || minimum > 100) throw new Error(`Lesson "${source.id}": commit-count.minimum must be 1–100.`);
      checker = (state) => state.commits.length - initial.length >= minimum;
      break;
    }
    case "branch-ahead": {
      const branch = check.branch;
      const base = check.base ?? current;
      if (!Object.hasOwn(branches, branch) || !Object.hasOwn(branches, base)) throw new Error(`Lesson "${source.id}": branch-ahead needs existing check.branch and check.base branches.`);
      const initialHead = branches[branch];
      checker = (state) => state.branches[branch] !== state.branches[base]
        && state.branches[branch] !== initialHead
        && isAncestor(state.branches[base], state.branches[branch]);
      break;
    }
    case "merge-commit": {
      const branch = check.branch ?? current;
      if (!Object.hasOwn(branches, branch)) throw new Error(`Lesson "${source.id}": merge-commit needs an existing check.branch.`);
      checker = (state) => Boolean(findCommit(state.branches[branch])?.parents.length === 2);
      break;
    }
    case "rebase": {
      const branch = check.branch;
      const onto = check.onto;
      if (!Object.hasOwn(branches, branch) || !Object.hasOwn(branches, onto)) throw new Error(`Lesson "${source.id}": rebase needs existing check.branch and check.onto branches.`);
      checker = (state) => {
        const head = findCommit(state.branches[branch]);
        return Boolean(head && head.parents.length === 1 && head.parents[0] === state.branches[onto]);
      };
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
        const head = findCommit(state.branches[branch]);
        return Boolean(head && head.parents[0] === onto
          && (head.translations?.[language] || head.message) === sourceMessage[language]);
      };
      break;
    }
    default:
      throw new Error(`Lesson "${source.id}": check.type must be commit-count, branch-ahead, merge-commit, rebase, or cherry-pick.`);
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
  };
}

function validateImportedFile(data, existingIds) {
  if (!data || typeof data !== "object" || Array.isArray(data) || !Array.isArray(data.lessons) || !data.lessons.length) {
    throw new Error('The input file must contain a non-empty "lessons" array.');
  }
  const ids = new Set(existingIds);
  return data.lessons.map((lesson) => validateImportedLesson(lesson, ids));
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
let state;
let history = [];
let commandHistory = [];
let commandHistoryIndex = 0;
const completedLessons = new Set();

function freshState(lesson) {
  const initial = lesson.initial || [{
    id: "C0",
    parents: [],
    message: { hu: "Gyakorló repository", en: "Practice repository" },
    lane: 0,
  }];
  const branches = lesson.branches || { main: "C0" };
  return {
    commits: initial.map((commit) => ({
      ...commit,
      message: typeof commit.message === "string" ? commit.message : commit.message[language],
      translations: typeof commit.message === "string" ? null : commit.message,
      parents: [...commit.parents],
    })),
    branches: { ...branches },
    branchLanes: Object.fromEntries(Object.keys(branches).map((name, index) => [name, index])),
    config: { global: {}, local: {} },
    remotes: {},
    current: lesson.current || "main",
    detached: null,
    nextId: Math.max(0, ...initial.map((commit) => (/^C\d+$/.test(commit.id) ? Number(commit.id.slice(1)) : 0))) + 1,
  };
}

function snapshot() {
  return JSON.parse(JSON.stringify(state));
}

function headId() {
  return state.detached || state.branches[state.current];
}

function findCommit(id) {
  return state.commits.find((commit) => commit.id === id);
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
  addOutput(t("welcome"));
  if (lessonIndex === 0) addOutput(t("example"));
}

function isAncestor(ancestorId, commitId) {
  if (ancestorId === commitId) return true;
  const stack = [commitId];
  const visited = new Set();
  while (stack.length) {
    const current = stack.pop();
    if (visited.has(current)) continue;
    visited.add(current);
    const commit = findCommit(current);
    if (!commit) continue;
    if (commit.parents.includes(ancestorId)) return true;
    stack.push(...commit.parents);
  }
  return false;
}

function commonAncestor(firstId, secondId) {
  const firstAncestors = new Set();
  const stack = [firstId];
  while (stack.length) {
    const id = stack.pop();
    if (firstAncestors.has(id)) continue;
    firstAncestors.add(id);
    const commit = findCommit(id);
    if (commit) stack.push(...commit.parents);
  }
  const secondStack = [secondId];
  const visited = new Set();
  while (secondStack.length) {
    const id = secondStack.shift();
    if (visited.has(id)) continue;
    visited.add(id);
    if (firstAncestors.has(id)) return id;
    const commit = findCommit(id);
    if (commit) secondStack.push(...commit.parents);
  }
  return null;
}

function allocateLane() {
  return Math.max(-1, ...Object.values(state.branchLanes)) + 1;
}

function commit(message, parents = [headId()], translations = null) {
  const id = `C${state.nextId++}`;
  const lane = state.current ? state.branchLanes[state.current] : 0;
  state.commits.push({ id, parents, message, lane, translations });
  if (state.current) state.branches[state.current] = id;
  else state.detached = id;
  return id;
}

function currentBranch() {
  if (!state.current) return `detached:${state.detached}`;
  return state.current;
}

function parseCommand(raw) {
  const command = raw.trim();
  if (!command) return;
  addOutput(command, "command");
  const tokens = command.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
  const args = tokens.map((token) => token.replace(/^"|"$/g, ""));
  if (args[0] !== "git" && args[0] !== "help" && args[0] !== "undo") {
    addOutput(t("unknownCommand"), "error");
    return;
  }
  if (args[0] === "help") {
    addOutput(t("helpFirst"));
    addOutput(t("helpSecond"));
    return;
  }
  if (args[0] === "undo") {
    if (!history.length) return addOutput(t("noUndo"), "error");
    state = history.pop();
    addOutput(t("undone"), "success");
    render();
    checkLesson();
    return;
  }

  const [, subcommand, ...rest] = args;
  const before = snapshot();
  let output;
  try {
    switch (subcommand) {
      case "config": {
        const flags = new Set(["--global", "--local", "--get", "--unset", "--list"]);
        const selectedScope = rest.includes("--global") ? "global" : rest.includes("--local") ? "local" : null;
        const scope = selectedScope || "local";
        const values = rest.filter((value) => !flags.has(value));
        if (rest.includes("--list")) {
          const scopes = selectedScope ? [selectedScope] : ["global", "local"];
          const entries = scopes.flatMap((name) =>
            Object.entries(state.config[name]).map(([key, value]) => `${name} ${key}=${value}`));
          output = entries.length ? entries.join("\n") : t("configEmpty");
          break;
        }
        if (rest.includes("--unset")) {
          const key = values[0];
          if (values.length !== 1 || !key) throw new Error(t("configUsage"));
          if (!Object.hasOwn(state.config[scope], key)) throw new Error(t("configMissing", { key }));
          delete state.config[scope][key];
          history.push(before);
          output = t("configUnset", { key });
          break;
        }
        if (rest.includes("--get") || values.length === 1) {
          const key = values[0];
          if (values.length !== 1 || !key) throw new Error(t("configUsage"));
          const value = selectedScope
            ? state.config[scope][key]
            : state.config.local[key] ?? state.config.global[key];
          if (value === undefined) throw new Error(t("configMissing", { key }));
          output = value;
          break;
        }
        const [key, ...settingValue] = values;
        if (values.length < 2 || !/^[A-Za-z0-9][A-Za-z0-9.-]*$/.test(key)) {
          throw new Error(t("configUsage"));
        }
        const value = settingValue.join(" ");
        state.config[scope][key] = value;
        history.push(before);
        output = t("configSet", {
          scope: scope === "global"
            ? (language === "hu" ? "Globális" : "Global")
            : (language === "hu" ? "Helyi" : "Local"),
          key,
          value,
        });
        break;
      }
      case "remote": {
        const [operation, name, url] = rest;
        if (operation === "-v" || !operation) {
          const remotes = Object.entries(state.remotes).flatMap(([remoteName, remoteUrl]) => [
            `${remoteName}\t${remoteUrl} (fetch)`,
            `${remoteName}\t${remoteUrl} (push)`,
          ]);
          output = remotes.length ? remotes.join("\n") : t("configEmpty");
          break;
        }
        if (operation === "add") {
          if (!name || !url) throw new Error(t("remoteUsage"));
          if (state.remotes[name]) throw new Error(t("remoteExists", { name }));
          state.remotes[name] = url;
          history.push(before);
          output = t("remoteAdded", { name, url });
          break;
        }
        if (operation === "set-url") {
          if (!name || !url) throw new Error(t("remoteUsage"));
          if (!state.remotes[name]) throw new Error(t("remoteMissing", { name }));
          state.remotes[name] = url;
          history.push(before);
          output = t("remoteUpdated", { name, url });
          break;
        }
        if (operation === "get-url") {
          if (!name) throw new Error(t("remoteUsage"));
          if (!state.remotes[name]) throw new Error(t("remoteMissing", { name }));
          output = state.remotes[name];
          break;
        }
        if (operation === "remove" || operation === "rm") {
          if (!name) throw new Error(t("remoteUsage"));
          if (!state.remotes[name]) throw new Error(t("remoteMissing", { name }));
          delete state.remotes[name];
          history.push(before);
          output = t("remoteRemoved", { name });
          break;
        }
        throw new Error(t("remoteUsage"));
      }
      case "status":
        output = t("status", {
          branch: state.current || (language === "hu" ? "leválasztott HEAD" : "detached HEAD"),
          head: headId(),
        });
        break;
      case "commit": {
        const messageIndex = rest.indexOf("-m");
        if (messageIndex === -1 || !rest[messageIndex + 1]) throw new Error(t("commitUsage"));
        const message = rest[messageIndex + 1].trim();
        if (!message) throw new Error(t("emptyMessage"));
        const id = commit(message);
        history.push(before);
        output = `[${currentBranch()} ${id}] ${message}`;
        break;
      }
      case "branch": {
        const name = rest[0];
        if (!name || name.startsWith("-")) throw new Error(t("branchUsage"));
        if (state.branches[name]) throw new Error(t("branchExists", { name }));
        state.branches[name] = headId();
        state.branchLanes[name] = allocateLane();
        history.push(before);
        output = t("branchCreated", { name });
        break;
      }
      case "switch":
      case "checkout": {
        const create = subcommand === "switch" && rest[0] === "-c";
        const name = create ? rest[1] : rest[0];
        if (!name) throw new Error(t("switchUsage"));
        if (create) {
          if (state.branches[name]) throw new Error(t("branchExists", { name }));
          state.branches[name] = headId();
          state.branchLanes[name] = allocateLane();
          state.current = name;
          state.detached = null;
          output = t("switched", { name });
        } else if (state.branches[name]) {
          state.current = name;
          state.detached = null;
          output = t("switched", { name });
        } else if (findCommit(name)) {
          state.current = null;
          state.detached = name;
          output = t("detached", { name });
        } else {
          throw new Error(t("refNotFound", { name }));
        }
        history.push(before);
        break;
      }
      case "merge": {
        const name = rest[0];
        if (!name || !state.branches[name]) throw new Error(t("branchNotFound", { name: name || "(empty)" }));
        if (!state.current) throw new Error(t("mergeSwitch"));
        const ours = headId();
        const theirs = state.branches[name];
        if (ours === theirs || isAncestor(theirs, ours)) {
          output = t("upToDate");
        } else if (isAncestor(ours, theirs)) {
          state.branches[state.current] = theirs;
          history.push(before);
          output = t("fastForward", { ours, theirs });
        } else {
          const base = commonAncestor(ours, theirs);
          const mergeId = commit(`Merge branch '${name}'`, [ours, theirs]);
          history.push(before);
          output = t("merged", { id: mergeId, base: base || (language === "hu" ? "nincs" : "none") });
        }
        break;
      }
      case "cherry-pick": {
        const sourceId = rest[0];
        const source = findCommit(sourceId);
        if (!sourceId) throw new Error(t("cherryPickUsage"));
        if (!source) throw new Error(t("cherryPickMissing", { id: sourceId }));
        if (!state.current) throw new Error(t("mergeSwitch"));
        const id = commit(source.message, [headId()], source.translations);
        history.push(before);
        output = t("cherryPicked", { source: sourceId, id });
        break;
      }
      case "rebase": {
        const name = rest[0];
        if (!name || !state.branches[name]) throw new Error(t("branchNotFound", { name: name || "(empty)" }));
        if (!state.current) throw new Error(t("rebaseSwitch"));
        const oldHead = headId();
        const newBase = state.branches[name];
        const base = commonAncestor(oldHead, newBase);
        if (!base) throw new Error(t("noCommon"));
        if (base === oldHead) {
          output = t("alreadyBased");
          break;
        }
        const replay = [];
        let cursor = oldHead;
        while (cursor !== base) {
          const item = findCommit(cursor);
          if (!item || !item.parents.length) throw new Error(t("rebaseFailed"));
          replay.push(item);
          cursor = item.parents[0];
        }
        let parent = newBase;
        for (const oldCommit of replay.reverse()) parent = commit(oldCommit.message, [parent], oldCommit.translations);
        history.push(before);
        output = t("rebased", { count: replay.length, base: newBase });
        break;
      }
      case "log":
        output = state.commits.slice().reverse().map((item) => {
          const refs = Object.entries(state.branches).filter(([, id]) => id === item.id).map(([name]) => name);
          const head = headId() === item.id ? " HEAD" : "";
          return `* ${item.id}${head}${refs.length ? ` (${refs.join(", ")})` : ""} ${item.message}`;
        }).join("\n");
        break;
      default:
        throw new Error(t("unknownGitCommand", { command: subcommand || "" }));
    }
    if (output) addOutput(output, "result");
    render();
    checkLesson();
  } catch (error) {
    state = before;
    addOutput(error.message, "error");
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
  $("#terminal-prompt").textContent = `${state.current || "detached"} ❯`;
  $("#commit-count").textContent = language === "en" && state.commits.length === 1
    ? "1 commit"
    : t("commitCount", { count: state.commits.length });
  $("#repo-status").textContent = state.detached ? t("detachedStatus") : t("repoStatus");
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
    ? !lesson.check(state)
    : isLast && completedLessons.has(lessonIndex);
}

function checkLesson() {
  if ((lessons[lessonIndex].type || "exercise") !== "exercise") return;
  if (!lessons[lessonIndex].check(state)) {
    completedLessons.delete(lessonIndex);
    renderLessons();
    return;
  }
  completedLessons.add(lessonIndex);
  renderLessons();
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
  const normalized = validateImportedFile({ lessons: sources }, existingIds);
  const nextSources = [...importedSources, ...sources];
  localStorage.setItem(importedStorageKey, JSON.stringify(nextSources));
  importedSources = nextSources;
  lessons.push(...normalized);
  renderLessons();
  showImportStatus(t("importSuccess", { count: normalized.length }));
}

function restoreImportedLessons() {
  try {
    const stored = localStorage.getItem(importedStorageKey);
    if (!stored) return;
    const sources = JSON.parse(stored);
    const normalized = validateImportedFile({ lessons: sources }, new Set(lessons.map((lesson) => lesson.id)));
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
  $("#docker-terminal-link").textContent = text.dockerOpen;
  $("#docker-dialog-done").textContent = text.dockerClose;
  $("#docker-dialog-close").setAttribute("aria-label", text.dockerCloseAria);
  $("#help-button").textContent = text.help;
  $("#terminal-output").setAttribute("aria-label", text.terminalAria);
  $("#command-input").setAttribute("aria-label", text.commandAria);
  $("#command-input").placeholder = text.placeholder;
  $("#run-command").setAttribute("aria-label", text.runAria);
  $("#terminal-hint").textContent = text.pressEnter;
  $("#run-hint").textContent = text.runHint;
  $("#history-hint").textContent = text.historyHint;
  $("#clear-imported").textContent = text.clearImported;
  if (state) render();
  setWelcome();
}

function loadLesson(index) {
  lessonIndex = index;
  state = freshState(lessons[index]);
  history = [];
  $("#next-lesson").dataset.announced = "";
  setWelcome();
  render();
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
  parseCommand(command);
});

$("#command-input").addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    commandHistoryIndex = Math.max(0, commandHistoryIndex - 1);
    event.currentTarget.value = commandHistory[commandHistoryIndex] || "";
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    commandHistoryIndex = Math.min(commandHistory.length, commandHistoryIndex + 1);
    event.currentTarget.value = commandHistory[commandHistoryIndex] || "";
  }
});

$("#reset-button").addEventListener("click", () => loadLesson(lessonIndex));
$("#import-button").addEventListener("click", () => $("#import-file").click());
$("#clear-imported").addEventListener("click", clearImportedLessons);
$("#import-file").addEventListener("change", (event) => {
  handleImportFile(event.currentTarget.files[0]);
});
$("#language-button").addEventListener("click", () => {
  language = language === "hu" ? "en" : "hu";
  applyLanguage();
});
$("#prev-lesson").addEventListener("click", () => {
  if (lessonIndex > 0) loadLesson(lessonIndex - 1);
});
$("#next-lesson").addEventListener("click", () => {
  const lesson = lessons[lessonIndex];
  if ((lesson.type || "exercise") === "exercise" && !lesson.check(state)) return;
  completedLessons.add(lessonIndex);
  if (lessonIndex < lessons.length - 1) {
    loadLesson(lessonIndex + 1);
  } else {
    $("#next-lesson").disabled = true;
    addOutput(t("courseComplete"), "success");
    renderLessons();
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

applyLanguage();
loadLesson(0);
