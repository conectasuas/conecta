const express = require('express');
const cors = require('cors');
const multer = require('multer');
const XLSX = require('xlsx');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const upload = multer({ storage: multer.memoryStorage() });
let dadosCadastrados = [];

// Rota de login
app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;
  res.json({ success: usuario === 'admin' && senha === '123' });
});

// Rota de upload
app.post('/upload', upload.single('arquivoDados'), (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    dadosCadastrados = jsonData.slice(1).map(linha => ({
      nome: linha[0]?.toString(),
      nis: linha[1]?.toString().trim()
    }));
    
    res.redirect('/admin.html?upload_sucesso=1');
  } catch (error) {
    res.status(500).send('Erro no upload.');
  }
});

// Rota de consulta
app.get('/consulta', (req, res) => {
  const nisQuery = req.query.nis?.trim() || '';
  const precisaAtualizar = dadosCadastrados.some(p => p.nis === nisQuery);
  res.json({ precisaAtualizar, mensagem: precisaAtualizar ? 'Mensagem 1' : 'Mensagem 2' });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor rodando!');
});