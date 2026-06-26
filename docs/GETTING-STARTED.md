# Getting started with agent-hub

agent-hub gives every project a **project-aware specialist team** that works in whatever AI
coding harness you use. This guide takes you from zero to a working team in a few minutes.

## 1. Install

Pick whichever fits your setup:

**One line (any harness):**
```bash
curl -fsSL https://raw.githubusercontent.com/berkcangumusisik/agent-hub/main/install.sh | sh
```
Add `-s -- <harness>` to install just one: `claude`, `codex`, `cursor`, `gemini`,
`opencode`, or `windsurf`.

**Claude Code (real subagents):**
```
/plugin marketplace add berkcangumusisik/agent-hub
/plugin install super-team@agent-hub
```

The installer creates `.claude/agent-hub/profile.yml` and drops the right instruction file
for your harness (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, a Cursor rule, etc.).

## 2. Onboard the project

Open the repo with your agent and say **`onboard`** (or run `/onboard` in Claude Code). The
team inspects your codebase — `package.json`, `pom.xml`, `pyproject.toml`, `go.mod`,
`pubspec.yaml`, CI config — and fills the profile with your real stack and commands. Review
the detected values and fix anything wrong.

> Prefer to start from a template? Copy one from
> [`templates/profiles/`](../templates/profiles/) into `.claude/agent-hub/profile.yml`.

## 3. Work

Just describe what you want. The **tech-lead** breaks the request down and routes each part
to the right specialist, working in your project's stack and conventions.

Useful commands (slash-commands in Claude Code, plain words elsewhere):

| Command | What it does |
|---|---|
| `onboard` | Detect the stack and scaffold the profile |
| `team` | Show the roster and who's active here |
| `review` | Full-team review of your diff (correctness, security, tests, design) |
| `decide: <X>` | Record an architectural decision (ADR) the team will honor |
| `handoff` | Summarize the current state for the next session |

## 4. How specialization works

Every agent runs a **profile-first protocol**: before doing anything it reads
`.claude/agent-hub/profile.yml` and any ADRs in `.claude/agent-hub/decisions/`. That's why
the same roster behaves like a backend team in one repo and a frontend team in another — the
profile is the brain, the team is the body.

On **Claude Code** the roster is 12 real subagents that can run in parallel. On other
harnesses the single agent wears each specialist hat in turn — same protocol, same results,
slightly less parallelism.

## 5. Team memory

When you make a real architectural call, record it:

```
decide: use Redis for login rate limiting
```

This writes a short ADR to `.claude/agent-hub/decisions/`. Every future session reads it, so
the team never forgets *why* something was done — and won't quietly undo it.

## FAQ

**Do I have to fill the profile by hand?** No — `onboard` detects it. You just confirm.

**Does it work with my stack?** It's stack-agnostic; the team derives everything from your
profile. Starter profiles exist for Spring, Django, Next, Flutter, Go, and Expo.

**Can I use more than one harness?** Yes — run the installer with `all` (the default) and each
tool gets its own file from the same source.

---

Questions? Open a [Discussion](https://github.com/berkcangumusisik/agent-hub/discussions).
