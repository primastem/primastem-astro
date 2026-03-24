// Navigation Bar
// ------------
// Description: The navigation bar data for the website.
export interface Logo {
	src: string
	alt: string
	text: string
}

export interface NavSubItem {
	name: string
	link: string
}

export interface NavItem {
	name: string
	link: string
	submenu?: NavSubItem[]
}

export interface NavAction {
	name: string
	link: string
	style: string
	size: string
}

export interface NavData {
	logo: Logo
	navItems: NavItem[]
	navActions: NavAction[]
}

export const navigationBarData: NavData = {
	logo: {
		src: '/logo.svg',
		alt: 'PrimaSTEM',
		text: 'PrimaSTEM'
	},
	navItems: [
		{ name: 'Product', link: '/product' },
		{ name: 'Distributors', link: '/distributors' },
		{ name: 'Schools', link: '/schools' },
		{ name: 'Parents', link: '/parents' },
		{ name: 'Contact', link: '/contact' }
	],
	navActions: [{ name: 'Docs', link: 'https://docs.primastem.com', style: 'primary', size: 'lg' }]
}
