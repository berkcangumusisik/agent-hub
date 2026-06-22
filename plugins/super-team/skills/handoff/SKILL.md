---
name: handoff
description: Produce a concise session handoff so the next session (or teammate) can pick up instantly. Use when the user says "handoff", "wrap up", "summarize where we are", or at the end of a work session.
---

# handoff

Capture the state of the current work so it can be resumed cold.

## Steps

1. If a profile exists, read `.claude/agent-hub/profile.yml` for project context.
2. Produce a short, skimmable handoff with these sections:
   - **Goal** — what we're trying to achieve (one or two lines).
   - **Done** — what changed this session (files, decisions), with paths.
   - **Current state** — what works, what's verified, what's still broken.
   - **Next steps** — the concrete, ordered actions to take next.
   - **Open questions / risks** — anything blocking or undecided.
   - **How to run/test** — the exact commands from the profile.
3. Keep it tight — bullets, file paths, no filler. Optimize for someone with zero context.
4. Offer to save it to `.claude/agent-hub/handoff.md` (overwrite the previous one) so it persists for the next session. Only write the file if the user confirms.
