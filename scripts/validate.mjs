#!/usr/bin/env node
// Validates the marketplace, plugin manifests, agents, skills and commands.
// Zero dependencies — runs on a stock Node. Exits non-zero on any error.
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const ok = [];
const ALLOWED_MODELS = ["opus", "sonnet", "haiku", "fable", "inherit"];

const fail = (m) => errors.push(m);
const pass = (m) => ok.push(m);

function readJSON(rel) {
  try {
    return JSON.parse(readFileSync(join(root, rel), "utf8"));
  } catch (e) {
    fail(`${rel}: invalid JSON — ${e.message}`);
    return null;
  }
}

// Minimal YAML frontmatter parser (top-level key: value only).
function frontmatter(rel) {
  const txt = readFileSync(join(root, rel), "utf8");
  const m = txt.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return null;
  const out = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].trim();
  }
  return out;
}

// 1) marketplace.json
const mkt = readJSON(".claude-plugin/marketplace.json");
if (mkt) {
  if (!mkt.name) fail("marketplace.json: missing 'name'");
  if (!mkt.owner?.name) fail("marketplace.json: missing 'owner.name'");
  if (!Array.isArray(mkt.plugins) || mkt.plugins.length === 0)
    fail("marketplace.json: 'plugins' must be a non-empty array");
  else pass(`marketplace '${mkt.name}' with ${mkt.plugins.length} plugin(s)`);

  for (const p of mkt.plugins ?? []) {
    if (!p.name) fail("marketplace.json: a plugin entry is missing 'name'");
    if (!p.source) fail(`plugin '${p.name}': missing 'source'`);
    const base = typeof p.source === "string" ? p.source.replace(/^\.\//, "") : null;
    if (base) {
      const manifest = join(base, ".claude-plugin", "plugin.json");
      if (!existsSync(join(root, manifest)))
        fail(`plugin '${p.name}': ${manifest} not found`);
      else {
        const pj = readJSON(manifest);
        if (pj && !pj.name) fail(`${manifest}: missing 'name'`);
        else if (pj) pass(`plugin manifest '${pj.name}' v${pj.version ?? "?"}`);
        validatePluginDir(base);
      }
    }
  }
}

function listMd(dir) {
  const abs = join(root, dir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs).filter((f) => f.endsWith(".md")).map((f) => join(dir, f));
}

function validatePluginDir(base) {
  // agents
  for (const rel of listMd(join(base, "agents"))) {
    const fm = frontmatter(rel);
    if (!fm) { fail(`${rel}: missing frontmatter`); continue; }
    if (!fm.name) fail(`${rel}: missing 'name'`);
    if (!fm.description) fail(`${rel}: missing 'description'`);
    if (fm.model && !ALLOWED_MODELS.includes(fm.model))
      fail(`${rel}: invalid model '${fm.model}' (allowed: ${ALLOWED_MODELS.join(", ")})`);
  }
  const agents = listMd(join(base, "agents")).length;
  if (agents) pass(`${agents} agent(s) valid`);

  // commands
  for (const rel of listMd(join(base, "commands"))) {
    const fm = frontmatter(rel);
    if (!fm?.description) fail(`${rel}: missing 'description' in frontmatter`);
  }

  // skills
  const skillsDir = join(root, base, "skills");
  if (existsSync(skillsDir)) {
    for (const name of readdirSync(skillsDir)) {
      const p = join(skillsDir, name);
      if (!statSync(p).isDirectory()) continue;
      const rel = join(base, "skills", name, "SKILL.md");
      if (!existsSync(join(root, rel))) { fail(`${rel}: SKILL.md not found`); continue; }
      const fm = frontmatter(rel);
      if (!fm?.name) fail(`${rel}: missing 'name'`);
      if (!fm?.description) fail(`${rel}: missing 'description'`);
    }
  }
}

// report
for (const o of ok) console.log(`✓ ${o}`);
if (errors.length) {
  console.error("\nValidation failed:");
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log("\nAll checks passed.");
