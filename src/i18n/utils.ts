// i18n — Utility functions
// Usage in any .astro file:
//   import { getLangFromUrl, useTranslations } from '../i18n/utils';
//   const lang = getLangFromUrl(Astro.url);
//   const t = useTranslations(lang);
//   then: {t('nav.product')}

import { ui } from './ui';
import { defaultLang, languages } from './languages';
import type { Lang } from './languages';

export function getLangFromUrl(url: URL): Lang {
	const [, maybeLang] = url.pathname.split('/');
	if (maybeLang && maybeLang in languages) return maybeLang as Lang;
	return defaultLang;
}

export function useTranslations(lang: Lang) {
	return function t(key: string): string {
		const langDict = ui[lang];
		return langDict[key] ?? ui[defaultLang][key] ?? key;
	};
}
