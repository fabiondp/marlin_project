import { BaseViewModel } from "app/shared/base-view-model";
import { Contato } from "app/shared/contato";

export class RepresentanteDadosProprietario extends BaseViewModel {
    Uid: string;
    TipoPessoa: number;
    TipoRepresentante: number;
    Nome: string;
    Email: string;
    CPFCNPJ: string;
    Contato: Contato;

    exibirCampos: boolean;
    messagesBusca;
    buscandoPeloCPFCNPJ: boolean;

    constructor() {
        super();

        this.Contato = new Contato();

        this.TipoRepresentante = 0;
        this.TipoPessoa = 0;
        this.exibirCampos = false;

        this.propriedadesNaoEnviaveis = ['exibirCampos', 'Contato', 'Contatos', 'ContatosTelFixo', 'ContatosTelCel', 'propriedadesNaoEnviaveis', 'propriedadesNaoMapeaveis'];
    }

    map(data) {
        if (data) {
            super.map(data);

            this.mapTipoPessoa();

            this.mapTelefone(data);

            if (this.CPFCNPJ != null && this.CPFCNPJ.trim() !== "") {
                this.exibirCampos = true;
            }
        }
    }

    mapTelefone(data) {
        this.Contato.mapSimples(data);
    }

    mapTipoPessoa() {
        if (this.CPFCNPJ) {
            const numerosCpfCnpj = this.CPFCNPJ.replace(/\D/g, '');
            this.TipoPessoa = numerosCpfCnpj.length >= 14 ? 2 : 1;
        }
    }

    isPessoaFisica() {
        return this.TipoPessoa === 1;
    }

    obterDadosParaEnvio() {
        const data = {};

        Object.keys(this).forEach(item => {
            if (
                !this.propriedadesNaoEnviaveis.some(pnp => pnp === item)
            ) {
                data[item] = this[item];
            }
        });

        if (this.CPFCNPJ) {
            data["CPFCNPJ"] = this.CPFCNPJ.replace(/\D/g, '');
        }



        data['Telefone'] = this.Contato.obterObjetoDeEnvioSimples();

        return data;
    }

    resetarDados() {
        this.Uid = '00000000-0000-0000-0000-000000000000';
        this.Nome = null;
        this.Email = null;
    }

    CPFCNPJValido() {
        if (
            this.TipoPessoa > 0 &&
            this.CPFCNPJ !== undefined &&
            this.CPFCNPJ != null &&
            this.CPFCNPJ.trim() !== ''
        ) {
            const numerosCpfCnpj = this.CPFCNPJ.replace(/\D/g, '');
            if (this.TipoPessoa === 1 && numerosCpfCnpj.length >= 11) {
                return true;
            }
            if (this.TipoPessoa === 2 && numerosCpfCnpj.length >= 14) {
                return true;
            }
        }
        return false;
    }

}

