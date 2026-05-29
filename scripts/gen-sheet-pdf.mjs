// Generate the printable product-sheet PDF from the maintained HTML.
// Single source of truth = public/primastem-product-sheet.html
// Renders it via headless Chrome/Edge (--print-to-pdf), so the PDF always
// matches the HTML. No manual Ctrl+P needed.
//
// Usage: npm run sheet:pdf   (set CHROME_PATH env to override the browser)

import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const html = join(root, 'public', 'primastem-product-sheet.html')
const out = join(root, 'public', 'primastem-product-sheet.pdf')

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
if (!browser) {
  console.error('No Chrome/Edge found. Set CHROME_PATH to your browser binary.')
  process.exit(1)
}
if (!existsSync(html)) {
  console.error('Missing HTML source: ' + html)
  process.exit(1)
}

const args = [
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--print-to-pdf=' + out,
  pathToFileURL(html).href,
]

console.log('Rendering PDF with: ' + browser)
const r = spawnSync(browser, args, { stdio: 'inherit' })
if (r.status !== 0) {
  console.error('PDF generation failed (exit ' + r.status + ').')
  process.exit(r.status || 1)
}
console.log('PDF written: ' + out)
