/**
 * ============================================================
 * I9 CONTABILIDADE — ACCORDION (FAQ)
 * ============================================================
 * Accordion acessível com:
 * - Apenas um item aberto por vez
 * - aria-expanded / aria-controls
 * - Navegação por teclado
 * - Animação suave via max-height
 * ============================================================
 */

const Accordion = {

  items: [],

  init() {
    // Inicializa após o config-loader injetar os itens
    this.bindItems();

    // Re-bind quando conteúdo é injetado dinamicamente
    const faqContainer = document.querySelector('[data-config="faq-list"]');
    if (faqContainer) {
      const mutationObserver = new MutationObserver(() => {
        this.bindItems();
      });
      mutationObserver.observe(faqContainer, { childList: true });
    }
  },

  bindItems() {
    this.items = document.querySelectorAll('.accordion-item');

    this.items.forEach(item => {
      const trigger = item.querySelector('.accordion-item__trigger');
      if (!trigger || trigger.dataset.bound) return;

      trigger.dataset.bound = 'true';
      trigger.addEventListener('click', () => this.toggle(item));

      // Keyboard support
      trigger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggle(item);
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.focusNext(item);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.focusPrev(item);
        }
        if (e.key === 'Home') {
          e.preventDefault();
          this.focusFirst();
        }
        if (e.key === 'End') {
          e.preventDefault();
          this.focusLast();
        }
      });
    });
  },

  toggle(item) {
    const isOpen = item.classList.contains('open');

    // Fecha todos
    this.items.forEach(i => {
      i.classList.remove('open');
      const trigger = i.querySelector('.accordion-item__trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });

    // Abre o clicado (se estava fechado)
    if (!isOpen) {
      item.classList.add('open');
      const trigger = item.querySelector('.accordion-item__trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
    }
  },

  focusNext(current) {
    const items = [...this.items];
    const idx = items.indexOf(current);
    const next = items[idx + 1];
    if (next) next.querySelector('.accordion-item__trigger')?.focus();
  },

  focusPrev(current) {
    const items = [...this.items];
    const idx = items.indexOf(current);
    const prev = items[idx - 1];
    if (prev) prev.querySelector('.accordion-item__trigger')?.focus();
  },

  focusFirst() {
    this.items[0]?.querySelector('.accordion-item__trigger')?.focus();
  },

  focusLast() {
    this.items[this.items.length - 1]?.querySelector('.accordion-item__trigger')?.focus();
  },

};
