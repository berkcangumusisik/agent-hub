import { useState } from "react";
import { harnesses, INSTALL_BASE } from "../data";
import { useI18n } from "../i18n";

const tabs = [{ id: "all", name: "All", arg: "", icon: "✸" }, ...harnesses];

export default function InstallTabs() {
  const { t } = useI18n();
  const [sel, setSel] = useState("all");
  const [copied, setCopied] = useState("");

  const active = tabs.find((x) => x.id === sel)!;
  const cmd = active.arg ? `${INSTALL_BASE} -s -- ${active.arg}` : INSTALL_BASE;
  const lines = sel === "claude"
    ? [cmd, "# or, for real subagents inside Claude Code:", "/plugin marketplace add berkcangumusisik/agent-hub", "/plugin install super-team@agent-hub"]
    : [cmd];

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(""), 1500);
    });
  };

  return (
    <div className="mx-auto max-w-3xl">
      <p className="mb-3 text-center text-xs font-medium uppercase tracking-wide text-mut">{t("install.pick")}</p>
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {tabs.map((x) => (
          <button
            key={x.id}
            onClick={() => setSel(x.id)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition ${sel === x.id ? "border-violet bg-violet/10 text-txt" : "border-edge text-mut hover:border-violet/60 hover:text-txt"}`}
          >
            <span className="mr-1.5">{x.icon}</span>{x.name}
          </button>
        ))}
      </div>

      <div className="gcard min-w-0 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-xs text-mut">{active.id === "all" ? "every harness" : active.name}{active.arg && ` → ${harnesses.find((h) => h.id === active.id)?.file}`}</span>
          <button onClick={() => copy(lines.filter((l) => !l.startsWith("#")).join("\n"), "main")} className="rounded-lg border border-edge px-2.5 py-1 text-xs text-mut transition hover:border-violet hover:text-txt">
            {copied === "main" ? t("copied") : t("copy")}
          </button>
        </div>
        <pre className="min-w-0 overflow-auto rounded-lg border border-edge bg-ink p-4 font-mono text-[13px] leading-relaxed"><code>{lines.map((l, i) => (
          <div key={i} className={l.startsWith("#") ? "text-mut" : l.startsWith("/") ? "text-violet" : "text-txt"}>
            {!l.startsWith("#") && !l.startsWith("/") && <span className="text-grn">$ </span>}{l}
          </div>
        ))}</code></pre>
      </div>
    </div>
  );
}
