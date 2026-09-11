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

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--navbar-height') || '72',
        10
      );

      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;

      window.scrollTo({ top, behavior: 'smooth' });
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
