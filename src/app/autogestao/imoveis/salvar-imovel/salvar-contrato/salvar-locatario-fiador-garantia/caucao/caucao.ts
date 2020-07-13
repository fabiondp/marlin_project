export class Caucao {
    Uid: string;
    Banco: string;
    Agencia: string;
    DVAgencia: string;
    Conta: string;
    DVConta: string;
    Valor: String;

    constructor() {
        this.Uid = '00000000-0000-0000-0000-000000000000';
        this.Banco = null;
        this.Agencia = null;
        this.DVAgencia = null;
        this.Conta = null;
        this.DVConta = null;
        this.Valor = null;
    }

    map(data) {
        Object.keys(data).forEach(propertieData => {
            if (this.hasOwnProperty(propertieData)) {
                this[propertieData] = data[propertieData];
            }
        });
    }

    mapReverse() { }
}
