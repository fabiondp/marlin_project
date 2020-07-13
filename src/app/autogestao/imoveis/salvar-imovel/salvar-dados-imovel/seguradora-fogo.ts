import { BaseViewModel } from "app/shared/base-view-model";
import { Contato } from "app/shared/contato";
import { DadosCobrancaSeguradoraFogo } from "./dados-cobranca-seguradora-fogo";

export class SeguradoraFogo extends BaseViewModel {
    Uid: string;
    Nome: string;
    Email: string;

    Contato: Contato;
    Contatos: Contato[];
    HabilitarEdicao: boolean;

    // DadosCobrancaSeguradoraFogo: DadosCobrancaSeguradoraFogo;

    public static mapList(data): SeguradoraFogo[] {
        if (data != null && Array.isArray(data) && data.length > 0) {
            const seguradoras = [];

            data.forEach(element => {
                const seguradora = new SeguradoraFogo();
                seguradora.map(element);
                seguradoras.push(seguradora);
            });

            return seguradoras;
        }

        return [new SeguradoraFogo()];
    }


    constructor() {
        super();

        this.Contato = new Contato();
        this.Contatos = [new Contato()];

        this.propriedadesNaoEnviaveis = ['HabilitarEdicao', 'Contato', 'Contatos', 'ContatosTelFixo', 'ContatosTelCel', 'propriedadesNaoEnviaveis', 'propriedadesNaoMapeaveis'];
    }

    deleteContato(i) {

    }

    addContato() {
        this.Contatos.push(new Contato());
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

    map(data) {
        super.map(data);

        this.mapTelefone(data);
    }

    mapTelefone(data) {
        this.Contato.mapSimples(data);
    }
}
