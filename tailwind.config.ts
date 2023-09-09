/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,css,vue}"
  ],
  theme: {
    extend: {},
    screens: {
      "sm": "540px"
    }
  },
  plugins: [],
  darkMode: 'class'
}

