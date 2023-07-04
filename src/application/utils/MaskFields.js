class MaskFields {
  maskCnpj(cnpj) {
    if (cnpj) {
      return cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
    } else {
      return "";
    }
  }

  maskIE(ie) {
    if (ie) {
      return ie.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{4})/, "$1.$2.$3-$4");
    } else {
      return "";
    }
  }

  maskCEP(cep) {
    if (cep) {
      return cep.replace(/^([\d]{2})\.*([\d]{3})-*([\d]{3})/, "$1.$2-$3");
    } else {
      return "";
    }
  }

  maskNumber(number) {
    if (number) {
      return String(
        new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2 }).format(
          Number(number)
        )
      );
    } else {
      return "0,00";
    }
  }

  maskDate(data) {
    if (data) {
      if (data.length > 10)
        return String(new Intl.DateTimeFormat("pt-br").format(new Date(data)));

      return String(
        new Intl.DateTimeFormat("pt-br").format(
          new Date(data.replace(/-/g, "/"))
        )
      );
    } else {
      return "";
    }
  }

  maskTime(data) {
    if (data) {
      if (data.length > 19) data = data.slice(0, 19);

      return String(
        new Intl.DateTimeFormat("pt-br", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(new Date(data))
      );
    } else {
      return "";
    }
  }

  maskDateTime(data) {
    if (data) {
      return String(this.maskDate(data) + " " + this.maskTime(data));
    } else {
      return "";
    }
  }

  maskTelefone(telefone) {
    if (telefone) {
      return telefone.replace(/^(\d{2})(\d{5})(\d{4})/, "($1)$2-$3");
    } else {
      return "";
    }
  }
}

module.exports = { MaskFields };
