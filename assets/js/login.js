'use strict';

/* ════════════════════════════════════════════
   ASCENDIA — assets/js/login.js
   Comportamento da página de login:
   - alterna visibilidade da senha
   - feedback ao enviar o formulário
═════════════════════════════════════════════ */

(() => {
  const toggleBtn = document.getElementById('togglePassword');
  const passInput = document.getElementById('loginPassword');
  const form       = document.getElementById('loginForm');

  // Mostrar/ocultar senha
  if (toggleBtn && passInput) {
    toggleBtn.addEventListener('click', () => {
      const isHidden = passInput.type === 'password';
      passInput.type = isHidden ? 'text' : 'password';

      const icon = toggleBtn.querySelector('i');
      icon.className = isHidden ? 'bi bi-eye-slash' : 'bi bi-eye';
      toggleBtn.setAttribute('aria-label', isHidden ? 'Ocultar senha' : 'Mostrar senha');
    });
  }

  // Envio do formulário (placeholder, sem back-end)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Aqui futuramente entra a chamada de autenticação real
      alert('Login em desenvolvimento! Em breve você poderá acessar sua conta.');
    });
  }
})();