/**
 * ============================================================
 * I9 CONTABILIDADE — PRÉ-CADASTRO INTELIGENTE
 * ============================================================
 * Fluxo de 6 steps em modal.
 * Depende de: DocumentLookup (document-lookup.js)
 * Depende de: window.siteConfig (config/site.config.js)
 *
 * Para remover do site: delete este arquivo, o document-lookup.js,
 * o styles/precadastro.css e o bloco #precadastro-modal do index.html.
 * ============================================================
 */

const PreCadastro = {

  // ─── ESTADO ───────────────────────────────────────────────

  currentStep: 1,
  totalSteps:  5,  // steps 1-5; step 6 = tela de sucesso
  isAnimatingBack: false,

  data: {
    documento:       '',
    tipoDocumento:   '',   // 'cpf' | 'cnpj'
    // Step 2 — empresa/pessoa
    razaoSocial:     '',
    nomeFantasia:    '',
    situacaoCnpj:    '',
    // Step 3 — contato
    responsavel:     '',
    whatsapp:        '',
    email:           '',
    // Step 4 — interesse
    servico:         '',
    faturamento:     '',
    mensagem:        '',
    // Meta
    cnpjData:        null,
  },

  // ─── INIT ─────────────────────────────────────────────────

  init() {
    this.overlay = document.getElementById('precadastro-modal');
    if (!this.overlay) return;

    this.modal     = this.overlay.querySelector('.pc-modal');
    this.closeBtn  = this.overlay.querySelector('.pc-close');
    this.steps     = this.overlay.querySelectorAll('.pc-step');
    this.backBtn   = this.overlay.querySelector('.pc-footer__back');
    this.nextBtn   = this.overlay.querySelector('.pc-footer__next-btn');
    this.footerEl  = this.overlay.querySelector('.pc-footer');
    this.progressSteps = this.overlay.querySelectorAll('.pc-progress__step');
    this.progressLabels = this.overlay.querySelectorAll('.pc-progress__label-item');

    this.bindTriggers();
    this.bindModal();
    this.bindStep1();
    this.bindStep3();
    this.bindStep4();
    this.populateServices();
  },

  // ─── GATILHOS QUE ABREM O MODAL ───────────────────────────

  bindTriggers() {
    // Botão flutuante
    const floatBtn = document.getElementById('pc-trigger-float');
    if (floatBtn) {
      floatBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    }

    // Qualquer elemento com data-open="precadastro"
    document.querySelectorAll('[data-open="precadastro"]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });
  },

  // ─── MODAL OPEN / CLOSE ───────────────────────────────────

  open() {
    this.reset();
    this.overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    this.overlay.setAttribute('aria-hidden', 'false');

    // Foco no primeiro campo
    setTimeout(() => {
      const firstInput = this.overlay.querySelector('.pc-step.is-active input, .pc-step.is-active select');
      firstInput?.focus();
    }, 320);
  },

  close() {
    this.overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    this.overlay.setAttribute('aria-hidden', 'true');
  },

  reset() {
    this.currentStep = 1;
    this.isAnimatingBack = false;
    this.data = {
      documento: '', tipoDocumento: '',
      razaoSocial: '', nomeFantasia: '', situacaoCnpj: '',
      responsavel: '', whatsapp: '', email: '',
      servico: '', faturamento: '', mensagem: '',
      cnpjData: null,
    };

    // Limpa inputs
    this.overlay.querySelectorAll('input, select, textarea').forEach(el => {
      el.value = '';
      el.classList.remove('is-valid', 'is-error');
    });

    // Oculta erros
    this.overlay.querySelectorAll('.pc-field__error').forEach(el => {
      el.classList.remove('is-visible');
    });

    // Oculta card de consulta
    const fetched = this.overlay.querySelector('.pc-fetched-card');
    if (fetched) fetched.classList.remove('is-visible');

    // Oculta status de lookup
    const status = this.overlay.querySelector('.pc-lookup-status');
    if (status) status.className = 'pc-lookup-status';

    // Reseta badge de tipo
    const badge = this.overlay.querySelector('.pc-doc-type-badge');
    if (badge) { badge.textContent = ''; badge.className = 'pc-doc-type-badge'; }

    // Volta step 1
    this.goToStep(1, false);
  },

  // ─── MODAL BINDINGS ───────────────────────────────────────

  bindModal() {
    // Fechar pelo botão X
    this.closeBtn?.addEventListener('click', () => this.close());

    // Fechar clicando no overlay
    this.overlay?.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    // Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.overlay?.classList.contains('is-open')) {
        this.close();
      }
    });

    // Botão Voltar
    this.backBtn?.addEventListener('click', () => {
      if (this.currentStep > 1) this.goToStep(this.currentStep - 1, true);
    });

    // Botão Avançar / Enviar
    this.nextBtn?.addEventListener('click', () => this.handleNext());
  },

  // ─── NAVEGAÇÃO ENTRE STEPS ────────────────────────────────

  goToStep(step, animBack = false) {
    // Atualiza steps
    this.overlay.querySelectorAll('.pc-step').forEach(el => {
      el.classList.remove('is-active', 'anim-back');
    });

    const target = this.overlay.querySelector(`[data-step="${step}"]`);
    if (!target) return;

    if (animBack) target.classList.add('anim-back');
    target.classList.add('is-active');
    this.currentStep = step;

    // Scroll para o topo do modal
    this.modal?.scrollTo({ top: 0, behavior: 'smooth' });

    // Atualiza progress
    this.updateProgress(step);

    // Atualiza botões
    this.updateFooter(step);

    // Step especial: resume (5)
    if (step === 5) this.renderSummary();
  },

  updateProgress(step) {
    this.progressSteps?.forEach((el, i) => {
      const stepNum = i + 1;
      el.classList.remove('is-active', 'is-done');
      if (stepNum < step) el.classList.add('is-done');
      else if (stepNum === step) el.classList.add('is-active');
    });

    this.progressLabels?.forEach((el, i) => {
      const stepNum = i + 1;
      el.classList.remove('is-active', 'is-done');
      if (stepNum < step) el.classList.add('is-done');
      else if (stepNum === step) el.classList.add('is-active');
    });
  },

  updateFooter(step) {
    // Botão voltar
    if (step <= 1) {
      this.backBtn?.classList.add('is-hidden');
    } else {
      this.backBtn?.classList.remove('is-hidden');
    }

    // Botão avançar
    if (!this.nextBtn) return;

    if (step === 5) {
      this.nextBtn.textContent = 'Confirmar e enviar';
      this.nextBtn.className = 'btn btn--primary btn--lg';
    } else {
      this.nextBtn.textContent = 'Continuar';
      this.nextBtn.className = 'btn btn--primary btn--lg';
    }

    // Esconde footer no step de sucesso (step 6)
    if (this.footerEl) {
      this.footerEl.style.display = step === 6 ? 'none' : '';
    }
  },

  // ─── STEP 1 — DOCUMENTO ───────────────────────────────────

  bindStep1() {
    const input = document.getElementById('pc-documento');
    const badge = this.overlay?.querySelector('.pc-doc-type-badge');
    const status = this.overlay?.querySelector('.pc-lookup-status');

    if (!input) return;

    input.addEventListener('input', (e) => {
      const masked = DocumentLookup.applyMask(e.target.value);
      e.target.value = masked;

      const rawDigits = masked.replace(/\D/g, '');
      const type = DocumentLookup.detectType(rawDigits);

      // Atualiza badge
      if (badge) {
        badge.className = 'pc-doc-type-badge';
        if (rawDigits.length > 0) {
          badge.textContent = type === 'cpf' ? 'CPF' : 'CNPJ';
          badge.classList.add(`is-${type}`);
        } else {
          badge.textContent = '';
        }
      }

      // Limpa status anterior
      if (status) status.className = 'pc-lookup-status';
      input.classList.remove('is-valid', 'is-error');

      // Consulta automática quando CNPJ completo
      if (rawDigits.length === 14 && DocumentLookup.validateCnpj(rawDigits)) {
        input.classList.add('is-valid');
        this.triggerCnpjLookup(rawDigits);
      }

      // Valida CPF quando completo
      if (rawDigits.length === 11) {
        if (DocumentLookup.validateCpf(rawDigits)) {
          input.classList.add('is-valid');
        } else {
          input.classList.add('is-error');
        }
      }
    });
  },

  async triggerCnpjLookup(cnpjDigits) {
    const status = this.overlay?.querySelector('.pc-lookup-status');
    const statusText = this.overlay?.querySelector('.pc-lookup-status-text');

    if (status) {
      status.className = 'pc-lookup-status is-loading';
      if (statusText) statusText.textContent = 'Consultando dados da empresa...';
    }

    const result = await DocumentLookup.fetchCnpj(cnpjDigits);

    if (!result) return;

    if (result.error) {
      if (status) {
        status.className = 'pc-lookup-status is-error';
        if (statusText) statusText.textContent = result.error;
      }
      return;
    }

    // Sucesso — armazena dados e mostra feedback
    this.data.cnpjData = result;

    if (status) {
      status.className = 'pc-lookup-status is-success';
      if (statusText) {
        statusText.textContent = `✓ Empresa encontrada: ${result.razaoSocial || result.nomeFantasia}`;
      }
    }

    // Pré-preenche step 2
    this.prefillStep2(result);
  },

  prefillStep2(cnpjData) {
    const razao = document.getElementById('pc-razao-social');
    const fantasia = document.getElementById('pc-nome-fantasia');
    const fetched = this.overlay?.querySelector('.pc-fetched-card');

    if (razao) razao.value = cnpjData.razaoSocial || '';
    if (fantasia) fantasia.value = cnpjData.nomeFantasia || '';

    // Mostra card com dados consultados
    if (fetched) {
      fetched.classList.add('is-visible');
      const rows = fetched.querySelectorAll('[data-fetched]');
      rows.forEach(row => {
        const key = row.dataset.fetched;
        if (cnpjData[key]) row.textContent = cnpjData[key];
      });

      // Situação com badge colorido
      const situacaoEl = fetched.querySelector('[data-fetched="situacao"]');
      if (situacaoEl && cnpjData.situacao) {
        const isAtiva = cnpjData.situacao.toLowerCase().includes('ativa');
        situacaoEl.innerHTML = `
          <span class="pc-fetched-card__status ${isAtiva ? 'is-ativa' : 'is-inativa'}">
            ${cnpjData.situacao}
          </span>
        `;
      }
    }
  },

  // ─── STEP 3 — CONTATO (máscara de telefone) ───────────────

  bindStep3() {
    const phoneInput = document.getElementById('pc-whatsapp');
    if (!phoneInput) return;

    phoneInput.addEventListener('input', (e) => {
      e.target.value = DocumentLookup.applyPhoneMask(e.target.value);
    });
  },

  // ─── STEP 4 — POPULA SERVIÇOS DO CONFIG ───────────────────

  populateServices() {
    const select = document.getElementById('pc-servico');
    if (!select) return;

    const config = window.siteConfig;
    if (!config?.services) return;

    // Opção padrão já está no HTML — adiciona serviços do config
    config.services.forEach(service => {
      const opt = document.createElement('option');
      opt.value = service.id;
      opt.textContent = service.title;
      select.appendChild(opt);
    });
  },

  // ─── STEP 4 — BIND SELEÇÃO PERSONALIZADA ──────────────────

  bindStep4() {
    // Nada especial por enquanto — pode expandir futuramente
  },

  // ─── VALIDAÇÃO POR STEP ───────────────────────────────────

  validateStep(step) {
    let isValid = true;

    const showError = (inputEl, errorEl, msg) => {
      inputEl?.classList.add('is-error');
      if (errorEl) {
        errorEl.textContent = msg;
        errorEl.classList.add('is-visible');
      }
      isValid = false;
    };

    const clearError = (inputEl, errorEl) => {
      inputEl?.classList.remove('is-error');
      errorEl?.classList.remove('is-visible');
    };

    if (step === 1) {
      const input = document.getElementById('pc-documento');
      const error = document.getElementById('pc-documento-error');
      const rawDigits = (input?.value || '').replace(/\D/g, '');
      const type = DocumentLookup.getExactType(rawDigits);

      if (!type) {
        showError(input, error, 'Informe um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.');
      } else if (type === 'cpf' && !DocumentLookup.validateCpf(rawDigits)) {
        showError(input, error, 'CPF inválido. Verifique os dígitos informados.');
      } else if (type === 'cnpj' && !DocumentLookup.validateCnpj(rawDigits)) {
        showError(input, error, 'CNPJ inválido. Verifique os dígitos informados.');
      } else {
        clearError(input, error);
        this.data.documento     = input.value;
        this.data.tipoDocumento = type;
      }
    }

    if (step === 2) {
      const razao = document.getElementById('pc-razao-social');
      const razaoError = document.getElementById('pc-razao-error');

      if (!razao?.value.trim()) {
        showError(razao, razaoError, 'Informe o nome da empresa ou pessoa física.');
      } else {
        clearError(razao, razaoError);
        this.data.razaoSocial  = razao.value.trim();
        this.data.nomeFantasia = document.getElementById('pc-nome-fantasia')?.value.trim() || '';
        this.data.situacaoCnpj = this.data.cnpjData?.situacao || '';
      }
    }

    if (step === 3) {
      const responsavel    = document.getElementById('pc-responsavel');
      const respError      = document.getElementById('pc-responsavel-error');
      const whatsapp       = document.getElementById('pc-whatsapp');
      const waError        = document.getElementById('pc-whatsapp-error');
      const email          = document.getElementById('pc-email');
      const emailError     = document.getElementById('pc-email-error');

      if (!responsavel?.value.trim()) {
        showError(responsavel, respError, 'Informe o nome do responsável.');
      } else {
        clearError(responsavel, respError);
        this.data.responsavel = responsavel.value.trim();
      }

      const waDigits = (whatsapp?.value || '').replace(/\D/g, '');
      if (!DocumentLookup.validatePhone(waDigits)) {
        showError(whatsapp, waError, 'Informe um WhatsApp válido com DDD.');
      } else {
        clearError(whatsapp, waError);
        this.data.whatsapp = whatsapp.value.trim();
      }

      if (!DocumentLookup.validateEmail(email?.value || '')) {
        showError(email, emailError, 'Informe um e-mail válido.');
      } else {
        clearError(email, emailError);
        this.data.email = email.value.trim();
      }
    }

    if (step === 4) {
      const servico       = document.getElementById('pc-servico');
      const servicoError  = document.getElementById('pc-servico-error');
      const faturamento   = document.getElementById('pc-faturamento');
      const fatError      = document.getElementById('pc-faturamento-error');

      if (!servico?.value) {
        showError(servico, servicoError, 'Selecione o serviço de interesse.');
      } else {
        clearError(servico, servicoError);
        this.data.servico = servico.options[servico.selectedIndex]?.text || servico.value;
      }

      if (!faturamento?.value) {
        showError(faturamento, fatError, 'Selecione a faixa de faturamento.');
      } else {
        clearError(faturamento, fatError);
        this.data.faturamento = faturamento.options[faturamento.selectedIndex]?.text || faturamento.value;
      }

      this.data.mensagem = document.getElementById('pc-mensagem')?.value.trim() || '';
    }

    return isValid;
  },

  // ─── AVANÇAR / SUBMETER ───────────────────────────────────

  handleNext() {
    const isValid = this.validateStep(this.currentStep);
    if (!isValid) return;

    if (this.currentStep < 5) {
      // Pula step 2 para CPF sem dados de empresa consultados
      // (razão social já foi perguntada no step 2 manualmente)
      this.goToStep(this.currentStep + 1);
    } else if (this.currentStep === 5) {
      this.submit();
    }
  },

  // ─── RESUMO ───────────────────────────────────────────────

  renderSummary() {
    const container = document.getElementById('pc-summary-content');
    if (!container) return;

    const d = this.data;
    const tipoLabel = d.tipoDocumento === 'cnpj' ? 'CNPJ' : 'CPF';

    container.innerHTML = `
      <div class="pc-summary">

        <div class="pc-summary__section">
          <p class="pc-summary__section-title">Documento</p>
          <div class="pc-summary__row">
            <span class="pc-summary__key">${tipoLabel}</span>
            <span class="pc-summary__value">${d.documento}</span>
          </div>
          ${d.razaoSocial ? `
            <div class="pc-summary__row">
              <span class="pc-summary__key">${d.tipoDocumento === 'cnpj' ? 'Razão Social' : 'Nome'}</span>
              <span class="pc-summary__value">${d.razaoSocial}</span>
            </div>
          ` : ''}
          ${d.nomeFantasia ? `
            <div class="pc-summary__row">
              <span class="pc-summary__key">Nome Fantasia</span>
              <span class="pc-summary__value">${d.nomeFantasia}</span>
            </div>
          ` : ''}
          <button class="pc-summary__edit" data-go-step="1" type="button">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Editar
          </button>
        </div>

        <div class="pc-summary__section">
          <p class="pc-summary__section-title">Contato</p>
          <div class="pc-summary__row">
            <span class="pc-summary__key">Responsável</span>
            <span class="pc-summary__value">${d.responsavel}</span>
          </div>
          <div class="pc-summary__row">
            <span class="pc-summary__key">WhatsApp</span>
            <span class="pc-summary__value">${d.whatsapp}</span>
          </div>
          <div class="pc-summary__row">
            <span class="pc-summary__key">E-mail</span>
            <span class="pc-summary__value">${d.email}</span>
          </div>
          <button class="pc-summary__edit" data-go-step="3" type="button">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Editar
          </button>
        </div>

        <div class="pc-summary__section">
          <p class="pc-summary__section-title">Interesse</p>
          <div class="pc-summary__row">
            <span class="pc-summary__key">Serviço</span>
            <span class="pc-summary__value">${d.servico}</span>
          </div>
          <div class="pc-summary__row">
            <span class="pc-summary__key">Faturamento</span>
            <span class="pc-summary__value">${d.faturamento}</span>
          </div>
          ${d.mensagem ? `
            <div class="pc-summary__row">
              <span class="pc-summary__key">Observações</span>
              <span class="pc-summary__value" style="text-align:left;">${d.mensagem}</span>
            </div>
          ` : ''}
          <button class="pc-summary__edit" data-go-step="4" type="button">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Editar
          </button>
        </div>

      </div>
    `;

    // Bind botões "Editar" no resumo
    container.querySelectorAll('[data-go-step]').forEach(btn => {
      btn.addEventListener('click', () => {
        const step = parseInt(btn.dataset.goStep, 10);
        this.goToStep(step, true);
      });
    });
  },

  // ─── ENVIO ────────────────────────────────────────────────

  async submit() {
    const d = this.data;
    
    // Link da ção do fomulário
    const urlDaPlanilha = 'https://api.sheetmonkey.io/form/da7PMNCVChirECVjeXf3dL';

    // Se a URL ainda for o texto padrão, envia para o WhatsApp automaticamente
    if (!urlDaPlanilha || urlDaPlanilha === 'COLOQUE_A_URL_DA_SUA_API_AQUI') {
      this.submitViaWhatsapp();
      return;
    }

    this.nextBtn.textContent = 'Enviando...';
    this.nextBtn.disabled = true;

    try {
      const payload = {
        documento:     d.documento,
        tipoDocumento: d.tipoDocumento,
        razaoSocial:   d.razaoSocial,
        nomeFantasia:  d.nomeFantasia,
        situacaoCnpj:  d.situacaoCnpj,
        responsavel:   d.responsavel,
        whatsapp:      d.whatsapp,
        email:         d.email,
        servico:       d.servico,
        faturamento:   d.faturamento,
        mensagem:      d.mensagem,
        origem:        window.location.href,
        timestamp:     new Date().toISOString(),
      };

      const res = await fetch(urlDaPlanilha, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      this.showSuccess();

    } catch (err) {
      console.error('[PreCadastro] Erro no envio:', err);
      // Fallback para WhatsApp se a API da planilha falhar
      this.submitViaWhatsapp();
    }
  },

  submitViaWhatsapp() {
    const config = window.siteConfig;
    const d = this.data;
    const whatsappNumber = config?.whatsapp || '';

    const tipoLabel = d.tipoDocumento === 'cnpj' ? 'CNPJ' : 'CPF';

    const msg = [
      `Olá! Gostaria de iniciar meu atendimento na I9 Contabilidade.`,
      ``,
      `📋 *PRÉ-CADASTRO*`,
      ``,
      `*Documento*`,
      `${tipoLabel}: ${d.documento}`,
      d.razaoSocial ? `Empresa/Nome: ${d.razaoSocial}` : '',
      d.nomeFantasia ? `Nome Fantasia: ${d.nomeFantasia}` : '',
      ``,
      `*Contato*`,
      `Responsável: ${d.responsavel}`,
      `WhatsApp: ${d.whatsapp}`,
      `E-mail: ${d.email}`,
      ``,
      `*Interesse*`,
      `Serviço: ${d.servico}`,
      `Faturamento: ${d.faturamento}`,
      d.mensagem ? `Observações: ${d.mensagem}` : '',
    ].filter(Boolean).join('\n');

    const waUrl = whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/?text=${encodeURIComponent(msg)}`;

    this.showSuccess();

    // Abre WhatsApp após pequeno delay para mostrar a tela de sucesso
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 800);
  },

  // ─── TELA DE SUCESSO ──────────────────────────────────────

  showSuccess() {
    // Esconde todos os steps e progress
    this.overlay.querySelectorAll('.pc-step').forEach(el => {
      el.classList.remove('is-active');
    });

    const successStep = this.overlay.querySelector('[data-step="6"]');
    if (successStep) successStep.classList.add('is-active');

    const progress = this.overlay.querySelector('.pc-progress');
    if (progress) progress.style.display = 'none';

    this.currentStep = 6;
    this.updateFooter(6);

    // Analytics (opcional)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'precadastro_enviado', {
        event_category: 'lead',
        event_label: this.data.servico,
      });
    }
  },

};
