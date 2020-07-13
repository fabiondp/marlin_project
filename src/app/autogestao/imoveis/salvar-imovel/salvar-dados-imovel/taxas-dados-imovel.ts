import { BaseViewModel } from "app/shared/base-view-model";
import { OpcaoViewModel } from "app/shared/opcao-view-model";

export class TaxasDadosImovel extends BaseViewModel {
  NumeroInscricao: string;
  TipoTaxaImovel: number;
  ValorBase: number;
  MesVencimento: number;
  Parcelas: number;
  Uid: string;
  Descricao: string;
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

  TipoPagamento: number;

  TextosAjuda = {
    'RipAjuda': '<strong>RIP</strong> é a identificação do imóvel no cadastro da <strong>SPU</strong> (<strong><u>S</u></strong>ecretaria de <strong><u>P</u></strong>atrimônio da <strong><u>U</u></strong>nião), órgão responsável pela demarcação das áreas sobre as quais incide a <strong><u>cobrança de laudêmio</u></strong> da União.'
  };

  public static obterListaParaEnvio(diversos: TaxasDadosImovel[]) {

    if (diversos != null) {
      const data = [];

      diversos.forEach(diverso => {
        data.push(diverso.obterObjetoParaEnvio());
      });

      return data;
    }

    return null;
  }

  public static mapList(data): TaxasDadosImovel[] {
    if (data != null && Array.isArray(data) && data.length > 0) {
      const taxas = [];

      data.forEach(element => {
        const taxa = new TaxasDadosImovel();
        taxa.map(element);
        taxas.push(taxa);
      });

      return taxas;
    }

    return [new TaxasDadosImovel()];
  }

  public static mapUpdateList(taxas: TaxasDadosImovel[], data) {
    if (data != null && Array.isArray(data) && data.length > 0) {
      data.forEach(taxaData => {
        taxas.forEach(taxa => {
          if (taxa.TipoTaxaImovel === taxaData["TipoTaxaImovel"]) {
            taxa.mapUpdate(taxaData);
          }
        });
      });
    }
  }

  constructor() {
    super();
    this.Parcelas = 0;
    this.MesVencimento = 0;
    this.TipoPagamento = 0;
    this.propriedadesNaoEnviaveis = ['TextosAjuda', 'TipoPagamento', 'OpcoesMes', 'propriedadesNaoMapeaveis', 'propriedadesNaoEnviaveis'];
  }

  obterObjetoParaEnvio() {
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


  obterTextoAjuda() {
    if (this.TipoTaxaImovel === 3) {
      return this.TextosAjuda.RipAjuda;
    }
    return null;
  }

  alterarTipoPagamento() {
    this.Parcelas = this.TipoPagamento;
  }

  alterarValorParcela() {
    if (this.Parcelas === 1) {
      this.TipoPagamento = 1;
    }
  }

  map(data) {
    super.map(data);
    this.mapTipoPagamento(data);
  }

  mapTipoPagamento(data) {
    this.TipoPagamento = data["Parcelas"] != null && data["Parcelas"] > 1 ? 2 : data["Parcelas"];
  }

  mapUpdate(data) {
    super.map(data);
    this.mapTipoPagamento(data);
  }
}


