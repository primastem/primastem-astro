// i18n — Language definitions
// Active locales drive the language switcher and translation lookups.

export const languages = {
	en: { name: 'English', dir: 'ltr', dateLocale: 'en-GB' },
	fr: { name: 'Français', dir: 'ltr', dateLocale: 'fr-FR' },
	de: { name: 'Deutsch', dir: 'ltr', dateLocale: 'de-DE' },
	es: { name: 'Español', dir: 'ltr', dateLocale: 'es-ES' },
	ru: { name: 'Русский', dir: 'ltr', dateLocale: 'ru-RU' },
	// Future locales — voice feedback list:
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
