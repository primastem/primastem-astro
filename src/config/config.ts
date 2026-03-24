// Config
// ------------
// Description: The configuration file for the website.

export interface Logo {
	src: string
	alt: string
}

export type Mode = 'auto' | 'light' | 'dark'

export interface Config {
	siteTitle: string
	siteDescription: string
	ogImage: string
	logo: Logo
	canonical: boolean
	noindex: boolean
	mode: Mode
	scrollAnimations: boolean
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
	scrollAnimations: true
}
