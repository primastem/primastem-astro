// Checks that public/admin/config.yml matches the content files: every file exists,
// every JSON key has a CMS field, every CMS field still has data, every page has a CMS entry.
// Run: npm run cms:check
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { load } from 'js-yaml'

const config = load(readFileSync('public/admin/config.yml', 'utf8'))
const locales = config.i18n.locales
const problems = []
const covered = new Set()

function childFields(field) {
	if (field.fields) return field.fields
	return null
}

function walk(data, fields, path, seen) {
	const byName = Object.fromEntries(fields.map((f) => [f.name, f]))
	for (const [key, value] of Object.entries(data)) {
		const field = byName[key]
		seen.add(path + key)
		if (!field) {
			problems.push(`no CMS field: ${path}${key}`)
			continue
		}
		const sub = childFields(field)
		if (!sub) continue
		const items = Array.isArray(value) ? value : [value]
		for (const item of items) {
			if (item && typeof item === 'object') walk(item, sub, `${path}${key}.`, seen)
		}
	}
}

function listPaths(fields, path, out) {
	for (const field of fields) {
		out.push(path + field.name)
		const sub = childFields(field)
		if (sub) listPaths(sub, `${path}${field.name}.`, out)
	}
	return out
}

for (const collection of config.collections) {
	for (const entry of collection.files ?? []) {
		const paths = entry.file.includes('{{locale}}') ? locales.map((l) => entry.file.replace('{{locale}}', l)) : [entry.file]
		const seen = new Set()
		for (const path of paths) {
			covered.add(path)
			if (!existsSync(path)) {
				problems.push(`missing file: ${path}`)
				continue
			}
			walk(JSON.parse(readFileSync(path, 'utf8')), entry.fields, '', seen)
		}
		for (const path of listPaths(entry.fields, '', [])) {
			if (!seen.has(path)) problems.push(`no data for CMS field: ${entry.name}.${path}`)
		}
	}
}

for (const locale of locales) {
	for (const file of readdirSync(`src/content/pages/${locale}`)) {
		const path = `src/content/pages/${locale}/${file}`
		if (!covered.has(path)) problems.push(`page not in CMS: ${path}`)
	}
}

const unique = [...new Set(problems)]
unique.forEach((p) => console.log(p))
console.log(unique.length ? `CMS config: ${unique.length} problem(s)` : 'CMS config matches the content')
process.exit(unique.length ? 1 : 0)
