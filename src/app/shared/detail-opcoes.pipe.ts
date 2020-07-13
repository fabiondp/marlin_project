import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'detailOpcoes' })
export class DetailOpcoesPipe implements PipeTransform {
    transform(value, opcoes, keyValue, KeyText) {

        if (opcoes && Array.isArray(opcoes)) {
            const opcaoSelecionada = opcoes.find(o => o[keyValue] === value);
            if (opcaoSelecionada) {
                return opcaoSelecionada[KeyText];
            }
        }

        if (value == null) {
            return "-";
        }

        return value;
    }
}
