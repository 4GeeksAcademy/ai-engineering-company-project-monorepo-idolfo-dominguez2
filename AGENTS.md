# Agent Instructions

## Required Session-Start Reading

At the start of every session, read all of these files before planning or changing project files:

1. `memory-bank/projectbrief.md` for the business problem, objectives, and project scope.
2. `memory-bank/techContext.md` for the confirmed stack, architectural direction, and technical constraints.
3. `memory-bank/progress.md` for the current state and planned next steps.
4. `BRIEFING.md` for Nexova's actual departments, processes, existing systems, and business constraints.

Also read any more-specific `AGENTS.md` or applicable instruction files for the paths involved in the task. Treat `BRIEFING.md` as the company source of truth and do not derive company facts from an unfilled template. Treat explicit developer instructions and current repository facts as authoritative if they conflict with stale memory-bank notes; update the notes only with developer authorization.

## Mandatory Pre-Commit Workflow

Complete these steps in order before every commit:

1. Re-read all three required memory-bank files, `BRIEFING.md`, and the applicable repository instructions. Confirm the change supports the project objective and respects Nexova's actual processes and constraints.
2. Inspect `git status --short` and the working diff. Identify pre-existing or unrelated changes and preserve them; do not include them in the commit.
3. Run the narrowest relevant tests, lint, type checks, or other validation available for the change. If a check cannot run, record the reason and the remaining risk.
4. Stage only the intended files by explicit path. Review the staged diff and run `git diff --cached --check`; confirm there are no unrelated changes, secrets, or personal/candidate data, and no protected paths without developer confirmation.
5. Commit only after steps 1-4 pass and the developer has requested a commit. If the developer has not requested one, leave the changes uncommitted and report validation status.

## Protected Paths

Do not create, edit, move, or delete the following without explicit confirmation from the human developer. This applies even when a task appears to imply permission; ask before touching a protected path unless the developer's request explicitly authorizes that path.

- `AGENTS.md` and `memory-bank/**` — repository operating guidance and project memory.
- `BRIEFING.md`, `CONTEXT.md`, and `company-choice.md` — assigned company source material, its working context summary, and project selection.
- `data/raw/**` — original source data, which may contain personal or confidential information.
- Credential and local-secret files, including `.env`, `.env.*`, `*.pem`, `*.key`, `*credentials*`, and `*secret*` in any directory. Never expose their contents in chat or commit them.
- `.git/**` — repository metadata and history.
- Dependency and generated-output directories: `node_modules/**`, `.venv/**`, `venv/**`, `dist/**`, `build/**`, `coverage/**`, `.next/**`, `__pycache__/**`, and `*.pyc` files.

A developer may explicitly authorize a specific protected path for a particular task. Authorization for one path does not authorize changes to other protected paths. Keep personal data and credentials out of commits even when access to a protected path is authorized.
