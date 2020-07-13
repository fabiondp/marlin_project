
import * as moment from 'moment';
import { BaseViewModel } from 'app/shared/base-view-model';

export class DadosContratoLocacao extends BaseViewModel {
  Uid = '00000000-0000-0000-0000-000000000000';
  UidImovel = '00000000-0000-0000-0000-000000000000';
  DataInicioVigencia: any;
  DataInicioVigenciaServer: any;
  ValorBonificacao: null;
  ValorDiversos: null;
  ValorExpediente: null;
  DescricaoPercentualReajuste: null;
  MesReajuste: null;
  VigenciaContratoMeses: null;
  ValorLocacao: null;
  ValorCondominio: null;
  TipoValorCondominio: 1;
  ValorIPTU: null;
  ISIsento: true;
  // GarantiaImovel: 0;
  TipoRepresentacao: 1;
  DiaPagamento: null;
  FormaPagamento: 1;
  Area: null;
  Vagas: null;
  Observacao: null;
  UidInativar = null;
  Taxas: {
    UidContrato: string;
    TaxaIntermediacao: number;
    TaxaAdministracao: number;
    TipoTaxaAdministracao: 1;
    RepasseMulta: number;
    TipoRepasseMulta: 1;
    CPMF: true;
    ISS: true;
    DARFIR: true;
    DARFImpostos: true;
    EmiteExtrato: true;
    Uid: '00000000-0000-0000-0000-000000000000';
  };

  DataFinalContrato: any;
  DataFinalContratoServer: any;

  isNovoContrato = false;
  PossuiHistorico = false;
  MultaSobreBoletoLocacao = false;
  JurosMoraSobreBoletoLocacao = false;
  ValorPercentualMultaSobreBoletoLocacao: number = null;
  DescricaoBonificacao: string;

  panelInfoVigenciaIsOpen: boolean;
  panelInfoCobrancaIsOpen: boolean;
  panelInfoReajusteIsOpen: boolean;
  panelInfoBonificacaoIsOpen: boolean;
  panelInfoObservacoesIsOpen: boolean;
  DataEncerramento: any;

  Bonificacoes: BonificacaoDadosContratoLocacao[];
  PossuiBonificacoes: boolean;



  constructor() {
    super();

    this.panelInfoVigenciaIsOpen = true;
    this.panelInfoCobrancaIsOpen = true;
    this.panelInfoReajusteIsOpen = true;
    this.panelInfoBonificacaoIsOpen = true;
    this.panelInfoObservacoesIsOpen = true;
    this.Bonificacoes = [new BonificacaoDadosContratoLocacao()];
    this.PossuiBonificacoes = false;
    this.DataEncerramento = null;
    this.PossuiHistorico = false;

    this.inicializarDados();
  }

  inicializarDados() {
    this.Uid = '00000000-0000-0000-0000-000000000000';
    this.VigenciaContratoMeses = null;
    this.DataInicioVigencia = null;
    this.ValorBonificacao = null;
    this.ValorDiversos = null;
    this.ValorExpediente = null;
    this.MesReajuste = null;
    this.DescricaoPercentualReajuste = null;
    this.ValorLocacao = null;
    this.ValorCondominio = null;
    this.TipoValorCondominio = 1;
    this.ValorIPTU = null;
    this.ISIsento = true;
    // this.GarantiaImovel = 0;
    this.TipoRepresentacao = 1;
    this.DiaPagamento = null;
    this.FormaPagamento = 1;
    this.Area = null;
    this.Vagas = null;
    this.Observacao = null;
    this.UidInativar = null;
    this.MultaSobreBoletoLocacao = false;
    this.JurosMoraSobreBoletoLocacao = false;
    this.ValorPercentualMultaSobreBoletoLocacao = null;
    this.Taxas = {
      UidContrato: '00000000-0000-0000-0000-000000000000',
      TaxaIntermediacao: null,
      TaxaAdministracao: null,
      TipoTaxaAdministracao: 1,
      RepasseMulta: null,
      TipoRepasseMulta: 1,
      CPMF: true,
      ISS: true,
      DARFIR: true,
      DARFImpostos: true,
      EmiteExtrato: true,
      Uid: '00000000-0000-0000-0000-000000000000'
    };

    this.Bonificacoes = [new BonificacaoDadosContratoLocacao()];
    this.DataFinalContrato = null;
    this.PossuiBonificacoes = false;
  }

  toggleCollapse(keyPanel) {
    if (typeof this[keyPanel] !== 'undefined') {
      this[keyPanel] = !this[keyPanel];
    }
  }

  calcularDataFinalVigenciaContrato(value?) {
    if ((this.DataInicioVigencia || value) && this.VigenciaContratoMeses) {
      if (value) {
        this.DataFinalContrato = moment(value).add(this.VigenciaContratoMeses, 'M').format(
          'DD-MM-YYYY'
        );
      } else {
        const dataTemp = new Date(
          this.DataInicioVigencia
        );

        this.DataFinalContrato = moment(dataTemp).add(this.VigenciaContratoMeses, 'M').format(
          'DD-MM-YYYY'
        );
      }
    }
  }

  isEdicao() {
    return (
      this.Uid &&
      this.Uid !== '' &&
      this.Uid !== '00000000-0000-0000-0000-000000000000'
    );
  }


  map(data) {
    Object.keys(data).forEach(propertiesData => {
      if (this.hasOwnProperty(propertiesData)) {
        this[propertiesData] = data[propertiesData];
      }
    });

    this.mapTaxas(data);

    this.mapDataInicioVigencia(data);

    this.mapBonificacoes(data);
  }

  mapBonificacoes(data) {
    this.Bonificacoes = BonificacaoDadosContratoLocacao.mapList(data["Bonificacoes"]);
    this.PossuiBonificacoes = this.Bonificacoes.some(b => b.possuiPropriedadePreenchida());
  }

  mapDataInicioVigencia(data) {
    if (data['DataInicioVigencia']) {
      this.DataInicioVigenciaServer = data['DataInicioVigencia'];
      this.DataInicioVigencia = moment(new Date(data['DataInicioVigencia'])).format(
        'DD-MM-YYYY'
      );

      this.DataFinalContrato = moment(new Date(data['DataInicioVigencia'])).add(this.VigenciaContratoMeses, 'M').format(
        'DD-MM-YYYY'
      );

      this.DataFinalContratoServer = moment(new Date(data['DataInicioVigencia'])).add(this.VigenciaContratoMeses, 'M').toDate();

    }
  }

  mapTaxas(data) {
    if (!data.Taxas || data.Taxas == null) {
      this.Taxas = {
        UidContrato: this.Uid,
        TaxaIntermediacao: null,
        TaxaAdministracao: null,
        TipoTaxaAdministracao: 1,
        RepasseMulta: null,
        TipoRepasseMulta: 1,
        CPMF: true,
        ISS: true,
        DARFIR: true,
        DARFImpostos: true,
        EmiteExtrato: true,
        Uid: '00000000-0000-0000-0000-000000000000'
      };
    }
  }

  mapReverse() {
    if (this.isEdicao()) {
      this.mapReverseDataInicioFigencia();
    }
  }

  mapReverseDataInicioFigencia() {
    if (this.DataInicioVigenciaServer != null) {
      this.DataInicioVigencia = this.DataInicioVigenciaServer;
    }
  }

  addBonificacao() {
    this.Bonificacoes.push(new BonificacaoDadosContratoLocacao());
  }

  deleteBonificacao(index) {
    this.Bonificacoes.splice(index, 1);
  }

  alterarPossuiBonificacoes() {
    if (!this.PossuiBonificacoes) {
      this.Bonificacoes = [new BonificacaoDadosContratoLocacao()];
    }
  }

  obterObjetoDeEnvio() {

    if (this.isEdicao()) {
      this.mapReverse();
    }

    const data = {};

    Object.keys(this).forEach(item => {
      if (
        !this.propriedadesNaoEnviaveis.some(pnp => pnp === item)
      ) {
        data[item] = this[item];
      }
    });


    if (!this.PossuiBonificacoes) {
      data["Bonificacoes"] = null;
    } else {
      data["Bonificacoes"] = BonificacaoDadosContratoLocacao.obterListaParaEnvio(this.Bonificacoes);
    }

    return data;
  }
}

export class BonificacaoDadosContratoLocacao extends BaseViewModel {
  Uid: string;
  Descricao: string;
  Valor: number;

  public static obterListaParaEnvio(diversos: BonificacaoDadosContratoLocacao[]) {

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


  public static mapList(data): BonificacaoDadosContratoLocacao[] {
    if (data != null && Array.isArray(data) && data.length > 0) {
      const taxas = [];

      data.forEach(element => {
        const taxa = new BonificacaoDadosContratoLocacao();
        taxa.map(element);
        taxas.push(taxa);
      });

      return taxas;
    }

    return [new BonificacaoDadosContratoLocacao()];
  }

  constructor() {
    super();
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

  possuiPropriedadePreenchida() {
    return this.possuiDescricao() || this.possuiValor();
  }

  possuiDescricao() {
    return this.Descricao != null && this.Descricao.trim() !== "";
  }

  possuiValor() {
    return this.Valor != null && this.Valor > 0;
  }
}
