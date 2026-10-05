/* main.js — Navigation, Reveal, Formular */

(function () {
  'use strict';

  /* Mobile Menü */
  var burger = document.getElementById('nav-burger');
  var links = document.getElementById('nav-links');

  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      burger.classList.toggle('is-active', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });

    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('is-open');
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Nav-Hintergrund bei Scroll */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('nav--scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Scroll-Reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Kontaktformular (statisch: validiert + öffnet E-Mail-Client) */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var data = new FormData(form);
      var subject = encodeURIComponent('Website-Anfrage: ' + (data.get('topic') || 'Allgemein'));
      var body = encodeURIComponent(
        'Name: ' + data.get('name') + '\n' +
        'Unternehmen: ' + (data.get('company') || '–') + '\n' +
        'E-Mail: ' + data.get('email') + '\n' +
        'Thema: ' + data.get('topic') + '\n\n' +
        data.get('message')
      );

      window.location.href = 'mailto:wuerfl@it-wuerfl.de?subject=' + subject + '&body=' + body;

      if (status) {
        status.textContent =
          'Vielen Dank! Ihr E-Mail-Programm wurde geöffnet. ' +
          'Sollte es nicht sein: wuerfl@it-wuerfl.de';
        status.classList.add('form-status--ok');
      }
      form.reset();
    });
  }
})();
