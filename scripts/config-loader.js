/**
 * ============================================================
 * I9 CONTABILIDADE — CONFIG LOADER
 * ============================================================
 * Injeta os dados do site.config.js no DOM.
 * Popula dinamicamente todas as seções com dados do config.
 *
 * Como funciona:
 *  1. Lê window.siteConfig
 *  2. Injeta meta tags, textos e componentes dinâmicos
 *  3. Garante que alterar o config.js reflita em todo o site
 * ============================================================
 */

const ConfigLoader = {

  config: null,

  init() {
    if (!window.siteConfig) {
      console.warn('[I9] site.config.js não foi carregado corretamente.');
      return;
    }
    this.config = window.siteConfig;
    this.applyMeta();
    this.applyHero();
    this.applyStats();
    this.applyServices();
    this.applyDifferentials();
    this.applySteps();
    this.applyAbout();
    this.applyTeam();
    this.applyContents();
    this.applyTestimonials();
    this.applyFaq();
    this.applyCtaFinal();
    this.applyFooter();
    this.applyWhatsApp();
  },

  // ─── META & SEO ───────────────────────────────

  applyMeta() {
    const { seo, companyName } = this.config;
    document.title = seo.title;
    this.setMeta('description', seo.description);
    this.setMeta('keywords', seo.keywords);
    // Open Graph
    this.setMeta('og:title', seo.title, 'property');
    this.setMeta('og:description', seo.description, 'property');
    this.setMeta('og:image', seo.ogImage, 'property');
    if (seo.canonical) {
      this.setMeta('og:url', seo.canonical, 'property');
    }
    // Twitter
    this.setMeta('twitter:title', seo.title, 'name');
    this.setMeta('twitter:description', seo.description, 'name');
  },

  setMeta(name, content, attr = 'name') {
    if (!content) return;
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  },

  // ─── HERO ─────────────────────────────────────

  applyHero() {
    const { hero } = this.config;
    this.setText('[data-config="hero-eyebrow"]', hero.eyebrow);
    this.setText('[data-config="hero-title"]', hero.title);
    this.setText('[data-config="hero-description"]', hero.description);
    this.setLink('[data-config="hero-primary-cta"]', hero.primaryCTA);
    this.setLink('[data-config="hero-secondary-cta"]', hero.secondaryCTA);

    // Imagem do hero
    const img = document.querySelector('[data-config="hero-image"]');
    if (img && hero.image) {
      img.src = hero.image;
      img.alt = `Equipe ${this.config.companyName}`;
    }
  },

  // ─── STATS ────────────────────────────────────

  applyStats() {
    const container = document.querySelector('[data-config="stats-list"]');
    if (!container) return;

    container.innerHTML = this.config.stats.map(stat => `
      <div class="stat" data-animate="scale-in" id="${stat.id}">
        <span class="stat__value" data-target="${stat.value}">${stat.value}</span>
        <span class="stat__label">${stat.label}</span>
      </div>
    `).join('');
  },

  // ─── SERVICES ─────────────────────────────────

  applyServices() {
    const { servicesSection, services } = this.config;
    this.setText('[data-config="services-eyebrow"]', servicesSection.eyebrow);
    this.setText('[data-config="services-title"]', servicesSection.title);
    this.setText('[data-config="services-description"]', servicesSection.description);

    const container = document.querySelector('[data-config="services-grid"]');
    if (!container) return;

    container.innerHTML = services.map(service => `
      <div class="service-card" data-animate="fade-up">
        <div class="service-card__icon" aria-hidden="true">
          ${this.getServiceIcon(service.icon)}
        </div>
        <h3 class="service-card__title">${service.title}</h3>
        <p class="service-card__description">${service.description}</p>
        <a href="${service.href}" class="service-card__link" aria-label="Saiba mais sobre ${service.title}">
          Saiba mais
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </a>
      </div>
    `).join('');
  },

  // ─── DIFFERENTIALS ────────────────────────────

  applyDifferentials() {
    const { differentialsSection, differentials } = this.config;
    this.setText('[data-config="differentials-eyebrow"]', differentialsSection.eyebrow);
    this.setText('[data-config="differentials-title"]', differentialsSection.title);

    const container = document.querySelector('[data-config="differentials-grid"]');
    if (!container) return;

    container.innerHTML = differentials.map(item => `
      <div class="differential-item" data-animate="fade-up">
        <div class="differential-item__number" aria-hidden="true">${item.number}</div>
        <h3 class="differential-item__title">${item.title}</h3>
        <p class="differential-item__description">${item.description}</p>
      </div>
    `).join('');
  },

  // ─── STEPS (Como Funciona) ────────────────────

  applySteps() {
    const { howItWorksSection, steps } = this.config;
    this.setText('[data-config="how-eyebrow"]', howItWorksSection.eyebrow);
    this.setText('[data-config="how-title"]', howItWorksSection.title);
    this.setText('[data-config="how-description"]', howItWorksSection.description);

    const container = document.querySelector('[data-config="steps-list"]');
    if (!container) return;

    container.innerHTML = steps.map((step, i) => `
      <div class="step" data-animate="fade-left" style="transition-delay: ${i * 80}ms">
        <div class="step__number-wrap" aria-hidden="true">
          <div class="step__number">${step.number}</div>
          ${i < steps.length - 1 ? '<div class="step__line"></div>' : ''}
        </div>
        <div class="step__content">
          <h3 class="step__title">${step.title}</h3>
          <p class="step__description">${step.description}</p>
        </div>
      </div>
    `).join('');
  },

  // ─── ABOUT ────────────────────────────────────

  applyAbout() {
    const { about } = this.config;
    this.setText('[data-config="about-eyebrow"]', about.eyebrow);
    this.setText('[data-config="about-title"]', about.title);
    this.setText('[data-config="about-description"]', about.description);
    this.setLink('[data-config="about-cta"]', about.cta);

    const img = document.querySelector('[data-config="about-image"]');
    if (img && about.image) {
      img.src = about.image;
      img.alt = `Escritório ${this.config.companyName}`;
      img.loading = 'lazy';
    }

    const statsContainer = document.querySelector('[data-config="about-stats"]');
    if (statsContainer && about.stats) {
      statsContainer.innerHTML = about.stats.map(stat => `
        <div class="stat">
          <span class="stat__value">${stat.value}</span>
          <span class="stat__label">${stat.label}</span>
        </div>
      `).join('');
    }
  },

  // ─── TEAM ─────────────────────────────────────

  applyTeam() {
    const { teamSection, team } = this.config;
    this.setText('[data-config="team-eyebrow"]', teamSection.eyebrow);
    this.setText('[data-config="team-title"]', teamSection.title);
    this.setText('[data-config="team-description"]', teamSection.description);

    const container = document.querySelector('[data-config="team-grid"]');
    if (!container) return;

    container.innerHTML = team.map(member => {
      const initials = member.name.split(' ').slice(0, 2).map(n => n[0]).join('');
      return `
        <div class="team-card" data-animate="fade-up">
          <div class="team-card__photo">
            ${member.image
              ? `<img src="${member.image}" alt="Foto de ${member.name}" loading="lazy">`
              : `<div class="team-card__photo-placeholder" aria-hidden="true">${initials}</div>`
            }
          </div>
          <div>
            <h3 class="team-card__name">${member.name}</h3>
            <p class="team-card__role">${member.role}</p>
            ${member.registration ? `<p class="team-card__registration">${member.registration}</p>` : ''}
          </div>
        </div>
      `;
    }).join('');
  },

  // ─── CONTENTS ─────────────────────────────────

  applyContents() {
    const { contentsSection, contents } = this.config;
    this.setText('[data-config="contents-eyebrow"]', contentsSection.eyebrow);
    this.setText('[data-config="contents-title"]', contentsSection.title);
    this.setLink('[data-config="contents-cta"]', contentsSection.cta);

    const container = document.querySelector('[data-config="contents-grid"]');
    if (!container) return;

    container.innerHTML = contents.map(item => {
      const date = new Date(item.date);
      const dateFormatted = date.toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'long', year: 'numeric'
      });
      return `
        <a href="${item.href}" class="content-card" data-animate="fade-up">
          <div class="content-card__image">
            ${item.image
              ? `<img src="${item.image}" alt="${item.title}" loading="lazy">`
              : `<div class="img-placeholder" style="aspect-ratio:16/9;" aria-hidden="true"></div>`
            }
          </div>
          <div class="content-card__body">
            <span class="content-card__category">${item.category}</span>
            <h3 class="content-card__title">${item.title}</h3>
            <p class="content-card__summary">${item.summary}</p>
            <div class="content-card__footer">
              <time class="content-card__date" datetime="${item.date}">${dateFormatted}</time>
              <span class="content-card__read-more">
                Ler mais
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M2 6h8M7 3l3 3-3 3"/>
                </svg>
              </span>
            </div>
          </div>
        </a>
      `;
    }).join('');
  },

  // ─── TESTIMONIALS ─────────────────────────────

  applyTestimonials() {
    const { testimonialsSection, testimonials } = this.config;
    this.setText('[data-config="testimonials-eyebrow"]', testimonialsSection.eyebrow);
    this.setText('[data-config="testimonials-title"]', testimonialsSection.title);

    const container = document.querySelector('[data-config="testimonials-grid"]');
    if (!container) return;

    container.innerHTML = testimonials.map(t => {
      const initials = t.name.split(' ').slice(0, 2).map(n => n[0]).join('');
      return `
        <div class="testimonial-card" data-animate="fade-up">
          <p class="testimonial-card__text">${t.text}</p>
          <div class="testimonial-card__author">
            <div class="testimonial-card__avatar">
              ${t.image
                ? `<img src="${t.image}" alt="Foto de ${t.name}" loading="lazy">`
                : `<div class="testimonial-card__avatar-placeholder" aria-hidden="true">${initials}</div>`
              }
            </div>
            <div class="testimonial-card__info">
              <p class="testimonial-card__name">${t.name}</p>
              <p class="testimonial-card__meta">${t.role}${t.company ? ` · ${t.company}` : ''}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');
  },

  // ─── FAQ ──────────────────────────────────────

  applyFaq() {
    const { faqSection, faq } = this.config;
    this.setText('[data-config="faq-eyebrow"]', faqSection.eyebrow);
    this.setText('[data-config="faq-title"]', faqSection.title);

    const container = document.querySelector('[data-config="faq-list"]');
    if (!container) return;

    container.innerHTML = faq.map((item, i) => `
      <div class="accordion-item" data-animate="fade-up" style="transition-delay: ${i * 60}ms">
        <button
          class="accordion-item__trigger"
          aria-expanded="false"
          aria-controls="faq-panel-${i}"
          id="faq-trigger-${i}"
        >
          <span class="accordion-item__question">${item.question}</span>
          <svg class="accordion-item__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <div
          class="accordion-item__panel"
          id="faq-panel-${i}"
          role="region"
          aria-labelledby="faq-trigger-${i}"
        >
          <p class="accordion-item__answer">${item.answer}</p>
        </div>
      </div>
    `).join('');
  },

  // ─── CTA FINAL ────────────────────────────────

  applyCtaFinal() {
    const { ctaFinal } = this.config;
    this.setText('[data-config="cta-eyebrow"]', ctaFinal.eyebrow);
    this.setText('[data-config="cta-title"]', ctaFinal.title);
    this.setText('[data-config="cta-description"]', ctaFinal.description);
    const btn = document.querySelector('[data-config="cta-button"]');
    if (btn) {
      btn.textContent = ctaFinal.buttonText;
      btn.href = ctaFinal.buttonHref || this.getWhatsAppUrl();
    }
  },

  // ─── FOOTER ───────────────────────────────────

  applyFooter() {
    const { footer, companyName, phone, email, address, businessHours, social, nav } = this.config;

    this.setText('[data-config="footer-description"]', footer.description);
    this.setText('[data-config="footer-legal"]', footer.legalText);
    this.setText('[data-config="footer-copyright"]', footer.copyright);

    // Links de contato
    if (phone) {
      const phoneEl = document.querySelector('[data-config="footer-phone"]');
      if (phoneEl) { phoneEl.textContent = phone; phoneEl.href = `tel:${phone.replace(/\D/g, '')}`; }
    }
    if (email) {
      const emailEl = document.querySelector('[data-config="footer-email"]');
      if (emailEl) { emailEl.textContent = email; emailEl.href = `mailto:${email}`; }
    }
    if (address) {
      this.setText('[data-config="footer-address"]', address);
    }
    if (businessHours) {
      this.setText('[data-config="footer-hours"]', businessHours);
    }

    // Social links
    const instagramEl = document.querySelector('[data-config="social-instagram"]');
    if (instagramEl && social.instagram) {
      instagramEl.href = social.instagram;
      instagramEl.style.display = '';
    } else if (instagramEl) {
      instagramEl.style.display = 'none';
    }

    const linkedinEl = document.querySelector('[data-config="social-linkedin"]');
    if (linkedinEl && social.linkedin) {
      linkedinEl.href = social.linkedin;
      linkedinEl.style.display = '';
    } else if (linkedinEl) {
      linkedinEl.style.display = 'none';
    }

    const facebookEl = document.querySelector('[data-config="social-facebook"]');
    if (facebookEl && social.facebook) {
      facebookEl.href = social.facebook;
      facebookEl.style.display = '';
    } else if (facebookEl) {
      facebookEl.style.display = 'none';
    }
  },

  // ─── WHATSAPP ─────────────────────────────────

  applyWhatsApp() {
    const url = this.getWhatsAppUrl();
    const links = document.querySelectorAll('[data-config="whatsapp-link"]');
    links.forEach(link => {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', 'Falar via WhatsApp com a I9 Contabilidade');
    });
  },

  getWhatsAppUrl() {
    const { whatsapp, whatsappMessage } = this.config;
    if (!whatsapp) return '#';
    const msg = encodeURIComponent(whatsappMessage || '');
    return `https://wa.me/${whatsapp}?text=${msg}`;
  },

  // ─── HELPERS ──────────────────────────────────

  setText(selector, value) {
    if (!value) return;
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  },

  setLink(selector, link) {
    if (!link) return;
    const el = document.querySelector(selector);
    if (!el) return;
    if (link.label) el.textContent = link.label;
    if (link.href) el.href = link.href;
  },

  getServiceIcon(iconId) {
    const icons = {
      'icon-contabilidade': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
      'icon-fiscal': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 10l3 3 6-6"/></svg>`,
      'icon-dp': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
      'icon-abertura': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
      'icon-consultoria': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
      'icon-bpo': `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`,
    };
    return icons[iconId] || icons['icon-contabilidade'];
  },

};

// Auto-inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ConfigLoader.init());
} else {
  ConfigLoader.init();
}
