const colors = require('tailwindcss/colors')
module.exports = {
  purge: {
    content: ['./index.html','splashscreen.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    options: {
      safelist: [
        /data-theme$/,
      ]
    },
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.sky,
      yellow: colors.amber,
      purple: colors.purple,
      pink: colors.pink,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [require('@vueform/slider/tailwind'), require('daisyui')],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}
