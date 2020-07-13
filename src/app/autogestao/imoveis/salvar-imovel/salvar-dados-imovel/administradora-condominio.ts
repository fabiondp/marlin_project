import { BaseViewModel } from "app/shared/base-view-model";
import { Contato } from "app/shared/contato";
import { DadosCobrancaCondominio } from "./dados-cobranca-condominio";

export class AdministradoraCondominio extends BaseViewModel {
    Nome: string;
    Email: string;

    Contato: Contato;
    Contatos: Contato[];
    ContatosTelFixo: any[];
    ContatosTelCel: any[];

    MesVencimento: string;
    Parcelas: number;
    Uid: string;

    HabilitarEdicao: boolean;

    public static mapList(data): AdministradoraCondominio[] {
        if (data != null && Array.isArray(data) && data.length > 0) {
            const taxas = [];

            data.forEach(element => {
                const taxa = new AdministradoraCondominio();
                taxa.map(element);
                taxas.push(taxa);
            });

            return taxas;
        }

        return [new AdministradoraCondominio()];
    }

    // DadosCobrancaCondominio: DadosCobrancaCondominio;

    constructor() {
        super();
        this.Nome = "";

        this.Contato = new Contato();
        this.Contatos = [new Contato()];

        this.propriedadesNaoEnviaveis = ['HabilitarEdicao', 'Contato', 'Contatos', 'ContatosTelFixo', 'ContatosTelCel', 'propriedadesNaoEnviaveis', 'propriedadesNaoMapeaveis'];
    }

    deleteContato(i) {

    }

    addContato() {
        this.Contatos.push(new Contato());
    }

    obterObjetoParaEnvio() {
        if (this.possuiPropriedadePreenchida()) {
            const data = {};

            Object.keys(this).forEach(item => {
                if (
                    !this.propriedadesNaoEnviaveis.some(pnp => pnp === item)
                ) {
                    data[item] = this[item];
                }
            });

            data['Telefone'] = this.Contato.obterObjetoDeEnvioSimples();

            return data;
        }

        return null;
    }

    possuiPropriedadePreenchida() {
        return this.possuiNome() || this.possuiEmail() || this.possuiTelefone();
    }

    possuiNome(): boolean {
        return this.Nome != null && this.Nome.trim() !== "";
    }

    possuiEmail(): boolean {
        return this.Email != null && this.Email.trim() !== "";
    }

    possuiTelefone(): boolean {
        return this.Contato != null && this.Contato.Telefone != null && this.Contato.Telefone.trim() !== "";
    }

    isEdicao() {
        return (
            this.Uid &&
            this.Uid !== '' &&
            this.Uid !== '00000000-0000-0000-0000-000000000000'
        );
    }

    permitirEdicao() {
        this.HabilitarEdicao = true;
    }

    map(data) {
        super.map(data);

        this.mapTelefone(data);
    }

    mapTelefone(data) {
        this.Contato.mapSimples(data);
    }
}
