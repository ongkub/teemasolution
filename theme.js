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
      /* Icons are swapped via CSS .icon-sun / .icon-moon — no JS needed */
    });
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
  var siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    window.addEventListener('scroll', function () {
      siteHeader.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Hamburger ──────────────────────────────────── */
  var menuBtn = document.getElementById('menuBtn');
  if (menuBtn && siteHeader) {
    menuBtn.addEventListener('click', function () {
      var open = siteHeader.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    /* close on link click */
    siteHeader.querySelectorAll('.mobile-menu a').forEach(function (a) {
      a.addEventListener('click', function () {
        siteHeader.classList.remove('nav-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Scroll reveal ──────────────────────────────── */
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('in');
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale').forEach(function (el) {
    observer.observe(el);
  });

  /* ── Counter animation ──────────────────────────── */
  function animateCount(el) {
    var raw    = el.dataset.count;
    if (!raw) return;
    var target  = parseInt(raw, 10);
    var suffix  = el.dataset.suffix || '';
    var dur     = 1400;
    var start   = null;
    el.classList.add('stat-anim');
    function tick(ts) {
      if (!start) start = ts;
      var p    = Math.min((ts - start) / dur, 1);
      var ease = 1 - Math.pow(1 - p, 3);           /* ease-out cubic */
      el.innerHTML = Math.floor(ease * target) + '<span>' + suffix + '</span>';
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var countObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      animateCount(e.target);
      countObs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(function (el) {
    countObs.observe(el);
  });

  /* ── Float animation (hero badges) ─────────────── */
  document.querySelectorAll('.hero__float').forEach(function (el, i) {
    el.style.animation = 'ts-float ' + (3.5 + i * 0.8) + 's ease-in-out infinite';
    el.style.animationDelay = (i * 0.4) + 's';
  });

  /* ── Stagger children of grids on reveal ────────── */
  document.querySelectorAll(
    '.portfolio__grid, .values__grid, .stats-grid, .service-list, .contact-grid, .bento, .clients__logos'
  ).forEach(function (grid) {
    Array.from(grid.children).forEach(function (child, i) {
      if (
        child.classList.contains('reveal') ||
        child.classList.contains('reveal--scale') ||
        child.classList.contains('reveal--left') ||
        child.classList.contains('reveal--right')
      ) {
        child.style.transitionDelay = (i * 0.07) + 's';
      }
    });
  });

  /* ── Cursor glow tracker ────────────────────────── */
  document.querySelectorAll('.glow-card').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

})();
