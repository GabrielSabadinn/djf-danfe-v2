const { IDaCte, IinfNFe, Icms_generico } = require("../../interfaces/ICte");
const { MaskFields } = require("../../../utils/MaskFields");
const { filePath } = require("../../../utils/filePath");

class JsonToCTE {
  returnICMS(imposto) {
    let tipoIcms = JSON.stringify(imposto).substring(2, 8);

    return {
      ICMS00: imposto.ICMS00,
      ICMS20: imposto.ICMS20,
      ICMS45: imposto.ICMS45,
      ICMS60: imposto.ICMS60,
      ICMS90: imposto.ICMS90,
      ICMSSN: imposto.ICMSSN,
      ICMSOu: imposto.ICMSOutraUF,
    }[tipoIcms];
  }

  montaObservacao(obs, obs2) {
    let result = "";

    if (obs) {
      result = obs;
    }

    if (Array.isArray(obs2)) {
      obs2.forEach((item) => {
        result += " " + item.xTexto._text;
      });
    } else if (obs2) {
      result += obs2.xTexto._text;
    }

    return result;
  }

  async jsonToPDF(json, nr_chacesso) {
    const maskFields = new MaskFields();

    var fs = require("fs");
    var danfe_roma = require("../../pdf_generator/danfe-dacte/app");
    var Gerador = danfe_roma.Gerador;
    var Danfe = danfe_roma.Danfe;
    var Emitente = danfe_roma.Emitente;
    var Destinatario = danfe_roma.Destinatario;
    var Transportador = danfe_roma.Transportador;
    var Endereco = danfe_roma.Endereco;
    var Protocolo = danfe_roma.Protocolo;
    var Impostos = danfe_roma.Impostos;
    var Item = danfe_roma.Item;
    var CteInfo = danfe_roma.CteInfo;
    var Expeditor = danfe_roma.Expeditor;
    var Recebedor = danfe_roma.Recebedor;
    var pathDoArquivoPdf = `${filePath}/${nr_chacesso}.pdf`;

    var cteInfo = new CteInfo();
    cteInfo.comTpCte(json.cteProc?.CTe?.infCte?.ide?.tpCTe?._text);
    cteInfo.comTpServ(json.cteProc?.CTe?.infCte.ide?.tpServ?._text);

    if (json.cteProc?.CTe?.infCte.ide?.toma3?.toma?._text) {
      cteInfo.comToma(json.cteProc?.CTe?.infCte?.ide?.toma3?.toma?._text);
    } else {
      cteInfo.comToma("4");
    }
    cteInfo.comModalFrete(json.cteProc?.CTe?.infCte.ide.modal?._text);
    cteInfo.comCfopFrete(
      json.cteProc?.CTe?.infCte.ide.CFOP?._text +
        " - " +
        json.cteProc?.CTe?.infCte.ide.natOp?._text
    );
    cteInfo.comInicioPrestacao(
      String(
        json.cteProc?.CTe?.infCte.ide.xMunIni._text +
          " - " +
          json.cteProc?.CTe?.infCte.ide.UFIni?._text
      )
    );
    cteInfo.comFimPrestacao(
      String(
        json.cteProc?.CTe?.infCte.ide.xMunFim._text +
          " - " +
          json.cteProc?.CTe?.infCte.ide.UFFim?._text
      )
    );
    cteInfo.comCnpj(json.cteProc?.CTe?.infCte.emit.CNPJ._text);
    cteInfo.comIE(json.cteProc?.CTe?.infCte.emit.IE._text);
    cteInfo.comRemetente(json.cteProc?.CTe?.infCte.emit.xNome._text);
    cteInfo.comEnderecoEmitente(
      new Endereco()
        .comLogradouro(json.cteProc?.CTe?.infCte.emit.enderEmit.xLgr._text)
        .comNumero(json.cteProc?.CTe?.infCte.emit.enderEmit.nro._text)
        .comBairro(json.cteProc?.CTe?.infCte.emit.enderEmit.xBairro._text)
        .comMunicipio(json.cteProc?.CTe?.infCte.emit.enderEmit.xMun._text)
        .comUf(json.cteProc?.CTe?.infCte.emit.enderEmit.UF._text)
        .comCep(json.cteProc?.CTe?.infCte.emit.enderEmit.CEP._text)
    );
    cteInfo.comDestinatario(json.cteProc?.CTe?.infCte.dest.xNome._text);
    cteInfo.comEnderecoDestinatario(
      new Endereco()
        .comLogradouro(json.cteProc?.CTe?.infCte.dest.enderDest.xLgr._text)
        .comNumero(json.cteProc?.CTe?.infCte.dest.enderDest.nro._text)
        .comBairro(json.cteProc?.CTe?.infCte.dest.enderDest.xBairro._text)
        .comMunicipio(json.cteProc?.CTe?.infCte.dest.enderDest.xMun._text)
        .comUf(json.cteProc?.CTe?.infCte.dest.enderDest.UF._text)
        .comCep(json.cteProc?.CTe?.infCte.dest.enderDest.CEP._text)
    );

    cteInfo.comTransportador(json.cteProc?.CTe?.infCte.vPrest?._text);

    cteInfo.comExpedidor(json.cteProc?.CTe?.infCte.vRec?._text);

    cteInfo.comRecebedor(json.cteProc?.CTe?.infCte.versao?._text);

    var cte = new Gerador()
      .comPapel("A4")
      .comDanfe(new Danfe(cteInfo))
      .comChave(
        json.cteProc?.CTe?.infCte.ide.cCT?._text +
          json.cteProc?.CTe?.infCte.ide.cUF?._text +
          json.cteProc?.CTe?.infCte.ide.dhEmi?._text +
          json.cteProc?.CTe?.infCte.ide.tpEmis?._text +
          json.cteProc?.CTe?.infCte.ide.cCT?._text
      )
      .comEmissor(
        new Emitente()
          .comNome(json.cteProc?.CTe?.infCte.emit.xNome._text)
          .comEndereco(
            new Endereco()
              .comLogradouro(json.cteProc?.CTe?.infCte.emit.enderEmit.xLgr._text)
              .comNumero(json.cteProc?.CTe?.infCte.emit.enderEmit.nro._text)
              .comBairro(json.cteProc?.CTe?.infCte.emit.enderEmit.xBairro._text)
              .comMunicipio(json.cteProc?.CTe?.infCte.emit.enderEmit.xMun._text)
              .comUf(json.cteProc?.CTe?.infCte.emit.enderEmit.UF._text)
              .comCep(json.cteProc?.CTe?.infCte.emit.enderEmit.CEP._text)
          )
      )
      .comRemetente(
        new Remetente().comNome(json.cteProc?.CTe?.infCte.emit.xNome._text)
      )
      .comDestinatario(
        new Destinatario().comNome(json.cteProc?.CTe?.infCte.dest.xNome._text)
      )
      .comTransportador(
        new Transportador()
          .comNome(json.cteProc?.CTe?.infCte.vPrest?._text)
          .comEndereco(
            new Endereco()
              .comLogradouro(json.cteProc?.CTe?.infCte.dest.enderDest.xLgr._text)
              .comNumero(json.cteProc?.CTe?.infCte.dest.enderDest.nro._text)
              .comBairro(json.cteProc?.CTe?.infCte.dest.enderDest.xBairro._text)
              .comMunicipio(json.cteProc?.CTe?.infCte.dest.enderDest.xMun._text)
              .comUf(json.cteProc?.CTe?.infCte.dest.enderDest.UF._text)
              .comCep(json.cteProc?.CTe?.infCte.dest.enderDest.CEP._text)
          )
      )
      .comValoresCobrados(
        new Impostos()
          .comValorPrestacao(json.cteProc?.CTe?.infCte.vPrest?._text)
          .comValorImposto(json.cteProc?.CTe?.infCte.vRec?._text)
      )
      .comInformacoesComplementares(json.cteProc?.CTe?.infCte.versao?._text)
      .comProtocoloAutorizacao(json.cteProc?.protCTe.infProt.nProt._text)
      .comDataHoraAutorizacao(json.cteProc?.protCTe.infProt.dhRecbto._text)
      .comUrlConsulta(
        "https://www.sefaz.rs.gov.br/ASP/AAE_ROOT/NFE/SAT-WEB-NFE-NFC_qIWGhN.nfe?chaveConsulta=" +
          json.cteProc?.protCTe.infProt.chCTe._text
      );

    return cte;
  } catch (error) {
    console.log(error);
    return null;
  }
};
function parseXmlAndGenerateCte(xml) {
  try {
    const json = convert.xml2json(xml, { compact: true, spaces: 4 });
    const cte = generateCteObjectFromJson(json);
    return cte;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Example usage
const xml = "<xml>...</xml>"; // Replace with the actual XML content
const cte = parseXmlAndGenerateCte(xml);
if (cte) {
  console.log(cte); // Output the generated CT-e object
} else {
  console.log("Failed to parse XML and generate CT-e object");
}