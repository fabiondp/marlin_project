import { InformacoesBancarias } from './../../../financeiro/informacoes-bancarias/informacoes-bancarias';
import { BaseViewModel } from "app/shared/base-view-model";
import { ProprietarioInformacoesBancarias, ProprietarioInformacoesBancariasContaBancaria, ProprietarioInformacoesBancariasTitular } from "./proprietario-informacoes-bancarias";
import { RepresentanteDadosProprietario } from "./representante-dados-proprietario";
import { Contato } from 'app/shared/contato';
import { conformToMask } from 'text-mask-core';

export class DadosProprietario extends BaseViewModel {
  Uid = '00000000-0000-0000-0000-000000000000';
  UidImovel = '00000000-0000-0000-0000-000000000000';
  TipoPessoa: number;
  CPFCNPJ = null;
  RG = null;
  OrgaoEmissor = null;
  Nome = null;
  Email = null;
  DataNascimento = null;
  Nacionalidade = null;
  Filiacao1 = null;
  Filiacao2 = null;
  OutrasInformacoes = null;
  Referencia = null;
  DDDReferencia = null;
  TelefoneReferencia = null;
  Sexo = 1;
  EstadoCivil?: number;
  FormaPagamento = 1;
  Contatos: any[];
  ContatoDefault: Contato;
  ContatosTelFixo: any[];
  ContatosTelCel: any[];
  DadosConjuge: any;
  TelefoneCompletoReferencia = '';
  UidInativar = null;
  PossuiHistorico = false;

  TitularProprietario: boolean;

  habilitarMock = false;

  panelDadosPessoaisIsOpen: boolean;
  panelRepresentacaoIsOpen: boolean;
  panelInfoBancariasIsOpen: boolean;

  esconderCamposFiliacao = true;
  esconderCamposFiliacaoConjugue = true;
  esconderCamposNacionalidade = true;
  esconderReferencia = true;

  flagPreencherDadosComInformacoesCadastrais: boolean;
  EstaEmEdicao: boolean;

  informacaoBancaria: ProprietarioInformacoesBancarias;

  Representante: RepresentanteDadosProprietario;
  PossuiRepresentante: boolean;
  DescricaoEstadoCivil: string;
  DescricaoSexo: string;
  DataInicioCadastro: string;
  DataFimCadastro: string;

  constructor() {
    super();
    this.ContatoDefault = new Contato();

    this.panelDadosPessoaisIsOpen = true;
    this.panelInfoBancariasIsOpen = true;
    this.panelRepresentacaoIsOpen = false;
    this.flagPreencherDadosComInformacoesCadastrais = false;
    this.EstaEmEdicao = false;

    this.informacaoBancaria = new ProprietarioInformacoesBancarias();
    this.Representante = new RepresentanteDadosProprietario();
    this.PossuiRepresentante = false;
    this.DescricaoEstadoCivil = null;
    this.DescricaoSexo = null;
    this.DataInicioCadastro = null;
    this.DataFimCadastro = null;

    this.TitularProprietario = false;

    this.inicializarDados();

    this.propriedadesNaoMapeaveis = ['Representante', 'ContaBancaria'];
    this.propriedadesNaoEnviaveis = ['esconderCamposFiliacao', 'esconderCamposFiliacaoConjugue', 'esconderCamposNacionalidade', 'esconderReferencia',
      'flagPreencherDadosComInformacoesCadastrais', 'habilitarMock', 'panelDadosPessoaisIsOpen', 'panelInfoBancariasIsOpen',
      'panelRepresentacaoIsOpen', 'DescricaoEstadoCivil', 'DescricaoSexo', 'ContatoDefault', 'PossuiHistorico',
      'Representante', 'informacaoBancaria', 'propriedadesNaoMapeaveis', 'propriedadesNaoEnviaveis'];

    if (this.habilitarMock) {
      this.panelRepresentacaoIsOpen = true;
      this.panelInfoBancariasIsOpen = true;
      this.setMock();
    }
  }

  isEdicao() {
    return (
      this.Uid !== '00000000-0000-0000-0000-000000000000'
    );
  }

  setMock() {
    this.TipoPessoa = 1;
    this.CPFCNPJ = "226.104.561-15";
    this.Nome = "Lucas Domingues";
    this.RG = "11.750.658-8";
    this.OrgaoEmissor = "Detran-RJ";
    this.Email = "ldomingues@marlin.com.br";

    this.DataNascimento = new Date("2009-02-08T11:58:08.285Z").toLocaleDateString(
      'pt-BR',
      { timeZone: 'UTC' }
    );

    this.Sexo = 2;
    this.EstadoCivil = 2;
    this.DadosConjuge = {
      CPFCNPJ: "725.275.438-39",
      Nome: "Maria",
    };

    this.ContatosTelCel = [
      {
        tipo: 2,
        telefone: "21912341234"
      }
    ];

    this.ContatosTelFixo = [
      {
        tipo: 1,
        telefone: "2121231234"
      }
    ];


    const informacoesBancariasMock = new ProprietarioInformacoesBancarias();
    const titularContaBancariaMock = new ProprietarioInformacoesBancariasTitular();
    titularContaBancariaMock.CPFCNPJ = "721.144.889-00";
    titularContaBancariaMock.Nome = "Lucas Titualar";
    informacoesBancariasMock.Titular = titularContaBancariaMock;

    // const contaBancariaMock = new ProprietarioInformacoesBancariasContaBancaria();

    this.informacaoBancaria = informacoesBancariasMock;

    const representacaoMock = new RepresentanteDadosProprietario();
    representacaoMock.TipoRepresentante = 2;
    representacaoMock.Nome = "Lucas Representante";
    representacaoMock.Email = "ldomingues@marlin.com.br";
    // representacaoMock.CPFCNPJ = "027.024.397-64";
    representacaoMock.TipoPessoa = 1;

    this.Representante = representacaoMock;



  }

  inicializarContatos() {
    this.Contatos = [];

    this.ContatosTelFixo = [
      {
        tipo: 1,
        telefone: ''
      }
    ];

    this.ContatosTelCel = [
      {
        tipo: 2,
        telefone: ''
      }
    ];
  }

  inicializarDados() {
    this.Uid = '00000000-0000-0000-0000-000000000000';
    this.RG = null;
    this.OrgaoEmissor = null;
    this.Nome = null;
    this.Email = null;
    this.DataNascimento = null;
    this.Nacionalidade = null;
    this.Filiacao1 = null;
    this.Filiacao2 = null;
    this.OutrasInformacoes = null;
    this.Referencia = null;
    this.DDDReferencia = null;
    this.TelefoneReferencia = null;
    this.Sexo = 1;
    this.EstadoCivil = null;
    this.FormaPagamento = 1;
    this.DadosConjuge = {};
    this.UidInativar = null;
    this.CPFCNPJ = null;
    this.TelefoneCompletoReferencia = null;

    this.informacaoBancaria = new ProprietarioInformacoesBancarias();
    this.Representante = new RepresentanteDadosProprietario();

    this.flagPreencherDadosComInformacoesCadastrais = false;
    this.PossuiRepresentante = false;
    this.TitularProprietario = false;

    this.inicializarContatos();
  }

  toggleCollapse(keyPanel) {
    if (typeof this[keyPanel] !== 'undefined') {
      this[keyPanel] = !this[keyPanel];
    }
  }

  resetarDados() {
    this.Uid = '00000000-0000-0000-0000-000000000000';
    this.RG = null;
    this.OrgaoEmissor = null;
    this.Nome = null;
    this.Email = null;
    this.DataNascimento = null;
    this.Nacionalidade = null;
    this.Filiacao1 = null;
    this.Filiacao2 = null;
    this.OutrasInformacoes = null;
    this.Referencia = null;
    this.DDDReferencia = null;
    this.TelefoneReferencia = null;
    this.Sexo = 1;
    this.EstadoCivil = null;
    this.FormaPagamento = 1;
    this.DadosConjuge = {};
    this.TelefoneCompletoReferencia = null;
    this.informacaoBancaria = new ProprietarioInformacoesBancarias();
    this.Representante = new RepresentanteDadosProprietario();
    this.PossuiRepresentante = false;
    this.TitularProprietario = false;

    this.inicializarContatos();
  }

  map(data, opcoesBanco?) {
    Object.keys(data).forEach(propertieData => {
      if (this.hasOwnProperty(propertieData) && !this.propriedadesNaoMapeaveis.some(pnp => pnp === propertieData)) {
        this[propertieData] = data[propertieData];
      }
    });

    this.mapTipoPessoa(data);

    this.mapContatos(data);

    this.mapTelefoneCompletoReferencia(data);

    this.mapDataNascimento(data);

    this.Representante.map(data["Representante"]);
    this.informacaoBancaria.map(data["ContaBancaria"], opcoesBanco);

    if (data["Representante"]) {
      this.PossuiRepresentante = true;
    } else {
      this.PossuiRepresentante = false;
    }

    this.mapTitularProprietario();
  }

  mapTipoPessoa(data) {
    if (data['TipoPessoa']) {
      this.TipoPessoa = data['TipoPessoa'];
    }
  }

  mapContatos(data) {
    this.mapContatosTelFixo(data);
    this.mapContatosTelCel(data);
  }

  mapContatosTelFixo(data) {
    if (
      this.Contatos !== null &&
      Array.isArray(this.Contatos) &&
      this.Contatos.length > 0 &&
      this.Contatos.some(c => c.TipoContato === 1)
    ) {
      // tslint:disable-next-line:prefer-const
      let contatosTelFixo = this.Contatos.filter(c => c.TipoContato === 1);

      this.ContatosTelFixo = contatosTelFixo.map(c => {
        const contato = {
          uid: c["Uid"],
          tipo: 1,
          telefone: `${c['DDD']}${c['Numero']}`
        };
        return contato;
      });

      this.ContatosTelFixo.forEach(contato => {
        const telefoneFormatadoMask = conformToMask(
          contato.telefone,
          this.ContatoDefault.masktel,
          { guide: false }
        );
        contato.telefone = telefoneFormatadoMask.conformedValue;
      });
    }
  }

  mapContatosTelCel(data) {
    if (
      this.Contatos !== null &&
      Array.isArray(this.Contatos) &&
      this.Contatos.length > 0 &&
      this.Contatos.some(c => c.TipoContato === 2)
    ) {
      // tslint:disable-next-line:prefer-const
      let contatosTelCel = this.Contatos.filter(c => c.TipoContato === 2);

      this.ContatosTelCel = contatosTelCel.map(c => {
        const contato = {
          uid: c["Uid"],
          tipo: 2,
          telefone: `${c['DDD']}${c['Numero']}`
        };
        return contato;
      });

      this.ContatosTelCel.forEach(contato => {
        const celularFormatadoMask = conformToMask(
          contato.telefone,
          this.ContatoDefault.maskcel,
          { guide: false }
        );
        contato.telefone = celularFormatadoMask.conformedValue;
      });
    }
  }

  mapTitularProprietario() {

    if (this.informacaoBancaria && this.informacaoBancaria.Titular && this.informacaoBancaria.Titular.CPFCNPJ) {
      const numerosCpfCnpjTitular = this.informacaoBancaria.Titular.CPFCNPJ.replace(/\D/g, '');
      const numerosCpfCnpjProprietario = this.CPFCNPJ.replace(/\D/g, '');
      this.TitularProprietario = (numerosCpfCnpjTitular === numerosCpfCnpjProprietario);
    }
  }

  mapTelefoneCompletoReferencia(data) {
    if (data && data['DDDReferencia'] && data['TelefoneReferencia']) {
      this.TelefoneCompletoReferencia = `${data['DDDReferencia']}${
        data['TelefoneReferencia']
        }`;
    }
  }

  mapDataNascimento(data) {
    if (data && data['DataNascimento']) {
      this.DataNascimento = new Date(data['DataNascimento']).toLocaleDateString(
        'pt-BR',
        { timeZone: 'UTC' }
      );
    }
  }

  mapReverse() {
    this.mapReverseContatos();
    this.mapReverseTelefoneCompletoReferencia();
  }

  mapReverseContatos() {
    this.Contatos = [];
    this.mapReverseContatosTelFixo();
    this.mapReverseContatosTelCel();
  }

  mapReverseContatosTelFixo() {
    if (this.ContatosTelFixo && this.ContatosTelFixo.length > 0) {
      this.ContatosTelFixo.forEach(contato => {
        const obj = {
          Uid: contato.uid,
          DDD: '',
          Numero: '',
          TipoContato: contato.tipo
        };

        const clearValue = contato.telefone.replace(/\D/g, '');

        obj.DDD = clearValue.substr(0, 2);
        obj.Numero = clearValue.substr(2);

        this.Contatos.push(obj);
      });
    }
  }

  mapReverseContatosTelCel() {
    if (this.ContatosTelCel && this.ContatosTelCel.length > 0) {
      this.ContatosTelCel.forEach(contato => {
        const obj = {
          Uid: contato.uid,
          DDD: '',
          Numero: '',
          TipoContato: contato.tipo
        };

        const clearValue = contato.telefone.replace(/\D/g, '');

        obj.DDD = clearValue.substr(0, 2);
        obj.Numero = clearValue.substr(2);

        this.Contatos.push(obj);
      });
    }
  }

  mapReverseTelefoneCompletoReferencia() {
    if (
      this.TelefoneCompletoReferencia &&
      this.TelefoneCompletoReferencia.length > 0
    ) {
      const clearValue = this.TelefoneCompletoReferencia.replace(/\D/g, '');
      this.DDDReferencia = clearValue.substr(0, 2);
      this.TelefoneReferencia = clearValue.substr(2);
    }
  }

  alteracaoPermitida(): boolean {
    return !this.EstaEmEdicao;
  }

  alteracaoBloqueada(): boolean {
    return this.EstaEmEdicao;
  }

  obterObjetoDeEnvio() {
    this.mapReverse();

    const data = {};

    Object.keys(this).forEach(item => {
      if (
        !this.propriedadesNaoEnviaveis.some(pnp => pnp === item)
      ) {
        data[item] = this[item];
      }
    });

    if (this.CPFCNPJ) {
      data["CPFCNPJ"] = this.CPFCNPJ.replace(/\D/g, '');
    }

    if (!this.flagPreencherDadosComInformacoesCadastrais) {
      data["ContaBancaria"] = this.informacaoBancaria.obterDadosParaEnvio();
    } else {
      data["ContaBancaria"] = null;
    }

    if (this.PossuiRepresentante) {
      data["Representante"] = this.Representante.obterDadosParaEnvio();
    } else {
      data["Representante"] = null;
    }

    return data;
  }

  possuiTelefoneFixoInvalido() {
    return this.ContatosTelFixo.some(t => t.telefone != null && t.telefone.trim() !== '' && (t.telefone.length < 14 || !(new RegExp(this.ContatoDefault.regexPadraoTelefoneFixo).test(t.telefone))));
  }

  possuiTelefoneCelularInvalido() {
    return this.ContatosTelCel.some(t => t.telefone != null && t.telefone.trim() !== '' && (t.telefone.length < 15 || !(new RegExp(this.ContatoDefault.regexPadraoCelular).test(t.telefone))));
  }
}


