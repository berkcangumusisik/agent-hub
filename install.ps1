# agent-hub installer (Windows / PowerShell)
#
#   irm https://raw.githubusercontent.com/berkcangumusisik/agent-hub/main/install.ps1 | iex
#   $env:HARNESS="cursor"; irm .../install.ps1 | iex     # one harness
#
# Harnesses: claude codex opencode cursor gemini windsurf all
$ErrorActionPreference = "Stop"
$Base = "https://raw.githubusercontent.com/berkcangumusisik/agent-hub/main"
$Harness = if ($env:HARNESS) { $env:HARNESS } elseif ($args.Count -gt 0) { $args[0] } else { "all" }

function Dl($path, $dest) {
  $dir = Split-Path -Parent $dest
  if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  Invoke-WebRequest -UseBasicParsing -Uri "$Base/$path" -OutFile $dest
}

Write-Host "agent-hub — installing the team for: $Harness" -ForegroundColor Cyan

New-Item -ItemType Directory -Force -Path ".claude/agent-hub" | Out-Null
if (Test-Path ".claude/agent-hub/profile.yml") {
  Write-Host "• profile.yml exists — keeping it" -ForegroundColor DarkGray
} else {
  Dl "templates/project-profile/.claude/agent-hub/profile.yml" ".claude/agent-hub/profile.yml"
  Write-Host "OK  .claude/agent-hub/profile.yml" -ForegroundColor Green
}

function Install-One($h) {
  switch ($h) {
    "claude"   { Dl "adapters/CLAUDE.md" "CLAUDE.md"; Write-Host "OK  CLAUDE.md" -ForegroundColor Green;
                 Write-Host "  -> in Claude Code: /plugin marketplace add berkcangumusisik/agent-hub && /plugin install super-team@agent-hub" -ForegroundColor DarkGray }
    {$_ -in "codex","opencode"} { Dl "adapters/AGENTS.md" "AGENTS.md"; Write-Host "OK  AGENTS.md" -ForegroundColor Green }
    "gemini"   { Dl "adapters/GEMINI.md" "GEMINI.md"; Write-Host "OK  GEMINI.md" -ForegroundColor Green }
    "cursor"   { Dl "adapters/cursor.mdc" ".cursor/rules/agent-hub.mdc"; Write-Host "OK  .cursor/rules/agent-hub.mdc" -ForegroundColor Green }
    "windsurf" { Dl "adapters/windsurfrules.md" ".windsurfrules"; Write-Host "OK  .windsurfrules" -ForegroundColor Green }
    default    { Write-Host "unknown harness: $h" -ForegroundColor Yellow; exit 1 }
  }
}

if ($Harness -eq "all") {
  Dl "adapters/AGENTS.md" "AGENTS.md";        Write-Host "OK  AGENTS.md (Codex, OpenCode, Cursor, Copilot...)" -ForegroundColor Green
  Dl "adapters/CLAUDE.md" "CLAUDE.md";        Write-Host "OK  CLAUDE.md (Claude Code)" -ForegroundColor Green
  Dl "adapters/GEMINI.md" "GEMINI.md";        Write-Host "OK  GEMINI.md (Gemini CLI)" -ForegroundColor Green
  Dl "adapters/cursor.mdc" ".cursor/rules/agent-hub.mdc"; Write-Host "OK  .cursor/rules/agent-hub.mdc (Cursor)" -ForegroundColor Green
  Dl "adapters/windsurfrules.md" ".windsurfrules";        Write-Host "OK  .windsurfrules (Windsurf)" -ForegroundColor Green
} else {
  Install-One $Harness
}

Write-Host ""
Write-Host "Done. Open your repo with your agent and say `"onboard`" to fill the profile." -ForegroundColor Green
Write-Host "Docs: https://github.com/berkcangumusisik/agent-hub" -ForegroundColor DarkGray
