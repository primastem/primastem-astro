// i18n — Translation dictionary
// Keys are dot-separated namespaces: nav.*, footer.*, a11y.*, common.*
// To add a language: copy the `en` block, change the key, translate values.

import type { Lang } from './languages';

export const ui: Record<Lang, Record<string, string>> = {
	en: {
		// Navigation
		'nav.product': 'Product',
		'nav.schools': 'Schools',
		'nav.parents': 'Parents',
		'nav.distributors': 'Distributors',
		'nav.contact': 'Contact',
		'nav.docs': 'Docs',
		// Accessibility
		'a11y.skipToContent': 'Skip to content',
		'a11y.socialLinks': 'Social Media Links',
		// Common UI
		'common.from': 'From',
		'common.exclVat': 'excl. VAT',
		'common.requestQuote': 'Request a quote',
		'common.learnMore': 'Learn more',
		'common.contactUs': 'Contact us',
		// Footer
		'footer.copyright': '© PrimaSTEM. All rights reserved.',
		'footer.madeIn': 'Made in Cannes, France',
	},
} as const;
