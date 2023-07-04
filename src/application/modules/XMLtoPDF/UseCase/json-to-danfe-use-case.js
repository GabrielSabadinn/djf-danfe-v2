const { filePath } = require("../../../utils/filePath");
const { MaskFields } = require("../../../utils/MaskFields");

class JsonToDanfe {
  find_ICMS_prod(imposto) {
    let tipoIcms = JSON.stringify(imposto).substring(2, 8);

    return {
      ICMS00: imposto.ICMS00,
      ICMS10: imposto.ICMS10,
      ICMS30: imposto.ICMS30,
      ICMS40: imposto.ICMS40,
      ICMS51: imposto.ICMS51,
      ICMS60: imposto.ICMS60,
      ICMS70: imposto.ICMS70,
      ICMS90: imposto.ICMS90,
      ICMS20: imposto.ICMS20,
    }[tipoIcms];
  }

  async jsonToPDF(json, nr_chacesso) {
    const maskFields = new MaskFields();

    var fs = require("fs"),
      danfe_roma = require("../../pdf_generator/danfe-dacte/app"),
      Gerador = danfe_roma.Gerador,
      Danfe = danfe_roma.Danfe,
      Emitente = danfe_roma.Emitente,
      Destinatario = danfe_roma.Destinatario,
      Transportador = danfe_roma.Transportador,
      Endereco = danfe_roma.Endereco,
      Protocolo = danfe_roma.Protocolo,
      Impostos = danfe_roma.Impostos,
      Volumes = danfe_roma.Volumes,
      Item = danfe_roma.Item,
      Duplicata = danfe_roma.Duplicata,
      Fatura = danfe_roma.Fatura,
      pathDoArquivoPdf = `${filePath}/${nr_chacesso}.pdf`;

    var emitente = new Emitente();
    emitente.comNome(json.nfeProc?.NFe.infNFe.emit.xNome._text);
    emitente.comRegistroNacional(
      maskFields.maskCnpj(json.nfeProc?.NFe.infNFe.emit.CNPJ._text)
    );
    emitente.comInscricaoEstadual(json.nfeProc?.NFe.infNFe.emit.IE._text);
    emitente.comTelefone(json.nfeProc?.NFe.infNFe.emit?.enderEmit?.fone._text);
    emitente.comEmail(json.nfeProc?.NFe.infNFe.emit?.enderEmit?.email._text);

    emitente.comEndereco(
      new Endereco()
        .comLogradouro(json.nfeProc?.NFe.infNFe.emit.enderEmit.xLgr._text)
        .comNumero(`N°${json.nfeProc?.NFe.infNFe.emit.enderEmit.nro._text}`)
        .comComplemento(json.nfeProc?.NFe.infNFe.emit.enderEmit.xCpl._text)
        .comCep(maskFields.maskCEP(json.nfeProc?.NFe.infNFe.emit.enderEmit.CEP._text))
        .comBairro(json.nfeProc?.NFe.infNFe.emit.enderEmit.xBairro._text)
        .comMunicipio(json.nfeProc?.NFe.infNFe.emit.enderEmit?.xMun._text)
        .comCidade(json.nfeProc?.NFe.infNFe.emit.enderEmit.xMun._text)
        .comEstado(json.nfeProc?.NFe.infNFe.emit.enderEmit.UF._text)
    );

    var destinatario = new Destinatario();
    destinatario.comNome(json.nfeProc?.NFe.infNFe.dest.xNome._text);
    destinatario.comRegistroNacional(
      maskFields.maskCpfCnpj(json.nfeProc?.NFe.infNFe.dest.CNPJ._text)
    );
    destinatario.comTelefone(json.nfeProc?.NFe.infNFe.dest?.enderDest?.fone._text);

    destinatario.comEndereco(
      new Endereco()
        .comLogradouro(json.nfeProc?.NFe.infNFe.dest.enderDest.xLgr._text)
        .comNumero(`N°${json.nfeProc?.NFe.infNFe.dest.enderDest.nro._text}`)
        .comComplemento(json.nfeProc?.NFe.infNFe.dest.enderDest.xCpl._text)
        .comCep(maskFields.maskCEP(json.nfeProc?.NFe.infNFe.dest.enderDest.CEP._text))
        .comBairro(json.nfeProc?.NFe.infNFe.dest.enderDest.xBairro._text)
        .comMunicipio(json.nfeProc?.NFe.infNFe.dest.enderDest?.xMun._text)
        .comCidade(json.nfeProc?.NFe.infNFe.dest.enderDest?.xMun._text)
        .comEstado(json.nfeProc?.NFe.infNFe.dest.enderDest.UF._text)
    );

    var transportador = new Transportador();
    transportador.comNome(json.nfeProc?.NFe.infNFe.transp?.transporta.xNome._text);
    transportador.comRegistroNacional(
      maskFields.maskCpfCnpj(json.nfeProc?.NFe.infNFe.transp?.transporta.CPF._text) ||
        maskFields.maskCpfCnpj(json.nfeProc?.NFe.infNFe.transp?.transporta.CNPJ._text)
    );
    transportador.comEndereco(
      new Endereco()
        .comLogradouro(json.nfeProc?.NFe.infNFe.transp?.transporta.enderT?.xLgr._text)
        .comNumero(`N°${json.nfeProc?.NFe.infNFe.transp?.transporta.enderT?.nro._text}`)
        .comComplemento(json.nfeProc?.NFe.infNFe.transp?.transporta.enderT?.xCpl._text)
        .comCep(
          maskFields.maskCEP(json.nfeProc?.NFe.infNFe.transp?.transporta.enderT?.CEP._text)
        )
        .comBairro(json.nfeProc?.NFe.infNFe.transp?.transporta.enderT?.xBairro._text)
        .comMunicipio(json.nfeProc?.NFe.infNFe.transp?.transporta.enderT?.xMun._text)
        .comCidade(json.nfeProc?.NFe.infNFe.transp?.transporta.enderT?.xMun._text)
        .comEstado(json.nfeProc?.NFe.infNFe.transp?.transporta.enderT?.UF._text)
    );

    var volumes = new Volumes();
    volumes.comQuantidade(json.nfeProc?.NFe.infNFe.transp?.vol?.qVol._text);
    volumes.comEspecie(json.nfeProc?.NFe.infNFe.transp?.vol?.esp._text);
    volumes.comMarca(json.nfeProc?.NFe.infNFe.transp?.vol?.marca._text);
    volumes.comNumeracao(json.nfeProc?.NFe.infNFe.transp?.vol?.nVol._text);
    volumes.comPesoLiquido(json.nfeProc?.NFe.infNFe.transp?.vol?.pesoL._text);
    volumes.comPesoBruto(json.nfeProc?.NFe.infNFe.transp?.vol?.pesoB._text);

    var transporte = new Transporte();
    transporte.comModalidadeFrete(json.nfeProc?.NFe.infNFe.transp?.modFrete._text);
    transporte.comTransportador(transportador);
    transporte.comVolumes(volumes);

    var identificacao = new Identificacao();
    identificacao.comNaturezaOperacao(json.nfeProc?.NFe.infNFe.ide.natOp._text);
    identificacao.comNumero(json.nfeProc?.NFe.infNFe.ide.nNF._text);
    identificacao.comSerie(json.nfeProc?.NFe.infNFe.ide.serie._text);
    identificacao.comDataEmissao(json.nfeProc?.NFe.infNFe.ide.dhEmi._text);
    identificacao.comTipoOperacao(json.nfeProc?.NFe.infNFe.ide.tpNF._text);

    var produtos = [];
    if (json.nfeProc?.NFe.infNFe.det.length) {
      for (let i = 0; i < json.nfeProc?.NFe.infNFe.det.length; i++) {
        var produto = new Produto();
        produto.comCodigo(json.nfeProc?.NFe.infNFe.det[i].prod.cProd._text);
        produto.comDescricao(json.nfeProc?.NFe.infNFe.det[i].prod.xProd._text);
        produto.comCodigoBarras(json.nfeProc?.NFe.infNFe.det[i].prod.cEAN._text);
        produto.comUnidade(json.nfeProc?.NFe.infNFe.det[i].prod.uCom._text);
        produto.comQuantidade(json.nfeProc?.NFe.infNFe.det[i].prod.qCom._text);
        produto.comValorUnitario(json.nfeProc?.NFe.infNFe.det[i].prod.vUnCom._text);
        produto.comValorTotal(json.nfeProc?.NFe.infNFe.det[i].prod.vProd._text);

        produtos.push(produto);
      }
    } else {
      var produto = new Produto();
      produto.comCodigo(json.nfeProc?.NFe.infNFe.det.prod.cProd._text);
      produto.comDescricao(json.nfeProc?.NFe.infNFe.det.prod.xProd._text);
      produto.comCodigoBarras(json.nfeProc?.NFe.infNFe.det.prod.cEAN._text);
      produto.comUnidade(json.nfeProc?.NFe.infNFe.det.prod.uCom._text);
      produto.comQuantidade(json.nfeProc?.NFe.infNFe.det.prod.qCom._text);
      produto.comValorUnitario(json.nfeProc?.NFe.infNFe.det.prod.vUnCom._text);
      produto.comValorTotal(json.nfeProc?.NFe.infNFe.det.prod.vProd._text);

      produtos.push(produto);
    }

    var nfe = new NFe();
    nfe.comEmitente(emitente);
    nfe.comDestinatario(destinatario);
    nfe.comTransporte(transporte);
    nfe.comIdentificacao(identificacao);
    nfe.comProdutos(produtos);

    return nfe;
  }

  processarJson(json, nr_chacesso) {
    var danfe = new Danfe();
    var nfe = this.jsonToPDF(json, nr_chacesso);
    danfe.addNFe(nfe);

    danfe.salvar(pathDoArquivoPdf, (erros) => {
      if (erros) {
        console.log(erros);
      } else {
        console.log(`PDF gerado em: ${pathDoArquivoPdf}`);
      }
    });
  }
}

module.exports = JsonToDanfe;
