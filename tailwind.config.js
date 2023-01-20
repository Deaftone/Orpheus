const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    './index.html', 'splashscreen.html',
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
      pink: colors.pink
    },
    extend: {
      animation: {
        marquee: 'marquee 15s linear infinite',
        marquee2: 'marquee2 15s linear infinite'
      },
      transitionProperty: {
        width: 'width'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      }
    }
  },
  plugins: [require('@vueform/slider/tailwind'), require('daisyui'), require('tailwind-scrollbar'), require('@tailwindcss/line-clamp')],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false
  },
  screens: {
    xs: { max: '575px' }, // Mobile (iPhone 3 - iPhone XS Max).
    sm: { min: '576px', max: '897px' }, // Mobile (matches max: iPhone 11 Pro Max landscape @ 896px).
    md: { min: '898px', max: '1199px' }, // Tablet (matches max: iPad Pro @ 1112px).
    lg: { min: '1200px' }, // Desktop smallest.
    xl: { min: '1159px' }, // Desktop wide.
    xxl: { min: '1359px' } // Desktop widescreen.
  }
}
