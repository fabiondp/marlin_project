import { Pipe, PipeTransform } from '@angular/core';
import { conformToMask } from 'text-mask-core';

@Pipe({ name: 'detailContato' })
export class DetailContatoPipe implements PipeTransform {
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

    transform(value, debug) {
        if (debug) {
            console.log(typeof (value), value, value.length);

        }



        if (value == null || value <= 0) {
            return "-";
        }

        if (value.length === 11) {
            const celularFormatadoMask = conformToMask(
                value,
                this.maskcel,
                { guide: false }
            );

            return celularFormatadoMask.conformedValue;

        } else if (value.length === 10) {
            const celularFormatadoMask = conformToMask(
                value,
                this.masktel,
                { guide: false }
            );

            return celularFormatadoMask.conformedValue;
        }

        return value;
    }
}
