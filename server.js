const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

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

app.get('/posts', (req, res) => {
  let posts = [];
  try {
    posts = JSON.parse(fs.readFileSync('datas.json', 'utf8'));
  } catch (err) {
    posts = [];
  }

  let validPosts = posts.filter(post => post && post.title && post.body);

  let html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Blog</title>
      <!-- Link para o Bootstrap -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body class="bg-light">
      <div class="container mt-5">
        <h1 class="text-center mb-4">Posts do Blog</h1>
        <div class="row">
  `;

  validPosts.forEach(post => {
    html += `
      <div class="col-md-4">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.body}</p>
          </div>
        </div>
      </div>
    `;
  });

  html += `
        </div>
      </div>
    </body>
    </html>
  `;

  res.send(html);
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
