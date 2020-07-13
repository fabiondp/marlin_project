import { conformToMask } from "text-mask-core";
import { BaseViewModel } from "app/shared/base-view-model";

export class Contato extends BaseViewModel {
    regexPadraoTelefoneGenerico = /\(?\d{2}\)?\s?[1-9]{1}\d{3}[-]\d{4}\d?$/;
    regexPadraoCelular = /\(?\d{2}\)?\s?[6-9]{1}\d{4}[-]\d{4}\d?$/;
    regexPadraoTelefoneFixo = /\(?\d{2}\)?\s?[0-5]{1}\d{3}[-]\d{4}\d?$/;

    masktel = [
        '(',
        /[1-9]/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
    ];

    maskcel = [
        '(',
        /[1-9]/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
    ];

    maskGenericTel = [
        '(',
        /[1-9]/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d?/
    ];

    DDD: string;
    Numero: string;
    TipoContato: number;
    Uid: string;
    Telefone: string;

    constructor() {
        super();
    }

    map(data) {

    }

    mapSimples(data) {
        if (data['Telefone']) {
            const celularFormatadoMask = conformToMask(
                data['Telefone'],
                this.maskGenericTel,
                { guide: false }
            );

            this.Telefone = celularFormatadoMask.conformedValue;
        }
    }

    obterObjetoDeEnvio() {
        const data = {};

        return data;
    }

    obterObjetoDeEnvioSimples() {
        return this.Telefone ? this.Telefone.replace(/\D/g, '') : null;
    }

    // possuiTelefoneFixoInvalido() {
    //     return this.telefonesFixos.some(t => t.telefone != null && t.telefone.trim() !== '' && (t.telefone.length < 14 || !(new RegExp(this.regexPadraoTelefoneFixo).test(t.telefone))));
    //   }

    //   possuiTelefoneCelularInvalido() {
    //     return this.telefonesCelulares.some(t => t.telefone == null || t.telefone.trim() === '' || t.telefone.length < 15 || !(new RegExp(this.regexPadraoCelular).test(t.telefone)));
    //   }
}
