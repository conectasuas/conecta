const express = require('express'); 
const multer = require('multer');
const path = require('path');
const XLSX = require('xlsx');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Configuração do Multer
const upload = multer({ storage: multer.memoryStorage() });

// Dados em memória
let dadosCadastrados = [];

// Middleware de autenticação
function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }
  res.status(403).send('Acesso negado');
}

// Rotas
app.get('/consulta', (req, res) => { /* ... código corrigido ... */ });
app.post('/upload', upload.single('arquivoDados'), (req, res) => { /* ... código corrigido ... */ });
app.get('/admin', isAuthenticated, (req, res) => {
  res.send('Bem-vindo à área administrativa!');
});

// Inicialização
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
