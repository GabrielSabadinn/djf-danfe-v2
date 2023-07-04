const { unlink } = require("fs");
const { Response, Request } = require("express");
const { xmlToJson } = require("../../../../application/modules/XMLtoPDF/UseCase/xml-to-json");
const { JsonToCTE } = require("../../../../application/modules/XMLtoPDF/UseCase/json-to-cte-use-case");

class DacteController {
  async handle(request, response) {
    try {
      const { nr_chacesso } = request.query;

      const xml = request.body;

      const json = xmlToJson(xml);

      const path = await new JsonToCTE().jsonToPDF(
        json,
        nr_chacesso
      );

      setTimeout(() => {
        return response.download(path, (err) => {
          if (err) {
            console.log("Erro no envio: " + err);
          }

          unlink(path, (error) => {
            if (error) {
              console.log("Erro ao deletar: " + error);
            }
          });
        });
      }, 600);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Erro na requisição " + error });
    }
  }
}

module.exports = { DacteController };
