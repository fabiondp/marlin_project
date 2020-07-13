import { Endereco } from "app/shared/input-busca-cep/endereco";

export class ProprietarioInformacoesBancarias {
    Uid: string;

    FoiVerificada: boolean;

    Titular: ProprietarioInformacoesBancariasTitular;
    ContaBancaria: ProprietarioInformacoesBancariasContaBancaria;


    private propriedadesNaoPersistentes = ['propriedadesNaoPersistentes', 'Titular', 'ContaBancaria'];

    constructor() {
        this.Titular = new ProprietarioInformacoesBancariasTitular();
        this.ContaBancaria = new ProprietarioInformacoesBancariasContaBancaria();
    }

    obterDadosParaEnvio() {
        const data = {
            Uid: this.Uid,
            Agencia: this.ContaBancaria.Agencia,
            Conta: this.ContaBancaria.Conta,
            TipoConta: this.ContaBancaria.TipoConta,
            NomeTitular: this.Titular.Nome,
            CPFCNPJTitular: this.Titular.CPFCNPJ,
            Banco: this.ContaBancaria.Banco,
            CodigoBanco: this.ContaBancaria.CodigoBanco,
            CodigoBancoEnum: this.ContaBancaria.CodigoBancoEnum
        }

        return data;
    }

    map(data, opcoesBanco?) {
        if (data) {
            Object.keys(data).forEach(item => {
                if (
                    !this.propriedadesNaoPersistentes.some(pnp => pnp === item) &&
                    (data[item] || data[item] !== null)
                ) {
                    this[item] = data[item];
                }
            });

            this.ContaBancaria = new ProprietarioInformacoesBancariasContaBancaria();
            if (data['ContaBancaria']) {
                this.ContaBancaria.map(data['ContaBancaria'], opcoesBanco);
            } else {
                this.ContaBancaria.map(data, opcoesBanco);
            }

            this.Titular = new ProprietarioInformacoesBancariasTitular();
            if (data['Titular']) {
                this.Titular.map(data['Titular']);
            } else {
                this.Titular.Nome = data["NomeTitular"];
                this.Titular.CPFCNPJ = data["CPFCNPJTitular"];
            }
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

export class ProprietarioInformacoesBancariasTitular {
    CPFCNPJ: string;
    Nome: string;
    Email: string;
    Telefone: string;
    TipoPessoa: number;
    Endereco: Endereco;
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



    obterTelefoneDeDadosCadastrais(inforCadastrais) {
        if (inforCadastrais['contatos'] && Array.isArray(inforCadastrais['contatos']) && inforCadastrais['contatos'].length > 0) {
            const contatoCelular = inforCadastrais['contatos'].find(c => c.tipoContato === 'Celular');
            if (contatoCelular != null) {
                return `${contatoCelular['ddd']}${contatoCelular['numero']}`;
            }

            const contatoTelefone = inforCadastrais['contatos'].find(c => c.tipoContato === 'Telefone');
            if (contatoTelefone != null) {
                return `${contatoTelefone['ddd']}${contatoTelefone['numero']}`;
            }
        }

        return null;
    }

    obterEnderecoDeDadosCadastrais(inforCadastrais) {
        if (inforCadastrais['enderecos'] && Array.isArray(inforCadastrais['enderecos']) && inforCadastrais['enderecos'].length > 0) {
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

                return endereco
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

        this.EstaEmEdicao = true;
    }
}

export class ProprietarioInformacoesBancariasContaBancaria {
    Agencia: string;
    Conta: string;
    TipoConta: number;
    OpcoesBanco: any;
    BancoSelecionado: any;
    ExibirCampos: boolean;

    Banco: string;
    CodigoBanco: string = null;
    CodigoBancoEnum: string = null;

    constructor() {
        this.TipoConta = 1;
        this.Banco = null;
    }

    alterarBanco(newValue, opcoes?) {
        if (opcoes) {
            this.OpcoesBanco = opcoes;
        }

        this.Banco = null;

        this.BancoSelecionado = this.OpcoesBanco.find(b => b.CodigoBanco === newValue);

        if (this.BancoSelecionado && this.BancoSelecionado.CodigoBanco > 0) {
            this.Banco = this.BancoSelecionado['Descricao'];
            this.CodigoBanco = this.BancoSelecionado['CodigoBanco'];
            this.CodigoBancoEnum = this.BancoSelecionado['CodigoBanco'];
        } else {
            this.Banco = null;
            this.CodigoBanco = null;
            this.CodigoBancoEnum = this.BancoSelecionado['CodigoBanco'];
        }

        this.ExibirCampos = true;
    }

    obterDadosParaEnvio() {
        const data = {
            Agencia: this.Agencia,
            Conta: this.Conta,
            TipoConta: this.TipoConta,
            Banco: this.Banco,
            CodigoBanco: this.CodigoBanco,
            CodigoBancoEnum: this.CodigoBancoEnum
        };

        return data;
    }

    obterMascara(formato) {
        const result = [];

        if (formato != null) {
            const formatoArray = formato.split("");

            formatoArray.forEach(element => {
                let output = element;

                if (element !== "." && element !== "-") {
                    output = /\d/;
                }

                result.push(output);
            });
        }

        return result;
    }

    map(data, opcoesBanco?) {
        Object.keys(data).forEach(item => {
            if (data[item] || data[item] !== null) {
                this[item] = data[item];
            }
        });

        if (opcoesBanco) {
            this.OpcoesBanco = opcoesBanco;
        }

        if (this.OpcoesBanco) {
            this.BancoSelecionado = this.OpcoesBanco.find(b => b.CodigoBanco === this.CodigoBancoEnum);
            this.ExibirCampos = this.BancoSelecionado != null;
        }

    }
}
