// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    './src/**/*.js',
    './gatsby-config.js',
    './src/**/*.tsx',
    './src/**/*.yml',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(36,62,120)',
        secondary: 'rgb(249,218,49)',
      },
      fontFamily: {},
      fontSize: {
        xxs: '.6rem',
        xs: '.75rem',
        sm: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
        '1vw': '1vw',
        '2vw': '2.25vw',
        '3vw': '3vw',
        '4vw': '4vw',
        '5vw': '5vw',
        '6vw': '6vw',
        '7vw': '7vw',
      },
      letterSpacing: {
        tighter: '-.05em',
        tight: '-.025em',
        normal: '0',
        wide: '.025em',
        wider: '.05em',
        widest: '.15em',
      },
    },
  },
  variants: {
    borderRadius: ['responsive', 'first', 'last'],
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
    boxShadow: ['responsive', 'hover', 'focus', 'active'],
  },
  // https://github.com/tailwindcss/custom-forms
  plugins: [
    require('@tailwindcss/custom-forms'),
    require('tailwindcss-debug-screens'),
  ],
}
