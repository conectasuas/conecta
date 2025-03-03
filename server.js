// server.js




// 1. Importações
const express = require('express');         // Framework para criar servidor web
const multer = require('multer');           // Biblioteca para receber uploads de arquivo
const path = require('path');               // Para manipular caminhos de arquivos
const XLSX = require('xlsx');

// 2. Criando a aplicação Express
const app = express();

// 3. Definindo a porta do servidor
const PORT = process.env.PORT || 3000;

// 4. Definindo a pasta de arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// 5. Configurando Multer para salvar arquivos na pasta 'uploads'
const upload = multer({ dest: 'uploads/' });

// 6. Variável para armazenar os dados do CSV (em memória)
let dadosCadastrados = [];

// 7. Rota de teste (opcional, para verificar se o servidor está OK)
app.get('/teste', (req, res) => {
  res.send('Rota de teste funcionando!');
});

// 8. Rota para receber upload do arquivo CSV
//    Campo do form deve se chamar 'arquivoDados' (igual em admin.html)
app.post('/upload', upload.single('arquivoDados'), (req, res) => {
  // 1. O arquivo XLSX que o admin mandou está em req.file.path
  const filePath = req.file.path;

  // 2. Ler o arquivo XLSX usando a biblioteca
  const workbook = XLSX.readFile(filePath);

  // 3. Pegar o nome da primeira “aba” (Sheet) do Excel
  const sheetName = workbook.SheetNames[0];

  // 4. Pegar a planilha (worksheet) em si
  const worksheet = workbook.Sheets[sheetName];

  // 5. Transformar a planilha em um array usando “sheet_to_json” com { header: 1 }
  //    - “header: 1” faz cada linha virar um array de dados, 
  //      por exemplo, primeira linha vira [“nome”, “nis”], 
  //      segunda linha vira [“João da Silva”, “1234”], etc.
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // 6. Vamos criar um array temporário para guardar { nome, nis }
  const resultados = [];

  // Pulamos a linha 0, porque é o cabeçalho
  // Começamos do i=1 para ler dados de fato
  for (let i = 1; i < jsonData.length; i++) {
    const linha = jsonData[i]; // Exemplo: [“João da Silva”, “1234”]

    if (linha.length >= 2) {
      const nome = linha[0];  // “João da Silva”
      const nis = linha[1];   // “1234”

      resultados.push({ nome, nis });
    }
  }

  // 7. Salvar esses dados numa variável global ou onde você quiser, tipo:
  dadosCadastrados = resultados;

  // 8. Mostra no console pra ter certeza
  console.log("Dados do XLSX carregados:", dadosCadastrados);

  // 9. Redireciona pra página de admin, dizendo que deu tudo certo
  res.redirect('/admin.html?upload_sucesso=1');
});


// 9. Rota de consulta (chamada pela página index.html via fetch ou formulário)
app.get('/consulta', (req, res) => {
  // Recebemos o nome e nis da query string (URL)...
  const nomeQuery = (req.query.nome || '').toLowerCase().trim();
  const nisQuery = (req.query.nis || '').trim();

  // Procurar nos dadosCadastrados se existe algum registro com
  // nome e nis compatíveis
  const encontrado = dadosCadastrados.find((pessoa) => {
    // Usamos toLowerCase() para comparar sem levar em conta maiúsculas/minúsculas
    const nomeCadastrado = pessoa.nome.toLowerCase().trim();
    const nisCadastrado = String(pessoa.nis).trim();

    return (nomeCadastrado === nomeQuery && nisCadastrado === nisQuery);
  });

  // Se encontrar, significa que precisa atualizar
  if (encontrado) {
    res.send('Você precisa atualizar seu cadastro! Compareça ao Setor de Cadastro Único.');
  } else {
    // Se não encontrar, está atualizado
    res.send('Seu cadastro está atualizado!');
  }
});

// 10. Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}. Acesse http://localhost:${PORT}`);
});
