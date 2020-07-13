import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'descricaoMes' })
export class DescricaoMesPipe implements PipeTransform {
    OpcoesMes = [
        {
            value: 0,
            mes: "Selecione"
        },
        {
            value: 1,
            mes: "Janeiro"
        },
        {
            value: 2,
            mes: "Fevereiro"
        },
        {
            value: 3,
            mes: "Março"
        },
        {
            value: 4,
            mes: "Abril"
        },
        {
            value: 5,
            mes: "Maio"
        },
        {
            value: 6,
            mes: "Junho"
        },
        {
            value: 7,
            mes: "Julho"
        },
        {
            value: 8,
            mes: "Agosto"
        },
        {
            value: 9,
            mes: "Setembro"
        },
        {
            value: 10,
            mes: "Outubro"
        },
        {
            value: 11,
            mes: "Novembro"
        },
        {
            value: 12,
            mes: "Dezembro"
        }
    ];

    transform(value, exponent) {

        if (value == null || value <= 0) {
            return "-";
        }

        if (this.OpcoesMes.some(om => om.value === value)) {
            return this.OpcoesMes.find(om => om.value === value)['mes'];
        }

        return value;
    }
}
