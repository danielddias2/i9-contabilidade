/**
 * ============================================================
 * I9 CONTABILIDADE — CONFIGURAÇÃO CENTRAL DO SITE
 * ============================================================
 *
 * Este é o arquivo principal de configuração do website da I9 Contabilidade.
 * TODOS os textos, dados, links, contatos, serviços, equipe, depoimentos
 * e configurações estão centralizados aqui.
 *
 * Como editar:
 *  - Textos: altere os valores das strings entre aspas
 *  - Cores: altere os valores no objeto `colors` (reflete nos tokens CSS via JS)
 *  - Serviços: adicione/remova objetos no array `services`
 *  - Equipe: adicione/remova objetos no array `team`
 *  - Depoimentos: adicione/remova objetos no array `testimonials`
 *  - FAQ: adicione/remova objetos no array `faq`
 *  - Conteúdos: adicione/remova objetos no array `contents`
 *  - WhatsApp: altere `whatsapp` e `whatsappMessage`
 *
 * ATENÇÃO: Não altere os nomes das chaves (keys), apenas os valores.
 * ============================================================
 */

const siteConfig = {

  // ─────────────────────────────────────────────
  // IDENTIDADE DA EMPRESA
  // ─────────────────────────────────────────────

  companyName: "I9 Contabilidade",
  tagline:     "Contabilidade que entende o seu negócio.",

  // ─────────────────────────────────────────────
  // CONTATO
  // ─────────────────────────────────────────────

  phone:     "",                   // ← Ex: "(11) 9 9999-9999"
  whatsapp:  "559491548246",      // ← WhatsApp oficial I9 Contabilidade
  whatsappMessage: "Olá! Gostaria de falar com um especialista da I9 Contabilidade.",
  email:     "",                   // ← Ex: "contato@i9contabilidade.com.br"
  address:   "Rua: Ildonete Guimarães, Jardim Umuarama, buceta Redenção - PA",                   // ← Ex: "Rua das Empresas, 100 — São Paulo, SP"
  businessHours: "𝐒𝐞𝐠𝐮𝐧𝐝𝐚 𝐚̀ 𝐐𝐮𝐢𝐧𝐭𝐚-𝐅𝐞𝐢𝐫𝐚 𝟎𝟕:𝟑𝟎 𝐚̀𝐬 𝟏𝟖:𝟎𝟎. 𝐒𝐞𝐱𝐭𝐚-𝐅𝐞𝐢𝐫𝐚 𝟎𝟕:𝟑𝟎 𝐚̀𝐬 𝟏𝟕:𝟎𝟎",

  // ─────────────────────────────────────────────
  // REDES SOCIAIS
  // ─────────────────────────────────────────────

  social: {
    instagram: "",   // ← URL completa: "https://instagram.com/i9contabilidade"
    linkedin:  "",   // ← URL completa
    facebook:  "",   // ← URL completa
  },

  // ─────────────────────────────────────────────
  // SEO / META
  // ─────────────────────────────────────────────

  seo: {
    title:       "I9 Contabilidade | Contabilidade que entende o seu negócio",
    description: "A I9 Contabilidade oferece soluções completas em contabilidade, fiscal, departamento pessoal e consultoria tributária para empresas de todos os tamanhos.",
    keywords:    "contabilidade, escritório contábil, contador, fiscal, BPO financeiro, abertura de empresa, consultoria tributária",
    ogImage:     "assets/images/og-image.jpg",  // ← Imagem de compartilhamento social
    canonical:   "",                            // ← URL canônica do site
  },

  // ─────────────────────────────────────────────
  // NAVBAR
  // ─────────────────────────────────────────────

  nav: {
    links: [
      { label: "Início",      href: "#hero" },
      { label: "A Empresa",   href: "#sobre" },
      { label: "Serviços",    href: "#servicos" },
      { label: "Conteúdos",   href: "#conteudos" },
      { label: "Contato",     href: "#footer" },
    ],
    cta: {
      label: "Falar com um especialista",
      href:  "#contato",
    },
  },

  // ─────────────────────────────────────────────
  // HERO
  // ─────────────────────────────────────────────

  hero: {
    eyebrow:      "I9 CONTABILIDADE",
    title:        "Contabilidade que entende o seu negócio.",
    description:  "Mais organização, segurança e clareza para você tomar decisões melhores e fazer sua empresa crescer.",
    primaryCTA:   { label: "Falar com um especialista", href: "#contato" },
    secondaryCTA: { label: "Conheça nossos serviços",   href: "#servicos" },
    image:        "assets/images/hero-team.jpg",  // ← Substitua pela foto real da equipe
  },

  // ─────────────────────────────────────────────
  // PROVA SOCIAL — NÚMEROS
  // Substitua os valores "00" pelos números reais
  // ─────────────────────────────────────────────

  stats: [
    { value: "00+",   label: "Empresas atendidas",   id: "stat-empresas"     },
    { value: "00",    label: "Anos de experiência",  id: "stat-anos"         },
    { value: "00",    label: "Especialistas",         id: "stat-especialistas"},
    { value: "00%",   label: "De satisfação",         id: "stat-satisfacao"  },
  ],

  // ─────────────────────────────────────────────
  // SERVIÇOS
  // Adicione/remova objetos para alterar os serviços
  // ─────────────────────────────────────────────

  servicesSection: {
    eyebrow: "Nossos Serviços",
    title:   "Soluções para cada etapa da sua empresa.",
    description: "Da abertura ao crescimento, cuidamos de toda a sua gestão contábil com precisão e proximidade.",
  },

  services: [
    {
      id:          "contabilidade",
      icon:        "icon-contabilidade",
      title:       "Contabilidade",
      description: "Organização contábil completa para manter sua empresa em conformidade e apoiar suas decisões com dados precisos.",
      href:        "#contato",
    },
    {
      id:          "fiscal",
      icon:        "icon-fiscal",
      title:       "Fiscal",
      description: "Gestão de obrigações fiscais, apuração de impostos e entrega de declarações com total segurança e pontualidade.",
      href:        "#contato",
    },
    {
      id:          "dp",
      icon:        "icon-dp",
      title:       "Departamento Pessoal",
      description: "Folha de pagamento, admissões, demissões e gestão de benefícios com eficiência e conformidade trabalhista.",
      href:        "#contato",
    },
    {
      id:          "abertura",
      icon:        "icon-abertura",
      title:       "Abertura de Empresas",
      description: "Orientação completa na abertura da sua empresa: escolha do CNAE, regime tributário e registro nos órgãos competentes.",
      href:        "#contato",
    },
    {
      id:          "consultoria",
      icon:        "icon-consultoria",
      title:       "Consultoria Tributária",
      description: "Análise estratégica do regime tributário da sua empresa para reduzir a carga fiscal dentro da legalidade.",
      href:        "#contato",
    },
    {
      id:          "bpo",
      icon:        "icon-bpo",
      title:       "BPO Financeiro",
      description: "Terceirização do financeiro com controle de contas a pagar, a receber, conciliação bancária e relatórios gerenciais.",
      href:        "#contato",
    },
  ],

  // ─────────────────────────────────────────────
  // DIFERENCIAIS
  // ─────────────────────────────────────────────

  differentialsSection: {
    eyebrow: "Por que a I9",
    title:   "Mais do que números. Uma parceria para o seu negócio.",
  },

  differentials: [
    {
      number:      "01",
      title:       "Atendimento próximo",
      description: "Você tem acesso direto a especialistas que conhecem a realidade da sua empresa e estão sempre disponíveis.",
    },
    {
      number:      "02",
      title:       "Equipe especializada",
      description: "Profissionais com formação sólida e atualização constante nas legislações tributárias e trabalhistas.",
    },
    {
      number:      "03",
      title:       "Tecnologia e praticidade",
      description: "Processos digitais, documentos na nuvem e comunicação ágil para você acompanhar tudo sem complicação.",
    },
    {
      number:      "04",
      title:       "Segurança e organização",
      description: "Conformidade total com as obrigações legais e organização financeira para decisões estratégicas.",
    },
  ],

  // ─────────────────────────────────────────────
  // COMO FUNCIONA
  // ─────────────────────────────────────────────

  howItWorksSection: {
    eyebrow: "Como Funciona",
    title:   "Simples do início ao fim.",
    description: "Cuidamos de toda a complexidade contábil para que você foque no que realmente importa: o seu negócio.",
  },

  steps: [
    {
      number:      "01",
      title:       "Converse conosco",
      description: "Entre em contato e conte um pouco sobre sua empresa. Sem compromisso, sem burocracia.",
    },
    {
      number:      "02",
      title:       "Entendemos sua empresa",
      description: "Analisamos sua situação atual, segmento e necessidades para indicar a melhor estratégia contábil.",
    },
    {
      number:      "03",
      title:       "Organizamos sua contabilidade",
      description: "Estruturamos toda a gestão contábil, fiscal e trabalhista com processos claros e eficientes.",
    },
    {
      number:      "04",
      title:       "Você acompanha tudo",
      description: "Relatórios claros, acesso digital e comunicação direta. Você sempre sabe o que está acontecendo.",
    },
  ],

  // ─────────────────────────────────────────────
  // SOBRE A I9
  // ─────────────────────────────────────────────

  about: {
    eyebrow:     "Sobre a I9",
    title:       "Experiência contábil com uma visão moderna de negócio.",
    description: "A I9 Contabilidade nasceu da convicção de que uma boa contabilidade vai muito além de cumprir obrigações legais. Somos parceiros estratégicos de empresas que querem crescer com segurança, organização e inteligência financeira.\n\nCom uma equipe especializada e processos modernos, oferecemos uma experiência contábil diferente: ágil, clara e próxima do seu dia a dia.",
    cta:         { label: "Conheça nossa equipe", href: "#equipe" },
    image:       "assets/images/about-office.jpg",  // ← Substitua pela foto real do escritório
    stats: [
      { value: "00+", label: "Clientes ativos"     },
      { value: "00",  label: "Anos de mercado"     },
      { value: "00+", label: "Obrigações/mês"      },
    ],
  },

  // ─────────────────────────────────────────────
  // EQUIPE
  // Adicione/remova objetos para alterar a equipe
  // ─────────────────────────────────────────────

  teamSection: {
    eyebrow: "Nossa Equipe",
    title:   "Conheça quem está por trás da I9.",
    description: "Profissionais especializados, comprometidos com o sucesso do seu negócio.",
  },

  team: [
    // ← Substitua pelos dados reais da equipe
    {
      name:         "Nome do Profissional",
      role:         "Contador Responsável",
      image:        "assets/images/team/member-1.jpg",  // ← Foto real
      registration: "CRC XX/000000-0",
    },
    {
      name:         "Nome do Profissional",
      role:         "Especialista Fiscal",
      image:        "assets/images/team/member-2.jpg",
      registration: "",
    },
    {
      name:         "Nome do Profissional",
      role:         "Departamento Pessoal",
      image:        "assets/images/team/member-3.jpg",
      registration: "",
    },
    {
      name:         "Nome do Profissional",
      role:         "BPO Financeiro",
      image:        "assets/images/team/member-4.jpg",
      registration: "",
    },
  ],

  // ─────────────────────────────────────────────
  // CONTEÚDOS / BLOG
  // Adicione/remova objetos para alterar os conteúdos
  // ─────────────────────────────────────────────

  contentsSection: {
    eyebrow: "Conteúdos",
    title:   "Informação para ajudar sua empresa a crescer.",
    cta:     { label: "Ver todos os conteúdos", href: "#" },
  },

  contents: [
    {
      id:       "ecf-2024",
      image:    "assets/images/content/content-1.jpg",
      category: "Obrigações Fiscais",
      title:    "ECF 2024: prazo, quem precisa entregar e como se preparar",
      summary:  "Entenda o que é a Escrituração Contábil Fiscal, quem está obrigado a entregar e como evitar multas.",
      date:     "2024-06-15",
      href:     "#",
    },
    {
      id:       "ir-empresa",
      image:    "assets/images/content/content-2.jpg",
      category: "Imposto de Renda",
      title:    "Imposto de Renda da Pessoa Jurídica: guia completo para empresas",
      summary:  "Tudo que você precisa saber sobre o IRPJ: base de cálculo, alíquotas e como reduzir legalmente.",
      date:     "2024-05-20",
      href:     "#",
    },
    {
      id:       "simples-nacional",
      image:    "assets/images/content/content-3.jpg",
      category: "Regime Tributário",
      title:    "Simples Nacional: vale a pena para a sua empresa?",
      summary:  "Comparativo entre Simples Nacional, Lucro Presumido e Lucro Real para você escolher o melhor regime.",
      date:     "2024-04-10",
      href:     "#",
    },
  ],

  // ─────────────────────────────────────────────
  // DEPOIMENTOS
  // Substitua pelos depoimentos reais dos clientes
  // ─────────────────────────────────────────────

  testimonialsSection: {
    eyebrow: "Depoimentos",
    title:   "Quem confia na I9, recomenda.",
  },

  testimonials: [
    // ← Substitua pelos depoimentos reais
    {
      name:    "Nome do Cliente",
      company: "Nome da Empresa",
      role:    "CEO",
      image:   "assets/images/testimonials/client-1.jpg",
      text:    "Desde que contratamos a I9, temos muito mais clareza sobre as finanças da nossa empresa. O atendimento é próximo e sempre que precisamos de uma orientação, eles estão disponíveis.",
    },
    {
      name:    "Nome do Cliente",
      company: "Nome da Empresa",
      role:    "Sócia-Fundadora",
      image:   "assets/images/testimonials/client-2.jpg",
      text:    "A I9 nos ajudou a reduzir significativamente nossa carga tributária de forma totalmente legal. Além disso, o processo é simples e tudo funciona de forma digital.",
    },
    {
      name:    "Nome do Cliente",
      company: "Nome da Empresa",
      role:    "Diretor Financeiro",
      image:   "assets/images/testimonials/client-3.jpg",
      text:    "Equipe extremamente competente e atenciosa. Migramos de outra contabilidade e o processo foi tranquilo. Hoje temos muito mais confiança nas nossas obrigações fiscais.",
    },
  ],

  // ─────────────────────────────────────────────
  // FAQ
  // Adicione/remova objetos para alterar as perguntas
  // ─────────────────────────────────────────────

  faqSection: {
    eyebrow: "Dúvidas Frequentes",
    title:   "Respostas para as perguntas mais comuns.",
  },

  faq: [
    {
      question: "A I9 atende empresas de quais segmentos?",
      answer:   "Atendemos empresas de diversos segmentos, incluindo comércio, serviços, indústria, construção civil, tecnologia, saúde e profissionais liberais. Nossa equipe tem experiência com diferentes realidades empresariais e adapta os serviços às necessidades de cada cliente.",
    },
    {
      question: "A I9 atende empresas de outras cidades?",
      answer:   "Sim! Atendemos empresas de todo o Brasil de forma 100% digital. Nossos processos são estruturados para funcionar remotamente com a mesma qualidade e proximidade que oferecemos localmente.",
    },
    {
      question: "Como funciona a troca de contador?",
      answer:   "O processo de migração é simples e cuidamos de tudo. Solicitamos a documentação do contador anterior, fazemos uma análise da situação fiscal e contábil da sua empresa e assumimos toda a gestão sem interrupções ou complicações para você.",
    },
    {
      question: "Quais serviços estão incluídos?",
      answer:   "Oferecemos soluções completas em Contabilidade, Fiscal, Departamento Pessoal, Abertura de Empresas, Consultoria Tributária e BPO Financeiro. Os serviços incluídos no seu plano dependem do contrato firmado. Fale com um especialista para montar o pacote ideal para sua empresa.",
    },
    {
      question: "Como posso falar com um especialista?",
      answer:   "Você pode entrar em contato pelo WhatsApp, telefone ou email. Nossa equipe atende de segunda a sexta, das 8h às 18h, e responde também fora desse horário para demandas urgentes.",
    },
    {
      question: "Quanto custa contratar a I9?",
      answer:   "O investimento varia de acordo com o porte da empresa, regime tributário e serviços contratados. Entre em contato para uma análise gratuita e um orçamento personalizado para a sua realidade.",
    },
  ],

  // ─────────────────────────────────────────────
  // CTA FINAL
  // ─────────────────────────────────────────────

  ctaFinal: {
    eyebrow:     "Vamos começar?",
    title:       "Vamos colocar sua contabilidade em ordem?",
    description: "Fale com um de nossos especialistas e descubra como a I9 pode transformar a gestão contábil da sua empresa.",
    buttonText:  "Falar com um especialista",
    buttonHref:  "#",
  },

  // ─────────────────────────────────────────────
  // FOOTER
  // ─────────────────────────────────────────────

  footer: {
    description: "Contabilidade que entende o seu negócio. Soluções completas em contabilidade, fiscal e gestão financeira para empresas de todos os tamanhos.",
    legalText:   "I9 Contabilidade — CNPJ: XX.XXX.XXX/XXXX-XX",  // ← Preencher
    copyright:   `© ${new Date().getFullYear()} I9 Contabilidade. Todos os direitos reservados.`,
  },

  // ─────────────────────────────────────────────
  // PRÉ-CADASTRO INTELIGENTE
  // Configurações do fluxo de pré-cadastro.
  // ─────────────────────────────────────────────

  precadastro: {

    // Modo de envio:
    //   'whatsapp' — compõe mensagem e abre WhatsApp (sem backend)
    //   'api'      — envia para endpoint via fetch() POST
    mode: 'whatsapp',

    // URL do endpoint para mode: 'api' (deixe vazio para mode: 'whatsapp')
    // Ex: "https://api.seudominio.com.br/precadastro"
    endpoint: '',

    // Textos personalizáveis do modal
    titulo:     'Pré-cadastro I9 Contabilidade',
    subtitulo:  'Começar atendimento',

    // Mensagem de sucesso após envio
    sucessoTitulo: 'Pré-cadastro enviado!',
    sucessoDesc:   'Em instantes, nossa equipe entrará em contato pelo WhatsApp para dar continuidade ao atendimento.',

  },

};

// ─────────────────────────────────────────────
// Exportação (compatível com browser e módulos)
// ─────────────────────────────────────────────

if (typeof module !== "undefined" && module.exports) {
  module.exports = siteConfig;
} else {
  window.siteConfig = siteConfig;
}
