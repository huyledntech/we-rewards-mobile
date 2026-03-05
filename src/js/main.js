// =============================================================================
// main.js — Application entry point
// =============================================================================
//
// MOBILE-ONLY:
//   - No mouse-specific events (mouseover, mouseenter, mouseleave, mouseout).
//   - Card reveal uses IntersectionObserver — works with touch scrolling on all
//     mobile browsers (no scroll jank, no passive-listener warnings).
//   - Language switcher bound to 'click' (fires reliably on both touch & mouse;
//     jQuery normalises touchend→click so no 300ms delay on modern browsers).
//   - Touch feedback (visual active state) is handled entirely in CSS via :active.
//
// jQuery ($) is available globally via CDN in layout.html.
// window.i18n is initialised by i18n.js (imported below).
// =============================================================================

import './i18n.js';

import './we-rewards.js';
import './we-tournaments.js';

$(document).ready(function () {

    console.log('✅ FrontendKit ready.');
    console.log('   jQuery version :', $.fn.jquery);
    console.log('   Active language:', window.i18n.lang);

    // ── Feature Card Reveal (IntersectionObserver) ────────────────────────────
    // IntersectionObserver is the correct tool for scroll-reveal on mobile:
    //  ✓  Fires off the main thread — no scroll jank.
    //  ✓  No 'passive event listener' console warnings.
    //  ✓  Works identically with touch scroll, momentum scroll, and keyboard.
    //  ✗  DO NOT use: $(window).on('scroll'), mouseover, mouseenter, etc.

    const cards = document.querySelectorAll('.feature-card');

    if ('IntersectionObserver' in window && cards.length > 0) {

        const revealObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Stop observing once revealed — no need to keep tracking.
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                // Trigger when 15% of the card enters the viewport.
                threshold: 0.15,
            }
        );

        cards.forEach(function (card) {
            revealObserver.observe(card);
        });

    } else {
        // Fallback for very old browsers: reveal all cards immediately.
        cards.forEach(function (card) {
            card.classList.add('visible');
        });
    }

    // ── Language Switcher ─────────────────────────────────────────────────────
    // 'click' works for both tap (touch) and mouse click.
    // jQuery on mobile fires click after touchend without the legacy 300ms delay
    // for sites with a proper mobile viewport meta tag (which we have).
    // DO NOT use: mousedown, mouseup, mouseover, mouseenter.

    $('[data-lang]').on('click', function () {
        const lang = $(this).data('lang');
        if (lang) {
            window.i18n.setLang(lang);
        }
    });

    // ── daisyUI Theme Toggle (touch-safe) ────────────────────────────────────
    // Add <button id="theme-toggle"> anywhere and uncomment:
    //
    // $('#theme-toggle').on('click', function () {
    //     const current = $('body').attr('data-theme');
    //     $('body').attr('data-theme', current === 'light' ? 'dark' : 'light');
    // });

});

