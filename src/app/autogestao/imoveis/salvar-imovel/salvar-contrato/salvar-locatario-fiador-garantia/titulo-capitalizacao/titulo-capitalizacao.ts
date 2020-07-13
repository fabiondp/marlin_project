import { moment } from 'ngx-bootstrap/chronos/test/chain';

export class TituloCapitalizacao {
    Uid: string;
    Seguradora: string;
    CodigoTitulo: string;
    DataRenovacao: any;
    Valor: string;

    constructor() {
        this.Uid = '00000000-0000-0000-0000-000000000000';
        this.Seguradora = null;
        this.CodigoTitulo = null;
        this.DataRenovacao = null;
        this.Valor = null;
    }

    map(data) {
        Object.keys(data).forEach(propertieData => {
            if (this.hasOwnProperty(propertieData)) {
                this[propertieData] = data[propertieData];
            }
        });

        if (data['DataRenovacao']) {
            this.DataRenovacao = moment(data['DataRenovacao'], 'YYYY-MM-DD').toDate();
        }
    }

    mapReverse() {

    }
}
