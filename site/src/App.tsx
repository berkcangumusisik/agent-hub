import { useState } from "react";
import { REPO, asset, featureList, roster, harnesses, commands, INSTALL_BASE } from "./data";
import { useI18n, type Lang } from "./i18n";
import { useReveal } from "./useReveal";
import ProfileGenerator from "./components/ProfileGenerator";
import InstallTabs from "./components/InstallTabs";

const WRAP = "mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16";

function Copyable({ text }: { text: string }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  return (
    <div className="glass flex w-full min-w-0 items-center gap-3 overflow-auto rounded-xl px-4 py-3">
      <code className="whitespace-nowrap font-mono text-sm">
        <span className="text-grn">$</span> {text}
      </code>
      <button
        onClick={() => {
          navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          });
        }}
        className="ml-auto shrink-0 rounded-lg border border-edge px-2.5 py-1 text-xs text-mut transition hover:border-violet hover:text-txt"
      >
        {copied ? t("copied") : t("copy")}
      </button>
    </div>
  );
}

function Section({ id, eyebrow, title, lead, children }: { id: string; eyebrow?: string; title: string; lead?: string; children: React.ReactNode }) {
  const { ref, inView } = useReveal<HTMLElement>();
  return (
    <section ref={ref} id={id} className={`reveal ${inView ? "in" : ""} border-t border-white/5 py-16 sm:py-24`}>
      <div className={WRAP}>
        {eyebrow && <p className="gradient-text mb-3 text-center text-xs font-semibold uppercase tracking-[0.25em]">{eyebrow}</p>}
        <h2 className="text-center text-[1.7rem] font-extrabold tracking-tight sm:text-[2.6rem]">{title}</h2>
        {lead && <p className="mx-auto mt-4 max-w-2xl text-center text-base text-mut sm:text-lg">{lead}</p>}
        <div className="mt-10 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}

function LangSwitch() {
  const { lang, setLang } = useI18n();
  const opt = (l: Lang) => (
    <button key={l} onClick={() => setLang(l)} className={`rounded-md px-2 py-0.5 text-xs font-semibold transition ${lang === l ? "bg-violet/15 text-txt" : "text-mut hover:text-txt"}`}>
      {l.toUpperCase()}
    </button>
  );
  return <div className="flex items-center gap-0.5 rounded-lg border border-edge p-0.5">{opt("en")}{opt("tr")}</div>;
}

function CtaBand() {
  const { t } = useI18n();
  const { ref, inView } = useReveal<HTMLElement>();
  return (
    <section ref={ref} className={`reveal ${inView ? "in" : ""} border-t border-white/5 py-16 sm:py-24`}>
      <div className={WRAP}>
        <div className="gcard relative overflow-hidden p-8 text-center sm:p-16">
          <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(40rem 18rem at 50% -4rem, rgba(138,180,255,0.08), transparent 70%)" }} />
          <div className="relative">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-5xl">{t("cta.title")}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-mut sm:text-lg">{t("cta.lead")}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a className="btn btn-primary" href={REPO} target="_blank" rel="noopener">{t("cta.button")}</a>
              <a className="btn btn-ghost" href="#install">{t("nav.install")}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const { t } = useI18n();
  return (
    <>
      {/* nav */}
      <nav className="glass sticky top-0 z-20 border-b border-white/5">
        <div className={`${WRAP} flex h-16 items-center justify-between`}>
          <span className="font-display text-xl font-bold gradient-text">agent-hub</span>
          <div className="flex items-center gap-4 text-sm text-mut">
            <a href="#harnesses" className="hidden hover:text-txt md:inline">{t("kicker.harness")}</a>
            <a href="#how" className="hidden hover:text-txt md:inline">{t("nav.how")}</a>
            <a href="#features" className="hidden hover:text-txt md:inline">{t("nav.features")}</a>
            <a href="#install" className="hidden hover:text-txt md:inline">{t("nav.install")}</a>
            <LangSwitch />
            <a className="btn py-1.5" href={REPO} target="_blank" rel="noopener">★ GitHub</a>
          </div>
        </div>
      </nav>

      {/* hero */}
      <header className="relative overflow-hidden pb-20 pt-24 text-center sm:pb-28 sm:pt-32">
        <div className="grid-bg absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-6">
          <span className="pill mb-7">
            <span style={{ width: 6, height: 6, borderRadius: 99, background: "#8ab4ff" }} />
            {t("hero.badge")}
          </span>
          <h1 className="text-[2.1rem] font-extrabold leading-[1.08] tracking-tight sm:text-7xl sm:leading-[1.05]">
            {t("hero.title1")}
            <br />
            <span className="gradient-text">{t("hero.title2")}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-mut sm:mt-7 sm:text-xl">{t("hero.subtitle")}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a className="btn btn-primary" href="#install">{t("hero.getStarted")}</a>
            <a className="btn btn-ghost" href={REPO} target="_blank" rel="noopener">{t("hero.viewGithub")}</a>
          </div>
          <div className="mx-auto mt-10 w-full max-w-2xl">
            <Copyable text={INSTALL_BASE} />
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-6 sm:mt-14 sm:gap-12">
            {[["12", t("stat.specialists")], [String(harnesses.length), t("kicker.harness")], ["MIT", t("stat.oss")]].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="gradient-text font-display text-3xl font-bold sm:text-4xl">{n}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-mut">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* harnesses */}
      <Section id="harnesses" eyebrow={t("kicker.harness")} title={t("harness.title")} lead={t("harness.lead")}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {harnesses.map((h) => (
            <div key={h.id} className="gcard flex items-center gap-4 p-5">
              <span className="mono-chip shrink-0">{h.code}</span>
              <span className="min-w-0">
                <b className="block text-base">{h.name}</b>
                <span className="text-sm text-mut">{t("harness.installs")} <code className="font-mono text-txt">{h.file}</code></span>
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* see it */}
      <Section id="see" eyebrow={t("kicker.see")} title={t("see.title")} lead={t("see.lead")}>
        <div className="gcard mx-auto max-w-5xl p-2">
          <img className="w-full rounded-xl" src={asset("demo.svg")} alt="Terminal demo of /onboard and tech-lead routing" loading="lazy" />
        </div>
      </Section>

      {/* how */}
      <Section id="how" eyebrow={t("kicker.how")} title={t("how.title")} lead={t("how.lead")}>
        <div className="gcard mx-auto max-w-5xl p-2">
          <img className="w-full rounded-xl" src={asset("architecture.svg")} alt="agent-hub architecture" loading="lazy" />
        </div>
      </Section>

      {/* features */}
      <Section id="features" eyebrow={t("kicker.features")} title={t("features.title")} lead={t("features.lead")}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featureList.map((f, i) => (
            <div key={f.id} className={`gcard p-7 ${i === 0 ? "sm:col-span-2" : ""}`}>
              <div className="icon-chip mb-5">{f.ico}</div>
              <h3 className="mb-2 text-xl font-semibold">{t(`feat.${f.id}.title`)}</h3>
              <p className="leading-relaxed text-mut">{t(`feat.${f.id}.desc`)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* commands */}
      <Section id="commands" eyebrow={t("kicker.cmd")} title={t("cmd.title")} lead={t("cmd.lead")}>
        <div className="mx-auto grid max-w-3xl gap-3">
          {commands.map((c) => (
            <div key={c} className="flex items-center gap-4 rounded-xl border border-edge bg-card/50 px-5 py-4 transition hover:border-violet/60">
              <code className="shrink-0 rounded-lg border border-edge bg-ink px-3 py-1 font-mono text-sm text-violet">/{c}</code>
              <span className="text-sm text-mut">{t(`cmd.${c}`)}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* roster */}
      <Section id="team" eyebrow={t("kicker.team")} title={t("roster.title")} lead={t("roster.lead")}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {roster.map((r) => (
            <div key={r.name} className="group flex items-center gap-3 rounded-xl border border-edge bg-card/50 px-4 py-4 transition hover:-translate-y-0.5 hover:border-violet/60 hover:bg-card">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-lg" style={{ background: "linear-gradient(135deg, rgba(34,211,238,.12), rgba(192,132,252,.12))" }}>{r.e}</span>
              <span className="min-w-0">
                <b className="text-sm">
                  {r.name}
                  {r.model && <span className="ml-1.5 rounded border border-edge px-1.5 py-0.5 align-middle text-[10px] text-purple">{r.model}</span>}
                </b>
                <span className="block text-[13px] text-mut">{t(`role.${r.id}`)}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* generator */}
      <Section id="generator" eyebrow={t("kicker.gen")} title={t("gen.title")} lead={t("gen.lead")}>
        <ProfileGenerator />
      </Section>

      {/* install */}
      <Section id="install" title={t("install.title")} lead={t("install.lead")}>
        <InstallTabs />
      </Section>

      <CtaBand />

      {/* footer */}
      <footer className="border-t border-white/5 py-12 text-center text-sm text-mut">
        {t("footer.license")}{" "}
        <a className="hover:text-txt" href={`${REPO}/blob/main/LICENSE`}>{t("footer.mit")}</a> · {t("footer.builtBy")}{" "}
        <a className="hover:text-txt" href="https://github.com/berkcangumusisik" target="_blank" rel="noopener">Berkcan Gümüşışık</a>{" "}
        · <a className="hover:text-txt" href={REPO} target="_blank" rel="noopener">GitHub</a>
      </footer>
    </>
  );
}
