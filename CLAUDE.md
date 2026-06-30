# PrimaSTEM Astro — Claude project instructions

This file is read by Claude Code at the start of every session. It documents project-specific workflows so future sessions don't have to ask.

## ⚠️ Product facts live in our docs — check them BEFORE asking

For anything about the product you're unsure of (tool/app URLs, specs, features, counts), **go to `https://docs.primastem.com` first** (linked from the site footer and the product page). Companion tool apps: `simulator.primastem.com`, `control.primastem.com`, `scratch.primastem.com`, `update.primastem.com` (firmware). Only ask the user if the docs don't have it. Do NOT ask the user for facts that are one fetch away.

## Project at a glance

- Astro 6 static site, deployed on **Cloudflare** (migrated from Netlify 2026-06-27; auto-deploy on push to `master` via Cloudflare Workers Builds). Served as Workers Static Assets — config in `wrangler.jsonc` (`assets.directory=./dist`, no Worker main). Workers subdomain = `chanov`.
- CMS: Sveltia at `/admin/` (GitHub OAuth via self-hosted `sveltia-cms-auth` Worker at `sveltia-cms-auth.chanov.workers.dev`; `base_url` in `public/admin/config.yml`)
- Build: `npm run build`
- All editable content lives in `src/content/pages/{lang}/` — active locales: **en, fr, ru, de, es**

## Content structure

Astro convention: `src/content/{type}/{lang}/...`

```
src/content/
├── pages/
│   └── en/        (9 page-specific JSONs: home, product, schools, parents,
│                   distributors, about, contact, legal, privacy)
├── faq/
│   └── en.json    (FAQ entries shown on /faq)
├── pricing/
│   └── en.json    (3 pricing tiers, used on / via PricingV3 block)
└── product-sheet/
    └── en.md      (currently unused, kept for future)
```

Adding a language `fr`:
1. `cp -r src/content/pages/en src/content/pages/fr` + translate
2. `cp src/content/faq/en.json src/content/faq/fr.json` + translate
3. `cp src/content/pricing/en.json src/content/pricing/fr.json` + translate
4. `cp src/content/product-sheet/en.md src/content/product-sheet/fr.md` + translate
5. Register `fr` in `astro.config.mjs` `i18n.locales` + `src/i18n/languages.ts`
6. Duplicate `src/pages/*.astro` → `src/pages/fr/*.astro` and update imports to `/fr/` JSONs

## ⚠️ PRODUCT SHEET — never forget these two HARDCODED files

There is a `/sheet` page and a printable PDF. **Both are HARDCODED, NOT in `src/content` JSON**, so global content edits (pricing, voice languages, certification, countries) silently MISS them. This already bit us once.

**Whenever you change pricing / voice-language count / certification / country claims anywhere, you MUST also update BOTH:**
1. **`src/pages/sheet.astro`** — the `/sheet` page (hardcoded HTML, English only; localized `*/sheet.astro` are empty placeholders).
2. **`public/primastem-product-sheet.html`** — the PDF source (then tell user to regenerate the PDF — see below).

Quick audit after any pricing/spec change: `grep -n "€235\|€210\|€297\|14 language\|CE &\|Norway\|Present in" src/pages/sheet.astro public/primastem-product-sheet.html`

## ⚠️ LLM feeds — keep `public/llms.txt` + `public/llms-full.txt` in sync

These two files (for AI/LLM indexing) MIRROR the site content and are hand-maintained, NOT generated. **After any large content change (positioning, hero/section rewrites, pricing/margin model, specs), update both to match the live site, and commit + push them with the change.** They silently go stale otherwise. `llms-full.txt` mirrors every page's copy; `llms.txt` is the short summary (pricing/key-facts). Same em-dash ban applies (use hyphens). Quick audit: `grep -n "set your own retail\|market is asking\|Real skills" public/llms*.txt` should return nothing after a positioning change.

## Hot workflows

### Updating the printable product sheet HTML

**File:** `public/primastem-product-sheet.html`
**PDF:** `public/primastem-product-sheet.pdf`

When the user asks to "update HTML" / "обнови хтмл":

1. Read `public/primastem-product-sheet.html` to see current state.
2. Compare text content against current website sources of truth:
   | HTML section | Source |
   |---|---|
   | Description / intro | `src/content/pages/en/about.json` + `product.json` |
   | Pricing block | `src/content/pages/en/distributors.json` (cta + Terms section body) |
   | Specs table | `src/content/pages/en/product.json` → `specs.rows` |
   | Commands list | `src/content/pages/en/product.json` → `commands.text` |
   | Voice languages | 17 langs (English, Français, Русский, Українська, Deutsch, Español, Italiano, Português (Brasil), Nederlands, Norsk, Polski, Svenska, Türkçe, Dansk, Català, 日本語, עברית) |
   | Pricing numbers | `src/content/pricing/en.json` |
3. Edit HTML to match. Inline CSS only (must work offline for PDF export).
4. **Regenerate the PDF: `npm run sheet:pdf`** (renders HTML → PDF via headless Chrome/Edge — `scripts/gen-sheet-pdf.mjs`). No manual Ctrl+P needed; PDF always matches HTML. Verify the result by Reading `public/primastem-product-sheet.pdf`.
5. Commit and push HTML + PDF together.

Print layout notes: `@page margin 16mm/15mm` (A4 print margins); Specifications section has `.page-break` (`page-break-before:always`) → clean 2-page split; pricing banner is **light/white** (print-friendly, no dark fill). Keep it print-first (this is a downloadable PDF for emailing, NOT for printing the website).
NOTE: `scripts/generate-product-sheet.py` (reportlab) is the OLD approach — superseded by the HTML→headless route. Don't use it.

### Editing pages content

All page text is in `src/content/en/pages/*.json`. Edit JSON directly, build, commit. Sveltia CMS edits the same files.

### Verifying changes don't break HTML

For non-trivial template changes, save baseline before:
```bash
mkdir -p .baseline && cp -r dist/{page} .baseline/
# make changes, npm run build
diff <(sed 's/<[^>]*>/ /g; s/&#39;/\x27/g; s/&quot;/"/g' .baseline/{page}/index.html | tr ' ' '\n' | sort -u) \
     <(sed 's/<[^>]*>/ /g; s/&#39;/\x27/g; s/&quot;/"/g' dist/{page}/index.html | tr ' ' '\n' | sort -u)
```
0 diff lines = text content identical (HTML entities decoded).

## Known inconsistencies (DO NOT silently "fix" — ask first)

- **Cert:** `product.json` says "CE" only. Sheet HTML and `sheet.astro` say "CE & UKCA". Both are deployed; ask user before changing.
- **Documentation languages:** docs.primastem.com is in **10 languages**. Voice feedback is in **17 languages** (English, Français, Русский, Українська, Deutsch, Español, Italiano, Português (Brasil), Nederlands, Norsk, Polski, Svenska, Türkçe, Dansk, Català, 日本語, עברית). Different things, both true.
- **Distributor countries:** Distributors page lists 4 (FR, NL, LU, expanding ES). FAQ says 5 (adds Norway). Use distributors page wording in product sheet HTML.

## Snapshot tags for rollback

- `pre-i18n-cms-2026-04-27` — before i18n + CMS work
- `pre-page-extraction-2026-04-27` — before page content extraction

Restore: `git checkout {tag}`

## Caveats

- `.omc/` is local agent state, NOT in repo (gitignored)
- `.baseline/` is for diffing during development, gitignored
- `src/content/blog/` is empty placeholder, not used yet
- `src/data/` is empty (markdown-files placeholder), can be removed
