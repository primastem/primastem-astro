// Single-source product sheet generator.
// Reads src/content/product-sheet/sheet.json → writes public/primastem-product-sheet.html
// → renders public/primastem-product-sheet.pdf via headless Chrome/Edge.
// The HTML is a GENERATED artifact — DO NOT hand-edit it. Edit sheet.json instead.
//
// Usage: npm run sheet:pdf   (set CHROME_PATH to override the browser)

import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const dataPath = join(root, 'src', 'content', 'product-sheet', 'sheet.json')
const htmlPath = join(root, 'public', 'primastem-product-sheet.html')
const pdfPath = join(root, 'public', 'primastem-product-sheet.pdf')

const d = JSON.parse(readFileSync(dataPath, 'utf8'))
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const CSS = `
  @page { size: A4; margin: 16mm 15mm; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; color: #1e293b; line-height: 1.5; margin: 0; background: #fff; }
  .header { text-align: center; padding: 0 0 24px; border-bottom: 3px solid #5AA02C; }
  .header img { height: 48px; margin-bottom: 16px; }
  .header h1 { font-size: 28px; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
  .header .subtitle { font-size: 16px; color: #64748b; }
  .content { padding: 24px 0; }
  .page-break { page-break-before: always; }
  .kit-item, .specs-table, .commands, .two-col { page-break-inside: avoid; }
  .two-col { display: flex; gap: 30px; margin-bottom: 30px; }
  .two-col .col-left { flex: 1; }
  .two-col .col-right { flex: 1; }
  .description { margin-bottom: 24px; }
  .description p { font-size: 13px; color: #475569; margin-bottom: 8px; }
  .description .cert { font-size: 12px; color: #64748b; }
  .photo { text-align: center; }
  .photo img { max-width: 100%; max-height: 220px; border-radius: 8px; object-fit: contain; }
  h2 { font-size: 16px; font-weight: 700; color: #5AA02C; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 1px solid #e2e8f0; }
  .kit-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 30px; }
  .kit-item { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px 14px; }
  .kit-item h3 { font-size: 13px; font-weight: 600; color: #1e293b; margin-bottom: 6px; }
  .kit-item ul { list-style: none; font-size: 11px; color: #475569; }
  .kit-item ul li { padding: 1px 0; }
  .kit-item ul li::before { content: "·"; margin-right: 6px; color: #5AA02C; font-weight: bold; }
  .specs-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 12px; }
  .specs-table tr { border-bottom: 1px solid #f1f5f9; }
  .specs-table td { padding: 6px 0; }
  .specs-table td:first-child { font-weight: 600; color: #1e293b; width: 35%; }
  .specs-table td:last-child { color: #475569; }
  .commands { margin-bottom: 30px; }
  .commands ul { list-style: none; font-size: 12px; color: #475569; }
  .commands ul li { padding: 3px 0; }
  .commands ul li strong { color: #1e293b; }
  .pricing { background: #fff; color: #1e293b; border: 1px solid #e2e8f0; border-top: 3px solid #5AA02C; border-radius: 8px; padding: 24px 30px; text-align: center; margin-bottom: 30px; }
  .pricing .price { font-size: 32px; font-weight: 700; color: #5AA02C; }
  .pricing .price-note { font-size: 13px; color: #475569; margin-top: 4px; }
  .pricing .conditions { font-size: 11px; color: #64748b; margin-top: 8px; }
  .footer { border-top: 1px solid #e2e8f0; padding: 20px 0; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #64748b; }
  .footer a { color: #5AA02C; text-decoration: none; }
  @media print { body { max-width: none; } .pricing { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }`

const kit = d.kit.map((k) => `    <div class="kit-item">
      <h3>${esc(k.title)}</h3>
      <ul>
${k.items.map((i) => `        <li>${esc(i)}</li>`).join('\n')}
      </ul>
    </div>`).join('\n')

const specs = d.specs.map((s) => `        <tr><td>${esc(s.label)}</td><td>${esc(s.value)}</td></tr>`).join('\n')
const cmd = (arr) => arr.map((c) => `          <li><strong>${esc(c.label)}:</strong> ${esc(c.value)}</li>`).join('\n')
const conds = d.margin.conditions.map((c, i) => `    <div class="conditions"${i === 0 ? ' style="margin-top: 12px;"' : i === d.margin.conditions.length - 1 ? ' style="margin-top: 12px; font-style: italic;"' : ' style="margin-top: 8px;"'}>${esc(c)}</div>`).join('\n')
const links = d.footer.links.map((l) => `    <a href="${l.href}">${esc(l.text)}</a>`).join('<br>\n')

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(d.docTitle)}</title>
<style>${CSS}
</style>
</head>
<body>

<div class="header">
  <img src="logo.svg" alt="PrimaSTEM">
  <h1>${esc(d.h1)}</h1>
  <div class="subtitle">${esc(d.subtitle)}</div>
</div>

<div class="content">

  <div class="two-col">
    <div class="col-left">
      <div class="description">
${d.intro.map((p) => `        <p>${esc(p)}</p>`).join('\n')}
        <p class="cert">${esc(d.cert)}</p>
      </div>
    </div>
    <div class="col-right">
      <div class="photo">
        <img src="../src/assets/hero-primastem.jpg" alt="PrimaSTEM complete kit">
      </div>
    </div>
  </div>

  <h2>What's in the kit</h2>
  <div class="kit-grid">
${kit}
  </div>

  <div class="two-col page-break">
    <div class="col-left">
      <h2>Specifications</h2>
      <table class="specs-table">
${specs}
      </table>
    </div>
    <div class="col-right">
      <h2>Commands</h2>
      <div class="commands">
        <ul>
${cmd(d.commands)}
        </ul>
      </div>

      <h2>Key Features</h2>
      <div class="commands">
        <ul>
${cmd(d.features)}
        </ul>
      </div>
    </div>
  </div>

  <div class="pricing">
    <div class="price">${esc(d.margin.headline)}</div>
    <div class="price-note">${esc(d.margin.note)}</div>
${conds}
  </div>

</div>

<div class="footer">
  <div>
    <strong>${esc(d.footer.company)}</strong> · ${esc(d.footer.location)}<br>
    ${esc(d.footer.contact)}
  </div>
  <div style="text-align: right;">
${links}
  </div>
</div>

</body>
</html>
`

writeFileSync(htmlPath, html)
console.log('HTML written: ' + htmlPath)

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean)
const browser = candidates.find((p) => existsSync(p))
if (!browser) { console.error('HTML generated, but no Chrome/Edge found for PDF. Set CHROME_PATH.'); process.exit(1) }
const r = spawnSync(browser, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--print-to-pdf=' + pdfPath, pathToFileURL(htmlPath).href], { stdio: 'inherit' })
if (r.status !== 0) { console.error('PDF generation failed.'); process.exit(r.status || 1) }
console.log('PDF written: ' + pdfPath)
