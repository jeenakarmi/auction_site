/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            minWidth: {
                'half-screen': '50%',
            },
            boxShadow: {
                'custom-1': '0 0 30px 0 #38664150',
            },
            border: {
                'form-1': '2px solid #386641',
            },
            colors: {
                'coolars-color-1': '#386641',
                'coolars-color-2': '#6A994E',
                'coolars-color-3': '#A7C957',
                'coolars-color-4': '#F2E8CF',
                'coolars-color-5': '#BC4749',
            },
        },
    },
    plugins: [],
};
