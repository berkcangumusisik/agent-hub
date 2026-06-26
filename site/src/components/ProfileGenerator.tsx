import { useMemo, useState } from "react";
import { allSpecialists } from "../data";
import { useI18n } from "../i18n";

type Fields = {
  name: string;
  type: string;
  language: string;
  framework: string;
  database: string;
  packageManager: string;
  install: string;
  test: string;
};

const PRESETS: Record<string, Partial<Fields> & { team?: string[] }> = {
  "NestJS (TS)": { type: "backend", language: "TypeScript", framework: "NestJS", database: "PostgreSQL", packageManager: "pnpm", install: "pnpm install", test: "pnpm test", team: ["tech-lead", "architect", "backend-engineer", "code-reviewer", "security-reviewer", "qa-tester"] },
  "Next.js (TS)": { type: "frontend", language: "TypeScript", framework: "Next.js", database: "", packageManager: "pnpm", install: "pnpm install", test: "pnpm test", team: ["tech-lead", "architect", "frontend-engineer", "ux-designer", "code-reviewer", "qa-tester"] },
  "Spring Boot": { type: "backend", language: "Java", framework: "Spring Boot", database: "PostgreSQL", packageManager: "maven", install: "./mvnw install", test: "./mvnw test", team: ["tech-lead", "architect", "backend-engineer", "code-reviewer", "security-reviewer", "qa-tester"] },
  "Flutter": { type: "mobile", language: "Dart", framework: "Flutter", database: "", packageManager: "pub", install: "flutter pub get", test: "flutter test", team: ["tech-lead", "architect", "mobile-engineer", "ux-designer", "code-reviewer", "qa-tester"] },
};

const initial: Fields = {
  name: "my-service",
  type: "backend",
  language: "TypeScript",
  framework: "NestJS",
  database: "PostgreSQL",
  packageManager: "pnpm",
  install: "pnpm install",
  test: "pnpm test",
};

function toYaml(f: Fields, team: string[]): string {
  const q = (v: string) => (v ? v : '""');
  return [
    `project:`,
    `  name: ${q(f.name)}`,
    `  type: ${q(f.type)}`,
    `stack:`,
    `  language: ${q(f.language)}`,
    `  framework: ${q(f.framework)}`,
    `  database: ${q(f.database)}`,
    `  packageManager: ${q(f.packageManager)}`,
    `commands:`,
    `  install: ${q(f.install)}`,
    `  test: ${q(f.test)}`,
    `team:`,
    `  active: [${team.join(", ")}]`,
  ].join("\n");
}

const field = "w-full rounded-lg border border-edge bg-ink px-3 py-2 text-sm text-txt outline-none focus:border-violet";
const label = "mb-1 block text-xs font-medium text-mut";

export default function ProfileGenerator() {
  const { t } = useI18n();
  const [f, setF] = useState<Fields>(initial);
  const [team, setTeam] = useState<string[]>(["tech-lead", "architect", "backend-engineer", "code-reviewer", "security-reviewer", "qa-tester"]);
  const [copied, setCopied] = useState(false);

  const yaml = useMemo(() => toYaml(f, team), [f, team]);
  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const applyPreset = (name: string) => {
    const p = PRESETS[name];
    if (!p) return;
    setF({ ...initial, ...p, name: f.name });
    if (p.team) setTeam(p.team);
  };

  const toggle = (s: string) => setTeam((t) => (t.includes(s) ? t.filter((x) => x !== s) : [...t, s]));

  const copy = () => {
    navigator.clipboard.writeText(yaml).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const download = () => {
    const blob = new Blob([yaml + "\n"], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "profile.yml";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid items-start gap-5 lg:grid-cols-2">
      <div className="gcard min-w-0 p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {Object.keys(PRESETS).map((p) => (
            <button key={p} onClick={() => applyPreset(p)} className="rounded-full border border-edge px-3 py-1 text-xs text-mut transition hover:border-violet hover:text-txt">
              {p}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2"><label className={label}>{t("gen.projectName")}</label><input className={field} value={f.name} onChange={set("name")} /></div>
          <div>
            <label className={label}>{t("gen.type")}</label>
            <select className={field} value={f.type} onChange={set("type")}>
              {["backend", "frontend", "mobile", "fullstack", "library"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div><label className={label}>{t("gen.language")}</label><input className={field} value={f.language} onChange={set("language")} /></div>
          <div><label className={label}>{t("gen.framework")}</label><input className={field} value={f.framework} onChange={set("framework")} /></div>
          <div><label className={label}>{t("gen.database")}</label><input className={field} value={f.database} onChange={set("database")} /></div>
          <div><label className={label}>{t("gen.pm")}</label><input className={field} value={f.packageManager} onChange={set("packageManager")} /></div>
          <div><label className={label}>{t("gen.install")}</label><input className={field} value={f.install} onChange={set("install")} /></div>
          <div className="sm:col-span-2"><label className={label}>{t("gen.test")}</label><input className={field} value={f.test} onChange={set("test")} /></div>
        </div>
        <div className="mt-4">
          <label className={label}>{t("gen.activeTeam")}</label>
          <div className="flex flex-wrap gap-2">
            {allSpecialists.map((s) => (
              <button key={s} onClick={() => toggle(s)} className={`rounded-full border px-3 py-1 text-xs transition ${team.includes(s) ? "border-violet bg-violet/10 text-txt" : "border-edge text-mut hover:text-txt"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="gcard flex min-w-0 flex-col p-6 lg:sticky lg:top-20">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-xs text-mut">.claude/agent-hub/profile.yml</span>
          <div className="flex gap-2">
            <button onClick={copy} className="rounded-lg border border-edge px-3 py-1 text-xs text-mut transition hover:border-violet hover:text-txt">{copied ? t("copied") : t("copy")}</button>
            <button onClick={download} className="rounded-lg border border-edge px-3 py-1 text-xs text-mut transition hover:border-violet hover:text-txt">{t("gen.download")}</button>
          </div>
        </div>
        <pre className="min-h-[280px] w-full min-w-0 flex-1 overflow-auto rounded-lg border border-edge bg-ink p-4 font-mono text-[13px] leading-relaxed text-txt"><code>{yaml}</code></pre>
        <p className="mt-3 text-xs text-mut">{t("gen.note")}</p>
      </div>
    </div>
  );
}
