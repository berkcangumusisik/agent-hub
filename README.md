<div align="center">

**Language:** English · [Türkçe](docs/tr/README.md)

![agent-hub](docs/banner.svg)

### The project-aware agent team for every harness.

**Not just configs — a system.** Install once and every project gets a 12-role specialist
team that adapts to *that* project's stack, reviews your diffs, and remembers your decisions.
Works across **Claude Code, Codex, Cursor, OpenCode, Gemini, Windsurf, GitHub Copilot, Cline,
Zed** — and anything that reads `AGENTS.md`.

[![validate](https://github.com/berkcangumusisik/agent-hub/actions/workflows/validate.yml/badge.svg)](https://github.com/berkcangumusisik/agent-hub/actions/workflows/validate.yml)
[![release](https://img.shields.io/github/v/release/berkcangumusisik/agent-hub?color=22d3ee&label=release)](https://github.com/berkcangumusisik/agent-hub/releases)
[![stars](https://img.shields.io/github/stars/berkcangumusisik/agent-hub?style=flat&color=818cf8)](https://github.com/berkcangumusisik/agent-hub/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-22d3ee.svg)](LICENSE)
![harnesses](https://img.shields.io/badge/harnesses-9%2B-a78bfa)

[🌐 Website](https://berkcangumusisik.github.io/agent-hub/) · [Quick start](#-quick-start) · [How it works](#-how-it-works) · [Harnesses](#-supported-harnesses) · [Guide](docs/GETTING-STARTED.md) · [Contribute](CONTRIBUTING.md)

</div>

---

## ✨ The idea

You don't want a different assistant per project, or a different setup per tool. You want
**one great team** that knows which project it's in — and works in whatever harness you use.

> Open your backend repo → the team thinks in your backend stack.
> Open your web repo → the same team thinks frontend.
> Same roster. Different brain. **Zero manual switching.**

Three things make it a *system*, not a pile of prompts:

- **🧠 Project-aware** — every agent reads a tiny per-project `profile.yml` before acting.
- **📝 Memory** — decisions are recorded as ADRs the whole team reads and honors.
- **⚡ Auto-load** — the profile loads the moment you open the project.

## 🆚 Why agent-hub

| | A pile of agent prompts | **agent-hub** |
|---|---|---|
| Per-project fit | You re-explain the stack every time | Reads a `profile.yml` automatically |
| Memory | Forgets decisions between sessions | Records & honors ADRs |
| Consistency | Different setup per repo & per tool | One team, every repo, every harness |
| Orchestration | You route the work | `tech-lead` decomposes & delegates |
| Quality gate | Ad-hoc | Built-in `code-reviewer` + `security-reviewer` |
| Portability | Locked to one tool | Claude Code, Codex, Cursor, Gemini, Copilot… |

## 🚀 Quick start

**One line — any harness:**

```bash
curl -fsSL https://raw.githubusercontent.com/berkcangumusisik/agent-hub/main/install.sh | sh
```

This scaffolds the project profile and installs the team for every supported harness. Want
just one? Pass it: `… | sh -s -- cursor` (or `claude`, `codex`, `gemini`, `opencode`,
`windsurf`).

**Windows (PowerShell):**

```powershell
irm https://raw.githubusercontent.com/berkcangumusisik/agent-hub/main/install.ps1 | iex
```

**Claude Code (richest experience — real subagents):**

```
/plugin marketplace add berkcangumusisik/agent-hub
/plugin install super-team@agent-hub
```

Then open your repo with your agent and say **“onboard”** — it detects your stack and fills
the profile. From there, just describe what you want; the **tech-lead** routes the work.

## 🧰 Supported harnesses

| Harness | What gets installed |
|---|---|
| **Claude Code** | Plugin with 12 real subagents + `CLAUDE.md` |
| **Codex** | `AGENTS.md` |
| **Cursor** | `.cursor/rules/agent-hub.mdc` |
| **OpenCode** | `AGENTS.md` |
| **Gemini CLI** | `GEMINI.md` |
| **Windsurf** | `.windsurfrules` |
| **GitHub Copilot** | `.github/copilot-instructions.md` |
| **Cline / Roo** | `.clinerules` |
| **Zed** | `.rules` |
| **Anything else that reads `AGENTS.md`** | `AGENTS.md` |

One source of truth in [`adapters/`](adapters/) generates each harness's file.

## 🎬 See it

<div align="center">

![agent-hub demo — install, onboard, and the team routing work](docs/demo.gif)

*One line installs the team; `onboard` detects your stack; `tech-lead` routes the work.*

</div>

## 🧠 How it works

![architecture](docs/architecture.svg)

Two layers: a universal **team** (this repo) and a per-project **profile**. Every agent runs a
*profile-first protocol* — read the profile and decisions, then act in that project's idioms.
Read the full walkthrough in the **[Getting Started guide](docs/GETTING-STARTED.md)**.

## 👥 The roster

| Agent | Role | Model |
|---|---|---|
| `tech-lead` | Orchestrator — decomposes work, routes to specialists | `opus` |
| `architect` | System design, data models, API contracts | `opus` |
| `backend-engineer` | APIs, business logic, persistence | `sonnet` |
| `frontend-engineer` | Web UI, state, accessibility, performance | `sonnet` |
| `mobile-engineer` | Native / cross-platform mobile | `sonnet` |
| `devops-engineer` | CI/CD, infra, observability | `sonnet` |
| `data-engineer` | Pipelines, ETL, schema, migrations | `sonnet` |
| `ux-designer` | User flows, IA, accessibility | `opus` |
| `code-reviewer` | Correctness, bugs, maintainability | `sonnet` |
| `qa-tester` | Test plans and test code | `haiku` |
| `security-reviewer` | Vulnerabilities, authz/authn, secrets | `opus` |
| `tech-writer` | Docs, READMEs, changelogs | `haiku` |

(On non-Claude harnesses the single agent wears these hats; on Claude Code they're real,
parallel subagents.)

## ⌨️ Commands

`onboard` · `team` · `review` · `decide: <X>` · `handoff` — available as `/commands` in Claude
Code, or as plain words in any harness reading `AGENTS.md`.

## 📄 The profile

`.claude/agent-hub/profile.yml` is the single source of truth the team reads first:

```yaml
project: { name: my-service, type: backend }
stack: { language: TypeScript, framework: NestJS, database: PostgreSQL }
commands: { install: pnpm install, test: pnpm test }
team:
  active: [tech-lead, architect, backend-engineer, code-reviewer, security-reviewer]
conventions:
  - Use the repository pattern for data access
doNot:
  - Never expose entities directly in API responses
```

Starter profiles for common stacks live in [`templates/profiles/`](templates/profiles/).

## 🗂 Repo layout

```text
agent-hub/
├── install.sh · install.ps1            # one-line installers
├── adapters/                           # one source → AGENTS.md, CLAUDE.md, GEMINI.md, cursor, windsurf
├── plugins/super-team/                 # Claude Code plugin (12 subagents, skills, hooks, commands)
├── templates/                          # per-project profile + starter stacks
├── docs/                               # guide, diagrams, website
├── site/                               # marketing site (Vite + React)
└── scripts/validate.mjs                # zero-dep CI validation
```

## 🤝 Contributing & community

PRs welcome — a sharper agent prompt, a new harness adapter, a starter profile. See
[CONTRIBUTING.md](CONTRIBUTING.md). Questions and show-and-tell go in
[Discussions](https://github.com/berkcangumusisik/agent-hub/discussions).

## ⭐ Like it?

If agent-hub saves you time, **star the repo** — it helps others find it.

## 📝 License

[MIT](LICENSE) © [Berkcan Gümüşışık](https://github.com/berkcangumusisik)
