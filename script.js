document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();  

  const titlePost = document.getElementById('title-post').value;
  const bodyPost = document.getElementById('post-content').value;

  if (!titlePost || !bodyPost) {
    alert("Por favor, preencha ambos os campos.");
    return;
  }

  const data = {
    title: titlePost,
    body: bodyPost
  };

  axios.post("http://localhost:3000/salvar", data)
    .then((response) => {
      alert("Post enviado!");
      console.log(response.data);
    })
    .catch((err) => {
      alert("Erro ao enviar o post.");
      console.error(err);
    });
});
