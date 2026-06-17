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

    localStorage.setItem(KEY, lang);
  }

  function init() {
    var saved = localStorage.getItem(KEY) || DEFAULT;
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
