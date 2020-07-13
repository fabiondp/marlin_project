import { BaseViewModel } from "app/shared/base-view-model";

export class DiversosDadosImovel extends BaseViewModel {
  Descricao: string;
  Valor: number;
  Uid: string;

  public static mapList(data): DiversosDadosImovel[] {
    if (data != null && Array.isArray(data) && data.length > 0) {
      const taxas = [];

      data.forEach(element => {
        const taxa = new DiversosDadosImovel();
        taxa.map(element);
        taxas.push(taxa);
      });

      return taxas;
    }

    return [new DiversosDadosImovel()];
  }


  public static obterListaParaEnvio(diversos: DiversosDadosImovel[]) {

    if (diversos != null && diversos.some(d => d.possuiPropriedadePreenchida())) {
      const data = [];

      diversos.forEach(diverso => {
        if (diverso.possuiPropriedadePreenchida()) {
          data.push(diverso.obterObjetoParaEnvio());
        }
      });

      return data;
    }

    return null;
  }

  constructor() {
    super();

    this.propriedadesNaoEnviaveis = ['propriedadesNaoEnviaveis', 'propriedadesNaoMapeaveis'];
  }

  obterObjetoParaEnvio() {
    if (this.possuiPropriedadePreenchida()) {
      const data = {};

      Object.keys(this).forEach(item => {
        if (
          !this.propriedadesNaoEnviaveis.some(pnp => pnp === item)
        ) {
          data[item] = this[item];
        }
      });

      return data;
    }

    return null;
  }

  possuiPropriedadePreenchida() {
    return this.possuiValor() || this.possuiDescricao();
  }

  possuiValor(): boolean {
    // return this.Valor != null && this.Valor.trim() !== "";
    return this.Valor != null && this.Valor > 0;
  }

  possuiDescricao(): boolean {
    return this.Descricao != null && this.Descricao.trim() !== "";
  }

  map(data) {
    super.map(data);
  }
}
