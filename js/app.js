/* ======================================================
   AgentBrowser — Site Interactions
   Scroll reveals, nav state, smooth behaviors
   ====================================================== */

(function () {
  'use strict';

  // --- Nav scroll state ---
  var nav = document.getElementById('nav');
  var scrollThreshold = 40;

  function updateNav() {
    if (window.scrollY > scrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // --- Scroll reveal ---
  var revealEls = [];
  var revealSelectors = [
    '.feature-card',
    '.showcase-item',
    '.step',
    '.section-header',
    '.specs-grid',
    '.cta-content'
  ];

  revealSelectors.forEach(function (sel) {
    var els = document.querySelectorAll(sel);
    for (var i = 0; i < els.length; i++) {
      els[i].classList.add('reveal');
      revealEls.push(els[i]);
    }
  });

  function checkReveals() {
    var windowHeight = window.innerHeight;
    revealEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < windowHeight * 0.88) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveals, { passive: true });
  window.addEventListener('resize', checkReveals, { passive: true });

  // Initial check after small delay for page-load animations
  setTimeout(checkReveals, 100);

  // --- Smooth anchor scrolling ---
  var anchors = document.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navHeight = nav.offsetHeight;
        var targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  }

  // --- Showcase gallery: drag to scroll ---
  var galleries = document.querySelectorAll('.showcase-gallery-scroll');
  galleries.forEach(function (gallery) {
    var isDown = false;
    var startX, scrollLeft;

    gallery.addEventListener('mousedown', function (e) {
      isDown = true;
      gallery.style.cursor = 'grabbing';
      startX = e.pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    });

    gallery.addEventListener('mouseleave', function () {
      isDown = false;
      gallery.style.cursor = '';
    });

    gallery.addEventListener('mouseup', function () {
      isDown = false;
      gallery.style.cursor = '';
    });

    gallery.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - gallery.offsetLeft;
      var walk = (x - startX) * 1.5;
      gallery.scrollLeft = scrollLeft - walk;
    });
  });

})();