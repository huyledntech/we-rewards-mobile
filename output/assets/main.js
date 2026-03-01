(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const en = {
  "nav.home": "Home",
  "nav.features": "Features",
  "nav.about": "About",
  "nav.contact": "Contact",
  "hero.title": "Build Beautiful Interfaces",
  "hero.subtitle": "A modern frontend boilerplate powered by Tailwind CSS, daisyUI, and jQuery.",
  "hero.cta": "Get Started",
  "features.title": "What's Included",
  "features.tailwind": "Tailwind CSS",
  "features.tailwindDesc": "Utility-first CSS framework for rapid UI development.",
  "features.daisy": "daisyUI",
  "features.daisyDesc": "Beautiful Tailwind CSS component library with themes.",
  "features.jquery": "jQuery",
  "features.jqueryDesc": "Familiar DOM manipulation and event handling.",
  "card.learnMore": "Learn more",
  "i18n.title": "Multi-language Support",
  "i18n.subtitle": "Switch languages using the buttons in the header. Language preference is saved automatically.",
  "footer.copy": "© 2025 FrontendKit. Built with Tailwind CSS, daisyUI & jQuery."
};
const vi = {
  "nav.home": "Trang chủ",
  "nav.features": "Tính năng",
  "nav.about": "Giới thiệu",
  "nav.contact": "Liên hệ",
  "hero.title": "Xây dựng giao diện đẹp mắt",
  "hero.subtitle": "Bộ khởi động frontend hiện đại với Tailwind CSS, daisyUI và jQuery.",
  "hero.cta": "Bắt đầu ngay",
  "features.title": "Tính năng nổi bật",
  "features.tailwind": "Tailwind CSS",
  "features.tailwindDesc": "Framework CSS utility-first giúp phát triển UI nhanh chóng.",
  "features.daisy": "daisyUI",
  "features.daisyDesc": "Thư viện thành phần Tailwind đẹp mắt với nhiều chủ đề.",
  "features.jquery": "jQuery",
  "features.jqueryDesc": "Thao tác DOM quen thuộc và xử lý sự kiện dễ dàng.",
  "card.learnMore": "Tìm hiểu thêm",
  "i18n.title": "Hỗ trợ đa ngôn ngữ",
  "i18n.subtitle": "Chuyển ngôn ngữ bằng các nút trên thanh điều hướng. Lựa chọn được lưu tự động.",
  "footer.copy": "© 2025 FrontendKit. Xây dựng với Tailwind CSS, daisyUI & jQuery."
};
const ja = {
  "nav.home": "ホーム",
  "nav.features": "機能",
  "nav.about": "概要",
  "nav.contact": "お問い合わせ",
  "hero.title": "美しいインターフェースを構築",
  "hero.subtitle": "Tailwind CSS、daisyUI、jQueryを使ったモダンなフロントエンドボイラープレート。",
  "hero.cta": "はじめる",
  "features.title": "含まれる機能",
  "features.tailwind": "Tailwind CSS",
  "features.tailwindDesc": "高速なUI開発のためのユーティリティファーストCSSフレームワーク。",
  "features.daisy": "daisyUI",
  "features.daisyDesc": "テーマ付きの美しいTailwind CSSコンポーネントライブラリ。",
  "features.jquery": "jQuery",
  "features.jqueryDesc": "馴染みのあるDOM操作とイベント処理。",
  "card.learnMore": "詳細を見る",
  "i18n.title": "多言語サポート",
  "i18n.subtitle": "ヘッダーのボタンで言語を切り替えられます。選択は自動的に保存されます。",
  "footer.copy": "© 2025 FrontendKit. Tailwind CSS、daisyUI & jQueryで構築。"
};
const DEFAULT_LANG = "en";
const SUPPORTED_LANGS = ["en", "vi", "ja"];
const STORAGE_KEY = "preferred_lang";
const LOCALES = { en, vi, ja };
function resolveLanguage() {
  const pathMatch = window.location.pathname.match(/^\/(en|vi|ja)(\/|$)/);
  if (pathMatch && SUPPORTED_LANGS.includes(pathMatch[1])) {
    return pathMatch[1];
  }
  const params = new URLSearchParams(window.location.search);
  const paramLang = params.get("lang");
  if (paramLang && SUPPORTED_LANGS.includes(paramLang)) {
    return paramLang;
  }
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LANGS.includes(stored)) {
    return stored;
  }
  return DEFAULT_LANG;
}
function t(key, lang) {
  const dict = LOCALES[lang] || LOCALES[DEFAULT_LANG];
  return dict[key] !== void 0 ? dict[key] : key;
}
function applyTranslations(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key, lang);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    el.innerHTML = t(key, lang);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.placeholder = t(key, lang);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    el.title = t(key, lang);
  });
  document.querySelectorAll("[data-i18n-href]").forEach((el) => {
    const key = el.getAttribute("data-i18n-href");
    el.href = t(key, lang);
  });
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });
}
function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) {
    console.warn(`[i18n] Unsupported language: "${lang}". Supported: ${SUPPORTED_LANGS.join(", ")}`);
    return;
  }
  localStorage.setItem(STORAGE_KEY, lang);
  window.i18n.lang = lang;
  applyTranslations(lang);
}
const currentLang = resolveLanguage();
localStorage.setItem(STORAGE_KEY, currentLang);
window.i18n = {
  lang: currentLang,
  t: (key) => t(key, window.i18n.lang),
  setLang
};
document.addEventListener("DOMContentLoaded", () => {
  applyTranslations(currentLang);
});
$(document).ready(function() {
  console.log("✅ FrontendKit ready.");
  console.log("   jQuery version :", $.fn.jquery);
  console.log("   Active language:", window.i18n.lang);
  const cards = document.querySelectorAll(".feature-card");
  if ("IntersectionObserver" in window && cards.length > 0) {
    const revealObserver = new IntersectionObserver(
      function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        // Trigger when 15% of the card enters the viewport.
        threshold: 0.15
      }
    );
    cards.forEach(function(card) {
      revealObserver.observe(card);
    });
  } else {
    cards.forEach(function(card) {
      card.classList.add("visible");
    });
  }
  $("[data-lang]").on("click", function() {
    const lang = $(this).data("lang");
    if (lang) {
      window.i18n.setLang(lang);
    }
  });
});
