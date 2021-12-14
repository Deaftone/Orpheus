const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './index.html','splashscreen.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.neutral,
      red: colors.red,
      blue: colors.sky,
      yellow: colors.amber,
      purple: colors.purple,
      pink: colors.pink,
    }
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
