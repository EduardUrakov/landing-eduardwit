/* =========================================================
   EduardWIT — лендинг. Скрипты
   Бургер-меню, тень шапки, reveal при скролле, автогод.
   Без зависимостей; при выключенном JS контент остаётся видимым
   (класс no-js/js переключается инлайн-скриптом в <head>).
   ========================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Тень шапки при скролле ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Мобильное меню ---------- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var setMenu = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    };

    toggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.header-inner')) setMenu(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* ---------- Reveal при скролле ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('visible'); });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Текущий год в футере ---------- */
  var year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  /* ---------- Цель Метрики «contact» ---------- */
  var METRICA_ID = 109690102;
  document.addEventListener('click', function (e) {
    var contactLink = e.target.closest(
      'a[href^="tel:"], a[href^="mailto:"], a[href^="https://t.me/"], a[href="#contact"]'
    );
    if (contactLink && window.ym) {
      try { ym(METRICA_ID, 'reachGoal', 'contact'); } catch (err) {}
    }
  });
})();