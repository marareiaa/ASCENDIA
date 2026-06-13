'use strict';

/* ════════════════════════════════════════════════════════════
   ASCENDIA — script.js
   Um único loop de scroll throttled por requestAnimationFrame,
   medições de layout em cache e re-medição no resize/load.
   Inclui: navbar ativa, reveals, scroll suave para âncoras,
   botão "voltar ao topo" e newsletter do footer.
═════════════════════════════════════════════════════════════ */

(() => {
  const nav      = document.getElementById('mainNav');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.navbar-collapse .nav-link'));
  const backToTop = document.getElementById('backToTop');
  const progress  = document.getElementById('scrollProgress');

  // Mapa href -> link, para lookup O(1) (em vez de varrer todos os links a cada frame)
  const linkByHash = new Map();
  navLinks.forEach(l => linkByHash.set(l.getAttribute('href'), l));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Cache das medidas das seções ──
     Lê o layout apenas quando necessário (load/resize), não a cada scroll. */
  let bounds = [];
  const measure = () => {
    bounds = sections.map(sec => ({
      hash:   '#' + sec.id,
      top:    sec.offsetTop,
      bottom: sec.offsetTop + sec.offsetHeight,
    }));
  };

  /* ── Render: navbar + link ativo + botão topo, sem ler layout do DOM ── */
  let currentActive = null;
  const render = () => {
    const scrollY = window.scrollY;

    // Estado da navbar
    nav.classList.toggle('scrolled', scrollY > 50);

    // Botão "voltar ao topo"
    if (backToTop) backToTop.classList.toggle('show', scrollY > 600);

    // Barra de progresso de scroll
    if (progress) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = docH > 0 ? (scrollY / docH * 100) + '%' : '0';
    }

    // Link ativo conforme a seção visível
    const y = scrollY + 96;
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

  /* ── Throttle por requestAnimationFrame ── */
  let scrollTick = false;
  const onScroll = () => {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(() => { render(); scrollTick = false; });
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Resize: re-mede o layout (também via rAF) ── */
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

  /* ── Botão "voltar ao topo" ── */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ── Newsletter do footer (sem back-end: feedback visual) ── */
  const newsletter = document.getElementById('newsletterForm');
  if (newsletter) {
    newsletter.addEventListener('submit', e => {
      e.preventDefault();
      const btn = newsletter.querySelector('button');
      if (!btn) return;
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="bi bi-check-lg"></i>';
      btn.disabled = true;
      newsletter.querySelector('input').value = '';
      setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 3000);
    });
  }

  /* ── Passada inicial ── */
  measure();
  render();
})();
