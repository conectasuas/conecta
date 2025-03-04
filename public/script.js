document.addEventListener('DOMContentLoaded', () => {
  // ========== LOGIN ==========
  const formLogin = document.getElementById('form-login');
  if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
      e.preventDefault();
      const usuario = document.getElementById('admin-user').value;
      const senha = document.getElementById('admin-pass').value;

      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario, senha })
        });

        const data = await response.json();
        if (data.success) {
          window.location.href = '/admin';
        } else {
          alert('Credenciais inválidas!');
        }
      } catch (error) {
        console.error('Erro no login:', error);
      }
    });
  }

  // ========== UPLOAD ==========
  const formUpload = document.getElementById('form-upload');
  if (formUpload) {
    formUpload.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('arquivoDados', document.querySelector('input[type="file"]').files[0]);

      try {
        const response = await fetch('/upload', { method: 'POST', body: formData });
        if (response.ok) window.location.reload();
      } catch (error) {
        alert('Erro no upload!');
      }
    });
  }

  // ========== CONSULTA ==========
  const formConsulta = document.getElementById('form-consulta');
  if (formConsulta) {
    formConsulta.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nis = document.getElementById('nis').value;
      const mensagem = document.getElementById('mensagem-resultado');

      try {
        const response = await fetch(`/consulta?nis=${encodeURIComponent(nis)}`);
        const data = await response.json();
        mensagem.textContent = data.mensagem;
        mensagem.style.color = data.precisaAtualizar ? '#d32f2f' : '#388e3c';
      } catch (error) {
        mensagem.textContent = 'Erro na conexão. Tente novamente.';
      }
    });
  }

  // ========== MENSAGEM DE UPLOAD ==========
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('uploadSucesso')) {
    alert('Arquivo processado com sucesso!');
  }
});