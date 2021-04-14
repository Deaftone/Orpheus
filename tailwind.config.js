const colors = require('tailwindcss/colors')
module.exports = {
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.lightBlue,
      yellow: colors.amber,
      purple: colors.purple,
      pink: colors.pink,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
