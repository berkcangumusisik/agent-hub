---
name: agent-hub-init
description: Scaffold the agent-hub project profile (.claude/agent-hub/profile.yml + CLAUDE.md) for the current project so the super-team can specialize to it. Use when a project has no profile yet, or when the user says "onboard", "set up the team here", or "create the profile".
---

# agent-hub-init

Create a project profile so the super-team specializes to this codebase.

## Steps

1. **Detect the stack.** Inspect the repo to infer language, framework, package manager, database, and the real commands. Look at, as relevant:
   - `package.json` (scripts, deps) → Node/TS, framework, npm/pnpm/yarn
   - `pom.xml` / `build.gradle` → Java, Maven/Gradle, Spring
   - `pyproject.toml` / `requirements.txt` → Python (Django/FastAPI/Flask)
   - `pubspec.yaml` → Flutter/Dart; `app.json`/`expo` → React Native (Expo)
   - `go.mod` → Go; `Cargo.toml` → Rust
   - `Gemfile` → Ruby/Rails; `composer.json` → PHP/Laravel; `*.csproj` → C#/.NET
   - `Dockerfile`, `.github/workflows/`, CI config → devops target
   - existing `README.md` for run/test/build commands

   If a matching **starter template** exists in this plugin (`templates/profiles/`), use it as
   the baseline and adjust to what you actually find — faster and more accurate than from scratch.

1b. **Detect monorepos.** If you see workspaces (`pnpm-workspace.yaml`, `package.json`
   `workspaces`, multiple `apps/*` or `packages/*`, a Gradle multi-module build), say so. Either
   write one profile that names the sub-projects and their stacks, or recommend a profile per
   workspace package. Don't flatten a monorepo into a single wrong stack.

2. **Pick the active team.** Choose from the profile's stack:
   - backend project → `tech-lead, architect, backend-engineer, code-reviewer, qa-tester, security-reviewer`
   - frontend → `tech-lead, architect, frontend-engineer, code-reviewer, qa-tester`
   - mobile → `tech-lead, architect, mobile-engineer, code-reviewer, qa-tester`
   - fullstack → include backend + frontend
   - add `devops-engineer` when CI/containers exist, `tech-writer` when docs matter

3. **Write the files** (do not overwrite without confirming if they already exist):
   - `.claude/agent-hub/profile.yml` — fill every field you detected; leave unknowns as `""` and tell the user what to fill.
   - `.claude/CLAUDE.md` — short project context that imports the profile via `@.claude/agent-hub/profile.yml`, plus stack summary, key commands, and conventions.

   Use the templates in this plugin (`templates/project-profile/.claude/`) as the starting shape.

4. **Confirm.** Show the user the detected values and the chosen team, and ask them to correct anything wrong. Tell them they can now just open Claude Code in this folder and the team auto-specializes.
