// 1. Lógica de Login Simples (exemplo apenas)
const btnLogin = document.getElementById('btn-login');
if (btnLogin) {
  btnLogin.addEventListener('click', () => {
    const userField = document.getElementById('admin-user');
    const passField = document.getElementById('admin-pass');
    const formLogin = document.getElementById('form-login');
    const formUpload = document.getElementById('form-upload');

    const usuario = userField.value;
    const senha = passField.value;

    // Exemplo de login fixo: usuário "admin", senha "123"
    if (usuario === 'admin' && senha === '123') {
      alert('Login bem-sucedido!');
      formLogin.style.display = 'none';
      formUpload.style.display = 'block';
    } else {
      alert('Usuário ou senha incorretos!');
    }
  });
}

// 2. Lógica da consulta na página inicial (index.html)
const formConsulta = document.getElementById('form-consulta');
if (formConsulta) {
  formConsulta.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const nis = document.getElementById('nis').value;

    // Aqui vamos chamar a rota /consulta do servidor usando fetch()
    try {
      const response = await fetch(`/consulta?nome=${nome}&nis=${nis}`);
      const mensagem = await response.text();

      // Exibir a mensagem de resposta na tela
      const mensagemResultado = document.getElementById('mensagem-resultado');
      mensagemResultado.textContent = mensagem;
    } catch (error) {
      console.error('Erro na consulta:', error);
    }
  });
}
