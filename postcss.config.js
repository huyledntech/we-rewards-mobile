export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // ⚠️  cssnano is intentionally omitted.
    //     Custom CSS must remain readable and unminified per project requirements.
    //     Vendor libs (jQuery, daisyUI) are pre-minified via CDN/plugin respectively.
  },
};
