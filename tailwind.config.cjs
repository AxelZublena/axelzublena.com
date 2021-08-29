const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {
            colors:{
                'custom-gray':'#424242',
                'grey-1':'#2e2e2e',
                'grey-2':'#212121',
                'grey-700':'#504945',
                // 'grey-800':'#282828',
                'grey-800':'#202122',
                'grey-900':'#1d2021',
                'forground-0':'#fbf1c7',
                'red-dark':'#cc241d',
                'red':'#fb4934',
            }
        },
        maxHeight:{
            '0': '0',
            '1/4': '25%',
            '1/2': '50%',
            '3/4': '75%',
            'full': '100%',
        }
	},
	plugins: [require('@tailwindcss/aspect-ratio')],
    darkMode: 'class',
};

module.exports = config;
