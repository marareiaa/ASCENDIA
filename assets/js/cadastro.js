'use strict';

/* ════════════════════════════════════════════
   ASCENDIA — assets/js/cadastro.js
   Comportamento da página de cadastro:
   - alterna visibilidade dos dois campos de senha
   - valida se "senha" e "confirmar senha" são iguais
   - feedback ao enviar o formulário
═════════════════════════════════════════════ */

(() => {
  const form        = document.getElementById('cadastroForm');
  const senha       = document.getElementById('cadastroSenha');
  const confirma    = document.getElementById('cadastroConfirmaSenha');
  const toggleBtns  = document.querySelectorAll('.login-toggle-pass');

  // Mostrar/ocultar senha (funciona para os dois campos via data-target)
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';

      const icon = btn.querySelector('i');
      icon.className = isHidden ? 'bi bi-eye-slash' : 'bi bi-eye';
      btn.setAttribute('aria-label', isHidden ? 'Ocultar senha' : 'Mostrar senha');
    });
  });

  if (!form || !senha || !confirma) return;

  // Validação de confirmação de senha
  const checarSenhas = () => {
    if (confirma.value && senha.value !== confirma.value) {
      confirma.setCustomValidity('As senhas não coincidem.');
    } else {
      confirma.setCustomValidity('');
    }
  };

  senha.addEventListener('input', checarSenhas);
  confirma.addEventListener('input', checarSenhas);

  // Envio do formulário (placeholder, sem back-end)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    checarSenhas();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Aqui futuramente entra a chamada de criação de conta real
    alert('Cadastro em desenvolvimento! Em breve você poderá criar sua conta.');
  });
})();