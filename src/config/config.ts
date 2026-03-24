// Config
// ------------
// Description: The configuration file for the website.

export interface Logo {
	src: string
	alt: string
}

export type Mode = 'auto' | 'light' | 'dark'

export interface Contact {
	email: string
	phone: string
	whatsapp: string
	location: string
}

export interface Config {
	siteTitle: string
	siteDescription: string
	ogImage: string
	logo: Logo
	canonical: boolean
	noindex: boolean
	mode: Mode
	scrollAnimations: boolean
	contact: Contact
}

export const configData: Config = {
	siteTitle: 'PrimaSTEM — Screen-Free Coding and Math for Ages 4–10',
	siteDescription:
		'The only screen-free education tool that teaches both coding and mathematics. Wooden programmable robot for children aged 4 to 10.',
	ogImage: '/og.jpg',
	logo: {
		src: '/logo.svg',
		alt: 'PrimaSTEM'
	},
	canonical: true,
	noindex: false,
	mode: 'auto',
	scrollAnimations: true,
	contact: {
		email: 'info@primastem.com',
		phone: '+33 6 24 95 09 36',
		whatsapp: 'https://wa.me/33624950936',
		location: 'Cannes, France'
	}
}
