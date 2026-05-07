(function () {
  'use strict';

  const isFine = window.matchMedia('(pointer: fine)').matches;

  const prog = document.createElement('div');
  prog.className = 'scroll-prog';
  document.body.prepend(prog);

  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');

  if (dot && ring && isFine) {
    document.body.classList.add('js-cursor');
    let mx = -100, my = -100, rx = -100, ry = -100;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    (function loop() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(loop);
    })();

    document.querySelectorAll('a, button, [data-mag]').forEach(el => {
      el.addEventListener('mouseenter', () => { dot.classList.add('hide'); ring.classList.add('big'); });
      el.addEventListener('mouseleave', () => { dot.classList.remove('hide'); ring.classList.remove('big'); });
    });
    document.addEventListener('mouseleave', () => dot.classList.add('hide'));
    document.addEventListener('mouseenter', () => dot.classList.remove('hide'));
  }

  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('stuck', window.scrollY > 40);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (max > 0 ? (window.scrollY / max * 100) : 0) + '%';
  }, { passive: true });

  const burger  = document.getElementById('burger');
  const mobMenu = document.getElementById('mobMenu');

  function closeMob() {
    burger?.classList.remove('open');
    mobMenu?.classList.remove('open');
    mobMenu?.setAttribute('aria-hidden', 'true');
    burger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger?.addEventListener('click', () => {
    const open = mobMenu.classList.contains('open');
    if (open) {
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

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      closeMob();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const heroSection = document.getElementById('inicio');
  if (heroSection && isFine) {
    heroSection.addEventListener('mousemove', e => {
      const r = heroSection.getBoundingClientRect();
      heroSection.style.setProperty('--sx', (e.clientX - r.left) + 'px');
      heroSection.style.setProperty('--sy', (e.clientY - r.top)  + 'px');
    });
    heroSection.addEventListener('mouseleave', () => {
      heroSection.style.setProperty('--sx', '-500px');
      heroSection.style.setProperty('--sy', '-500px');
    });
  }

  const heroPhoto = document.querySelector('.hero__photo img');
  if (heroPhoto && isFine) {
    document.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      heroPhoto.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  let globalIdx = 0;
  document.querySelectorAll('.hero__line').forEach(line => {
    const text = line.textContent;
    line.innerHTML = text.split('').map(ch => {
      if (ch === ' ') return ' ';
      const span = `<span class="lhop" style="--i:${globalIdx}">${ch}</span>`;
      globalIdx++;
      return span;
    }).join('');
  });

  if (heroSection) {
    const pts = document.createElement('div');
    pts.className = 'hero-pts';
    pts.setAttribute('aria-hidden', 'true');
    heroSection.appendChild(pts);

    for (let i = 0; i < 20; i++) {
      const p = document.createElement('span');
      const tx = ((Math.random() - 0.5) * 50).toFixed(1);
      p.style.cssText = [
        `left:${4 + Math.random() * 92}%`,
        `top:${8 + Math.random() * 84}%`,
        `--d:${3 + Math.random() * 5}s`,
        `--del:${(Math.random() * 7).toFixed(2)}s`,
        `--tx:${tx}px`
      ].join(';');
      pts.appendChild(p);
    }
  }

  function applyTilt(selector, strength) {
    document.querySelectorAll(selector).forEach(el => {
      let raf;
      let tRX = 0, tRY = 0, cRX = 0, cRY = 0;

      el.addEventListener('mouseenter', () => {
        el.style.transition = 'none';
        el.style.willChange = 'transform';
        (function loop() {
          cRX += (tRX - cRX) * 0.14;
          cRY += (tRY - cRY) * 0.14;
          el.style.transform = `perspective(700px) rotateX(${cRX}deg) rotateY(${cRY}deg) scale3d(1.025,1.025,1.025)`;
          raf = requestAnimationFrame(loop);
        })();
      });

      el.addEventListener('mousemove', e => {
        const r  = el.getBoundingClientRect();
        tRX = -((e.clientY - r.top)  / r.height - 0.5) * strength;
        tRY =  ((e.clientX - r.left) / r.width  - 0.5) * strength;
      });

      el.addEventListener('mouseleave', () => {
        cancelAnimationFrame(raf);
        tRX = 0; tRY = 0;
        el.style.transition = 'transform 0.6s var(--ease)';
        el.style.transform  = '';
        setTimeout(() => { el.style.willChange = ''; el.style.transition = ''; }, 620);
      });
    });
  }

  applyTilt('.skill-card', 8);

  document.querySelectorAll('.proj-item').forEach(item => {
    const img = item.querySelector('.proj-item__img img');
    if (!img) return;

    item.addEventListener('mousemove', e => {
      const r = item.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      img.style.transform = `scale(1.08) translate(${x * 12}px, ${y * 12}px)`;
    });
    item.addEventListener('mouseleave', () => {
      img.style.transform = '';
    });
  });

  const revObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('in'), idx * 90);
      revObs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

  const lineObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('line-in');
      lineObs.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.section__head').forEach(h => lineObs.observe(h));

  function runCounter(el) {
    const target = parseInt(el.dataset.to, 10);
    const dur    = 1400;
    const start  = performance.now();
    (function tick(now) {
      const p  = Math.min((now - start) / dur, 1);
      const ep = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ep * target);
      if (p < 1) requestAnimationFrame(tick);
      else el.closest('.stat')?.classList.add('stat-done');
    })(start);
  }

  const cntObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      runCounter(e.target);
      cntObs.unobserve(e.target);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(el => cntObs.observe(el));

  document.querySelectorAll('[data-mag]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r  = el.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width  / 2) * 0.22;
      const dy = (e.clientY - r.top  - r.height / 2) * 0.22;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });

  document.querySelectorAll('img').forEach(img => {
    if (img.complete) return;
    img.style.opacity    = '0';
    img.style.transition = 'opacity .4s ease';
    img.addEventListener('load', () => img.style.opacity = '1');
  });

  document.querySelectorAll('.field input, .field textarea').forEach(input => {
    input.addEventListener('blur', () => {
      if (!input.value) return;
      input.style.borderColor = input.validity.valid ? 'var(--lime)' : '#ef4444';
    });
    input.addEventListener('focus', () => input.style.borderColor = '');
  });

})();
