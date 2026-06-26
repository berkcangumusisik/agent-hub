#!/usr/bin/env sh
# agent-hub installer — set up the project-aware specialist team in this project,
# for your AI coding harness of choice.
#
#   curl -fsSL https://raw.githubusercontent.com/berkcangumusisik/agent-hub/main/install.sh | sh
#   curl -fsSL .../install.sh | sh -s -- cursor        # one harness
#   curl -fsSL .../install.sh | sh -s -- all           # every harness
#
# Harnesses: claude · codex · opencode · cursor · gemini · windsurf · all
set -eu

# Source of the files. Override AGENT_HUB_BASE to install from a fork or a local checkout
# (e.g. AGENT_HUB_BASE="file:///path/to/agent-hub").
BASE="${AGENT_HUB_BASE:-https://raw.githubusercontent.com/berkcangumusisik/agent-hub/main}"
HARNESS="${1:-all}"

c_cyan='\033[36m'; c_grn='\033[32m'; c_dim='\033[2m'; c_b='\033[1m'; c_0='\033[0m'
say() { printf "%b\n" "$1"; }

dl() { # dl <repo-path> <dest>
  if command -v curl >/dev/null 2>&1; then curl -fsSL "$BASE/$1" -o "$2"
  elif command -v wget >/dev/null 2>&1; then wget -qO "$2" "$BASE/$1"
  else say "${c_b}error:${c_0} need curl or wget"; exit 1; fi
}

say "${c_cyan}${c_b}agent-hub${c_0} — installing the team for: ${c_b}${HARNESS}${c_0}"

# 1) Universal project profile (never overwrite an existing one)
mkdir -p .claude/agent-hub
if [ -f .claude/agent-hub/profile.yml ]; then
  say "${c_dim}• profile.yml exists — keeping it${c_0}"
else
  dl "templates/project-profile/.claude/agent-hub/profile.yml" ".claude/agent-hub/profile.yml"
  say "${c_grn}✓${c_0} .claude/agent-hub/profile.yml"
fi

install_one() {
  case "$1" in
    claude)
      dl "adapters/CLAUDE.md" "CLAUDE.md"; say "${c_grn}✓${c_0} CLAUDE.md"
      say "${c_dim}  → also run in Claude Code: /plugin marketplace add berkcangumusisik/agent-hub && /plugin install super-team@agent-hub${c_0}" ;;
    codex|opencode)
      dl "adapters/AGENTS.md" "AGENTS.md"; say "${c_grn}✓${c_0} AGENTS.md" ;;
    gemini)
      dl "adapters/GEMINI.md" "GEMINI.md"; say "${c_grn}✓${c_0} GEMINI.md" ;;
    cursor)
      mkdir -p .cursor/rules
      dl "adapters/cursor.mdc" ".cursor/rules/agent-hub.mdc"; say "${c_grn}✓${c_0} .cursor/rules/agent-hub.mdc" ;;
    windsurf)
      dl "adapters/windsurfrules.md" ".windsurfrules"; say "${c_grn}✓${c_0} .windsurfrules" ;;
    copilot)
      mkdir -p .github
      dl "adapters/copilot.md" ".github/copilot-instructions.md"; say "${c_grn}✓${c_0} .github/copilot-instructions.md" ;;
    cline)
      dl "adapters/clinerules.md" ".clinerules"; say "${c_grn}✓${c_0} .clinerules" ;;
    zed)
      dl "adapters/zed.md" ".rules"; say "${c_grn}✓${c_0} .rules" ;;
    *)
      say "${c_b}unknown harness:${c_0} $1 (use: claude codex opencode cursor gemini windsurf copilot cline zed all)"; exit 1 ;;
  esac
}

if [ "$HARNESS" = "all" ]; then
  dl "adapters/AGENTS.md" "AGENTS.md";        say "${c_grn}✓${c_0} AGENTS.md (Codex, OpenCode, Cursor, Copilot…)"
  dl "adapters/CLAUDE.md" "CLAUDE.md";        say "${c_grn}✓${c_0} CLAUDE.md (Claude Code)"
  dl "adapters/GEMINI.md" "GEMINI.md";        say "${c_grn}✓${c_0} GEMINI.md (Gemini CLI)"
  mkdir -p .cursor/rules
  dl "adapters/cursor.mdc" ".cursor/rules/agent-hub.mdc"; say "${c_grn}✓${c_0} .cursor/rules/agent-hub.mdc (Cursor)"
  dl "adapters/windsurfrules.md" ".windsurfrules";        say "${c_grn}✓${c_0} .windsurfrules (Windsurf)"
  mkdir -p .github
  dl "adapters/copilot.md" ".github/copilot-instructions.md"; say "${c_grn}✓${c_0} .github/copilot-instructions.md (Copilot)"
  dl "adapters/clinerules.md" ".clinerules";              say "${c_grn}✓${c_0} .clinerules (Cline / Roo)"
  dl "adapters/zed.md" ".rules";                          say "${c_grn}✓${c_0} .rules (Zed)"
else
  install_one "$HARNESS"
fi

say ""
say "${c_grn}${c_b}Done.${c_0} Open your repo with your agent and say ${c_b}\"onboard\"${c_0} to fill the profile."
say "${c_dim}Docs: https://github.com/berkcangumusisik/agent-hub${c_0}"
