export function validationMiddleware(request, response, next) {
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

  return next();
}

function validationMiddleware(request, response, next) {
  const { nr_chacesso } = request.query;

  const xml = request.body;

  if (!nr_chacesso) {
    return response
      .status(500)
      .json({ message: "Chave de acesso não informada, por favor informe uma chave de acesso! " });
  }

  if (xml.length < 100) {
    return response.status(404).json({ message: "XML da nota é inválido" });
  }

  return next();
}

module.exports = validationMiddleware;
