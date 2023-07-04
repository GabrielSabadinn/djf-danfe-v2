const express = require('express');

const app = express();

// ...

app.use((request, response, next) => {
  const { nr_chacesso } = request.query;

  const xml = request.body;

  if (!nr_chacesso) {
    return response
      .status(500)
      .json({ message: "Chave de acesso não informada" });
  }

  if (xml.length < 100) {
    return response.status(404).json({ message: "XML da nota é inválido" });
  }

  next();
});

// ...

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
