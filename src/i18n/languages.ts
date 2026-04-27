// i18n — Language definitions
// Active locales are in `languages`. To add a new language:
//   1. Uncomment the entry here
//   2. Add to `ui.ts`
//   3. Add locale to `astro.config.mjs` i18n.locales + fallback
//   4. Duplicate src/pages/*.astro → src/pages/{lang}/*.astro and translate

export const languages = {
	en: { name: 'English', dir: 'ltr', dateLocale: 'en-GB' },
	// fr: { name: 'Français', dir: 'ltr', dateLocale: 'fr-FR' },
	// ru: { name: 'Русский', dir: 'ltr', dateLocale: 'ru-RU' },
	// de: { name: 'Deutsch', dir: 'ltr', dateLocale: 'de-DE' },
	// es: { name: 'Español', dir: 'ltr', dateLocale: 'es-ES' },
	// it: { name: 'Italiano', dir: 'ltr', dateLocale: 'it-IT' },
	// nl: { name: 'Nederlands', dir: 'ltr', dateLocale: 'nl-NL' },
	// no: { name: 'Norsk', dir: 'ltr', dateLocale: 'nb-NO' },
	// pl: { name: 'Polski', dir: 'ltr', dateLocale: 'pl-PL' },
	// sv: { name: 'Svenska', dir: 'ltr', dateLocale: 'sv-SE' },
	// ja: { name: '日本語', dir: 'ltr', dateLocale: 'ja-JP' },
	// 'pt-BR': { name: 'Português (Brasil)', dir: 'ltr', dateLocale: 'pt-BR' },
	// tr: { name: 'Türkçe', dir: 'ltr', dateLocale: 'tr-TR' },
	// uk: { name: 'Українська', dir: 'ltr', dateLocale: 'uk-UA' },
} as const;

export const defaultLang = 'en' as const;
export type Lang = keyof typeof languages;
