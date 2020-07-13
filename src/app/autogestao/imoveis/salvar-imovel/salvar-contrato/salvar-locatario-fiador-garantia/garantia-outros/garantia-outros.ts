export class GarantiaOutros {
    Uid: string;
    Descricao: string;

    constructor() {
        this.Uid = '00000000-0000-0000-0000-000000000000';
        this.Descricao = null;
    }

    map(data) {
        Object.keys(data).forEach(propertieData => {
            if (this.hasOwnProperty(propertieData)) {
                this[propertieData] = data[propertieData];
            }
        });
    }

    mapReverse() {

    }
}
