'use strict';

/* ════════════════════════════════════════════
   ASCENDIA — assets/js/diagnostico.js
   Comportamento da página de diagnóstico:
   - mostra o nome do arquivo selecionado
   - suporte a drag & drop visual
   - abre modal de seleção de plano
   - redireciona para analise.html com o plano escolhido
═════════════════════════════════════════════ */

(() => {
  const uploadBox = document.querySelector('.diag-upload-box');
  const fileInput = document.getElementById('curriculo-input');
  const btnDiag   = document.getElementById('btnDiagnostico');

  if (!uploadBox || !fileInput || !btnDiag) return;

  const setFile = (file) => {
    if (!file) return;
    uploadBox.classList.add('has-file');
    uploadBox.setAttribute('data-filename', file.name);
    uploadBox.querySelector('.diag-upload-text').setAttribute('data-filename', file.name);
  };

  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files[0]) {
      setFile(fileInput.files[0]);
    }
  });

  // Drag & drop
  ['dragenter', 'dragover'].forEach(evt => {
    uploadBox.addEventListener(evt, (e) => {
      e.preventDefault();
      uploadBox.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(evt => {
    uploadBox.addEventListener(evt, (e) => {
      e.preventDefault();
      uploadBox.classList.remove('dragover');
    });
  });

  uploadBox.addEventListener('drop', (e) => {
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      fileInput.files = e.dataTransfer.files;
      setFile(file);
    }
  });

  // ── MODAL DE SELEÇÃO DE PLANO ──────────────────────────
  const plans = [
      {
    id: 4,
    name: 'ORIGIN',
    tag: null,
    price: 'R$ 19,90',
    period: '/mês',
    depth: 'Seu ponto de partida profissional.',
    desc: '',
    features: ['Currículo estruturado', 'Análise automática', 'Correção de erros', 'Sugestão de melhoria', 'Score inicial'],
    highlight: false
  },
  {
    id: 3,
    name: 'ASCEND',
    tag: 'MAIS POPULAR!',
    price: 'R$ 39,90',
    period: '/mês',
    depth: 'Comece a competir de verdade.',
    desc: 'Tudo do Plano Origin +',
    features: ['Otimização ATS', 'Reorganização estratégica', 'Destaque de habilidades', 'Recomendações de cursos', 'Compatibilidade com vagas'],
    highlight: true 
  },
  {
    id: 2,
    name: 'EVOLVE',
    tag: null,
    price: 'R$ 69,90',
    period: '/mês',
    depth: 'Desenvolva seu potencial com direção.',
    desc: 'Tudo do Plano Ascend +',
    features: ['Simulação de entrevistas', 'Análise de perfil profissional', 'Otimização para vagas específicas', 'Sugestões de comunicação', 'Score inicial'],
    highlight: false
  },
  {
    id: 1,
    name: 'DOMINATE',
    tag: null,
    price: 'R$ 119,90',
    period: '/mês',
    depth: 'Se posicione entre os melhores.',
    desc: 'Tudo do Plano Evolve +',
    features: ['Estratégia profissional', 'Planejamento de carreira', 'Currículos para múltiplas vagas', 'Análise de LinkedIn', 'Acompanhamento contínuo'],
    highlight: false
  }
  ];

  function buildModal() {
    if (document.getElementById('planModal')) return;

    const backdrop = document.createElement('div');
    backdrop.id = 'planModalBackdrop';
    backdrop.setAttribute('aria-hidden', 'true');

    const modal = document.createElement('div');
    modal.id = 'planModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'planModalTitle');

    modal.innerHTML = `
      <div class="pm-inner">
        <button class="pm-close" id="pmClose" aria-label="Fechar">
          <i class="bi bi-x-lg"></i>
        </button>
        <p class="pm-eyebrow">SELECIONE SEU PLANO</p>
        <h2 class="pm-title" id="planModalTitle">Qual análise você quer receber?</h2>
        <p class="pm-sub">Escolha o nível de detalhe ideal para sua situação.</p>
        <div class="pm-grid">
          ${plans.map(p => `
            <button class="pm-card${p.highlight ? ' pm-card--highlight' : ''}" data-plan="${p.id}" type="button">
              ${p.tag ? `<span class="pm-tag">${p.tag}</span>` : ''}
              <span class="pm-plan-name">${p.name}</span>
              <span class="pm-depth">${p.depth}</span>
              <span class="pm-price">${p.price}<small>${p.period}</small></span>
              <span class="pm-desc">${p.desc}</span>
              <ul class="pm-features">
                ${p.features.map(f => `<li><i class="bi bi-check2"></i>${f}</li>`).join('')}
              </ul>
              <span class="pm-cta">Analisar com este plano</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);

    // Fechar
    document.getElementById('pmClose').addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    // Selecionar plano
    modal.querySelectorAll('.pm-card').forEach(card => {
      card.addEventListener('click', () => {
        const planId = card.dataset.plan;
        const file = fileInput.files?.[0];
        // Salva o nome do arquivo em sessionStorage para usar na analise
        if (file) sessionStorage.setItem('curriculoNome', file.name);
        sessionStorage.setItem('planoSelecionado', planId);
        window.location.href = `analise.html?plano=${planId}`;
      });
    });
  }

  function openModal() {
    buildModal();
    const modal    = document.getElementById('planModal');
    const backdrop = document.getElementById('planModalBackdrop');
    requestAnimationFrame(() => {
      backdrop.classList.add('pm-visible');
      modal.classList.add('pm-visible');
      document.body.style.overflow = 'hidden';
      document.getElementById('pmClose').focus();
    });
  }

  function closeModal() {
    const modal    = document.getElementById('planModal');
    const backdrop = document.getElementById('planModalBackdrop');
    if (!modal) return;
    modal.classList.remove('pm-visible');
    backdrop.classList.remove('pm-visible');
    document.body.style.overflow = '';
  }

  // Botão "Realizar diagnóstico"
  btnDiag.addEventListener('click', () => {
    if (!fileInput.files || !fileInput.files[0]) {
      alert('Por favor, envie seu currículo antes de realizar o diagnóstico.');
      return;
    }
    openModal();
  });
})();
