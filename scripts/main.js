/**
 * ============================================================
 * I9 CONTABILIDADE — MAIN ORCHESTRATOR
 * ============================================================
 * Ponto de entrada principal.
 * Inicializa todos os módulos na ordem correta.
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Config Loader já inicializou (auto-init no próprio arquivo)
  //    Ele injeta dados do site.config.js no DOM

  // 2. Navbar
  Navbar.init();

  // 3. Accordion (FAQ)
  // Aguarda o ConfigLoader injetar os itens do FAQ
  // O Accordion tem MutationObserver interno para detectar quando os itens são injetados
  Accordion.init();

  // 4. Animações de scroll
  // Deve ser inicializado depois que o conteúdo dinâmico foi injetado
  // Pequeno delay para garantir que o ConfigLoader terminou
  setTimeout(() => {
    Animations.init();
  }, 100);

  // 5. WhatsApp
  WhatsApp.init();

  // 6. Pré-Cadastro Inteligente
  if (typeof PreCadastro !== 'undefined') PreCadastro.init();

  // 7. Smooth scroll para links internos
  initSmoothScroll();

  // 7. Schema markup
  injectSchema();

});

// ─── SMOOTH SCROLL ────────────────────────────
//
// Lê a altura REAL do navbar no momento do clique
// (não o token CSS), garantindo offset correto tanto
// no estado normal (72px) quanto no estado .scrolled (60px).
// O scroll-padding-top no CSS cobre links nativos e fallbacks.

function initSmoothScroll() {
  const EXTRA_GAP = 16; // px de respiro acima da seção

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      // Fecha menu mobile se estiver aberto
      if (typeof Navbar !== 'undefined' && Navbar.isOpen) {
        Navbar.closeMenu();
      }

      // Lê a altura real do navbar no momento do clique
      // (funciona com qualquer estado: normal, scrolled, etc.)
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 72;

      // Calcula posição absoluta da seção na página
      const sectionTop = target.getBoundingClientRect().top + window.scrollY;
      const scrollTo = sectionTop - navbarHeight - EXTRA_GAP;

      window.scrollTo({
        top: Math.max(0, scrollTo),
        behavior: 'smooth',
      });
    });
  });
}

// ─── SCHEMA MARKUP ────────────────────────────

function injectSchema() {
  const config = window.siteConfig;
  if (!config) return;

  const schema = {
    '@context': 'https://schema.org',
    '@type': ['AccountingService', 'LocalBusiness'],
    'name': config.companyName,
    'description': config.seo?.description || '',
    'url': config.seo?.canonical || window.location.origin,
    ...(config.phone ? { 'telephone': config.phone } : {}),
    ...(config.email ? { 'email': config.email } : {}),
    ...(config.address ? {
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': config.address,
        'addressCountry': 'BR',
      }
    } : {}),
    ...(config.social?.instagram ? { 'sameAs': [config.social.instagram] } : {}),
    'openingHours': 'Mo-Fr 08:00-18:00',
    'priceRange': '$$',
    'areaServed': 'BR',
    'serviceType': [
      'Contabilidade',
      'Serviços Fiscais',
      'Departamento Pessoal',
      'Abertura de Empresas',
      'Consultoria Tributária',
      'BPO Financeiro',
    ],
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}
