import { DadosProprietario } from './../salvar-dados-proprietario/dados-proprietario';
import { Endereco } from 'app/shared/input-busca-cep/endereco';
import { BaseViewModel } from 'app/shared/base-view-model';
import { DiversosDadosImovel } from './diversos-dados-imovel';
import { DadosCobrancaSeguradoraFogo } from './dados-cobranca-seguradora-fogo';
import { SeguradoraFogo } from './seguradora-fogo';
import { DadosCobrancaCondominio } from './dados-cobranca-condominio';
import { AdministradoraCondominio } from './administradora-condominio';
import { Contato } from 'app/shared/contato';
import { TaxasDadosImovel } from './taxas-dados-imovel';
import { OpcaoViewModel } from 'app/shared/opcao-view-model';

export class DadosImovel extends BaseViewModel {
  Uid: string;
  CreationDate: string;
  UpdateDate: string;
  UidContrato: string;
  Locatario: any;

  Proprietario: DadosProprietario;

  Endereco = new Endereco();
  Bloco: string;

  opcoesTipoCobrancaCondominio: OpcaoViewModel[] = [];

  Enabled: true;
  PlanoContratadoId: number;
  TipoPlano: number;

  VagasGaragem: number;
  Diversos: DiversosDadosImovel[];
  Taxas: TaxasDadosImovel[];
  AdministradoraCondominio: AdministradoraCondominio;
  SeguradoraFogo: SeguradoraFogo;
  OpcoesTaxas: OpcaoViewModel[];

  panelIndoBasicasIsOpen: boolean;
  panelInfoCondominioIsOpen: boolean;
  panelInfoTaxasIsOpen: boolean;
  panelInfoSeguroIsOpen: boolean;
  panelInfoDiversosIsOpen: boolean;
  enderecoAgrupado: boolean;

  ValorCondominio: number;
  TipoCobrancaCondominio: number;
  TituloPlano: string;

  ValorSeguroFogo: number;
  ParcelasSeguroFogo: number;
  OpcoesTipoPagamentoSeguroFogo: OpcaoViewModel[];
  OpcoesTipoPagamentoTaxas: OpcaoViewModel[];
  TipoPagamentoSeguroFogo: number;
  messages: any;
  typeMessage: any;
  timeMessage: any;

  private habilitarMock = false;

  constructor() {
    super();

    this.Diversos = [];
    this.Taxas = [];
    this.OpcoesTaxas = [];
    this.panelIndoBasicasIsOpen = true;
    this.panelInfoCondominioIsOpen = false;
    this.panelInfoTaxasIsOpen = false;
    this.panelInfoSeguroIsOpen = false;
    this.panelInfoDiversosIsOpen = false;
    this.enderecoAgrupado = true;
    this.TituloPlano = null;

    this.TipoCobrancaCondominio = 0;
    this.TipoPagamentoSeguroFogo = 0;
    this.OpcoesTipoPagamentoSeguroFogo = [];
    this.OpcoesTipoPagamentoTaxas = [];

    this.AdministradoraCondominio = new AdministradoraCondominio();
    this.SeguradoraFogo = new SeguradoraFogo();
    this.Diversos = [new DiversosDadosImovel()];
    this.propriedadesNaoEnviaveis = [
      'Taxas',
      'AdministradoraCondominio',
      'SeguradoraFogo',
      'Diversos',
      'DescricaoSituacaoImovel',
      'DescricaoTipoCobrancaCondominio',
      'DescricaoTipoPlano',
      'TituloPlano',
      'opcoesTipoCobrancaCondominio',
      'OpcoesTipoPagamentoTaxas',
      'OpcoesTipoPagamentoSeguroFogo',
      'enderecoAgrupado',
      'habilitarMock',
      'Endereco',
      'OpcoesTaxas',
      'propriedadesNaoMapeaveis',
      'panelIndoBasicasIsOpen',
      'panelInfoCondominioIsOpen',
      'panelInfoTaxasIsOpen',
      'panelInfoSeguroIsOpen',
      'panelInfoDiversosIsOpen',
      'propriedadesNaoEnviaveis'
    ];
    this.propriedadesNaoMapeaveis = [
      'Taxas',
      'AdministradoraCondominio',
      'SeguradoraFogo',
      'Diversos'
    ];

    this.carregarOpcoesTipoPagamentoTaxas();
    this.carregarOpcoesTipoPagamentoSeguroFogo();

    if (this.habilitarMock) {
      this.setarMock();
      this.panelInfoCondominioIsOpen = true;
      this.panelInfoTaxasIsOpen = true;
      this.panelInfoSeguroIsOpen = true;
      this.panelInfoDiversosIsOpen = true;
    }
  }

  carregarOpcoesTaxas(opcoesTaxas) {
    if (opcoesTaxas != null && Array.isArray(opcoesTaxas)) {
      this.OpcoesTaxas = opcoesTaxas;
      this.inicializarTaxas();
    }
  }

  trocarAdministradoraCondominio() {
    this.AdministradoraCondominio.HabilitarEdicao = false;
    this.AdministradoraCondominio = new AdministradoraCondominio();
  }

  trocarSeguradoraFogo() {
    this.SeguradoraFogo.HabilitarEdicao = false;
    this.SeguradoraFogo = new SeguradoraFogo();
  }

  inicializarTaxas() {
    this.Taxas = [];
    this.OpcoesTaxas.forEach(opcaoTaxa => {
      const taxa = new TaxasDadosImovel();
      taxa.TipoTaxaImovel = opcaoTaxa.Id;
      taxa.Descricao = opcaoTaxa.Descricao;

      this.Taxas.push(taxa);
    });

    if (this.habilitarMock) {
      this.setTaxasMock();
    }
  }

  toggleCollapse(keyPanel) {
    if (typeof this[keyPanel] !== 'undefined') {
      this[keyPanel] = !this[keyPanel];
    }
  }

  carregarOpcoesTipoPagamentoTaxas() {
    this.OpcoesTipoPagamentoTaxas = [];

    const opcao1 = new OpcaoViewModel();
    opcao1.Id = 1;
    opcao1.Descricao = 'Cota única';
    this.OpcoesTipoPagamentoTaxas.push(opcao1);

    const opcao2 = new OpcaoViewModel();
    opcao2.Id = 2;
    opcao2.Descricao = 'Parcelado';
    this.OpcoesTipoPagamentoTaxas.push(opcao2);
  }

  carregarOpcoesTipoPagamentoSeguroFogo() {
    this.OpcoesTipoPagamentoSeguroFogo = [];

    const opcao1 = new OpcaoViewModel();
    opcao1.Id = 1;
    opcao1.Descricao = 'Cota única';
    this.OpcoesTipoPagamentoSeguroFogo.push(opcao1);

    const opcao2 = new OpcaoViewModel();
    opcao2.Id = 2;
    opcao2.Descricao = 'Parcelado';
    this.OpcoesTipoPagamentoSeguroFogo.push(opcao2);
  }

  alterarTipoPagamentoSeguroFogo() {
    this.ParcelasSeguroFogo = this.TipoPagamentoSeguroFogo;
  }

  alterarValorParcelaSeguroFogo() {
    if (this.ParcelasSeguroFogo === 1) {
      this.TipoPagamentoSeguroFogo = 1;
    }
  }

  isEdicao() {
    return (
      this.Uid &&
      this.Uid !== '' &&
      this.Uid !== '00000000-0000-0000-0000-000000000000'
    );
  }

  setarMock() {
    const enderecoMock = new Endereco();
    enderecoMock.CEP = '20231-016';
    enderecoMock.Logradouro = 'Rua Ubaldino do Amaral';
    enderecoMock.Numero = '1';
    enderecoMock.Complemento = 'AP 101';
    enderecoMock.Bairro = 'Centro';
    enderecoMock.Cidade = 'Rio de Janeiro';
    enderecoMock.Estado = 'RJ';

    this.Endereco = enderecoMock;

    this.Bloco = '1';
    this.VagasGaragem = 2;
    this.ValorCondominio = 555.12;
    this.TipoCobrancaCondominio = 2;

    this.ParcelasSeguroFogo = 1;
    this.ValorCondominio = 999;

    const admMock = new AdministradoraCondominio();
    admMock.Nome = 'LD ADM';
    admMock.Email = 'ldadm@marlin.com.br';

    const contatoMock = new Contato();
    contatoMock.DDD = '21';
    contatoMock.Numero = '01234567';
    contatoMock.Telefone = '(21) 97965-6321';

    admMock.Contato = contatoMock;
    // admMock.Contatos = [contatoMock];

    // const dadosCobrancaCondominioMock = new DadosCobrancaCondominio();
    // dadosCobrancaCondominioMock.Valor = 555.12;
    // dadosCobrancaCondominioMock.TipoCobrancaCondominio = 2;
    // admMock.DadosCobrancaCondominio = dadosCobrancaCondominioMock;

    this.AdministradoraCondominio = admMock;

    const seguradoraFogoMock = new SeguradoraFogo();
    seguradoraFogoMock.Nome = 'LD Seguradora';
    seguradoraFogoMock.Email = 'ldseguradora@marlin.com.br';
    seguradoraFogoMock.Contato = contatoMock;

    // const dadosCobrancaSeguradoraFogo = new DadosCobrancaSeguradoraFogo();
    // dadosCobrancaSeguradoraFogo.Parcelas = 1;
    // dadosCobrancaSeguradoraFogo.Valor = 999;
    // seguradoraFogoMock.DadosCobrancaSeguradoraFogo = dadosCobrancaSeguradoraFogo;

    this.SeguradoraFogo = seguradoraFogoMock;

    const diversoMock = new DiversosDadosImovel();
    diversoMock.Valor = 777.12;
    diversoMock.Descricao = 'Piscina';

    this.Diversos = [diversoMock];
  }

  setTaxasMock() {
    this.Taxas.forEach((taxa, index) => {
      taxa.MesVencimento = index;
      taxa.NumeroInscricao = '1234' + index;
      taxa.Parcelas = 1;

      if (taxa.TipoTaxaImovel === 1) {
        taxa.TipoPagamento = 2;
        taxa.Parcelas = 12;
      }

      taxa.ValorBase = 500.11 + index * 10.11;
    });
  }

  enderecoChange(e: any) {
    if (e !== null && e !== undefined) {
      this.Endereco.Numero = e.Numero;
      this.Endereco.Logradouro = e.Logradouro;
      this.Endereco.Bairro = e.Bairro;
      this.Endereco.Cidade = e.Cidade;
      this.Endereco.Estado = e.Estado;
      this.Endereco.CEP = e.CEP;
      this.Endereco.Complemento = e.Complemento;
    }
  }


  obterEndereco() {
    return this.Endereco;
  }

  obterObjetoDeEnvio() {
    const data = {};

    Object.keys(this).forEach(item => {
      if (!this.propriedadesNaoEnviaveis.some(pnp => pnp === item)) {
        data[item] = this[item];
      }
    });

    this.obterEnderecoParaEnvio(data);

    data['Taxas'] = TaxasDadosImovel.obterListaParaEnvio(this.Taxas);
    data[
      'AdministradoraCondominio'
    ] = this.AdministradoraCondominio.obterObjetoParaEnvio();
    data['SeguradoraFogo'] = this.SeguradoraFogo.obterObjetoParaEnvio();
    data['Diversos'] = DiversosDadosImovel.obterListaParaEnvio(this.Diversos);

    return data;
  }

  obterEnderecoParaEnvio(data) {
    data.CEP = this.Endereco.CEP;
    data.Logradouro = this.Endereco.Logradouro;
    data.Numero = this.Endereco.Numero;
    data.Complemento = this.Endereco.Complemento;
    data.Bairro = this.Endereco.Bairro;
    data.Cidade = this.Endereco.Cidade;
    data.Estado = this.Endereco.Estado;
  }

  map(data) {
    super.map(data);

    this.Endereco = Endereco.map(data);
    this.AdministradoraCondominio = new AdministradoraCondominio();
    this.SeguradoraFogo = new SeguradoraFogo();

    if (data['Taxas']) {
      TaxasDadosImovel.mapUpdateList(this.Taxas, data['Taxas']);
    }

    if (data['AdministradoraCondominio']) {
      this.AdministradoraCondominio.map(data['AdministradoraCondominio']);
    }

    if (data['SeguradoraFogo']) {
      this.SeguradoraFogo.map(data['SeguradoraFogo']);
    }

    if (data['Diversos']) {
      this.Diversos = DiversosDadosImovel.mapList(data['Diversos']);
    }

    this.mapTipoPagamentoSeguroFogo(data);
  }

  mapTaxas(data) {    
      TaxasDadosImovel.mapUpdateList(this.Taxas, data);
  }

  mapTipoPagamentoSeguroFogo(data) {
    this.TipoPagamentoSeguroFogo =
      data['ParcelasSeguroFogo'] != null && data['ParcelasSeguroFogo'] > 1
        ? 2
        : data['ParcelasSeguroFogo'];
  }
}
