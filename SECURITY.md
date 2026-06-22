# Security Policy

## Scope

agent-hub ships **prompts and configuration** for Claude Code — there is no runtime
server or network service. The main security considerations are:

- Agents operate on your local codebase with the tools Claude Code grants them.
- The `security-reviewer` agent is for **defensive, authorized** review only.

## Reporting a vulnerability

If you find a problem (e.g. an agent prompt that encourages unsafe actions, or a flaw in
the validation tooling), please open a private report via GitHub Security Advisories on
this repository, or open an issue without sensitive details and ask a maintainer to
follow up privately.

We aim to acknowledge reports within a few days.
