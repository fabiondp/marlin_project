import { Endereco } from 'app/shared/input-busca-cep/endereco';
import { CartaFianca } from './carta-fianca/carta-fianca';
import { TituloCapitalizacao } from './titulo-capitalizacao/titulo-capitalizacao';
import { SeguroFianca } from './seguro-fianca/seguro-fianca';
import { Locatario } from './locatario';
import { Fiador } from './fiador';
import { Caucao } from './caucao/caucao';
import { GarantiaOutros } from './garantia-outros/garantia-outros';
import { Contato } from 'app/shared/contato';

export class LocatarioFiadorGarantia {
  // Uid = '00000000-0000-0000-0000-000000000000';
  UidContrato = '00000000-0000-0000-0000-000000000000';

  SeguroFianca: SeguroFianca;
  TituloCapitalizacao: TituloCapitalizacao;
  CartaFianca: CartaFianca;
  Caucao: Caucao;
  GarantiaOutros: GarantiaOutros;

  Locatario: Locatario;
  Fiador: Fiador;
  GarantiaImovel: number;

  panelDadosPessoaisIsOpen: boolean;
  panelEnderecoCobrancaIsOpen: boolean;
  panelGarantiaIsOpen: boolean;
  flagUtilizarEnderecoImovel: boolean;

  panelFiadorIsOpen: boolean;
  panelCaucaoIsOpen: boolean;
  panelTituloCapitalizacaoIsOpen: boolean;
  panelSeguroFiancaIsOpen: boolean;
  panelCartaFiancaIsOpen: boolean;
  panelGarantiaOutrosIsOpen: boolean;

  constructor() {
    this.Locatario = new Locatario();
    this.Fiador = new Fiador();
    this.SeguroFianca = new SeguroFianca();
    this.TituloCapitalizacao = new TituloCapitalizacao();
    this.CartaFianca = new CartaFianca();
    this.Caucao = new Caucao();
    this.GarantiaOutros = new GarantiaOutros();
    this.GarantiaImovel = 2;
    this.panelDadosPessoaisIsOpen = true;
    this.panelEnderecoCobrancaIsOpen = true;
    this.panelGarantiaIsOpen = true;
    this.flagUtilizarEnderecoImovel = false;

    this.panelFiadorIsOpen = true;
    this.panelCaucaoIsOpen = true;
    this.panelTituloCapitalizacaoIsOpen = true;
    this.panelSeguroFiancaIsOpen = true;
    this.panelCartaFiancaIsOpen = true;
    this.panelGarantiaOutrosIsOpen = true;
  }

  toggleCollapse(keyPanel) {
    if (typeof this[keyPanel] !== 'undefined') {
      this[keyPanel] = !this[keyPanel];
    }
  }

  resetarDados() {
    this.resetarGarantia();
    this.Fiador = new Fiador();
    this.SeguroFianca = new SeguroFianca();
    this.TituloCapitalizacao = new TituloCapitalizacao();
    this.CartaFianca = new CartaFianca();
    this.Caucao = new Caucao();
    this.GarantiaOutros = new GarantiaOutros();

    if (this.Locatario) {
      this.Locatario.resetarDados();
    }
  }

  resetarGarantia() {
    this.GarantiaImovel = null;
    this.Fiador = new Fiador();
    this.SeguroFianca = new SeguroFianca();
    this.TituloCapitalizacao = new TituloCapitalizacao();
    this.CartaFianca = new CartaFianca();
    this.Caucao = new Caucao();
    this.GarantiaOutros = new GarantiaOutros();
  }

  map(data, imovel?) {
    Object.keys(data).forEach(propertieData => {
      if (this.hasOwnProperty(propertieData)) {
        this[propertieData] = data[propertieData];
      }
    });

    if (data['Locatario']) {
      this.Locatario = new Locatario();
      this.Locatario.map(data['Locatario']);
    } else {
      this.Locatario = new Locatario();
    }

    if (data['Fiador']) {
      this.Fiador = new Fiador();
      this.Fiador.map(data['Fiador']);
    } else {
      this.Fiador = new Fiador();
    }

    if (data['SeguroFianca']) {
      this.SeguroFianca = new SeguroFianca();
      this.SeguroFianca.map(data['SeguroFianca']);
    } else {
      this.SeguroFianca = new SeguroFianca();
    }

    if (data['TituloCapitalizacao']) {
      this.TituloCapitalizacao = new TituloCapitalizacao();
      this.TituloCapitalizacao.map(data['TituloCapitalizacao']);
    } else {
      this.TituloCapitalizacao = new TituloCapitalizacao();
    }

    if (data['CartaFianca']) {
      this.CartaFianca = new CartaFianca();
      this.CartaFianca.map(data['CartaFianca']);
    } else {
      this.CartaFianca = new CartaFianca();
    }

    if (data['Caucao']) {
      this.Caucao = new Caucao();
      this.Caucao.map(data['Caucao']);
    } else {
      this.Caucao = new Caucao();
    }

    if (data['GarantiaOutros']) {
      this.GarantiaOutros = new GarantiaOutros();
      this.GarantiaOutros.map(data['GarantiaOutros']);
    } else {
      this.GarantiaOutros = new GarantiaOutros();
    }

    if (imovel) {
      this.flagUtilizarEnderecoImovel = this.Locatario.EnderecoCobranca.enderecoIgual(imovel.Endereco)
    }

    // if (data["GarantiaImovel"] === 0) {
    //     this.GarantiaImovel = null;
    // }
  }

  setUidContrato(uidContrato) {
    this.UidContrato = uidContrato;
    this.Locatario.UidContrato = uidContrato;
    this.Fiador.UidContrato = uidContrato;
  }

  mapReverse() {
    this.Locatario.mapReverse();
    this.Fiador.mapReverse();
    this.SeguroFianca.mapReverse();
    this.TituloCapitalizacao.mapReverse();
    this.CartaFianca.mapReverse();
    this.GarantiaOutros.mapReverse();
  }
}
