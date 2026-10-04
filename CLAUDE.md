# PrimaSTEM Astro — Claude project instructions

This file is read by Claude Code at the start of every session. It documents project-specific workflows so future sessions don't have to ask.

## ⚠️ Working rules with the founder (read first)

- **Never change anything without an explicit "да / делай / ставь".** Show the final text or plan, then STOP. A wording correction is NOT approval. Reading files to prepare is fine; editing, committing, pushing is not.
- **One question at a time**, in Russian. Show the concrete text and where it goes.
- **Copy goes through the copywriter subagent, then the `humanizer-ru` skill.** Show only the final (or 2–3 variants when asked). When the founder gives his own wording or direction, use his words, don't re-run committees.
- **Never invent facts.** Check `docs.primastem.com` / the live tool apps first (e.g. firmware language list on `update.primastem.com`).
- **No em dashes (—)** anywhere in site text or llms files. Use a hyphen or rephrase.
- **Template only, no hardcode.** New text goes into `src/content/...` JSON; if a block needs a new slot, add an optional field to the shared component, never paste markup into one page.

## ⚠️ Content rules (founder decisions — do not "fix" back)

- **Never state publicly that we sell directly to companies/schools** (channel conflict with distributors). Also never write a blanket "we don't sell direct" — it closes the door to business. Address only private buyers ("если вы хотите купить … для себя").
- **Private buyers** buy from distributors; if none in their country, they ask any local supplier to contact us. This note sits under the title of `/where-to-buy` (`header.text`).
- **No phone / WhatsApp on public pages** (since 2026-09-14). Email + address only. Exception: `/legal` impressum keeps the phone (statutory). The phone still exists in `src/config/config.ts` and `contact.json` (filtered out in the template), so it can be restored.
- **Vocabulary (RU):** «фишки», «пульт», «робот»; not «жетоны / панель / наборы / устройство».
- **Age:** 4–10+. **Battery:** approximately 2 hours, depending on usage. **Step:** any value. **Cert:** CE + UKCA, linked to `https://cert.primastem.com`.

## ⚠️ Product facts live in our docs — check them BEFORE asking

For anything about the product you're unsure of (tool/app URLs, specs, features, counts), **go to `https://docs.primastem.com` first** (linked from the site footer and the product page). Companion tool apps: `simulator.primastem.com`, `control.primastem.com`, `scratch.primastem.com`, `update.primastem.com` (firmware). Only ask the user if the docs don't have it. Do NOT ask the user for facts that are one fetch away.

## Project at a glance

- Astro 6 static site, deployed on **Cloudflare** (migrated from Netlify 2026-06-27; auto-deploy on push to `master` via Cloudflare Workers Builds). Served as Workers Static Assets — config in `wrangler.jsonc` (`assets.directory=./dist`, no Worker main). Workers subdomain = `chanov`. Redirects in `public/_redirects` (real 301s).
- CMS: Sveltia at `/admin/` (GitHub OAuth via self-hosted `sveltia-cms-auth` Worker at `sveltia-cms-auth.chanov.workers.dev`; `base_url` in `public/admin/config.yml`)
- Build: `npm run build` (51 pages)
- Active locales: **en (root, no prefix), ru, fr, de, es**. Each locale has its own page files `src/pages/{lang}/*.astro` (en = `src/pages/*.astro`) and content `src/content/pages/{lang}/*.json`.
- Repo lives at `D:\Users\andrei\Documents\Claude\Projects\primastem-astro` (moved from C: 2026-10-04). The repo is PUBLIC: `content-lab/`, `PRODUCT.md`, `.impeccable/`, `.claude/` are gitignored.

## Content structure

```
src/content/
├── pages/{lang}/   home, product, where-to-buy, distributors, sheet,
│                   about, contact, legal, privacy  (.json)
├── faq/{lang}.json         FAQ entries shown on /faq
├── pricing/{lang}.json     legacy PricingV3 cards — NOT rendered on any page now
└── product-sheet/sheet.json  single source of the English print PDF
```

Menu: О продукте · Где купить · Контакты · Документация↗. `/schools` and `/parents` were removed 2026-07-29 (301 → `/product`). `/distributors` is reachable from the footer and the "Become a distributor" button on `/where-to-buy`.

Adding a language `xx`:
1. `cp -r src/content/pages/en src/content/pages/xx` + translate
2. `cp src/content/faq/en.json src/content/faq/xx.json` + translate
3. Register `xx` in `astro.config.mjs` `i18n.locales` + `src/i18n/languages.ts` + strings in `src/i18n/ui.ts`
4. Duplicate `src/pages/*.astro` → `src/pages/xx/*.astro` and point imports to `/xx/` JSONs
5. Internal links in JSON carry the locale prefix (e.g. `/xx/contact`)

## Template fields worth knowing

- `HomeCTA.astro` (home first screen): `hero.simulatorText` (button) + optional `hero.simulatorNote` (small caption under the simulator button, continues the button label, e.g. «На любом из 19 языков»).
- `PageHeader.astro`: optional `text` under the title (used by `/where-to-buy` → `header.text`).
- `/where-to-buy`: a distributor with `"hidden": true` in `where-to-buy.json` stays in the data but is not shown; a country with no visible distributors is skipped (`visibleCountries` in the 5 page files). Currently **de Rolf groep (NL) is hidden**, pending replacement — when restoring, also put the Netherlands back into the page SEO description, FAQ «distributor in my country» and llms files.
- `/contact`: the WhatsApp item is filtered out in the template (`contactItems.filter(...)`); the JSON still holds it.
- `ContactCTA.astro` (dark band on about / distributors / sheet): email only.

## ⚠️ PRODUCT SHEET — the /sheet page and the printable PDF are SEPARATE sources

There is a `/sheet` web page and a printable PDF. They do NOT share a source, so global content edits (pricing, voice languages, certification, countries) can silently MISS one.

- **`/sheet` web page is data-driven and localized** (5 locales, since 2026-08-25). Text lives in `src/content/pages/{lang}/sheet.json`; the shared layout is `src/components/blocks/SheetContent.astro`; the page files (`src/pages/sheet.astro` = en, `src/pages/{fr,de,es,ru}/sheet.astro`) are thin wrappers. **Edit `sheet.json`, not the HTML.**
- **The PDF is English-only** and generated from `src/content/product-sheet/sheet.json`.

**Whenever you change pricing / voice-language count / certification / country claims anywhere, update BOTH:**
1. `src/content/pages/{lang}/sheet.json` (5 locales) — the web `/sheet`.
2. `src/content/product-sheet/sheet.json` — then `npm run sheet:pdf`.

Quick audit after any pricing/spec change: `grep -rn "€235\|€210\|€297\|14 language\|18 language\|CE &\|Norway\|Present in" src/content public/primastem-product-sheet.html`

## ⚠️ LLM feeds — keep `public/llms.txt` + `public/llms-full.txt` in sync

These two files (for AI/LLM indexing) MIRROR the site content and are hand-maintained, NOT generated. **After any content change (positioning, hero/section rewrites, pricing/margin model, specs, languages, distributors), update both to match the live site, and commit + push them with the change.** `llms-full.txt` mirrors every page's copy; `llms.txt` is the short summary. Same em-dash ban and the same content rules apply (no "not sold direct", no phone). Quick audit: `grep -n "set your own retail\|market is asking\|Real skills\|not sold direct\|WhatsApp" public/llms*.txt` should return nothing.

## Hot workflows

### Updating the printable product sheet (PDF)

1. Edit `src/content/product-sheet/sheet.json` (the single source).
2. Run `npm run sheet:pdf` → `scripts/gen-sheet.mjs` writes `public/primastem-product-sheet.html` and renders `public/primastem-product-sheet.pdf` via headless Chrome/Edge. Never edit the HTML by hand.
3. Verify (grep the HTML or Read the PDF), then commit + push HTML, PDF and sheet.json together.

Print layout: A4, `@page` margins 16mm/15mm, Specifications start on page 2 (`.page-break`), light print-friendly banners. `scripts/generate-product-sheet.py` (reportlab) is the OLD approach — don't use it.

### Voice languages

Voice feedback: **19 languages** (English, Français, Русский, Українська, Deutsch, Español, Italiano, Português (Brasil), Nederlands, Norsk, Polski, Svenska, Türkçe, Dansk, Suomi, Català, 日本語, עברית, العربية) — order = the firmware list on `update.primastem.com`. The web simulator is also in 19 languages. docs.primastem.com is in 10 languages (different thing, both true).
The list/count lives in: `product.json` ×5 (voiceFeedback + specs), `sheet.json` ×5, `distributors.json` ×5 (counts), `product-sheet/sheet.json`, `llms.txt`, `llms-full.txt`, `home.json` ×5 (`simulatorNote`, simulator count), this file.

### Editing pages content

Page text is in `src/content/pages/{lang}/*.json`. Edit JSON (for 5 locales), build, commit. Sveltia CMS edits the same files.
For JSON edits use a Python script written with the Write tool (bash heredoc mangles `\n`), run as `PYTHONUTF8=1 py -3 script.py`. Prefer raw string replacement with `assert count == 1`; a `json.dumps` round-trip reformats the whole file.

### Verifying changes don't break HTML

For non-trivial template changes, save baseline before:
```bash
mkdir -p .baseline && cp -r dist/{page} .baseline/
# make changes, npm run build
diff <(sed 's/<[^>]*>/ /g; s/&#39;/\x27/g; s/&quot;/"/g' .baseline/{page}/index.html | tr ' ' '\n' | sort -u) \
     <(sed 's/<[^>]*>/ /g; s/&#39;/\x27/g; s/&quot;/"/g' dist/{page}/index.html | tr ' ' '\n' | sort -u)
```
0 diff lines = text content identical (HTML entities decoded).
Visual check: `.claude/launch.json` has `astro-preview` (port 4321). Sections fade in, so screenshots of a hidden preview pane can be blank — measure layout with `getBoundingClientRect()` instead; check desktop and 375px mobile.

## Snapshot tags for rollback

- `pre-i18n-cms-2026-04-27` — before i18n + CMS work
- `pre-page-extraction-2026-04-27` — before page content extraction

Restore: `git checkout {tag}`

## Caveats

- **Claude's auto-memory lives in the repo at `.claude/memory/`** (set via `autoMemoryDirectory` in `.claude/settings.local.json`, since 2026-10-04). Not in `~/.claude/projects/*/memory` — don't recreate copies there.
- `content-lab/` — local working folder for texts/structure decisions (gitignored).
- `.omc/`, `.baseline/` — local only (gitignored).
- `src/content/pricing/` is orphaned (PricingV3 not rendered anywhere) — ask before deleting.
- `src/data/` is an empty placeholder, can be removed.
- Old Netlify site still exists (not deleted); dead commented-out `data-netlify` form code remains in 5 `contact.astro`.
