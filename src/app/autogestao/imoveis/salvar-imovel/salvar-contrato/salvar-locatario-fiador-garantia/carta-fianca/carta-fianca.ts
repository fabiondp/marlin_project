import { moment } from 'ngx-bootstrap/chronos/test/chain';
export class CartaFianca {
    Uid: string;
    Origem: string;
    DataRenovacao: any;
    Cobertura: string;

    constructor() {
        this.Uid = '00000000-0000-0000-0000-000000000000';
        this.Origem = null;
        this.DataRenovacao = null;
        this.Cobertura = null;
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

    mapReverse() { }
}
