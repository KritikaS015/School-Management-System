/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-800": "#550080",
        "purple-600": "#7f56da",
      },
    },
  },
  plugins: [],
};
