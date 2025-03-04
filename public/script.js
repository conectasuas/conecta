// Login
document.getElementById('form-login').addEventListener('submit', async (e) => {
  e.preventDefault();
  const usuario = document.getElementById('admin-user').value;
  const senha = document.getElementById('admin-pass').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, senha })
  });

  if (response.ok) {
    window.location.href = '/admin.html'; // Redireciona para a página de admin
  } else {
    alert('Login falhou!');
  }
});

// Consulta
document.getElementById('form-consulta').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nis = document.getElementById('nis').value;
  
  const response = await fetch(`/consulta?nis=${encodeURIComponent(nis)}`);
  const data = await response.json();
  
  const mensagemResultado = document.getElementById('mensagem-resultado');
  mensagemResultado.textContent = data.mensagem;
  mensagemResultado.style.color = data.precisaAtualizar ? 'red' : 'green';
});