// script.js completo corrigido

// 1. Lógica de Login
const formLogin = document.getElementById('form-login');
if (formLogin) {
  formLogin.addEventListener('submit', (event) => {
    event.preventDefault();
    const usuario = document.getElementById('admin-user').value;
    const senha = document.getElementById('admin-pass').value;
    const uploadSection = document.getElementById('form-upload');

    if (usuario === 'admin' && senha === '123') {
      formLogin.style.display = 'none';
      if (uploadSection) uploadSection.style.display = 'block';
    } else {
      const mensagemErro = document.getElementById('login-erro') || document.createElement('div');
      mensagemErro.textContent = 'Credenciais inválidas!';
      mensagemErro.style.color = 'red';
      mensagemErro.id = 'login-erro';
      formLogin.appendChild(mensagemErro);
    }
  });
}

// 2. Lógica da Consulta Pública
const formConsulta = document.getElementById('form-consulta');
if (formConsulta) {
  formConsulta.addEventListener('submit', async (event) => {
    event.preventDefault();
    const nis = document.getElementById('nis').value;
    const mensagemResultado = document.getElementById('mensagem-resultado');

    try {
      const response = await fetch(`/consulta?nis=${encodeURIComponent(nis)}`);
      const data = await response.json();
      
      mensagemResultado.innerHTML = data.mensagem;
      mensagemResultado.style.color = data.precisaAtualizar ? 'red' : 'green';
    } catch (error) {
      mensagemResultado.innerHTML = "Erro na conexão. Tente novamente.";
      console.error("Erro:", error);
    }
  });
}

// 3. Mensagem de Upload Bem-Sucedido
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('upload_sucesso')) {
    const uploadMsg = document.getElementById('upload-msg');
    if (uploadMsg) uploadMsg.textContent = "Dados atualizados com sucesso! ✅";
  }
});