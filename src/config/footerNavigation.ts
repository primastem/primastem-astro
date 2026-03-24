// Footer Navigation
// ------------
// Description: The footer navigation data for the website.
export interface Logo {
	src: string
	alt: string
	text: string
}

export interface FooterAbout {
	title: string
	aboutText: string
	logo: Logo
}

export interface SubCategory {
	subCategory: string
	subCategoryLink: string
}

export interface FooterColumn {
	category: string
	subCategories: SubCategory[]
}

export interface SubFooter {
	copywriteText: string
}

export interface FooterData {
	footerAbout: FooterAbout
	footerColumns: FooterColumn[]
	subFooter: SubFooter
}

export const footerNavigationData: FooterData = {
	footerAbout: {
		title: 'PrimaSTEM',
		aboutText:
			'The only screen-free education tool that teaches both coding and mathematics. Wooden programmable robot for children aged 4 to 10.',
		logo: {
			src: '/logo.svg',
			alt: 'PrimaSTEM',
			text: 'PrimaSTEM'
		}
	},
	footerColumns: [
		{
			category: 'Product',
			subCategories: [
				{
					subCategory: 'Product',
					subCategoryLink: '/product'
				},
				{
					subCategory: 'FAQ',
					subCategoryLink: '/faq'
				}
			]
		},
		{
			category: 'Legal',
			subCategories: [
				{
					subCategory: 'Legal Notice',
					subCategoryLink: '/legal'
				},
				{
					subCategory: 'Privacy Policy',
					subCategoryLink: '/privacy'
				}
			]
		},
		{
			category: 'About us',
			subCategories: [
				{
					subCategory: 'About',
					subCategoryLink: '/about'
				},
				{
					subCategory: 'Contact',
					subCategoryLink: '/contact'
				}
			]
		}
	],
	subFooter: {
		copywriteText: '© PrimaSTEM SAS 2026. All rights reserved.'
	}
}
