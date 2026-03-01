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

    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light', 'dark', 'cupcake'],
    defaultTheme: 'light',
    logs: false,
  },
};
