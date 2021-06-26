const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {
            colors:{
                'custom-gray':'#928374',
                'grey-700':'#504945',
                'grey-800':'#282828',
                'grey-900':'#1d2021',
                'forground-0':'#fbf1c7',
                'red-dark':'#cc241d',
                'red':'#fb4934',
            }
        },
	},
	plugins: [require('@tailwindcss/aspect-ratio')],
    darkMode: 'class',
};

module.exports = config;
