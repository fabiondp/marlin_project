import { moment } from 'ngx-bootstrap/chronos/test/chain';

export class SeguroFianca {
    Uid: string;
    Seguradora: string;
    CodigoPropostaApolice: string;
    DataRenovacao: any;
    Cobertura: string;

    constructor() {
        this.Uid = '00000000-0000-0000-0000-000000000000';
        this.Seguradora = null;
        this.CodigoPropostaApolice = null;
        this.DataRenovacao = null;
        this.Cobertura = null;
    }

    map(data) {
        Object.keys(data).forEach(propertieData => {
            if (this.hasOwnProperty(propertieData)) {
                this[propertieData] = data[propertieData];
            }
        });

        console.log("data['DataRenovacao']", data['DataRenovacao']);

        if (data['DataRenovacao']) {
            // this.DataRenovacao = moment(data['DataRenovacao']).format('YYYY-MM-DD');
            this.DataRenovacao = moment(data['DataRenovacao'], 'YYYY-MM-DD').toDate();
        }
    }

    mapReverse() {

        this.DataRenovacao = moment(this['DataRenovacao']).format('YYYY-MM-DD');
    }
}
