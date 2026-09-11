/**
 * ============================================================
 * I9 CONTABILIDADE — CONSULTA DE DOCUMENTO PÚBLICO
 * ============================================================
 * Consulta dados de CNPJ via ReceitaWS (API pública, gratuita).
 *
 * NOTA: Requer servidor HTTP (não funciona em file://).
 * Em produção funciona normalmente.
 *
 * Para teste local: use "npx serve ." ou Live Server no VS Code.
 * ============================================================
 */

const DocumentLookup = {

  // ─── DETECÇÃO DE TIPO ─────────────────────────────────────

  /**
   * Detecta o tipo de documento com base no número de dígitos.
   * @param {string} raw — string sem máscara
   * @returns {'cpf'|'cnpj'|'unknown'}
   */
  detectType(raw) {
    const digits = raw.replace(/\D/g, '');
    if (digits.length <= 11) return 'cpf';
    if (digits.length <= 14) return 'cnpj';
    return 'unknown';
  },

  /**
   * Retorna tipo conforme dígitos exatos.
   * @param {string} raw
   * @returns {'cpf'|'cnpj'|null}
   */
  getExactType(raw) {
    const digits = raw.replace(/\D/g, '');
    if (digits.length === 11) return 'cpf';
    if (digits.length === 14) return 'cnpj';
    return null;
  },

  // ─── MÁSCARAS ─────────────────────────────────────────────

  /**
   * Aplica máscara progressiva conforme o usuário digita.
   * @param {string} value — valor atual do input
   * @returns {string} valor com máscara aplicada
   */
  applyMask(value) {
    const digits = value.replace(/\D/g, '').slice(0, 14);
    const len = digits.length;

    if (len <= 11) {
      // CPF: 000.000.000-00
      return digits
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    // CNPJ: 00.000.000/0000-00
    return digits
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  },

  // ─── VALIDAÇÕES ───────────────────────────────────────────

  /**
   * Valida CPF com dígitos verificadores.
   * @param {string} cpf
   * @returns {boolean}
   */
  validateCpf(cpf) {
    const digits = cpf.replace(/\D/g, '');
    if (digits.length !== 11) return false;
    if (/^(\d)\1+$/.test(digits)) return false;

    const calc = (arr, weights) =>
      arr.reduce((sum, d, i) => sum + d * weights[i], 0);

    const d = digits.split('').map(Number);
    const r1 = calc(d.slice(0, 9), [10,9,8,7,6,5,4,3,2]) % 11;
    const v1 = r1 < 2 ? 0 : 11 - r1;
    if (v1 !== d[9]) return false;

    const r2 = calc(d.slice(0, 10), [11,10,9,8,7,6,5,4,3,2]) % 11;
    const v2 = r2 < 2 ? 0 : 11 - r2;
    return v2 === d[10];
  },

  /**
   * Valida CNPJ com dígitos verificadores.
   * @param {string} cnpj
   * @returns {boolean}
   */
  validateCnpj(cnpj) {
    const digits = cnpj.replace(/\D/g, '');
    if (digits.length !== 14) return false;
    if (/^(\d)\1+$/.test(digits)) return false;

    const calc = (arr, start) => {
      let sum = 0, pos = start;
      for (let i = 0; i < arr.length; i++) {
        sum += arr[i] * pos--;
        if (pos < 2) pos = 9;
      }
      return sum;
    };

    const d = digits.split('').map(Number);
    const r1 = calc(d.slice(0, 12), 5) % 11;
    const v1 = r1 < 2 ? 0 : 11 - r1;
    if (v1 !== d[12]) return false;

    const r2 = calc(d.slice(0, 13), 6) % 11;
    const v2 = r2 < 2 ? 0 : 11 - r2;
    return v2 === d[13];
  },

  /**
   * Valida e-mail.
   * @param {string} email
   * @returns {boolean}
   */
  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  },

  /**
   * Valida telefone/WhatsApp (mínimo 10 dígitos).
   * @param {string} phone
   * @returns {boolean}
   */
  validatePhone(phone) {
    return phone.replace(/\D/g, '').length >= 10;
  },

  // ─── MÁSCARA TELEFONE ─────────────────────────────────────

  /**
   * Aplica máscara de telefone brasileiro.
   * @param {string} value
   * @returns {string}
   */
  applyPhoneMask(value) {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 10) {
      return digits
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
    return digits
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  },

  // ─── CONSULTA CNPJ ────────────────────────────────────────

  /**
   * Consulta dados públicos de CNPJ via ReceitaWS.
   * Retorna objeto normalizado ou null em caso de erro.
   * @param {string} cnpj — apenas dígitos
   * @returns {Promise<object|null>}
   */
  async fetchCnpj(cnpj) {
    const digits = cnpj.replace(/\D/g, '');
    if (digits.length !== 14) return null;

    try {
      const response = await fetch(
        `https://receitaws.com.br/v1/cnpj/${digits}`,
        {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
        }
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      if (data.status === 'ERROR') {
        return { error: data.message || 'CNPJ não encontrado.' };
      }

      return {
        razaoSocial:   data.nome         || '',
        nomeFantasia:  data.fantasia      || '',
        situacao:      data.situacao      || '',
        atividade:     data.atividade_principal?.[0]?.text || '',
        municipio:     data.municipio     || '',
        uf:            data.uf            || '',
        telefone:      data.telefone      || '',
        email:         data.email         || '',
        abertura:      data.abertura      || '',
        natureza:      data.natureza_juridica || '',
      };
    } catch (err) {
      // Rate limit ou CORS em file://
      if (err.message.includes('Failed to fetch') || err.name === 'TypeError') {
        return { error: 'Consulta indisponível. Preencha os dados manualmente.' };
      }
      return { error: 'Não foi possível consultar o CNPJ. Verifique e tente novamente.' };
    }
  },

};
