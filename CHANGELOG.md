# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- **Site & brand redesign** — refined dark/premium theme: single soft-indigo accent (no
  rainbow gradients, orbs, or grain), clean 1px-border cards, monogram harness logos, white
  primary buttons. Brand SVGs (banner, architecture, demo) recolored to match.

### Added
- Starter profiles for **Rails, .NET, Laravel, FastAPI, SvelteKit** (now 11 stacks).
- `onboard` now detects Ruby/PHP/.NET projects.

## [0.4.0] — 2026-06-26

### Added
- **Multi-harness support** — the team now installs across Claude Code, Codex, Cursor,
  OpenCode, Gemini, Windsurf, and anything that reads `AGENTS.md`, all generated from one
  source in `adapters/`.
- **One-line installers** — `install.sh` and `install.ps1` scaffold the profile and drop the
  right adapter file(s) for your harness.
- **Getting Started guide** (`docs/GETTING-STARTED.md`) and a **Turkish README**
  (`docs/tr/README.md`); README repositioned as a system, not a single plugin.
- Marketing site (`site/`, Vite + React + Tailwind) with an interactive profile builder,
  bilingual (EN/TR), deployed to GitHub Pages.

## [0.3.0] — 2026-06-26

### Added
- **SessionStart hook** that auto-loads the project profile into context, so the team
  specializes the moment you open Claude Code in a project.
- **`/review`** — orchestrated multi-agent code review (code-reviewer, security-reviewer,
  qa-tester, architect run in parallel and merge into one severity-grouped report).
- **Team memory** — `decision-log` skill and `/decide` command record ADRs under
  `.claude/agent-hub/decisions/`; agents read and honor them across sessions.
- **Starter profiles** for Spring Boot, Django, Next.js, Flutter, Go, and Expo in
  `templates/profiles/`.
- Smarter `/onboard`: deeper stack detection (Go, Rust, Expo, Django) and monorepo awareness.
- `validate.mjs` now checks `hooks/hooks.json` and that hook commands point to real files.

## [0.2.0] — 2026-06-22

### Added
- `data-engineer` specialist (pipelines, ETL, schema/warehouse modeling, migrations).
- `ux-designer` specialist (user flows, IA, interaction & accessibility specs).
- `handoff` skill and `/handoff` command to summarize session state for the next session.
- Release and stars badges in the README.

## [0.1.0] — 2026-06-22

### Added
- `super-team` plugin with a 10-specialist roster (tech-lead, architect, backend,
  frontend, mobile, devops, code-reviewer, qa-tester, security-reviewer, tech-writer).
- Per-project profile system (`.claude/agent-hub/profile.yml` + `CLAUDE.md`) so the same
  team specializes to each project.
- `agent-hub-init` and `load-profile` skills.
- `/onboard` and `/team` commands.
- Project profile template in `templates/project-profile/`.
- Zero-dependency validation script and CI workflow.

[Unreleased]: https://github.com/berkcangumusisik/agent-hub/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/berkcangumusisik/agent-hub/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/berkcangumusisik/agent-hub/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/berkcangumusisik/agent-hub/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/berkcangumusisik/agent-hub/releases/tag/v0.1.0
