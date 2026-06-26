# Adapters

One team, every harness. Each file here is the agent-hub team brief for a specific AI coding
tool; `install.sh` / `install.ps1` copies the right one(s) into your project.

| Source file | Installs to | Harness |
|---|---|---|
| `AGENTS.md` | `AGENTS.md` | Codex, OpenCode, and any tool that reads `AGENTS.md` |
| `CLAUDE.md` | `CLAUDE.md` | Claude Code (plus the plugin for real subagents) |
| `GEMINI.md` | `GEMINI.md` | Gemini CLI |
| `cursor.mdc` | `.cursor/rules/agent-hub.mdc` | Cursor |
| `windsurfrules.md` | `.windsurfrules` | Windsurf |
| `copilot.md` | `.github/copilot-instructions.md` | GitHub Copilot |
| `clinerules.md` | `.clinerules` | Cline / Roo Code |
| `zed.md` | `.rules` | Zed |

All adapters share the same protocol: **read the profile, operate as the team, self-review.**
The canonical, fullest version is [`AGENTS.md`](AGENTS.md) — keep the others in sync with it.
