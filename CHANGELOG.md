# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Marketing site in `site/` — Vite + React + TS + Tailwind, with an interactive profile
  builder. Deployed to GitHub Pages via the `deploy-site` workflow.

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

[Unreleased]: https://github.com/berkcangumusisik/agent-hub/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/berkcangumusisik/agent-hub/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/berkcangumusisik/agent-hub/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/berkcangumusisik/agent-hub/releases/tag/v0.1.0
