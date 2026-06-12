'use strict';

/* ════════════════════════════════════════════════════════════
   ASCENDIA — script.js
   Reorganizado para fluidez: um único loop de scroll throttled
   por requestAnimationFrame, medições de layout em cache e
   re-medição no resize/load para acompanhar a responsividade.
   Comportamento e visual idênticos ao original.
═════════════════════════════════════════════════════════════ */

(() => {
  const nav      = document.getElementById('mainNav');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.navbar-collapse .nav-link'));

  // Mapa href -> link, para lookup O(1) (em vez de varrer todos os links a cada frame)
  const linkByHash = new Map();
  navLinks.forEach(l => linkByHash.set(l.getAttribute('href'), l));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Cache das medidas das seções ──
     Lê o layout apenas quando necessário (load/resize), não a cada scroll.
     Isso evita reflows forçados e mantém o scroll fluido. */
  let bounds = [];
  const measure = () => {
    bounds = sections.map(sec => ({
      hash:   '#' + sec.id,
      top:    sec.offsetTop,
      bottom: sec.offsetTop + sec.offsetHeight,
    }));
  };

  /* ── Render: navbar + link ativo, sem ler layout do DOM ── */
  let currentActive = null;
  const render = () => {
    const scrollY = window.scrollY;

    // Estado da navbar
    nav.classList.toggle('scrolled', scrollY > 50);

    // Link ativo conforme a seção visível
    const y = scrollY + 90;
    let activeHash = null;
    for (let i = 0; i < bounds.length; i++) {
      const b = bounds[i];
      if (y >= b.top && y < b.bottom) { activeHash = b.hash; break; }
    }

    if (activeHash && activeHash !== currentActive) {
      if (currentActive) linkByHash.get(currentActive)?.classList.remove('is-active');
      linkByHash.get(activeHash)?.classList.add('is-active');
      currentActive = activeHash;
    }
  };

  /* ── Throttle por requestAnimationFrame ──
     Garante no máximo um ciclo de leitura/escrita por frame. */
  let scrollTick = false;
  const onScroll = () => {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(() => { render(); scrollTick = false; });
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Resize: re-mede o layout (também via rAF) para acompanhar
     os breakpoints responsivos, depois re-renderiza. ── */
  let resizeTick = false;
  window.addEventListener('resize', () => {
    if (resizeTick) return;
    resizeTick = true;
    requestAnimationFrame(() => { measure(); render(); resizeTick = false; });
  }, { passive: true });

  // Recalcula quando imagens/fontes terminam de carregar (os offsets mudam)
  window.addEventListener('load', () => { measure(); render(); });

  /* ── Reveals via IntersectionObserver ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    // Sem animação: mostra tudo de imediato
    reveals.forEach(el => el.classList.add('visible'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    reveals.forEach(el => io.observe(el));
  }

  /* ── Scroll suave para âncoras ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.getElementById(id.slice(1));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    });
  });

  /* ── Passada inicial ── */
  measure();
  render();
})();