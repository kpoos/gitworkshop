# Git Workshop / Git műhely

**Magyar:** [README.hu.md](./README.hu.md)

A bilingual Git learning environment that runs entirely in a local Docker container. Use the language button in the header to switch between English and Hungarian. The web interface is served from the container, and every command typed into the terminal is executed as a real command inside the container — nothing is simulated. The lessons are original, step-by-step exercises for learning branches and commits.

## Release 0.0.4

The application release version is `0.0.4`. The header and footer version labels are sourced from the `application-version` metadata in `index.html`.

Magyar leírás: [README.hu.md](./README.hu.md)

## Screenshots

![Git Workshop lesson and terminal](./screenshots/overview.png)

![Git Workshop merge graph and terminal](./screenshots/merge-workflow.png)

## Getting started

Requirements: Docker Engine or Docker Desktop with the Compose plugin, and an internet connection for the initial image build.

From the repository root, build and start the environment:

```sh
docker compose up --build -d
```

Then open <http://localhost:3000> in a modern browser. The web interface, the commit graph, and the terminal all run inside the `git-workshop` container. The port is bound to `127.0.0.1`, so the app is reachable only from your own machine.

## Real commands, verified exercises

The Node server inside the container executes every terminal command with the real `git` binary in a per-session repository under `/workspace`. After each command the server reads the real repository state — branches, commits, configuration, remotes, working-tree status — and rebuilds the commit graph from it.

Exercises are verified **on the server against that real repository state**. A task counts as completed only when the container's repository actually satisfies the check *and* at least one real `git` command was executed in the container since the exercise was loaded, as recorded in the server's execution log. Nothing is checked in the browser, so a simulated command cannot complete a task.

Seeded lesson commits are tagged with their exercise ids (`C0`, `C1`, …), which means commands from the lesson text such as `git cherry-pick C2` work against real git.

The terminal header has two extra controls. **Check task** re-runs the server-side verification on demand: it reports the evidence (real repository state plus the number of real `git` commands executed since the lesson loaded), marks the current exercise complete when it passes, and on the next press advances to the next task. **Hint** reveals the current exercise step by step in the terminal — first the goal, then the tip, and finally the exact commands to run in the container.

The terminal shows a real shell prompt in the `learner@git-workshop:~/repo$` form, following the session's working directory as you `cd` around.

## Stopping and resetting

```sh
docker compose down      # stop the container, keep practice repositories
docker compose down -v   # stop and delete the practice data volume
```

The named `git-workshop-data` volume keeps each session's repositories across container restarts. **Restart** rebuilds the current exercise's repository inside the container; **Progress → Clear Progress** also resets the recorded completions.

## Contact and contributions

Visit the [GitHub repository](https://github.com/kpoos/gitworkshop).

## Learning path

The app contains 43 command-checked exercises plus guided concept lessons. The bilingual path progresses from Git fundamentals to team delivery:

1. Configure global author name and email.
2. Set repository-local defaults and pull behavior.
3. Configure and inspect the `origin` remote.
4. What Git solves; working directory, staging area, and local repository.
5. Creating and switching to feature branches.
6. Merge versus rebase and their trade-offs.
7. Rebase practice.
8. Clone versus fetch versus pull.
9. Merge-conflict resolution.
10. Reset versus revert versus restore.
11. Cherry-picking a targeted fix.
12. A collaborative branch, review, and CI workflow.
13. Responding to an exposed credential.
14. Branching strategies for multiple teams and continuous delivery.

Concept lessons can be completed with **Next lesson**. Commit, branch, merge, rebase, and cherry-pick exercises use the interactive graph and the container-backed terminal; their completion is verified against the real repository state.

## Importing exercises

Select **Import** and choose a `.json`, `.yaml`, or `.yml` file. Imported exercises are appended to the learning path, saved in this browser's local storage, and synced to the container so their checks can be verified server-side too. Importing the same ID twice is rejected. The app accepts up to 200 imported exercises and 1 MB per file. Use **Restart** to reset the active exercise or **Remove** beside the import status to remove all imported exercises.

See [`custom-exercises.json`](./custom-exercises.json) and [`custom-exercises.yaml`](./custom-exercises.yaml) for ready-to-import examples. Both formats use a top-level `lessons` array. Every item requires a unique `id`, localized `title`, `description`, `goal`, and `hint`; localized strings may be a single string (same text in both languages) or an object with `hu` and `en` strings. `category`, `initial`, `branches`, and `current` are optional.

Each exercise has a `check` object. Supported checks:

- `{ "type": "commit-count", "minimum": 2 }` — require a number of new commits.
- `{ "type": "branch-ahead", "branch": "feature", "base": "main" }` — require the feature branch to advance from its base.
- `{ "type": "merge-commit", "branch": "main" }` — require a two-parent commit at the branch tip.
- `{ "type": "rebase", "branch": "feature", "onto": "main" }` — require the feature tip to be based on main.
- `{ "type": "cherry-pick", "branch": "main", "source": "C2", "onto": "C1" }` — require the selected change at the destination branch tip.

In a goal string, wrap values learners must supply in `[[double brackets]]` to highlight them distinctly. For example, `Set the email to \`[[learner@example.test]]\`.` renders the email as a highlighted value while keeping the command context in code style.

`initial` is an optional array of commit objects with `id`, `parents`, localized `message`, and optional `lane` (0–20). Parents must refer to earlier commits in the array, and branch names must point to an initial commit.

The YAML importer supports ordinary indented mappings/lists, quoted and plain scalars, comments, and `|`/`>` block strings. Tabs, anchors, tags, and other advanced YAML features are not supported. The importer validates files before adding them and reports errors in the interface.

## Terminal commands

The terminal runs in the container and accepts real programs from a fixed allowlist:

- `git …` — unrestricted real git: `status`, `log`, `config`, `remote`, `commit`, `branch`, `switch`, `merge`, `rebase`, `cherry-pick`, `clone`, `fetch`, `pull`, `reset`, `revert`, `restore`, and everything else git supports
- file helpers: `ls`, `pwd`, `cat`, `echo`, `mkdir`, `touch`, `rm`, `cp`, `mv`, `head`, `tail`, `wc`, `grep`, `stat`, `find`, `date`, `whoami`, `uname`, …
- `cd <directory>` — move inside your session workspace
- `clear` — clear the terminal output, `help` — list the common commands
- output redirection (`echo text > file.txt`, `>>`) and chaining with `&&`

Anything else (for example `bash` or `node`) is rejected with an error. The container is the sandbox: no host files and no Docker socket are mounted, the process runs as an unprivileged user, and the compose file applies memory, CPU, process, and capability limits. Git commands that need the network (`clone`, `fetch`, `pull`) run from inside the container, so a bad URL simply fails with git's own error message.

Configuration changes, remotes, and commits live in the session repository inside the container — they never touch your host machine's git configuration. Exercise progress (current lesson and verified tasks) is stored in the container volume and mirrored to your browser.
