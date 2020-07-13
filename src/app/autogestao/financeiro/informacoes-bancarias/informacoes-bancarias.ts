import { Endereco } from 'app/shared/input-busca-cep/endereco';

export class InformacoesBancarias {
  Uid: string;
  NomeDescricaoCobranca: string;
  FoiVerificada: boolean;

  Titular: InformacoesBancariasTitular;
  ContaBancaria: InformacoesBancariasContaBancaria;

  private propriedadesNaoPersistentes = [
    'propriedadesNaoPersistentes',
    'Titular',
    'ContaBancaria'
  ];

  constructor() {
    this.Titular = new InformacoesBancariasTitular();
    this.ContaBancaria = new InformacoesBancariasContaBancaria();
  }

  obterDadosParaEnvio() {
    const data = {
      Uid: this.Uid,
      NomeDescricaoCobranca: this.NomeDescricaoCobranca,
      Titular: this.Titular,
      ContaBancaria: this.ContaBancaria.obterDadosParaEnvio()
    };

    data['Titular'].CPFCNPJ = this.Titular.CPFCNPJ.replace(/\D/g, '');

    // console.log("data['Titular'].CPFCNPJ", data['Titular'].CPFCNPJ);

    return data;
  }

  map(data) {
    Object.keys(data).forEach(item => {
      if (
        !this.propriedadesNaoPersistentes.some(pnp => pnp === item) &&
        (data[item] || data[item] !== null)
      ) {
        this[item] = data[item];
      }
    });

    if (data['Titular'] != null) {
      this.Titular.map(data['Titular']);
    }

    if (data['ContaBancaria'] != null) {
      this.ContaBancaria.map(data['ContaBancaria']);
    }
  }

  alteracaoPermitida(): boolean {
    return !this.isEdicao();
  }

  alteracaoBloqueada(): boolean {
    return this.isEdicao();
  }

  alteracaoDeContaPermitida() {
    return !this.isEdicao() || this.FoiVerificada;
  }

  alteracaoDeContaBloqueada() {
    return this.isEdicao() && !this.FoiVerificada;
  }

  public isEdicao() {
    return (
      this.Uid &&
      this.Uid !== '' &&
      this.Uid !== '00000000-0000-0000-0000-000000000000'
    );
  }
}

export class InformacoesBancariasTitular {
  CPFCNPJ: string;
  Nome: string;
  Email: string;
  Telefone: string;
  TipoPessoa: number;
  Endereco: Endereco;
  Responsavel?: InformacoesBancariasTitularResponsavel;
  EstaEmEdicao: boolean;

  constructor() {
    this.TipoPessoa = 1;
    this.CPFCNPJ = null;
    this.Endereco = new Endereco();
  }

  alteracaoPermitida(): boolean {
    return !this.EstaEmEdicao;
  }

  alteracaoBloqueada(): boolean {
    return this.EstaEmEdicao;
  }

  alterarTipoPessoa() {
    this.CPFCNPJ = null;
    this.Responsavel = null;

    if (this.TipoPessoa === 2) {
      this.Responsavel = new InformacoesBancariasTitularResponsavel();
    }
  }

  pessoaFisica(): boolean {
    return this.TipoPessoa === 1;
  }

  pessoaJuridica(): boolean {
    return this.TipoPessoa === 2;
  }

  alterarEndereco(e) {
    if (e !== null && e !== undefined) {
      this.Endereco.Numero = e.Numero;
      this.Endereco.Logradouro = e.Logradouro;
      this.Endereco.Bairro = e.Bairro;
      this.Endereco.Cidade = e.Cidade;
      this.Endereco.Estado = e.Estado;
      this.Endereco.CEP = e.CEP;
      this.Endereco.Complemento = e.Complemento;
    }
  }

  preencherDadosComInformacoesCadastrais(inforCadastrais) {
    this.CPFCNPJ = inforCadastrais['cpfcnpj'];

    if (this.CPFCNPJ != null) {
      this.TipoPessoa = this.CPFCNPJ.length >= 14 ? 2 : 1;
    }

    if (this.TipoPessoa === 2) {
      this.Responsavel = new InformacoesBancariasTitularResponsavel();
    }

    this.Nome = inforCadastrais['nome'];
    this.Email = inforCadastrais['email'];
    this.Telefone = this.obterTelefoneDeDadosCadastrais(inforCadastrais);
    this.Endereco = this.obterEnderecoDeDadosCadastrais(inforCadastrais);
    this.Responsavel = this.Responsavel.preencherDadosComInformacoesCadastrais(
      inforCadastrais
    );
  }

  obterTelefoneDeDadosCadastrais(inforCadastrais) {
    if (
      inforCadastrais['contatos'] &&
      Array.isArray(inforCadastrais['contatos']) &&
      inforCadastrais['contatos'].length > 0
    ) {
      const contatoCelular = inforCadastrais['contatos'].find(
        c => c.tipoContato === 'Celular'
      );
      if (contatoCelular != null) {
        return `${contatoCelular['ddd']}${contatoCelular['numero']}`;
      }

      const contatoTelefone = inforCadastrais['contatos'].find(
        c => c.tipoContato === 'Telefone'
      );
      if (contatoTelefone != null) {
        return `${contatoTelefone['ddd']}${contatoTelefone['numero']}`;
      }
    }

    return null;
  }

  obterEnderecoDeDadosCadastrais(inforCadastrais) {
    if (
      inforCadastrais['enderecos'] &&
      Array.isArray(inforCadastrais['enderecos']) &&
      inforCadastrais['enderecos'].length > 0
    ) {
      const enderecoDadoCadastrais = inforCadastrais['enderecos'][0];
      if (enderecoDadoCadastrais != null) {
        const endereco = new Endereco();
        endereco.CEP = enderecoDadoCadastrais['cep'];
        endereco.Logradouro = enderecoDadoCadastrais['logradouro'];
        endereco.Numero = enderecoDadoCadastrais['numero'];
        endereco.Complemento = enderecoDadoCadastrais['complemento'];
        endereco.Bairro = enderecoDadoCadastrais['bairro'];
        endereco.Cidade = enderecoDadoCadastrais['cidade'];
        endereco.Estado = enderecoDadoCadastrais['estado'];

        return endereco;
      }
    }

    return new Endereco();
  }

  map(data) {
    Object.keys(data).forEach(item => {
      if (data[item] || data[item] !== null) {
        this[item] = data[item];
      }
    });

    if (data['Responsavel'] != null) {
      this.Responsavel = new InformacoesBancariasTitularResponsavel();
      this.Responsavel.map(data['Responsavel']);
    }

    this.EstaEmEdicao = true;
  }
}

export class InformacoesBancariasTitularResponsavel {
  Nome: string;
  CPF: string;

  preencherDadosComInformacoesCadastrais(inforCadastrais) {
    const resultado = new InformacoesBancariasTitularResponsavel();
    resultado.Nome = inforCadastrais['responsavelNome'];

    resultado.CPF = inforCadastrais['responsavelCPF'];

    return resultado;
  }

  map(data) {
    Object.keys(data).forEach(item => {
      if (data[item] || data[item] !== null) {
        this[item] = data[item];
      }
    });
  }
}

export class InformacoesBancariasContaBancaria {
  CodigoBanco: string = null;
  Agencia: string;
  Conta: string;
  TipoConta: number;
  OpcoesBanco: any;
  BancoSelecionado: any;
  ExibirCampos: boolean;

  constructor() {
    this.TipoConta = 1;
  }

  alterarBanco(newValue) {
    this.BancoSelecionado = this.OpcoesBanco.find(
      b => b.CodigoBanco === newValue
    );
    this.ExibirCampos = true;
  }

  obterDadosParaEnvio() {
    const data = {
      CodigoBanco: this.CodigoBanco,
      Agencia: this.Agencia,
      Conta: this.Conta,
      TipoConta: this.TipoConta
    };

    return data;
  }

  obterMascara(formato) {
    const result = [];

    if (formato != null) {
      const formatoArray = formato.split('');

      formatoArray.forEach(element => {
        let output = element;

        if (element !== '.' && element !== '-') {
          output = /\d/;
        }

        result.push(output);
      });
    }

    return result;
  }

  map(data) {
    Object.keys(data).forEach(item => {
      if (data[item] || data[item] !== null) {
        this[item] = data[item];
      }
    });

    this.BancoSelecionado = this.OpcoesBanco.find(
      b => b.CodigoBanco === this.CodigoBanco
    );
    this.ExibirCampos = this.BancoSelecionado != null;
  }
}
