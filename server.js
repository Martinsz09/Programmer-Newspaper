const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware deve vir antes das rotas
app.use(cors());
app.use(express.json());

app.post('/salvar', (req, res) => {
  const newPost = req.body;

  console.log("Post recebido:", newPost);

  if (!newPost.title || !newPost.body) {
    return res.status(400).send({ mensagem: 'Faltando título ou conteúdo.' });
  }

  let posts = [];
  try {
    posts = JSON.parse(fs.readFileSync('datas.json', 'utf8'));
  } catch (err) {
    posts = [];
  }

  posts.push(newPost);

  fs.writeFileSync('datas.json', JSON.stringify(posts, null, 2));

  res.send({ mensagem: 'Post salvo com sucesso!', dados: newPost });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
