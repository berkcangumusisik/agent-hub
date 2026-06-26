// A refined HTML terminal "product shot" for the hero — no image, crisp at any DPI.
type Tok = { t: string; c?: string };
const L = (toks: Tok[]) => toks;

const lines: Tok[][] = [
  L([{ t: "$ ", c: "text-grn" }, { t: "/onboard" }]),
  L([{ t: "✓ ", c: "text-grn" }, { t: "Detected: ", c: "text-mut" }, { t: "TypeScript · NestJS · pnpm", c: "text-acc" }]),
  L([{ t: "✓ ", c: "text-grn" }, { t: "wrote ", c: "text-mut" }, { t: ".claude/agent-hub/profile.yml" }]),
  L([{ t: "" }]),
  L([{ t: "$ ", c: "text-grn" }, { t: "add rate limiting to the login endpoint" }]),
  L([{ t: "tech-lead", c: "text-acc" }, { t: " → routing to specialists", c: "text-mut" }]),
  L([{ t: "├─ ", c: "text-mut" }, { t: "architect", c: "text-acc" }, { t: "  design a token-bucket guard", c: "text-mut" }]),
  L([{ t: "├─ ", c: "text-mut" }, { t: "backend", c: "text-acc" }, { t: "    implement it in NestJS", c: "text-mut" }]),
  L([{ t: "├─ ", c: "text-mut" }, { t: "security", c: "text-acc" }, { t: "   check auth bypass & lockout", c: "text-mut" }]),
  L([{ t: "└─ ", c: "text-mut" }, { t: "reviewer", c: "text-acc" }, { t: "   ", c: "text-mut" }, { t: "✓ shipped", c: "text-grn" }]),
];

export default function Terminal() {
  return (
    <div className="mx-auto mt-16 w-full max-w-3xl overflow-hidden rounded-2xl border border-edge bg-[#0c0d12] text-left shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-2 border-b border-edge px-4 py-3">
        <span className="h-3 w-3 rounded-full" style={{ background: "#ff5f56" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#ffbd2e" }} />
        <span className="h-3 w-3 rounded-full" style={{ background: "#27c93f" }} />
        <span className="ml-2 font-mono text-xs text-mut">repo · agent-hub</span>
      </div>
      <pre className="overflow-auto p-5 font-mono text-[12.5px] leading-[1.7] sm:text-[13.5px]">
        <code>
          {lines.map((toks, i) => (
            <div key={i}>
              {toks.map((tk, j) => (
                <span key={j} className={tk.c ?? "text-txt"}>{tk.t}</span>
              ))}
              {i === lines.length - 1 && <span className="ml-1 inline-block h-[1em] w-[7px] translate-y-[2px] animate-pulse bg-acc align-middle" />}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
