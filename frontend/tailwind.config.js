module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			animation: {
				fade: "fadeOut 20s ease-in-out"
			},
			keyframes: theme => ({
				fadeOut: {
					'100%': { 
						backgroundColor: theme('colors.transparent'),
						borderColor: theme('colors.transparent'),
						color: theme('colors.transparent')
					},
				},
			})
		}
	},
	plugins: [],
}