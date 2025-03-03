
📌 **Solução:** Remover esse trecho duplicado.

---

### ✅ **Correção do código**
Aqui está o código corrigido e sem erros:

```js
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

 const nis = document.getElementById('nis').value; // Pegamos só o NIS

 try {
   const response = await fetch(`/consulta?nis=${nis}`);
   const data = await response.json(); // Recebemos um JSON

   const mensagemResultado = document.getElementById('mensagem-resultado');

   if (data.encontrado) {
     mensagemResultado.innerHTML = `<strong>Nome:</strong> ${data.nome} <br> <strong>Atenção:</strong> Você deve comparecer ao setor de Cadastro Único para regularização.`;
   } else {
     mensagemResultado.innerHTML = "NIS não encontrado. Verifique e tente novamente.";
   }
 } catch (error) {
   console.error('Erro na consulta:', error);
 }
});
}
