import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  theme: {
    // ── Mobile-only: disable ALL responsive breakpoints ──────────────────────
    // Setting screens to an empty object prevents Tailwind from generating
    // sm:, md:, lg:, xl:, 2xl: responsive variants.
    // Desktop layouts are explicitly forbidden in this project.
    screens: {},

    extend: {
      fontFamily: {
        sans: ['Overpass', 'sans-serif'],
      },
      colors: {
        primary: '#FFD800',
        secondary: '#3C3C3C',
        accent: '#E3E4E580',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light', 'dark', 'cupcake'],
    defaultTheme: 'light',
    logs: false,
  },
};
