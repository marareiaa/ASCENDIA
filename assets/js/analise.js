'use strict';

/* ════════════════════════════════════════════
   ASCENDIA — assets/js/analise.js
   Página de resultado da análise de currículo.
   Lê o plano selecionado via URL (?plano=N) e
   gera a análise com a API da Anthropic,
   com profundidade proporcional ao plano.
════════════════════════════════════════════ */

(() => {

  /* ── MAPA DE PLANOS ────────────────────── */
  const PLANS = {
    1: {
      name: 'Dominate',
      badge: 'Se posicione entre os melhores.',
      depth: 'Análise Profunda',
      showUpgrade: false
    },
    2: {
      name: 'Plano Evolve',
      badge: 'Desenvolva seu potencial com direção.',
      depth: 'Análise Avançada',
      showUpgrade: true
    },
    3: {
      name: 'Plano Ascend',
      badge: 'Comece a competir de verdade.',
      depth: 'Análise Intermediária',
      showUpgrade: true
    },
    4: {
      name: 'Plano Origin',
      badge: 'Seu ponto de partida profissional.',
      depth: 'Análise Básica',
      showUpgrade: true
    }
  };

  /* ── PROMPTS POR PLANO ─────────────────── */
  const SYSTEM_PROMPT = `Você é um especialista sênior em recrutamento e desenvolvimento de carreira do mercado brasileiro. 
Analise currículos com rigor técnico, clareza e empatia. Responda SEMPRE em JSON válido, sem markdown, sem texto fora do JSON.`;

  function buildPrompt(planId, fileName) {
    const name = fileName || 'curriculo.pdf';

    const base = `O candidato enviou o arquivo "${name}". Como você não tem o conteúdo real do arquivo neste contexto de demonstração, gere uma análise realista e educativa como se tivesse analisado um currículo típico de nível intermediário do mercado brasileiro. Seja específico e didático.`;

    const prompts = {
      4: `${base}

Gere uma análise BÁSICA (Plano Free) com exatamente este JSON:
{
  "score": <número de 0 a 100>,
  "verdict": "<adjetivo curto ex: Razoável / Bom / Precisa Melhorar>",
  "highlights": [
    "<ponto positivo 1>",
    "<ponto positivo 2>"
  ],
  "alerts": [
    "<problema crítico 1>",
    "<problema crítico 2>",
    "<problema crítico 3>"
  ]
}`,

      3: `${base}

Gere uma análise INTERMEDIÁRIA (Plano Starter) com exatamente este JSON:
{
  "score": <número de 0 a 100>,
  "verdict": "<adjetivo curto>",
  "highlights": [
    "<ponto positivo 1>",
    "<ponto positivo 2>",
    "<ponto positivo 3>"
  ],
  "alerts": [
    "<problema crítico 1>",
    "<problema crítico 2>",
    "<problema crítico 3>"
  ],
  "priorities": [
    "<ação prioritária 1>",
    "<ação prioritária 2>",
    "<ação prioritária 3>"
  ]
}`,

      2: `${base}

Gere uma análise AVANÇADA (Plano Pro) com exatamente este JSON:
{
  "score": <número de 0 a 100>,
  "verdict": "<adjetivo curto>",
  "ats_score": <número de 0 a 100>,
  "sections": {
    "objetivo": <número de 0 a 100>,
    "experiencia": <número de 0 a 100>,
    "formacao": <número de 0 a 100>,
    "habilidades": <número de 0 a 100>,
    "layout": <número de 0 a 100>
  },
  "highlights": [
    "<ponto positivo 1>",
    "<ponto positivo 2>",
    "<ponto positivo 3>"
  ],
  "alerts": [
    "<problema 1>",
    "<problema 2>",
    "<problema 3>",
    "<problema 4>"
  ],
  "recommendations": [
    "<recomendação prática 1>",
    "<recomendação prática 2>",
    "<recomendação prática 3>",
    "<recomendação prática 4>"
  ]
}`,

      1: `${base}

Gere uma análise PROFUNDA e COMPLETA (Plano Essential) com exatamente este JSON:
{
  "score": <número de 0 a 100>,
  "verdict": "<adjetivo curto>",
  "ats_score": <número de 0 a 100>,
  "keyword_density": <número de 0 a 100>,
  "sections": {
    "objetivo": <número de 0 a 100>,
    "experiencia": <número de 0 a 100>,
    "formacao": <número de 0 a 100>,
    "habilidades": <número de 0 a 100>,
    "layout": <número de 0 a 100>
  },
  "benchmark": {
    "mercado_medio": <número de 0 a 100>,
    "posicao": "<ex: Acima da média / Abaixo da média>",
    "percentil": <número de 0 a 100>
  },
  "highlights": [
    "<ponto positivo 1>",
    "<ponto positivo 2>",
    "<ponto positivo 3>",
    "<ponto positivo 4>"
  ],
  "alerts": [
    "<problema 1>",
    "<problema 2>",
    "<problema 3>",
    "<problema 4>"
  ],
  "action_plan": [
    { "priority": "Alta", "action": "<ação concreta 1>", "impact": "<impacto esperado>" },
    { "priority": "Alta", "action": "<ação concreta 2>", "impact": "<impacto esperado>" },
    { "priority": "Média", "action": "<ação concreta 3>", "impact": "<impacto esperado>" },
    { "priority": "Média", "action": "<ação concreta 4>", "impact": "<impacto esperado>" },
    { "priority": "Baixa", "action": "<ação concreta 5>", "impact": "<impacto esperado>" }
  ],
  "keywords_missing": ["<palavra-chave 1>", "<palavra-chave 2>", "<palavra-chave 3>"],
  "next_steps": "<parágrafo motivacional de 2 frases>"
}`
    };

    return prompts[planId] || prompts[4];
  }

 
  function fetchAnalysis(planId) {
  const data = {
    1: {
      score: 64, verdict: 'Satisfatório',
      ats_score: 41, keyword_density: 38,
      sections: { objetivo: 50, experiencia: 65, formacao: 70, habilidades: 45, layout: 60 },
      benchmark: { mercado_medio: 61, posicao: 'Acima da média', percentil: 58 },
      highlights: [
        'Formação acadêmica alinhada com a área de atuação',
        'Experiências anteriores demonstram progressão de carreira',
        'Presença de certificações relevantes para o mercado',
        'Boa organização visual e estrutura clara de seções'
      ],
      alerts: [
        'Resumo profissional genérico — não comunica seu diferencial competitivo',
        'Habilidades listadas sem contexto de aplicação ou nível de domínio',
        'Experiências descrevem tarefas, não resultados ou impactos gerados',
        'Palavras-chave técnicas insuficientes para passar pelos filtros ATS'
      ],
      action_plan: [
        { priority: 'Alta', action: 'Reescrever o resumo profissional com foco no seu valor para a empresa', impact: 'Aumenta taxa de leitura completa do currículo em até 40%' },
        { priority: 'Alta', action: 'Incluir métricas e resultados em cada experiência profissional', impact: 'Torna as experiências mais concretas e memoráveis para recrutadores' },
        { priority: 'Média', action: 'Adicionar palavras-chave da sua área ao longo do currículo', impact: 'Melhora compatibilidade ATS em até 30 pontos' },
        { priority: 'Média', action: 'Detalhar habilidades com nível de domínio e contexto de uso', impact: 'Reduz dúvidas do recrutador sobre seu perfil técnico' },
        { priority: 'Baixa', action: 'Revisar formatação e padronizar fontes, espaçamentos e alinhamentos', impact: 'Transmite mais profissionalismo e atenção aos detalhes' }
      ],
      keywords_missing: ['Gestão de projetos', 'Análise de dados', 'Trabalho remoto', 'Metodologia ágil', 'Liderança', 'KPIs'],
      next_steps: 'Seu currículo tem uma base sólida e está acima da média do mercado. Com ajustes estratégicos no resumo e nas experiências, você tem potencial real de alcançar 85+ e se destacar nas primeiras etapas de seleção.'
    },
    2: {
      score: 64, verdict: 'Satisfatório',
      ats_score: 41,
      sections: { objetivo: 50, experiencia: 65, formacao: 70, habilidades: 45, layout: 60 },
      highlights: [
        'Formação acadêmica alinhada com a área de atuação',
        'Experiências anteriores demonstram progressão de carreira',
        'Boa organização visual e estrutura clara de seções'
      ],
      alerts: [
        'Resumo profissional genérico — não comunica seu diferencial competitivo',
        'Experiências descrevem tarefas, não resultados ou impactos gerados',
        'Palavras-chave insuficientes para passar pelos filtros ATS',
        'Habilidades listadas sem contexto de aplicação ou nível de domínio'
      ],
      recommendations: [
        'Reescrever o resumo profissional destacando seu principal valor para a empresa',
        'Transformar descrições de tarefas em conquistas com números: "Reduzi X em Y%"',
        'Enriquecer o currículo com palavras-chave relevantes da sua área',
        'Detalhar habilidades com exemplos práticos de onde foram aplicadas'
      ]
    },
    3: {
      score: 64, verdict: 'Satisfatório',
      highlights: [
        'Formação acadêmica alinhada com a área de atuação',
        'Experiências demonstram progressão de carreira',
        'Boa estrutura visual e organização das seções'
      ],
      alerts: [
        'Resumo profissional não comunica seu diferencial competitivo',
        'Experiências descrevem tarefas ao invés de resultados concretos',
        'Palavras-chave insuficientes para os filtros automáticos das empresas'
      ],
      priorities: [
        'Reescrever o resumo com foco no valor que você entrega à empresa',
        'Adicionar métricas e resultados reais em cada experiência',
        'Incluir palavras-chave estratégicas da sua área de atuação'
      ]
    },
    4: {
      score: 64, verdict: 'Satisfatório',
      highlights: [
        'Formação acadêmica alinhada com a área de atuação',
        'Estrutura do currículo clara e de fácil leitura'
      ],
      alerts: [
        'Resumo profissional genérico, sem diferencial competitivo claro',
        'Experiências focadas em tarefas, não em resultados alcançados',
        'Currículo pode não passar pelos filtros automáticos das empresas'
      ]
    }
  };

  return Promise.resolve(data[planId] || data[4]);
}
  /* ── RENDER HELPERS ────────────────────── */
  function block(iconClass, title, bodyHTML) {
    return `
      <div class="an-block">
        <p class="an-block-title"><i class="${iconClass}"></i>${title}</p>
        <div class="an-block-body">${bodyHTML}</div>
      </div>`;
  }

  function list(items, iconClass) {
    return `<ul class="an-list">${items.map(i =>
      `<li><i class="${iconClass}"></i>${i}</li>`
    ).join('')}</ul>`;
  }

  function skillBars(sections) {
    const labels = {
      objetivo: 'Objetivo', experiencia: 'Experiências', formacao: 'Formação',
      habilidades: 'Habilidades', layout: 'Layout / Design'
    };
    return `<div class="an-skill-bar-wrap">
      ${Object.entries(sections).map(([k, v]) => `
        <div class="an-skill-bar">
          <div class="an-skill-bar-header"><span>${labels[k] || k}</span><span>${v}/100</span></div>
          <div class="an-skill-bar-track"><div class="an-skill-bar-fill" data-w="${v}"></div></div>
        </div>`).join('')}
    </div>`;
  }

  function metricCard(val, suffix, label) {
    return `<div class="an-metric">
      <div class="an-metric-val">${val}<span>${suffix}</span></div>
      <p class="an-metric-label">${label}</p>
    </div>`;
  }

  function priorityColor(p) {
    return p === 'Alta' ? 'bi-arrow-up-circle-fill text-danger'
         : p === 'Média' ? 'bi-dash-circle-fill text-warning'
         : 'bi-arrow-down-circle-fill text-secondary';
  }

  /* ── RENDER BY PLAN ────────────────────── */
  function renderPlan4(data) {
    return `
      ${block('bi bi-check2-circle', 'Pontos Positivos',
        list(data.highlights, 'bi bi-check-circle-fill'))}
      ${block('bi bi-exclamation-triangle', 'Pontos de Atenção',
        list(data.alerts, 'bi bi-exclamation-circle-fill'))}`;
  }

  function renderPlan3(data) {
    return `
      ${block('bi bi-check2-circle', 'Pontos Positivos',
        list(data.highlights, 'bi bi-check-circle-fill'))}
      ${block('bi bi-exclamation-triangle', 'Alertas Críticos',
        list(data.alerts, 'bi bi-exclamation-circle-fill'))}
      ${block('bi bi-lightning-charge', 'Ações Prioritárias',
        list(data.priorities, 'bi bi-arrow-right-circle-fill'))}`;
  }

  function renderPlan2(data) {
    return `
      <div class="an-block">
        <p class="an-block-title"><i class="bi bi-speedometer2"></i>Métricas</p>
        <div class="an-metrics">
          ${metricCard(data.ats_score, '/100', 'Score ATS')}
          ${Object.entries(data.sections).slice(0,3).map(([k,v]) => {
            const labels = { objetivo:'Objetivo', experiencia:'Experiências', formacao:'Formação' };
            return metricCard(v, '/100', labels[k]||k);
          }).join('')}
        </div>
      </div>
      ${block('bi bi-bar-chart-steps', 'Análise por Seção', skillBars(data.sections))}
      ${block('bi bi-check2-circle', 'Pontos Positivos',
        list(data.highlights, 'bi bi-check-circle-fill'))}
      ${block('bi bi-exclamation-triangle', 'Problemas Encontrados',
        list(data.alerts, 'bi bi-exclamation-circle-fill'))}
      ${block('bi bi-lightbulb', 'Recomendações Práticas',
        list(data.recommendations, 'bi bi-arrow-right-circle-fill'))}`;
  }

  function renderPlan1(data) {
    const actionRows = data.action_plan.map(a => `
      <li><i class="bi ${priorityColor(a.priority)}"></i>
        <div>
          <strong>${a.action}</strong>
          <span style="font-size:.78rem;color:var(--text-muted,#888);display:block">${a.impact}</span>
        </div>
      </li>`).join('');

    return `
      <div class="an-block">
        <p class="an-block-title"><i class="bi bi-speedometer2"></i>Métricas Completas</p>
        <div class="an-metrics">
          ${metricCard(data.ats_score, '/100', 'Compatibilidade ATS')}
          ${metricCard(data.keyword_density, '%', 'Densidade de Keywords')}
          ${metricCard(data.benchmark.percentil, 'º %', 'Percentil no Mercado')}
          ${metricCard(data.benchmark.mercado_medio, '/100', 'Média do Mercado')}
        </div>
      </div>
      ${block('bi bi-bar-chart-steps', 'Análise por Seção', skillBars(data.sections))}
      <div class="an-block">
        <p class="an-block-title"><i class="bi bi-graph-up-arrow"></i>Benchmark de Mercado</p>
        <div class="an-block-body">
          <p>Seu currículo está <strong>${data.benchmark.posicao.toLowerCase()}</strong> em relação a candidatos do mesmo segmento. Você se encontra no percentil <strong>${data.benchmark.percentil}º</strong>.</p>
        </div>
      </div>
      ${block('bi bi-check2-circle', 'Pontos Fortes',
        list(data.highlights, 'bi bi-check-circle-fill'))}
      ${block('bi bi-exclamation-triangle', 'Problemas Identificados',
        list(data.alerts, 'bi bi-exclamation-circle-fill'))}
      <div class="an-block">
        <p class="an-block-title"><i class="bi bi-key"></i>Palavras-chave Faltando</p>
        <div class="an-block-body" style="display:flex;flex-wrap:wrap;gap:.5rem">
          ${data.keywords_missing.map(k =>
            `<span style="background:rgba(224,48,62,.1);color:var(--coral,#e0303e);font-size:.74rem;font-weight:700;padding:.2rem .65rem;border-radius:50px">${k}</span>`
          ).join('')}
        </div>
      </div>
      <div class="an-block">
        <p class="an-block-title"><i class="bi bi-map"></i>Plano de Ação Personalizado</p>
        <ul class="an-list">${actionRows}</ul>
      </div>
      ${data.next_steps ? block('bi bi-rocket-takeoff', 'Próximos Passos',
        `<p>${data.next_steps}</p>`) : ''}`;
  }

  /* ── SCORE RING ANIMATION ──────────────── */
  function animateScore(target) {
    const numEl  = document.getElementById('anScoreNum');
    const ringEl = document.getElementById('anRingFill');
    if (!numEl || !ringEl) return;

    const circumference = 2 * Math.PI * 50; // r=50
    ringEl.style.strokeDasharray  = circumference;
    ringEl.style.strokeDashoffset = circumference;

    let current = 0;
    const step  = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      numEl.textContent = Math.round(current);
      const offset = circumference - (current / 100) * circumference;
      ringEl.style.strokeDashoffset = offset;
      if (current >= target) clearInterval(timer);
    }, 16);
  }

  /* ── ANIMATE BARS ──────────────────────── */
  function animateBars() {
    document.querySelectorAll('.an-skill-bar-fill').forEach(el => {
      const w = el.dataset.w || 0;
      setTimeout(() => { el.style.width = w + '%'; }, 100);
    });
  }

  /* ── SHOW/HIDE HELPERS ─────────────────── */
  function showEl(id)  { const el = document.getElementById(id); if (el) el.hidden = false; }
  function hideEl(id)  { const el = document.getElementById(id); if (el) el.hidden = true;  }

  /* ── VERDICT LABEL ─────────────────────── */
  function scoreVerdict(score) {
    if (score >= 85) return 'Excelente';
    if (score >= 70) return 'Muito Bom';
    if (score >= 55) return 'Satisfatório';
    if (score >= 40) return 'Precisa Melhorar';
    return 'Crítico';
  }

  /* ── INIT ──────────────────────────────── */
  async function init() {
    const params   = new URLSearchParams(window.location.search);
    const planId   = parseInt(params.get('plano'), 10) || 4;
    const plan     = PLANS[planId] || PLANS[4];
    const fileName = sessionStorage.getItem('curriculoNome') || 'seu-curriculo.pdf';

    // Preenche cabeçalho
    const planLabel = document.getElementById('anPlanLabel');
    const fileNameEl = document.getElementById('anFileName');
    const planBadge = document.getElementById('anPlanBadge');
    if (planLabel)  planLabel.textContent  = plan.name.toUpperCase() + ' — ' + plan.depth;
    if (fileNameEl) fileNameEl.textContent = `Arquivo: ${fileName}`;
    if (planBadge)  planBadge.textContent  = plan.badge;

    try {
      const data = await fetchAnalysis(planId, fileName);

      // Score
      const scoreVerEl = document.getElementById('anScoreVerdict');
      if (scoreVerEl) scoreVerEl.textContent = scoreVerdict(data.score);

      // Render content
      const renders = { 1: renderPlan1, 2: renderPlan2, 3: renderPlan3, 4: renderPlan4 };
      const html    = (renders[planId] || renderPlan4)(data);
      const content = document.getElementById('anContent');
      if (content) content.innerHTML = html;

      // Show result
      hideEl('anLoading');
      showEl('anResult');

      // Animate
      animateScore(data.score);
      setTimeout(animateBars, 300);

      // Upgrade CTA
      if (plan.showUpgrade) showEl('anUpgradeCta');

    } catch (err) {
      console.error('Erro na análise:', err);
      hideEl('anLoading');
      const errDesc = document.getElementById('anErrorDesc');
      if (errDesc) errDesc.textContent = 'Não foi possível gerar a análise. Verifique sua conexão e tente novamente.';
      showEl('anError');
    }
  }

  document.addEventListener('DOMContentLoaded', init);

})();
