export class BaseViewModel {

    propriedadesNaoMapeaveis = [];
    propriedadesNaoEnviaveis = [];

    map(data) {
        if (data) {
            Object.keys(data).forEach(item => {
                if (
                    !this.propriedadesNaoMapeaveis.some(pnp => pnp === item) &&
                    (data[item] || data[item] !== null)
                ) {
                    this[item] = data[item];
                }
            });
        }
    }

    obterObjetoDeEnvio() {

    }
}
