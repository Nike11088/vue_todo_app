/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,css,vue}"
  ],
  theme: {
    extend: {
    }
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        '.scrollbar': {
            overflowY: 'auto',
            scrollbarColor: `${theme('colors.blue.70')} ${theme('colors.blue.200')}`,
            scrollbarWidth: 'thin',
        },
        '.scrollbar::-webkit-scrollbar': {
            height: '2px',
            width: '3px'
        },
        '.scrollbar::-webkit-scrollbar-thumb': {
            backgroundColor: theme('colors.blue.700'),
        },
        '.scrollbar::-webkit-scrollbar-track-piece': {
            backgroundColor: theme('colors.blue.200'),
        },
      })
    }),
  ],
  darkMode: 'class'
}

