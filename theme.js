/* =====================================================
   Teema Solution — Shared Theme & i18n Runtime
   ===================================================== */

(function () {
  'use strict';

  /* ── Apply translations ─────────────────────────── */
  function applyLang(lang) {
    var tr = window.TR;
    if (!tr || !tr[lang]) return;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.dataset.i18n;
      if (tr[lang][key] !== undefined) {
        el.innerHTML = tr[lang][key];
      }
    });
    document.documentElement.lang = lang === 'en' ? 'en' : 'th';
    document.documentElement.dataset.lang = lang;
  }

  /* ── Theme toggle ───────────────────────────────── */
  var themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var current = document.documentElement.dataset.theme || 'dark';
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('ts-theme', next);
      updateThemeIcon(next);
    });
    updateThemeIcon(document.documentElement.dataset.theme || 'dark');
  }

  function updateThemeIcon(theme) {
    var btn = document.getElementById('themeBtn');
    if (!btn) return;
    if (theme === 'light') {
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    } else {
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    }
  }

  /* ── Lang toggle ────────────────────────────────── */
  var langBtn = document.getElementById('langBtn');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      var current = localStorage.getItem('ts-lang') || 'th';
      var next = current === 'th' ? 'en' : 'th';
      localStorage.setItem('ts-lang', next);
      applyLang(next);
    });
  }

  /* ── Apply initial lang ─────────────────────────── */
  var initLang = localStorage.getItem('ts-lang') || 'th';
  applyLang(initLang);

  /* ── Nav scroll ─────────────────────────────────── */
  var nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Hamburger ──────────────────────────────────── */
  var hamburger = document.getElementById('hamburger');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('menu-open');
    });
    /* close on link click */
    nav.querySelectorAll('.nav__links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('menu-open'); });
    });
  }

  /* ── Scroll reveal ──────────────────────────────── */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });

})();
