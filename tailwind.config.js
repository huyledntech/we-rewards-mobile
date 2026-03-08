import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
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
      fontSize: {
        "2xs": "10px",
        "1xs": "11px",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light'],
    defaultTheme: 'light',
    logs: false,
  },
};
