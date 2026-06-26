<div align="center">

**Dil:** [English](../../README.md) · Türkçe

![agent-hub](../banner.svg)

### Her harness için, projeyi tanıyan yapay zekâ ekibi.

**Sadece config değil — bir sistem.** Bir kez kur; her projen, o projenin teknolojisine uyum
sağlayan, kodunu inceleyen ve kararlarını hatırlayan 12 rollü bir uzman ekip kazansın.
**Claude Code, Codex, Cursor, OpenCode, Gemini, Windsurf** ve `AGENTS.md` okuyan her araçla
çalışır.

[![validate](https://github.com/berkcangumusisik/agent-hub/actions/workflows/validate.yml/badge.svg)](https://github.com/berkcangumusisik/agent-hub/actions/workflows/validate.yml)
[![release](https://img.shields.io/github/v/release/berkcangumusisik/agent-hub?color=22d3ee&label=release)](https://github.com/berkcangumusisik/agent-hub/releases)
[![stars](https://img.shields.io/github/stars/berkcangumusisik/agent-hub?style=flat&color=818cf8)](https://github.com/berkcangumusisik/agent-hub/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-22d3ee.svg)](../../LICENSE)

[🌐 Web sitesi](https://berkcangumusisik.github.io/agent-hub/) · [Hızlı başlangıç](#-hızlı-başlangıç) · [Nasıl çalışır](#-nasıl-çalışır) · [Rehber](../GETTING-STARTED.md)

</div>

---

## ✨ Fikir

Her proje için ayrı asistan ya da her araç için ayrı kurulum istemezsin. **Hangi projede
olduğunu bilen tek bir iyi ekip** istersin — ve onu hangi araçta kullanırsan kullan.

> Backend reponu aç → ekip backend stack'inle düşünür.
> Web reponu aç → aynı ekip frontend düşünür.
> Aynı kadro. Farklı beyin. **Manuel geçiş yok.**

Bunu bir "komut yığını" değil, bir **sistem** yapan üç şey:

- **🧠 Proje farkında** — her ajan iş yapmadan önce küçük bir `profile.yml` okur.
- **📝 Hafıza** — kararlar, tüm ekibin okuyup uyduğu ADR'ler olarak kaydedilir.
- **⚡ Otomatik yükleme** — projeyi açar açmaz profil yüklenir.

## 🚀 Hızlı başlangıç

**Tek satır — her harness:**

```bash
curl -fsSL https://raw.githubusercontent.com/berkcangumusisik/agent-hub/main/install.sh | sh
```

Bu, proje profilini oluşturur ve ekibi desteklenen tüm harness'lara kurar. Tek bir tanesi
için: `… | sh -s -- cursor` (ya da `claude`, `codex`, `gemini`, `opencode`, `windsurf`).

**Claude Code (en zengin deneyim — gerçek subagent'lar):**

```
/plugin marketplace add berkcangumusisik/agent-hub
/plugin install super-team@agent-hub
```

Sonra reponu ajanla aç ve **“onboard”** de — stack'ini tespit edip profili doldurur. Artık ne
istediğini yaz; **tech-lead** işi doğru uzmanlara dağıtır.

## 🧰 Desteklenen harness'lar

| Harness | Kurulan dosya |
|---|---|
| **Claude Code** | 12 gerçek subagent'lı eklenti + `CLAUDE.md` |
| **Codex** | `AGENTS.md` |
| **Cursor** | `.cursor/rules/agent-hub.mdc` |
| **OpenCode** | `AGENTS.md` |
| **Gemini CLI** | `GEMINI.md` |
| **Windsurf** | `.windsurfrules` |

## 👥 Kadro

tech-lead (orkestratör) · architect · backend · frontend · mobile · devops · data · ux-designer
· code-reviewer · qa-tester · security-reviewer · tech-writer.

Claude Code'da bunlar gerçek, paralel subagent'lardır; diğer harness'larda tek ajan sırayla her
şapkayı takar.

## ⌨️ Komutlar

`onboard` · `team` · `review` · `decide: <X>` · `handoff`

## 📝 Lisans

[MIT](../../LICENSE) © [Berkcan Gümüşışık](https://github.com/berkcangumusisik)

Sorular için [Discussions](https://github.com/berkcangumusisik/agent-hub/discussions).
