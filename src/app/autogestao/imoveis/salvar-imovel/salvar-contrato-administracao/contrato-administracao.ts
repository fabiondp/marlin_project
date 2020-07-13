import { BaseViewModel } from "app/shared/base-view-model";

export class ContratoAdministracao extends BaseViewModel {
    Uid: string;
    DiaRemessa?: number;
    TaxaIntermediacao: number;
    TaxaAdministracao: number;
    TipoTaxaAdministracao: number;
    ISS: boolean;
    DARFIR: boolean;
    UidImovel: string;

    RegistrarInformacoes: boolean;
    panelInfoBasicasIsOpen: boolean;

    constructor() {
        super();

        this.panelInfoBasicasIsOpen = true;
        this.DiaRemessa = null;
        this.RegistrarInformacoes = false;
        this.TipoTaxaAdministracao = 0;
        this.ISS = false;
        this.DARFIR = false;
    }

    toggleCollapse(keyPanel) {
        if (typeof this[keyPanel] !== 'undefined') {
            this[keyPanel] = !this[keyPanel];
        }
    }

    isEdicao() {
        return (
            this.Uid &&
            this.Uid !== '' &&
            this.Uid !== '00000000-0000-0000-0000-000000000000'
        );
    }

    obterObjetoDeEnvio() {
        const data = {};

        Object.keys(this).forEach(item => {
            if (
                !this.propriedadesNaoEnviaveis.some(pnp => pnp === item)
            ) {
                data[item] = this[item];
            }
        });

        return data;
    }

    map(data) {
        super.map(data);

        this.RegistrarInformacoes = false;
        if (this.possuiInformacaoRegistrada()) {
            this.RegistrarInformacoes = true;
        }

        // this.atualizarTaxaAdministracao();
    }

    possuiInformacaoRegistrada() {
        return this.diaDaRemessaPreenchida()
            || this.taxaIntermediacaoPreenchida()
            || this.taxaAdministracaoPreenchida()
            || this.tipoTaxaAdministracaoPreenchida();
    }

    diaDaRemessaPreenchida() {
        return this.DiaRemessa > 0;
    }

    taxaIntermediacaoPreenchida() {
        return this.TaxaIntermediacao > 0;
    }

    taxaAdministracaoPreenchida() {
        return this.TaxaAdministracao > 0;
    }

    tipoTaxaAdministracaoPreenchida() {
        return this.TipoTaxaAdministracao > 0;
    }

    resetarDados() {
        this.DiaRemessa = null;
        this.TaxaIntermediacao = 0;
        this.TaxaAdministracao = 0;
        this.TipoTaxaAdministracao = 0;
        this.ISS = false;
        this.DARFIR = false;
    }

    atualizarTaxaAdministracao() {
        if (this.TaxaAdministracao && this.TaxaAdministracao > 0) {
            this.TipoTaxaAdministracao = 1;
        } else {
            this.TipoTaxaAdministracao = 0;
        }
    }
}
