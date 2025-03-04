const express = require('express');
const session = require('express-session');
const multer = require('multer');
const XLSX = require('xlsx');
const path = require('path');
const cors = require('cors');

const app = express();

// Configurações básicas
app.use(cors({ origin: 'https://conecta-1.onrender.com', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session Middleware
app.use(session({
  secret: 'segredoSuperSecreto',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Altere para true se usar HTTPS
}));

// Configuração do Multer (upload na memória)
const upload = multer({ storage: multer.memoryStorage() });

// Banco de dados em memória
let dadosCadastrados = [];

// Middleware de autenticação
const authMiddleware = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.status(403).send('Acesso negado!');
  }
};

// Rotas
app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  if (usuario === 'admin' && senha === '123') {
    req.session.isLoggedIn = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

app.post('/upload', authMiddleware, upload.single('arquivoDados'), (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    dadosCadastrados = jsonData.slice(1).map(linha => ({
      nome: linha[0]?.toString() || '',
      nis: linha[1]?.toString().trim() || ''
    }));

    res.redirect('/admin.html?uploadSucesso=1');
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).send('Erro ao processar arquivo.');
  }
});

app.get('/consulta', (req, res) => {
  const nisQuery = req.query.nis?.trim() || '';
  const resultado = dadosCadastrados.some(p => p.nis === nisQuery);
  
  res.json({
    precisaAtualizar: resultado,
    mensagem: resultado 
      ? 'Você deve comparecer ao Cadastro Único para atualização.'
      : 'NIS não encontrado.'
  });
});

app.get('/admin', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});