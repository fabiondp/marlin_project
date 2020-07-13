import { Pipe, PipeTransform } from '@angular/core';
import { conformToMask } from 'text-mask-core';

@Pipe({ name: 'cpfcnpj' })
export class CpfcnpjPipe implements PipeTransform {
    public maskCPF = [
        /\d/,
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/
    ];
    public maskCNPJ = [
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        '.',
        /\d/,
        /\d/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/
    ];

    transform(value, debug) {
        if (debug) {
            console.log(typeof (value), value);
        }

        if (value == null || value <= 0) {
            return "-";
        }

        const numerosCpfCnpj = value.replace(/\D/g, '');
        const tipoPessoa = numerosCpfCnpj.length >= 14 ? 2 : 1;

        if (tipoPessoa === 1) {
            const valueFormatado = conformToMask(
                value,
                this.maskCPF,
                { guide: false }
            );

            return valueFormatado.conformedValue;
        } else if (tipoPessoa === 2) {
            const valueFormatado = conformToMask(
                value,
                this.maskCNPJ,
                { guide: false }
            );

            return valueFormatado.conformedValue;
        }


        return value;
    }
}
