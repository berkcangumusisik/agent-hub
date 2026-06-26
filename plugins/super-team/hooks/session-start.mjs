#!/usr/bin/env node
// SessionStart hook: if the current project has an agent-hub profile, inject a short
// summary into context so the super-team specializes to this project immediately.
// Stays silent (no output) when there is no profile. Zero dependencies.
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dir = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const profile = join(dir, ".claude", "agent-hub", "profile.yml");

if (!existsSync(profile)) process.exit(0);

let lines = [];
try {
  lines = readFileSync(profile, "utf8").split("\n");
} catch {
  process.exit(0);
}

// minimal field read: first top-level occurrence of `key: value`
const get = (k) => {
  const re = new RegExp(`^\\s*${k}:\\s*(\\S.*)$`);
  for (const l of lines) {
    const m = l.match(re);
    if (m) return m[1].replace(/\s+#.*$/, "").trim().replace(/^["']|["']$/g, "");
  }
  return "";
};

// team.active list parse
const team = [];
let inTeam = false, inActive = false;
for (const l of lines) {
  if (/^\S/.test(l)) { inTeam = /^team:/.test(l); inActive = false; }
  else if (inTeam && /^\s+active:/.test(l)) inActive = true;
  else if (inActive) {
    const m = l.match(/^\s*-\s*(.+?)\s*$/);
    if (m) team.push(m[1].replace(/\s+#.*$/, "").trim());
    else if (/^\s{0,2}\S/.test(l)) inActive = false;
  }
}

const name = get("name");
const type = get("type");
const stack = [get("language"), get("framework"), get("database")].filter(Boolean).join(" · ");

let decisions = 0;
const dd = join(dir, ".claude", "agent-hub", "decisions");
if (existsSync(dd)) {
  try {
    decisions = readdirSync(dd).filter((f) => /^\d+.*\.md$/.test(f)).length;
  } catch { /* ignore */ }
}

const out = ["🧠 agent-hub profile loaded — specialize to this project."];
out.push(`Project: ${name || "(unnamed)"}${type ? ` (${type})` : ""}`);
if (stack) out.push(`Stack: ${stack}`);
if (team.length) out.push(`Active team: ${team.join(", ")}`);
if (decisions) out.push(`Decision log: ${decisions} ADR(s) in .claude/agent-hub/decisions/ — honor them.`);
out.push("Every specialist must read .claude/agent-hub/profile.yml before acting.");

const payload = {
  hookSpecificOutput: {
    hookEventName: "SessionStart",
    additionalContext: out.join("\n"),
  },
};
console.log(JSON.stringify(payload));
