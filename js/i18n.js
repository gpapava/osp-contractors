(function () {
  var DEFAULT = 'en';
  var KEY = 'osp_lang';

  function getPage() {
    var p = location.pathname.split('/').pop();
    return p ? p.replace('.html', '') || 'index' : 'index';
  }

  function applyLang(lang) {
    var t = TRANSLATIONS[lang];
    if (!t) return;

    document.documentElement.lang = lang;

    // data-i18n (text content)
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (t[k] !== undefined) el.textContent = t[k];
    });

    // data-i18n-html (inner HTML)
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-html');
      if (t[k] !== undefined) el.innerHTML = t[k];
    });

    // data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-placeholder');
      if (t[k] !== undefined) el.placeholder = t[k];
    });

    // Page title via head data-i18n-title
    var head = document.querySelector('head[data-i18n-title]');
    if (head) {
      var tk = head.getAttribute('data-i18n-title');
      if (t[tk] !== undefined) document.title = t[tk];
    }

    // Page-specific selector translations
    var page = getPage();
    var pages = t.pages;
    if (pages && pages[page]) {
      pages[page].forEach(function (entry) {
        var selector = entry[0];
        var value = entry[1];
        try {
          document.querySelectorAll(selector).forEach(function (el) {
            el.textContent = value;
          });
        } catch (e) { /* ignore invalid selectors */ }
      });
    }

    // Update switcher button states
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    applyAttrs(lang);

    try { localStorage.setItem(KEY, lang); } catch (e) { /* storage may be blocked */ }

    // Let other scripts (main.js) refresh their own dynamic labels
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  // Translate alt / aria-label (WCAG 1.1.1, 3.1.2), <title> and meta description.
  // Original English text is kept in data-orig-* so EN can be restored.
  // Only strings listed in ATTR_EL are touched; labels set dynamically by
  // main.js are not in the map and are left alone.
  function applyAttrs(lang) {
    var map = (typeof ATTR_EL !== 'undefined') ? ATTR_EL : {};
    function swap(el, attr) {
      var store = 'data-orig-' + attr;
      var orig = el.hasAttribute(store) ? el.getAttribute(store) : el.getAttribute(attr);
      if (orig === null || map[orig] === undefined) return;
      if (!el.hasAttribute(store)) el.setAttribute(store, orig);
      el.setAttribute(attr, lang === 'el' ? map[orig] : orig);
    }
    document.querySelectorAll('[alt], [aria-label]').forEach(function (el) {
      if (el.hasAttribute('alt')) swap(el, 'alt');
      if (el.hasAttribute('aria-label')) swap(el, 'aria-label');
    });
    var meta = document.querySelector('meta[name="description"]');
    if (meta) swap(meta, 'content');
    if (!document.documentElement.hasAttribute('data-orig-title')) {
      document.documentElement.setAttribute('data-orig-title', document.title);
    }
    var origTitle = document.documentElement.getAttribute('data-orig-title');
    if (map[origTitle] !== undefined) document.title = lang === 'el' ? map[origTitle] : origTitle;
  }

  function init() {
    var saved = DEFAULT;
    try { saved = localStorage.getItem(KEY) || DEFAULT; } catch (e) { /* storage may be blocked */ }
    applyLang(saved);
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLang(btn.getAttribute('data-lang'));
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
