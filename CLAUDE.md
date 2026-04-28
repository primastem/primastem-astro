# PrimaSTEM Astro — Claude project instructions

This file is read by Claude Code at the start of every session. It documents project-specific workflows so future sessions don't have to ask.

## Project at a glance

- Astro 6 static site, deployed on Netlify (auto-deploy on push to `master`)
- CMS: Sveltia at `/admin/` (GitHub OAuth via Netlify)
- Build: `npm run build`
- All editable content lives in `src/content/{lang}/` (only `en` for now)

## Content structure

```
src/content/en/
├── pages/         (9 page-specific JSONs: home, product, schools, parents,
│                   distributors, about, contact, legal, privacy)
├── faq.json       (FAQ entries shown on /faq)
├── pricing.json   (3 pricing tiers, used on / and other pages via PricingV3)
└── product-sheet.md (currently unused, kept for future)
```

Adding a language = `cp -r src/content/en src/content/{lang}` + translate + register in `astro.config.mjs` + `src/i18n/languages.ts`.

## Hot workflows

### Updating the printable product sheet HTML

**File:** `public/primastem-product-sheet.html`
**PDF:** `public/primastem-product-sheet.pdf`

When the user asks to "update HTML" / "обнови хтмл":

1. Read `public/primastem-product-sheet.html` to see current state.
2. Compare text content against current website sources of truth:
   | HTML section | Source |
   |---|---|
   | Description / intro | `src/content/en/pages/about.json` + `product.json` |
   | Pricing block | `src/content/en/pages/distributors.json` (cta + Terms section body) |
   | Specs table | `src/content/en/pages/product.json` → `specs.rows` |
   | Commands list | `src/content/en/pages/product.json` → `commands.text` |
   | Voice languages | 14 langs (English, Français, Русский, Українська, Deutsch, Español, Italiano, Nederlands, Norsk, Polski, Svenska, 日本語, Português (Brasil), Türkçe) |
   | Pricing numbers | `src/content/en/pricing.json` |
3. Edit HTML to match. Inline CSS only (must work offline for PDF export).
4. Commit and push.
5. Tell user: open HTML in browser → Ctrl+P → "Save as PDF" → replace `public/primastem-product-sheet.pdf`.

**DO NOT regenerate PDF yourself** — user does it manually via browser print dialog (preserves @page CSS).

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
- **Documentation languages:** docs.primastem.com is in **10 languages**. Voice feedback is in **14 languages**. Different things, both true.
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
