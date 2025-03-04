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

// Rotas
app.get('/consulta', (req, res) => { /* ... código corrigido ... */ });
app.post('/upload', upload.single('arquivoDados'), (req, res) => { /* ... código corrigido ... */ });
app.get('/admin', is Authenticated, (req, res) => { /* ... código corrigido ... */ });

// Inicialização
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});