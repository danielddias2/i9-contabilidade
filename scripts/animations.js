/**
 * ============================================================
 * I9 CONTABILIDADE — ANIMATIONS
 * ============================================================
 * Scroll-triggered reveals via IntersectionObserver.
 * Contador animado para os números de Stats.
 * Nenhuma biblioteca externa.
 * ============================================================
 */

const Animations = {

  observer: null,

  init() {
    // Respeitar prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      this.skipAnimations();
      return;
    }

    this.initScrollReveal();
    this.initCounters();
  },

  // ─── SCROLL REVEAL ────────────────────────────

  initScrollReveal() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            this.observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    // Observar todos os elementos com [data-animate]
    document.querySelectorAll('[data-animate]').forEach(el => {
      this.observer.observe(el);
    });
  },

  // ─── COUNTER ANIMATION ────────────────────────

  initCounters() {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const valueEl = entry.target.querySelector('.stat__value');
            if (valueEl && !valueEl.dataset.counted) {
              valueEl.dataset.counted = 'true';
              this.animateCounter(valueEl);
            }
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('.stat').forEach(stat => {
      counterObserver.observe(stat);
    });
  },

  animateCounter(el) {
    const rawValue = el.getAttribute('data-target') || el.textContent;
    const prefix = rawValue.match(/^[^0-9]*/)?.[0] || '';
    const suffix = rawValue.match(/[^0-9]+$/)?.[0] || '';
    const numStr = rawValue.replace(/\D/g, '');
    const target = parseInt(numStr, 10);

    if (isNaN(target) || target === 0) return;

    const duration = 1800;
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(easeOut(progress) * target);

      el.textContent = prefix + current.toLocaleString('pt-BR') + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = rawValue;
      }
    };

    requestAnimationFrame(update);
  },

  // ─── SKIP ANIMATIONS (reduced motion) ─────────

  skipAnimations() {
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.classList.add('animated');
    });
  },

  // ─── RE-OBSERVE (quando conteúdo é injetado dinamicamente) ──

  reObserve() {
    if (!this.observer) return;
    document.querySelectorAll('[data-animate]:not(.animated)').forEach(el => {
      this.observer.observe(el);
    });
  },

};
