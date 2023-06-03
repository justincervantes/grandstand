/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        'ul:has(li):has(input[type="checkbox"])': {
                            padding: 0,
                        },
                        'ul > li:has(input[type="checkbox"])': {
                            listStyle: 'none',
                        },
                        'ul > li:has(input[type="checkbox"]) ul li': {
                            paddingLeft: 30,
                        },
                    },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar')],
    variants: {
        scrollbar: ['rounded-rounded-*'],
    },
};
