# Contributing to agent-hub

Thanks for helping build the super-team! Contributions of every size are welcome —
a new specialist agent, a better prompt, an example profile, docs, or a bug fix.

## Ways to contribute

- **Improve an agent** — sharpen a specialist's prompt in `plugins/super-team/agents/`.
- **Add a specialist** — a new role the team is missing (see below).
- **Add a starter template** — a profile for a common stack in `templates/`.
- **Docs & polish** — README, guides, typos.

## Adding a new agent

1. Create `plugins/super-team/agents/<name>.md` with frontmatter:
   ```yaml
   ---
   name: <kebab-case-name>
   description: <when this agent should be used — be specific, this drives routing>
   model: opus | sonnet | haiku | inherit
   ---
   ```
2. Every agent MUST start with the **Profile-first protocol**: read
   `.claude/agent-hub/profile.yml` and `CLAUDE.md` before acting. Copy the pattern from
   an existing agent.
3. Keep the body focused: role, how it works, what it outputs, when it hands off.
4. Add the role to the README roster table.

## Validate before you push

```bash
node scripts/validate.mjs
```

CI runs the same check on every PR. Keep it green.

## Conventions

- Agents are profile-aware, never assume a stack.
- One specialist = one clear responsibility. If two roles overlap, merge or split cleanly.
- Match the existing tone: concise, decisive, no filler.

## PRs

Small, focused PRs merge fastest. Describe the motivation and what changed. By
contributing you agree your work is licensed under the repo's [MIT License](LICENSE).
