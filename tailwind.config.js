/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                fern_green: {
                    100: "#dee6dd",
                    200: "#bccdbc",
                    300: "#9bb39a",
                    400: "#799a79",
                    500: "#588157",
                    600: "#466746",
                    700: "#354d34",
                    800: "#233423",
                    900: "#121a11",
                },
            },
            fontFamily: {
                anta: ["Anta", "sans-serif"],
            },
        },
    },
    plugins: [],
};
