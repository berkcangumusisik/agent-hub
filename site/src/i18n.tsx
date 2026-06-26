import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "tr";

type Dict = Record<string, string>;

const en: Dict = {
  "nav.how": "How it works",
  "nav.features": "Features",
  "nav.generator": "Profile builder",
  "nav.install": "Install",
  "hero.badge": "A Claude Code plugin · open source · MIT",
  "hero.title1": "One AI engineering team.",
  "hero.title2": "Every repo. Auto-specialized.",
  "hero.subtitle": "Install it once. Every project gets a full 12-person engineering team that learns its stack, reviews your code, and remembers the decisions you make.",
  "hero.getStarted": "Get started",
  "hero.viewGithub": "View on GitHub",
  "stat.specialists": "specialists",
  "stat.commands": "commands",
  "stat.oss": "open source",
  "kicker.see": "Demo",
  "kicker.how": "Architecture",
  "kicker.features": "Why agent-hub",
  "kicker.gen": "Profile builder",
  "kicker.team": "The roster",
  "cta.title": "Ship with a full team in every repo.",
  "cta.lead": "Install agent-hub once — your AI engineering team is ready in every project you open.",
  "cta.button": "★ Star on GitHub",
  "see.title": "See it in action",
  "see.lead": "Run /onboard once — it reads your stack, then the tech-lead breaks the work down and hands each part to the right specialist.",
  "how.title": "How it works",
  "how.lead": "The whole team lives in one plugin. Each project keeps a tiny profile. Every agent reads it before acting — so one roster works like a native of every codebase.",
  "features.title": "Why it's different",
  "features.lead": "Not a pile of prompts — a team that understands your project and gets sharper the longer you use it.",
  "feat.aware.title": "Knows your project",
  "feat.aware.desc": "Each project keeps a profile.yml. The team picks up its stack, commands, and conventions — so you never re-explain your setup.",
  "feat.autoload.title": "Ready the moment you open it",
  "feat.autoload.desc": "A SessionStart hook loads the profile instantly. The team is briefed on your project before you type a single word.",
  "feat.review.title": "Reviews like a whole team",
  "feat.review.desc": "/review puts correctness, security, testing, and design specialists on your diff at once — and merges everything into one report.",
  "feat.memory.title": "Remembers your decisions",
  "feat.memory.desc": "/decide saves the call as an ADR. Every agent reads it later, so the team never forgets why something was done.",
  "feat.team.title": "12 specialists, one lead",
  "feat.team.desc": "A tech-lead breaks your request down and delegates to architects, engineers, and reviewers — all working in parallel.",
  "feat.stack.title": "Works with any stack",
  "feat.stack.desc": "Language-agnostic, with ready-made profiles for Spring, Django, Next, Flutter, Go, and Expo to get you moving fast.",
  "gen.title": "Build your profile",
  "gen.lead": "This is the file the team reads before any work. Put one together here in seconds — or run /onboard and let the team fill it in for you.",
  "gen.projectName": "Project name",
  "gen.type": "Type",
  "gen.language": "Language",
  "gen.framework": "Framework",
  "gen.database": "Database",
  "gen.pm": "Package manager",
  "gen.install": "Install command",
  "gen.test": "Test command",
  "gen.activeTeam": "Active team",
  "gen.download": "download",
  "gen.note": "Save it to your project — or just run /onboard and let the team detect all of this for you.",
  "roster.title": "Meet the team",
  "roster.lead": "A complete engineering org, on demand, in every repository.",
  "role.tech-lead": "Breaks down work, delegates to the team",
  "role.architect": "System design, data models, contracts",
  "role.backend": "APIs, business logic, persistence",
  "role.frontend": "UI, state, accessibility, performance",
  "role.mobile": "Native and cross-platform apps",
  "role.devops": "CI/CD, infra, observability",
  "role.data": "Pipelines, ETL, data modeling",
  "role.ux": "User flows, IA, accessibility",
  "role.reviewer": "Catches bugs, keeps code clean",
  "role.qa": "Test plans and coverage",
  "role.security": "Vulnerabilities, auth, secrets",
  "role.writer": "Docs, READMEs, changelogs",
  "install.title": "Install in seconds",
  "install.lead": "Two commands, once. After that, the team is ready in every project you open.",
  "install.star": "★ Star on GitHub",
  "footer.license": "Open source under the",
  "footer.mit": "MIT License",
  "footer.builtBy": "built by",
  "copy": "copy",
  "copied": "copied ✓",
};

const tr: Dict = {
  "nav.how": "Nasıl çalışır",
  "nav.features": "Özellikler",
  "nav.generator": "Profil oluşturucu",
  "nav.install": "Kurulum",
  "hero.badge": "Claude Code eklentisi · açık kaynak · MIT",
  "hero.title1": "Tek bir yapay zekâ ekibi.",
  "hero.title2": "Her projede, kendiliğinden uzmanlaşır.",
  "hero.subtitle": "Bir kez kur. Her projen; o projenin teknolojisini öğrenen, kodunu inceleyen ve verdiğin kararları hatırlayan 12 kişilik tam bir mühendislik ekibine kavuşsun.",
  "hero.getStarted": "Hemen başla",
  "hero.viewGithub": "GitHub'da incele",
  "stat.specialists": "uzman",
  "stat.commands": "komut",
  "stat.oss": "açık kaynak",
  "kicker.see": "Demo",
  "kicker.how": "Mimari",
  "kicker.features": "Neden agent-hub",
  "kicker.gen": "Profil oluşturucu",
  "kicker.team": "Kadro",
  "cta.title": "Her projede tam bir ekiple geliştir.",
  "cta.lead": "agent-hub'ı bir kez kur — yapay zekâ mühendislik ekibin açtığın her projede hazır olsun.",
  "cta.button": "★ GitHub'da yıldızla",
  "see.title": "İş başında",
  "see.lead": "Bir kez /onboard çalıştır — ekip teknolojini okur, ardından tech-lead işi parçalara ayırıp her parçayı doğru uzmana verir.",
  "how.title": "Nasıl çalışır",
  "how.lead": "Ekibin tamamı tek bir eklentide yaşar. Her proje küçük bir profil tutar. Her ajan iş yapmadan önce onu okur — böylece aynı kadro her kod tabanında oranın yerlisi gibi çalışır.",
  "features.title": "Farkı ne?",
  "features.lead": "Bir komut yığını değil — projeni anlayan ve kullandıkça keskinleşen bir ekip.",
  "feat.aware.title": "Projeni tanır",
  "feat.aware.desc": "Her proje bir profile.yml tutar. Ekip; teknolojisini, komutlarını ve kurallarını benimser — kurulumunu tekrar tekrar anlatmana gerek kalmaz.",
  "feat.autoload.title": "Açar açmaz hazır",
  "feat.autoload.desc": "Bir SessionStart hook'u profili anında yükler. Sen daha tek kelime yazmadan ekip projen hakkında bilgilenmiş olur.",
  "feat.review.title": "Bütün bir ekip gibi inceler",
  "feat.review.desc": "/review; doğruluk, güvenlik, test ve tasarım uzmanlarını aynı anda koduna bakmaya koyar ve hepsini tek raporda toplar.",
  "feat.memory.title": "Kararlarını hatırlar",
  "feat.memory.desc": "/decide kararı bir ADR olarak kaydeder. Her ajan sonradan okur; ekip bir şeyin neden yapıldığını asla unutmaz.",
  "feat.team.title": "12 uzman, tek lider",
  "feat.team.desc": "Tech-lead isteğini parçalara ayırır; mimarlara, mühendislere ve gözden geçirenlere paralel olarak dağıtır.",
  "feat.stack.title": "Her teknolojiyle çalışır",
  "feat.stack.desc": "Dilden bağımsız; Spring, Django, Next, Flutter, Go ve Expo için hazır profillerle hızlıca yola koyulursun.",
  "gen.title": "Profilini oluştur",
  "gen.lead": "Ekibin her işten önce okuduğu dosya. Saniyeler içinde buradan hazırla — ya da /onboard çalıştır, ekip senin için doldursun.",
  "gen.projectName": "Proje adı",
  "gen.type": "Tür",
  "gen.language": "Dil",
  "gen.framework": "Framework",
  "gen.database": "Veritabanı",
  "gen.pm": "Paket yöneticisi",
  "gen.install": "Kurulum komutu",
  "gen.test": "Test komutu",
  "gen.activeTeam": "Aktif ekip",
  "gen.download": "indir",
  "gen.note": "Projene kaydet — ya da /onboard çalıştır, ekip tüm bunları senin için kendisi tespit etsin.",
  "roster.title": "Ekiple tanış",
  "roster.lead": "Talep ettiğinde, her projede eksiksiz bir mühendislik ekibi.",
  "role.tech-lead": "İşi parçalar, ekibe dağıtır",
  "role.architect": "Sistem tasarımı, veri modeli, sözleşmeler",
  "role.backend": "API'ler, iş mantığı, kalıcılık",
  "role.frontend": "Arayüz, state, erişilebilirlik, performans",
  "role.mobile": "Native ve çapraz platform uygulamalar",
  "role.devops": "CI/CD, altyapı, gözlemlenebilirlik",
  "role.data": "Pipeline'lar, ETL, veri modelleme",
  "role.ux": "Kullanıcı akışları, IA, erişilebilirlik",
  "role.reviewer": "Hataları yakalar, kodu temiz tutar",
  "role.qa": "Test planları ve kapsam",
  "role.security": "Zafiyetler, kimlik/yetki, sırlar",
  "role.writer": "Dokümanlar, README'ler, changelog'lar",
  "install.title": "Saniyeler içinde kur",
  "install.lead": "İki komut, tek sefer. Sonrasında açtığın her projede ekip hazır.",
  "install.star": "★ GitHub'da yıldızla",
  "footer.license": "Açık kaynak —",
  "footer.mit": "MIT Lisansı",
  "footer.builtBy": "geliştiren:",
  "copy": "kopyala",
  "copied": "kopyalandı ✓",
};

const dict: Record<Lang, Dict> = { en, tr };

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = (typeof localStorage !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (saved === "en" || saved === "tr") return saved;
    return typeof navigator !== "undefined" && navigator.language.startsWith("tr") ? "tr" : "en";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (k: string) => dict[lang][k] ?? dict.en[k] ?? k;
  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
