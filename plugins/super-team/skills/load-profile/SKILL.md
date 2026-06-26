---
name: load-profile
description: Read the current project's agent-hub profile and orient the team to this project's stack, commands, and conventions. Use at the start of a work session, when the user asks "what stack is this / who's on the team here", or before delegating substantial work.
---

# load-profile

Orient to the current project before doing work.

## Steps

1. Read `.claude/agent-hub/profile.yml`. If it does not exist, tell the user there's no profile and suggest the `agent-hub-init` skill (or `/onboard`). Stop.
2. Read `.claude/CLAUDE.md` if present for extra context and conventions.
3. Read any recorded decisions under `.claude/agent-hub/decisions/` (the team's memory). Honor accepted ADRs — never silently contradict one.
4. Summarize back, briefly:
   - Project name, type, and stack (language / framework / database).
   - The real commands (install/dev/test/lint/build).
   - The active team members and what they cover.
   - Any `conventions`, `doNot` rules, and key decisions on record.
5. Hold this context for the session. When delegating, only invoke specialists listed in `team.active`, and pass them the relevant profile facts.

This is the bridge that makes the same super-team behave differently from one project to the next.
