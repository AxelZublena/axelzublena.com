module.exports = {
	mode: 'jit',
	content: [
		'./src/**/*.html',
		'./src/**/*.svelte'
	],
	darkMode: "media", // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				"blue-fr": "#002395",
				"red-fr": "#ED2939",
				"00dp": "#121212",
				"01dp": "#1d1d1d",
				"02dp": "#212121",
				"03dp": "#242424",
				"04dp": "#262626",
				"06dp": "#2c2c2c",
				"08dp": "#2d2d2d",
				"12dp": "#323232",
				"16dp": "#353535",
				"24dp": "#373737",
			}
		},
		fontFamily: {
			ubuntu: ['Ubuntu', "sans-serif"]
		}
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
