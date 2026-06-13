'use strict';

/* ════════════════════════════════════════════
   ASCENDIA — assets/js/diagnostico.js
   Comportamento da página de diagnóstico:
   - mostra o nome do arquivo selecionado
   - suporte a drag & drop visual
   - feedback ao clicar em "Realizar diagnóstico"
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

  // Botão "Realizar diagnóstico"
  btnDiag.addEventListener('click', () => {
    if (!fileInput.files || !fileInput.files[0]) {
      alert('Por favor, envie seu currículo antes de realizar o diagnóstico.');
      return;
    }
    // Placeholder: aqui futuramente entra a chamada para a análise real
    alert('Diagnóstico em processamento! (funcionalidade em desenvolvimento)');
  });
})();