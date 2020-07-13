export class Endereco {
  Logradouro: string;
  Numero: string;
  Complemento: string;
  Bairro: string;
  Cidade: string;
  Estado: string;
  CEP: string;
  possuiEndereco: boolean;

  static map(data) {
    const enderecoInstance = new Endereco();
    enderecoInstance.mapLogradouro(data);
    enderecoInstance.mapBairro(data);
    enderecoInstance.mapCidade(data);
    enderecoInstance.mapEstado(data);
    enderecoInstance.mapCep(data);
    enderecoInstance.mapNumero(data);
    enderecoInstance.mapComplemento(data);
    enderecoInstance.verificarSePossuiEndereco();

    return enderecoInstance;
  }

  mapLogradouro(data) {
    if (data.Logradouro) {
      this.Logradouro = data.Logradouro;
    }
  }

  mapNumero(data) {
    if (data.Numero) {
      this.Numero = data.Numero;
    }
  }

  mapComplemento(data) {
    if (data.Complemento) {
      this.Complemento = data.Complemento;
    }
  }

  mapBairro(data) {
    if (data.Bairro) {
      this.Bairro = data.Bairro;
    }
  }

  mapCidade(data) {
    if (data.Cidade) {
      this.Cidade = data.Cidade;
    }
  }

  mapEstado(data) {
    if (data.Estado) {
      this.Estado = data.Estado;
    }
  }

  mapCep(data) {
    if (data.CEP) {
      this.CEP = data.CEP;
    }
  }

  verificarSePossuiEndereco() {
    this.possuiEndereco = this.CEP != null && this.CEP.trim() !== "" && this.Numero != null && this.Numero.trim() !== "";
  }

  enderecoIgual(endereco: Endereco) {
    return (
      endereco.CEP != null && endereco.CEP.trim() !== ''
      && this.CEP === endereco.CEP
      && this.Logradouro === endereco.Logradouro
      && this.Numero === endereco.Numero
      && this.Complemento === endereco.Complemento
      && this.Bairro === endereco.Bairro
      && this.Cidade === endereco.Cidade
      && this.Estado === endereco.Estado
    );
  }
}
