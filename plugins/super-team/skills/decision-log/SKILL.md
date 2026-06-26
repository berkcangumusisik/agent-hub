---
name: decision-log
description: Record and read architectural decisions (ADRs) for a project so the team's choices persist across sessions. Use when the user says "decide", "record this decision", "why did we choose X", or when a significant technical choice is made.
---

# decision-log

Maintain a lightweight ADR log at `.claude/agent-hub/decisions/` — the team's memory.

## Recording a decision

1. Create `.claude/agent-hub/decisions/` if it doesn't exist.
2. Find the next number: count existing `NNNN-*.md` files and increment (start at `0001`).
3. Write `.claude/agent-hub/decisions/NNNN-<kebab-title>.md` with these sections:
   - **Title**, **Status** (Accepted), **Date** (absolute, e.g. 2026-06-26), **Deciders**
   - **Context** — the problem and forces at play
   - **Decision** — what was chosen
   - **Alternatives considered** — each option and why not
   - **Consequences** — trade-offs, what gets easier/harder
   Keep it short and concrete.
4. Confirm the saved path back to the user.

## Reading decisions

When orienting to a project (or asked "why did we do X"), read the files under
`.claude/agent-hub/decisions/` and **honor them** — do not silently contradict an accepted
decision. If new work conflicts with one, flag it and propose superseding the ADR.
