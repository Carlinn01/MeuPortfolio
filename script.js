/* ================================================
   CARLOS OLIVEIRA — PORTFOLIO SCRIPTS
   ================================================ */

(function () {
  'use strict';

  // ── CUSTOM CURSOR (desktop only) ──────────────────
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');

  if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
    // Ativa cursor: none apenas quando o cursor customizado está presente
    document.body.classList.add('js-cursor');

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    function followRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      raf = requestAnimationFrame(followRing);
    }
    followRing();

    // Grow on interactive elements
    document.querySelectorAll('a, button, [data-mag]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('hide');
        ring.classList.add('big');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('hide');
        ring.classList.remove('big');
      });
    });

    document.addEventListener('mouseleave', () => { dot.classList.add('hide'); });
    document.addEventListener('mouseenter', () => { dot.classList.remove('hide'); });
  }

  // ── NAV SCROLL ────────────────────────────────────
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('stuck', window.scrollY > 40);
  }, { passive: true });

  // ── MOBILE MENU ───────────────────────────────────
  const burger  = document.getElementById('burger');
  const mobMenu = document.getElementById('mobMenu');

  function closeMob() {
    burger.classList.remove('open');
    mobMenu.classList.remove('open');
    mobMenu.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger?.addEventListener('click', () => {
    const isOpen = mobMenu.classList.contains('open');
    if (isOpen) {
      closeMob();
    } else {
      burger.classList.add('open');
      mobMenu.classList.add('open');
      mobMenu.setAttribute('aria-hidden', 'false');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  });

  document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', closeMob));

  // ── SMOOTH SCROLL ─────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      closeMob();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ── REVEAL ON SCROLL ──────────────────────────────
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      // Stagger siblings within the same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('in');
      }, idx * 80);
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // ── COUNTER ANIMATION ─────────────────────────────
  function runCounter(el) {
    const target = parseInt(el.dataset.to, 10);
    const dur    = 1400;
    const start  = performance.now();

    function tick(now) {
      const p  = Math.min((now - start) / dur, 1);
      const ep = 1 - Math.pow(1 - p, 3); // ease-out-cubic
      el.textContent = Math.round(ep * target);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      runCounter(entry.target);
      counterObs.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

  // ── MAGNETIC BUTTONS ──────────────────────────────
  document.querySelectorAll('[data-mag]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r  = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width  / 2);
      const dy = e.clientY - (r.top  + r.height / 2);
      el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // ── IMAGE FADE IN ─────────────────────────────────
  document.querySelectorAll('img').forEach(img => {
    if (img.complete) return;
    img.style.opacity = '0';
    img.style.transition = 'opacity .4s ease';
    img.addEventListener('load', () => { img.style.opacity = '1'; });
  });

  // ── FORM FEEDBACK ─────────────────────────────────
  document.querySelectorAll('.field input, .field textarea').forEach(input => {
    input.addEventListener('blur', () => {
      if (!input.value) return;
      input.style.borderColor = input.validity.valid ? 'var(--lime)' : '#ef4444';
    });
    input.addEventListener('focus', () => {
      input.style.borderColor = '';
    });
  });

})();
