const INfe = {
  nfeProc: INFe,
};

const Ivalor = {
  _text: String,
};

const INFe = {
  NFe: InfePai,
  protNFe: IprotNFe,
};

const InfePai = {
  infNFe: IinfNFe,
  Signature: Isignature,
};

const IinfNFe = {
  ide: Iide,
  emit: Iemit,
  dest: Idest,
  entrega: Ientrega,
  det: Idet,
  total: Itotal,
  transp: Itransp,
  cobr: ICobr,
  pag: Ipag,
  infAdic: IInfAdic,
};

const IInfAdic = {
  infAdFisco: Ivalor,
  infCpl: Ivalor,
  obsCont: Ivalor,
  obsFisco: Ivalor,
  procRef: Ivalor,
};

const ICobr = {
  fat: Ifatura,
  dup: Iduplicata,
};

const Ifatura = {
  nFat: Ivalor,
  vOrig: Ivalor,
  vDesc: Ivalor,
  vLiq: Ivalor,
};

const Iduplicata = {
  nDup: Ivalor,
  dVenc: Ivalor,
  vDup: Ivalor,
};

const IprotNFe = {
  infProt: IinfProt,
};

const IinfProt = {
  tpAmb: Ivalor,
  verAplic: Ivalor,
  chNFe: Ivalor,
  chCTe: Ivalor,
  dhRecbto: Ivalor,
  nProt: Ivalor,
  digVal: Ivalor,
  cStat: Ivalor,
  xMotivo: Ivalor,
};

const Isignature = {
  SignedInfo: IsignedInfo,
  SignatureValue: Ivalor,
  KeyInfo: IkeyInfo,
};

const IsignedInfo = {
  CanonicalizationMethod: Ivalor,
  SignatureMethod: Ivalor,
  Reference: Ireference,
};

const Ireference = {
  Transforms: Ivalor,
  DigestMethod: Ivalor,
  DigestValue: Ivalor,
};

const IkeyInfo = {
  X509Data: Ix509Data,
};

const Ix509Data = {
  X509Certificate: Ivalor,
};

const Itotal = {
  ICMSTot: IcmsTot,
};

const Ipag = {
  detPag: IdetPag,
};

const IdetPag = {
  indPag: Ivalor,
  tPag: Ivalor,
  xPag: Ivalor,
  vPag: Ivalor,
};

const Itransp = {
  modFrete: Ivalor,
  transporta: ITransporta,
  veicTransp: IveicTransp,
  vol: Ivol,
};

const ITransporta = {
  CNPJ: Ivalor,
  xNome: Ivalor,
  IE: Ivalor,
  xEnder: Ivalor,
  xMun: Ivalor,
  UF: Ivalor,
};

const IveicTransp = {
  placa: Ivalor,
  UF: Ivalor,
};

const Ivol = {
  qVol: Ivalor,
  esp: Ivalor,
  pesoL: Ivalor,
  pesoB: Ivalor,
  marca: Ivalor,
};

const IcmsTot = {
  vBC: Ivalor,
  vII: Ivalor,
  vICMS: Ivalor,
  vICMSDeson: Ivalor,
  vICMSUFDest: Ivalor,
  vICMSUFRemet: Ivalor,
  vTotTrib: Ivalor,
  vFCP: Ivalor,
  vBCST: Ivalor,
  vST: Ivalor,
  vFCPST: Ivalor,
  vFCPSTRet: Ivalor,
  vProd: Ivalor,
  vFrete: Ivalor,
  vSeg: Ivalor,
  vDesc: Ivalor,
  vIPI: Ivalor,
  vIPIDevol: Ivalor,
  vPIS: Ivalor,
  vCOFINS: Ivalor,
  vOutro: Ivalor,
  vNF: Ivalor,
  vServ: Ivalor,
};

const Idet = {
  prod: Iprod,
  imposto: Iimposto,
};

const Iimposto = {
  ICMS: Iicms,
  II: Iimportacao,
  IPI: Iipi,
  PIS: Ipis,
  COFINS: Iconfins,
};

const Iimportacao = {
  vII: Ivalor,
};

const Ipis = {
  PISOutr: IpisOutr,
};

const IpisOutr = {
  CST: Ivalor,
  vBC: Ivalor,
  pPIS: Ivalor,
  vPIS: Ivalor,
};

const Iconfins = {
  COFINSOutr: IconfinsOutr,
};

const IconfinsOutr = {
  CST: Ivalor,
  vBC: Ivalor,
  pCOFINS: Ivalor,
  vCOFINS: Ivalor,
};

const Iipi = {
  cEnq: Ivalor,
  IPITrib: Ipitrib,
};

const Ipitrib = {
  CST: Ivalor,
  vBC: Ivalor,
  pIPI: Ivalor,
  vIPI: Ivalor,
};

const Iicms = {
  ICMSgenerico: Icms_generico,
};

const Icms_generico = {
  orig: Ivalor,
  CST: Ivalor,
  modBC: Ivalor,
  pRedBC: Ivalor,
  vBC: Ivalor,
  pICMS: Ivalor,
  vICMS: Ivalor,
  pICMSST: Ivalor,
  vICMSST: Ivalor,
};

const Iprod = {
  cProd: Ivalor,
  cEAN: Ivalor,
  xProd: Ivalor,
  NCM: Ivalor,
  CEST: Ivalor,
  indEscala: Ivalor,
  CFOP: Ivalor,
  uCom: Ivalor,
  qCom: Ivalor,
  vUnCom: Ivalor,
  vProd: Ivalor,
  cEANTrib: Ivalor,
  uTrib: Ivalor,
  qTrib: Ivalor,
  vUnTrib: Ivalor,
  indTot: Ivalor,
  vFrete: Ivalor,
  vSeg: Ivalor,
  vDesc: Ivalor,
};

const Ientrega = {
  CNPJ: Ivalor,
  xNome: Ivalor,
  xLgr: Ivalor,
  nro: Ivalor,
  xBairro: Ivalor,
  cMun: Ivalor,
  xMun: Ivalor,
  UF: Ivalor,
  CEP: Ivalor,
  fone: Ivalor,
};

const Idest = {
  CNPJ: Ivalor,
  xNome: Ivalor,
  indIEDest: Ivalor,
  IE: Ivalor,
  email: Ivalor,
};

const Iemit = {
  CNPJ: Ivalor,
  xNome: Ivalor,
  xFant: Ivalor,
  enderEmit: IenderEmit,
  IE: Ivalor,
  IM: Ivalor,
  CRT: Ivalor,
};

const IenderEmit = {
  xLgr: Ivalor,
  nro: Ivalor,
  xBairro: Ivalor,
  cMun: Ivalor,
  xMun: Ivalor,
  UF: Ivalor,
  CEP: Ivalor,
  fone: Ivalor,
};

const Iide = {
  cUF: Ivalor,
  cNF: Ivalor,
  natOp: Ivalor,
  mod: Ivalor,
  serie: Ivalor,
  nNF: Ivalor,
  dhEmi: Ivalor,
  tpNF: Ivalor,
  idDest: Ivalor,
  cMunFG: Ivalor,
  tpImp: Ivalor,
  tpEmis: Ivalor,
  cDV: Ivalor,
  tpAmb: Ivalor,
  finNFe: Ivalor,
  indFinal: Ivalor,
  indPres: Ivalor,
  procEmi: Ivalor,
  verProc: Ivalor,
};
