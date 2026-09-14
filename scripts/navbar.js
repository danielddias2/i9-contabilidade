/**
 * ============================================================
 * I9 CONTABILIDADE — NAVBAR
 * ============================================================
 * Comportamento do navbar:
 * - Sticky com backdrop blur ao scroll
 * - Mudança de altura durante scroll
 * - Menu mobile com overlay
 * - active link por scroll position
 * ============================================================
 */

const Navbar = {

  el: null,
  toggleBtn: null,
  mobilePanel: null,
  mobileOverlay: null,
  isOpen: false,
  lastScrollY: 0,
  scrollThreshold: 60,

  init() {
    this.el = document.querySelector('.navbar');
    this.toggleBtn = document.querySelector('.navbar__toggle');
    this.mobilePanel = document.querySelector('.navbar__mobile-panel');
    this.mobileOverlay = document.querySelector('.navbar__mobile-overlay');
    const closeBtn = document.querySelector('.navbar__mobile-close');

    if (!this.el) return;

    // Scroll handler
    this.handleScroll();
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

    // Mobile toggle
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggleMenu());
    }

    // Close button
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeMenu());
    }

    // Overlay click closes
    if (this.mobileOverlay) {
      this.mobileOverlay.addEventListener('click', () => this.closeMenu());
    }

    // Mobile links close menu
    document.querySelectorAll('.navbar__mobile-link').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Escape key closes
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.closeMenu();
    });

    // Active section tracking
    this.initSectionTracking();
  },

  handleScroll() {
    const scrollY = window.scrollY;
    const scrolled = scrollY > this.scrollThreshold;

    this.el.classList.toggle('scrolled', scrolled);
    this.lastScrollY = scrollY;
  },

  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  },

  openMenu() {
    this.isOpen = true;
    this.toggleBtn?.classList.add('active');
    this.mobilePanel?.classList.add('active');
    this.mobileOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Accessibility
    this.toggleBtn?.setAttribute('aria-expanded', 'true');
    this.toggleBtn?.setAttribute('aria-label', 'Fechar menu');

    // Focus first link
    setTimeout(() => {
      const firstLink = this.mobilePanel?.querySelector('.navbar__mobile-link');
      firstLink?.focus();
    }, 300);
  },

  closeMenu() {
    this.isOpen = false;
    this.toggleBtn?.classList.remove('active');
    this.mobilePanel?.classList.remove('active');
    this.mobileOverlay?.classList.remove('active');
    document.body.style.overflow = '';

    // Accessibility
    this.toggleBtn?.setAttribute('aria-expanded', 'false');
    this.toggleBtn?.setAttribute('aria-label', 'Abrir menu');
  },

  initSectionTracking() {
    const navLinks = document.querySelectorAll('.navbar__link, .navbar__mobile-link');
    if (!navLinks.length) return;

    const sections = [];
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href?.startsWith('#')) {
        const section = document.querySelector(href);
        if (section) sections.push({ el: section, link });
      }
    });

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const activeSection = sections.find(s => s.el === entry.target);
            if (activeSection) {
              navLinks.forEach(l => l.removeAttribute('aria-current'));
              // Set active on all links pointing to this section
              sections
                .filter(s => s.el === entry.target)
                .forEach(s => s.link.setAttribute('aria-current', 'page'));
            }
          }
        });
      },
      {
        // rootMargin top: compensa a navbar sticky (72px) + gap (16px)
        // rootMargin bottom: -50% garante que a seção precisa ocupar
        // a metade superior da viewport para ser considerada "ativa"
        threshold: 0,
        rootMargin: '-88px 0px -50% 0px'
      }
    );

    sections.forEach(({ el }) => observer.observe(el));
  },

};
