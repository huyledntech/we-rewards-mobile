// =============================================================================
// i18n.js — Static internationalization module
// =============================================================================
//
// Language resolution order (first match wins):
//   1. URL path prefix  (/en/, /vi/, /ja/)
//   2. Query param      (?lang=en)
//   3. localStorage     (persisted from the user's last visit)
//   4. DEFAULT_LANG     (configurable fallback)
//
// Locale data is bundled inline at build time via Vite's JSON import support.
// This ensures i18n works when opening dist/index.html via file:// protocol
// without a server (no fetch() CORS issues).
//
// Public API (available as window.i18n):
//   window.i18n.lang         — current active language code
//   window.i18n.t(key)       — translate a key in the active language
//   window.i18n.setLang(code)— switch language and re-render the page
// =============================================================================

import en from '../locales/en.json';
import vi from '../locales/vi.json';
import ja from '../locales/ja.json';

// ── Configuration ─────────────────────────────────────────────────────────────

const DEFAULT_LANG    = 'en';                  // Change to 'vi' or 'ja' to shift the default
const SUPPORTED_LANGS = ['en', 'vi', 'ja'];
const STORAGE_KEY     = 'preferred_lang';

/** All locale dictionaries keyed by language code. */
const LOCALES = { en, vi, ja };

// ── Language Resolution ───────────────────────────────────────────────────────

/**
 * Determines the active language from the environment.
 * Checks URL path → query param → localStorage → default.
 * @returns {string} A supported language code.
 */
function resolveLanguage() {
    // 1. URL path prefix: /en/, /vi/, /ja/
    const pathMatch = window.location.pathname.match(/^\/(en|vi|ja)(\/|$)/);
    if (pathMatch && SUPPORTED_LANGS.includes(pathMatch[1])) {
        return pathMatch[1];
    }

    // 2. Query param: ?lang=vi
    const params    = new URLSearchParams(window.location.search);
    const paramLang = params.get('lang');
    if (paramLang && SUPPORTED_LANGS.includes(paramLang)) {
        return paramLang;
    }

    // 3. localStorage — persisted from a previous visit
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) {
        return stored;
    }

    // 4. Hardcoded default
    return DEFAULT_LANG;
}

// ── Translation Lookup ────────────────────────────────────────────────────────

/**
 * Looks up a translation key in the given language's dictionary.
 * Falls back to the key itself if not found (so missing keys are obvious in the UI).
 * @param {string} key
 * @param {string} lang
 * @returns {string}
 */
function t(key, lang) {
    const dict = LOCALES[lang] || LOCALES[DEFAULT_LANG];
    return dict[key] !== undefined ? dict[key] : key;
}

// ── DOM Application ───────────────────────────────────────────────────────────

/**
 * Walks the DOM and applies translations for the given language.
 * Supported attributes:
 *   data-i18n             → sets element.textContent
 *   data-i18n-html        → sets element.innerHTML (use for rich text)
 *   data-i18n-placeholder → sets element.placeholder  (inputs)
 *   data-i18n-title       → sets element.title
 *   data-i18n-href        → sets element.href
 * @param {string} lang
 */
function applyTranslations(lang) {
    // Set <html lang="…">
    document.documentElement.lang = lang;

    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key, lang);
    });

    // Inner HTML (for rich / HTML-formatted translations)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        el.innerHTML = t(key, lang);
    });

    // Placeholder attribute (form inputs)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key, lang);
    });

    // Title attribute (tooltips)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        el.title = t(key, lang);
    });

    // href attribute (localised links)
    document.querySelectorAll('[data-i18n-href]').forEach(el => {
        const key = el.getAttribute('data-i18n-href');
        el.href = t(key, lang);
    });

    // Sync active state on language switcher buttons
    document.querySelectorAll('[data-lang]').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Switches the active language, persists the choice, and re-renders translations.
 * This does NOT reload the page.
 * @param {string} lang
 */
function setLang(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) {
        console.warn(`[i18n] Unsupported language: "${lang}". Supported: ${SUPPORTED_LANGS.join(', ')}`);
        return;
    }
    localStorage.setItem(STORAGE_KEY, lang);
    window.i18n.lang = lang;
    applyTranslations(lang);
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────

const currentLang = resolveLanguage();

// Persist resolved language for next visit
localStorage.setItem(STORAGE_KEY, currentLang);

/**
 * window.i18n — global i18n API.
 * Available in main.js and inline HTML onclick handlers.
 */
window.i18n = {
    lang: currentLang,
    t:    (key) => t(key, window.i18n.lang),
    setLang,
};

// Apply translations once the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations(currentLang);
});

export default window.i18n;
