---
description: Run a full team code review of the current diff — correctness, security, tests, and design — in parallel, merged into one report.
---

Run a multi-specialist review of the current changes.

1. Determine the diff: uncommitted changes, or the current branch vs the main branch if the
   working tree is clean. Read the changed code.
2. In parallel, delegate to these specialists (spawn them as subagents), each scoped to the diff:
   - **code-reviewer** → correctness, bugs, maintainability
   - **security-reviewer** → vulnerabilities, authz/authn, secrets, data exposure
   - **qa-tester** → missing test coverage and risky edge cases
   - **architect** → design/contract concerns and simpler alternatives
3. Each specialist follows the Profile-first protocol (reads `.claude/agent-hub/profile.yml`),
   so the review respects this project's stack and conventions.
4. Merge every finding into ONE de-duplicated report, grouped by severity
   (**Blocking / Should-fix / Nit**), each with `file:line` and a concrete fix.
5. End with a one-line verdict: **ship** or **fix-first**.

$ARGUMENTS
