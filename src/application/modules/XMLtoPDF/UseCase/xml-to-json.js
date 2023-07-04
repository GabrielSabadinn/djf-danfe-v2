const convert = require("xml-js");
const fs = require("fs");
const { filePath } = require("../../../utils/filePath");

function xmlToJson(xml) {
  const options = { compact: true, ignoreComment: true, spaces: 1 };

  fs.writeFile(
    `${filePath}\\xml_exemplo.xml`,
    xml,
    (error) => error && console.log("erro ao gravar o arquivo " + error)
  );

  const result = convert.xml2json(xml, options);

  fs.writeFile(
    `${filePath}\\json_exemplo.json`,
    result,
    (error) => error && console.log("erro ao gravar o arquivo " + error)
  );

  return JSON.parse(result);
}

module.exports = xmlToJson;
