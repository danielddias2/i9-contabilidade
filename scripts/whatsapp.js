/**
 * ============================================================
 * I9 CONTABILIDADE — WHATSAPP BUTTON
 * ============================================================
 * Botão flutuante de WhatsApp.
 * URL e mensagem vêm de site.config.js via ConfigLoader.
 * ============================================================
 */

const WhatsApp = {

  init() {
    // O link já foi aplicado pelo ConfigLoader
    // Aqui apenas adicionamos comportamento adicional

    const btn = document.querySelector('.whatsapp-float__btn');
    if (!btn) return;

    // Tracking (se houver analytics configurado)
    btn.addEventListener('click', () => {
      // Google Analytics 4 (opcional)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
          event_category: 'engagement',
          event_label: 'floating_button',
        });
      }
    });

    // Mostrar/esconder tooltip em mobile
    btn.addEventListener('touchstart', () => {
      const tooltip = btn.parentElement?.querySelector('.whatsapp-float__tooltip');
      if (tooltip) {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
        setTimeout(() => {
          tooltip.style.opacity = '';
          tooltip.style.transform = '';
        }, 2000);
      }
    }, { passive: true });
  },

};
