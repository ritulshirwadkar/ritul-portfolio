(function () {
  'use strict';

  document.getElementById('year').textContent = new Date().getFullYear();

  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Modern scroll reveal with stagger
  var animatedElements = document.querySelectorAll('[data-animate]');
  var observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var delay = parseInt(el.getAttribute('data-delay'), 10) || 0;
        var stagger = el.closest('.skills-grid, .contact-grid, .experience-list, .timeline, .lang-list, .hobbies-list');
        if (stagger && !el.dataset.staggerDone) {
          var siblings = stagger.querySelectorAll('[data-animate]');
          var index = Array.prototype.indexOf.call(siblings, el);
          delay += index * 100;
          el.dataset.staggerDone = '1';
        }
        setTimeout(function () {
          el.classList.add('visible');
        }, delay);
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  animatedElements.forEach(function (el) {
    observer.observe(el);
  });

  // Hero parallax on scroll (smooth, reduced motion friendly)
  var heroBg = document.querySelector('.hero-bg');
  if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrolled = window.pageYOffset;
          var rate = scrolled * 0.18;
          heroBg.style.transform = 'translateY(' + rate + 'px)';
          ticking = false;
        });
        ticking = true;
      }
    });
  }
})();
