const { resolve } = require("path");

const filePath =
  process.env.CAMINHO_ARQUIVOS || resolve(__dirname, "..", "..", "..", "files");

module.exports = { filePath };
