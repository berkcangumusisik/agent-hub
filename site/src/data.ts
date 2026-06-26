export const REPO = "https://github.com/berkcangumusisik/agent-hub";

export const featureList = [
  { ico: "🧠", id: "aware" },
  { ico: "⚡", id: "autoload" },
  { ico: "🔍", id: "review" },
  { ico: "📝", id: "memory" },
  { ico: "👥", id: "team" },
  { ico: "📦", id: "stack" },
];

export type Role = { e: string; name: string; id: string; model?: string };

export const roster: Role[] = [
  { e: "🧭", name: "tech-lead", id: "tech-lead", model: "opus" },
  { e: "🏛", name: "architect", id: "architect", model: "opus" },
  { e: "⚙️", name: "backend-engineer", id: "backend" },
  { e: "🎨", name: "frontend-engineer", id: "frontend" },
  { e: "📱", name: "mobile-engineer", id: "mobile" },
  { e: "🚀", name: "devops-engineer", id: "devops" },
  { e: "🗄", name: "data-engineer", id: "data" },
  { e: "✨", name: "ux-designer", id: "ux", model: "opus" },
  { e: "🔍", name: "code-reviewer", id: "reviewer" },
  { e: "🧪", name: "qa-tester", id: "qa" },
  { e: "🔒", name: "security-reviewer", id: "security", model: "opus" },
  { e: "📝", name: "tech-writer", id: "writer" },
];

export const allSpecialists = roster.map((r) => r.name);

export type Harness = { id: string; name: string; icon: string; file: string; arg: string };
export const harnesses: Harness[] = [
  { id: "claude", name: "Claude Code", icon: "🤖", file: "plugin + CLAUDE.md", arg: "claude" },
  { id: "codex", name: "Codex", icon: "⌘", file: "AGENTS.md", arg: "codex" },
  { id: "cursor", name: "Cursor", icon: "▟", file: ".cursor/rules", arg: "cursor" },
  { id: "opencode", name: "OpenCode", icon: "◍", file: "AGENTS.md", arg: "opencode" },
  { id: "gemini", name: "Gemini CLI", icon: "✦", file: "GEMINI.md", arg: "gemini" },
  { id: "windsurf", name: "Windsurf", icon: "🏄", file: ".windsurfrules", arg: "windsurf" },
];

export const commands = ["onboard", "team", "review", "decide", "handoff"];

export const INSTALL_BASE = "curl -fsSL https://raw.githubusercontent.com/berkcangumusisik/agent-hub/main/install.sh | sh";

export const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`;
