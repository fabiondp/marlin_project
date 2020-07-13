import { DadosImovel } from './../salvar-dados-imovel/dados-imovel';
import { Contato } from 'app/shared/contato';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  ElementRef,
  Output,
  Input,
  EventEmitter
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { DadosProprietario } from './dados-proprietario';
import { SalvarDadosProprietarioService } from './salvar-dados-proprietario.service';
import { DetalheImovelService } from '../../detalhe-imovel/detalhe-imovel.service';
import { ModalComponent } from '../../../../bootstrap/modal/modal.component';
import { AuthService } from 'app/services/auth.service';
import { InformacoesBancariasService } from 'app/autogestao/financeiro/informacoes-bancarias/informacoes-bancarias.service';
import { AlertaConvenioBancarioService } from 'app/autogestao/alerta-convenio-bancario/alerta-convenio-bancario.service';
import { RepresentanteDadosProprietario } from './representante-dados-proprietario';

@Component({
  selector: 'app-salvar-dados-proprietario',
  templateUrl: './salvar-dados-proprietario.component.html',
  styleUrls: ['./salvar-dados-proprietario.component.scss']
})
export class SalvarDadosProprietarioComponent implements OnInit, AfterViewInit {
  @ViewChild('cadastroForm')
  cadastroUserForm;

  @ViewChild('inputCpfCnpj')
  inputCpfCnpj: ElementRef;
  public inputCpfCnpjKeyupSub: Subscription;

  @ViewChild('cpfProprietario') cpfProprietario;
  @ViewChild('cnpjProprietario') cnpjProprietario;

  @ViewChild('cpfRepresentante') cpfRepresentante;
  @ViewChild('cnpjRepresentante') cnpjRepresentante;

  @Input()
  imovel: DadosImovel;

  @Output()
  imovelChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  continuar: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  voltar: EventEmitter<any> = new EventEmitter<any>();

  proprietario: DadosProprietario;
  proprietarioArquivado: DadosProprietario;
  carregandoFormulario = true;
  exibirFormulario = false;
  exibirCamposDoFormulario = false;
  opcoesGenero: any[];
  opcoesEstadoCivil: any[];
  opcoesDeTipoDoCadastro: any[];
  messageStatus: string;
  messages = null;
  typeMessage = null;
  buscandoProprietarioPeloCPFCNPJ = false;
  messagesBuscaProprietario = null;
  messageStatusBuscaProprietario: string;
  UidProprietarioArquivado = null;
  isNovoProprietario = false;
  ultimaBuscaPorCpfCnpj: string;
  ultimaBuscaPorCpfCnpjRepresentante: string;
  opcoesTipoRepresentante: any[];

  OpcoesBanco: any;

  public maskCPF = [
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/
  ];

  public maskCNPJ = [
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '/',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/
  ];

  public masktel = [
    '(',
    /[1-9]/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  public maskcel = [
    '(',
    /[1-9]/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  public maskDate = [
    /[0-3]/,
    /\d/,
    '/',
    /[0-1]/,
    /[0-9]/,
    '/',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  @ViewChild("modalArquivarProprietario")
  modalArquivarProprietario: ModalComponent;

  @ViewChild("modalConfirmarPerdaDadosContratoDeAdministracao")
  modalConfirmarPerdaDadosContratoDeAdministracao: ModalComponent;

  isDetail: boolean;
  habilitarMock = false;
  confirmaPerdaContratoAdm = false;

  tooltip = {
    collapseDadosBancarios: 'Informe os dados bancários aonde o <strong>proprietário</strong> receberá os valores líquidos referentes a locação do imóvel no dia da remessa.',
    collapseRepresentacao: 'Caso o proprietário tenha algum representante neste imóvel para os assuntos referentes a esta locação, informe os dados abaixo.',
  };

  constructor(
    private alertaConvenioBancarioService: AlertaConvenioBancarioService,
    private informacoesBancariasService: InformacoesBancariasService,
    private salvarProprietarioService: SalvarDadosProprietarioService,
    private detalheImovelService: DetalheImovelService,
    private route: ActivatedRoute,
    private router: Router,
    private cdref: ChangeDetectorRef,
    private authService: AuthService
  ) {
    this.proprietario = new DadosProprietario();
    this.isDetail = false;

    if (this.habilitarMock) {
      this.exibirCamposDoFormulario = true;
    }
  }

  ngOnInit() { }

  ngAfterViewInit() {
    if (this.route.snapshot.url.some(u => u.path === "detalhe")) {
      this.isDetail = true;
      const instanciaDoComponente = this;
      setTimeout(function () {
        instanciaDoComponente.inicializarFormulario();
      }, 500);
    }

    if (this.route.snapshot.url.some(u => u.path === "detalhe")) {

    }
  }

  inicializarFormulario(atualizacaoProprietario?: boolean) {
    window.scrollTo(0, 0);

    if (this.imovelEstaPreCadastrado()) {
      this.proprietario.UidImovel = this.imovel.Uid;
      this.carregandoFormulario = true;
      this.messageStatus = 'Carregando...';
      this.messages = null;
      Observable.forkJoin([
        this.carregarOpcoesGenero(),
        this.carregarDeEstadoCivil(),
        this.carregarBancos(),
        this.carregarOpcoesTipoRepresentante()
      ]).subscribe(
        ([responseOpcoesGenero, responseDeEstadoCivil, responseBancos, responseTipoRepresentante]) => {

          this.obterProprietarioEmEdicao().subscribe(
            response => {
              this.carregandoFormulario = false;
              this.exibirFormulario = true;
              this.exibirCamposDoFormulario = true;

              if (atualizacaoProprietario === true) {
                this.abrirModalNovoProprietario(this.proprietario);
              }

              // this.observarCampoCpfCnpj();
              window.scrollTo(0, 0);
            },
            error => {
              if (error.status !== 404) {
                this.carregandoFormulario = false;
                this.messages = [
                  'Ocorreu um erro inesperado e não foi possível carregar os recursos da página. Tente novamente mais tarde!'
                ];
                this.typeMessage = 'danger';
              } else {
                this.carregandoFormulario = false;
                this.exibirFormulario = true;
              }

              window.scrollTo(0, 0);
              // this.observarCampoCpfCnpj();
            }
          );
        },
        error => {
          this.carregandoFormulario = false;
          this.messages = [
            'Ocorreu um erro inesperado e não foi possível carregar os recursos da página. Tente novamente mais tarde!'
          ];
          this.typeMessage = 'danger';
          window.scrollTo(0, 0);
        }
      );
    } else {
      this.router.navigate(['/autogestao/imoveis/cadastrar']);
    }
  }

  carregarBancos() {
    return this.salvarProprietarioService.getAllEnumCodigoBanco().map(data => {
      this.OpcoesBanco = data;
      return data;
    });
  }

  carregarOpcoesGenero() {
    return this.salvarProprietarioService.getAllEnumOpcoesGenero().map(data => {
      this.opcoesGenero = data;
      return data;
    });
  }

  carregarDeEstadoCivil() {
    return this.salvarProprietarioService.getAllEnumEstadoCivil().map(data => {
      this.opcoesEstadoCivil = data;
      return data;
    });
  }

  carregarOpcoesTipoRepresentante() {
    return this.salvarProprietarioService.getAllEnumTipoRepresentante().map(data => {
      this.opcoesTipoRepresentante = data;
      return data;
    });
  }

  observarCampoCpfCnpj() {
    if (this.inputCpfCnpj !== undefined) {
      this.inputCpfCnpjKeyupSub = Observable.fromEvent(
        this.inputCpfCnpj.nativeElement,
        'keyup'
      )
        .debounceTime(1000)
        .subscribe((keyboardEvent: any) => {
          this.buscarProprietarioPeloCPFCNPJ();
          this.cdref.detectChanges();
        });
    }
  }

  alterarTipoPessoa() {
    this.proprietario.CPFCNPJ = null;
    this.exibirCamposDoFormulario = false;
    this.messagesBuscaProprietario = null;
    this.proprietario.resetarDados();

    if (this.cpfProprietario) {
      this.cpfProprietario.reset();
    }

    if (this.cnpjProprietario) {
      this.cnpjProprietario.reset();
    }
  }

  proprietarioCasado() {
    return this.proprietario.EstadoCivil === 2;
  }

  buscarProprietarioPeloCPFCNPJ(e?, force?) {
    if (e) {
      e.preventDefault();
    }

    const numerosCpfCnpjForm = this.proprietario.CPFCNPJ.replace(/\D/g, '');
    const numerosCpfCnpjUsuarioLogado = this.authService.user.cpfcnpj.replace(/\D/g, '');
    this.proprietario.flagPreencherDadosComInformacoesCadastrais = numerosCpfCnpjForm === numerosCpfCnpjUsuarioLogado;


    if (force || (this.ultimaBuscaPorCpfCnpj !== this.proprietario.CPFCNPJ && this.proprietario.CPFCNPJ !== null && this.proprietario.CPFCNPJ.trim() !== "")) {
      this.exibirCamposDoFormulario = false;
      this.messagesBuscaProprietario = null;
      this.buscandoProprietarioPeloCPFCNPJ = true;
      this.proprietario.resetarDados();

      if (this.CPFCNPJValido()) {
        this.salvarProprietarioService
          .getByCPFCNPJ(this.proprietario.CPFCNPJ)
          .subscribe(
            response => {
              this.ultimaBuscaPorCpfCnpj = this.proprietario.CPFCNPJ;
              this.buscandoProprietarioPeloCPFCNPJ = false;
              this.exibirCamposDoFormulario = true;
              this.proprietario.map(response);
              // this.proprietario.flagPreencherDadosComInformacoesCadastrais = this.proprietario.CPFCNPJ === this.authService.user.cpfcnpj;
            },
            error => {
              this.ultimaBuscaPorCpfCnpj = this.proprietario.CPFCNPJ;

              if (this.proprietario.flagPreencherDadosComInformacoesCadastrais) {
                this.preencherProprietarioComDadosDoUsuarioLogado();
              } else {
                this.buscandoProprietarioPeloCPFCNPJ = false;
                this.exibirCamposDoFormulario = true;
                this.messagesBuscaProprietario = this.tratarRetornoDeError(error);
              }
            }
          );
      } else {
        // this.exibirCamposDoFormulario = true;
        this.ultimaBuscaPorCpfCnpj = this.proprietario.CPFCNPJ;
        if (this.proprietario.TipoPessoa === 1) {
          this.cadastroUserForm.controls["CPF"].markAsDirty();
          this.cadastroUserForm.controls["CPF"].setErrors({
            invalid: true
          });
        } else if (this.proprietario.TipoPessoa === 2) {
          this.cadastroUserForm.controls["CNPJ"].markAsDirty();
          this.cadastroUserForm.controls["CNPJ"].setErrors({
            invalid: true
          });
        }

        this.buscandoProprietarioPeloCPFCNPJ = false;
        this.messagesBuscaProprietario = ['CPF/ CNPJ inválido!'];
      }
    }
  }

  tratarRetornoDeError(error) {
    if (
      error &&
      error.error &&
      error.error.some(e => e.hasOwnProperty('Message'))
    ) {
      return error.error.map(e => e.Message);
    }
    return ['Ocorreu um erro inesperado! Tente novamente mais tarde'];
  }

  CPFCNPJValido() {
    if (
      this.proprietario.TipoPessoa > 0 &&
      this.proprietario.CPFCNPJ !== undefined &&
      this.proprietario.CPFCNPJ != null &&
      this.proprietario.CPFCNPJ.trim() !== ''
    ) {
      const numerosCpfCnpj = this.proprietario.CPFCNPJ.replace(/\D/g, '');
      if (this.proprietario.TipoPessoa === 1 && numerosCpfCnpj.length >= 11) {
        return true;
      }
      if (this.proprietario.TipoPessoa === 2 && numerosCpfCnpj.length >= 14) {
        return true;
      }
    }
    return false;
  }

  addTelefoneFixo() {
    this.proprietario.ContatosTelFixo.push({
      tipo: 1,
      telefone: ''
    });
  }

  addTelefoneCelular() {
    this.proprietario.ContatosTelCel.push({
      tipo: 2,
      telefone: ''
    });
  }

  deleteTelefoneFixo(i) {
    this.proprietario.ContatosTelFixo.splice(i, 1);
  }

  deleteTelefoneCelular(i) {
    this.proprietario.ContatosTelCel.splice(i, 1);
  }

  salvarDadosProprietario(formCadastro) {
    window.scrollTo(0, 0);

    if (this.proprietario
      && this.proprietario.flagPreencherDadosComInformacoesCadastrais
      && this.proprietarioArquivado
      && this.isNovoProprietario
      && !this.confirmaPerdaContratoAdm) {
      this.abrirModalConfirmarPerdaDadosContratoDeAdministracao();
      return false;
    } else {
      this.salvarProprietario();
    }
  }

  salvarProprietario() {
    window.scrollTo(0, 0);

    this.carregandoFormulario = true;
    this.exibirFormulario = false;
    this.messageStatus = 'Enviando dados...';
    this.messages = null;

    if (!this.isEdicao()) {
      this.cadastrarDadosProprietario();
    } else {
      this.atualizarDadosProprietario();
    }
  }

  public isEdicao() {
    return (
      this.proprietario &&
      this.proprietario.Uid &&
      this.proprietario.Uid !== '' &&
      this.proprietario.Uid !== '00000000-0000-0000-0000-000000000000'
    );
  }

  cadastrarDadosProprietario() {
    this.proprietario.mapReverse();

    this.salvarProprietarioService
      .cadastrarDadosProprietario(this.proprietario.obterObjetoDeEnvio())
      .subscribe(
        response => {
          this.exibirFormulario = true;
          this.imovel.messages = ['Dados do proprietário salvos com sucesso!'];
          this.imovel.typeMessage = 'success';
          this.imovel.timeMessage = 5000;
          this.imovel.Proprietario = this.proprietario;
          this.carregandoFormulario = false;
          this.proprietario.map(response);
          this.isNovoProprietario = false;
          this.continuar.emit();
        },
        error => {
          this.messages = this.tratarRetornoDeError(error);
          this.typeMessage = 'danger';
          this.exibirFormulario = true;
          this.carregandoFormulario = false;
          window.scrollTo(0, 0);
        }
      );
  }

  proprietarioPessoaFisica() {
    return this.proprietario.TipoPessoa === 1;
  }

  atualizarDadosProprietario() {
    this.proprietario.mapReverse();

    this.salvarProprietarioService
      .atualizarDadosProprietario(this.proprietario.obterObjetoDeEnvio())
      .subscribe(
        response => {
          this.exibirFormulario = true;
          this.imovel.messages = ['Dados do proprietário salvos com sucesso!'];
          this.imovel.typeMessage = 'success';
          this.imovel.timeMessage = 5000;
          this.imovel.Proprietario = this.proprietario;
          this.carregandoFormulario = false;
          this.isNovoProprietario = false;
          this.continuar.emit();
        },
        error => {
          this.messages = this.tratarRetornoDeError(error);
          this.typeMessage = 'danger';
          this.exibirFormulario = true;
          this.carregandoFormulario = false;
          window.scrollTo(0, 0);
        }
      );
  }

  obterProprietarioEmEdicao() {
    window.scrollTo(0, 0);
    return this.detalheImovelService
      .getDetailProprietario(this.imovel.Uid)
      .map(response => {

        this.isNovoProprietario = false;
        this.proprietario.map(response, this.OpcoesBanco);
        this.proprietario.flagPreencherDadosComInformacoesCadastrais = this.proprietario.CPFCNPJ === this.authService.user.cpfcnpj;
        this.proprietario.EstaEmEdicao = true;

        if (this.isDetail) {
          this.proprietario.panelDadosPessoaisIsOpen = true;
          this.proprietario.panelRepresentacaoIsOpen = true;
          this.proprietario.panelInfoBancariasIsOpen = true;
        }

        this.imovel.Proprietario = this.proprietario;
        window.scrollTo(0, 0);

        return response;
      });
  }

  imovelEstaPreCadastrado() {
    return (
      this.imovel &&
      this.imovel.Uid &&
      this.imovel.Uid !== '' &&
      this.imovel.Uid !== '00000000-0000-0000-0000-000000000000'
    );
  }

  _voltar() {
    window.scrollTo(0, 0);
    this.voltar.emit();
  }

  abrirModalNovoProprietario(proprietario) {
    this.proprietarioArquivado = proprietario;
    this.modalArquivarProprietario.open();
  }

  cadastrarNovoProprietario() {
    const uid = this.proprietarioArquivado.Uid;
    this.proprietario.inicializarDados();
    this.proprietario.TipoPessoa = 1;
    this.modalArquivarProprietario.close();
    this.isNovoProprietario = true;
    this.messagesBuscaProprietario = null;
    this.proprietario.UidInativar = uid;
    // this.imovel.Proprietario = null;
    this.exibirCamposDoFormulario = false;
    this.messagesBuscaProprietario = null;
    this.proprietario.EstaEmEdicao = false;
    this.ultimaBuscaPorCpfCnpj = null;
    this.ultimaBuscaPorCpfCnpjRepresentante = null;
  }

  habilitarTrocaDeProprietario() {
    // return this.imovel.Proprietario == null;
    return this.isNovoProprietario || !this.proprietario.EstaEmEdicao;
  }

  preencherDadosComInformacoesCadastrais(e?) {
    const numerosCpfCnpjForm = this.proprietario.CPFCNPJ.replace(/\D/g, '');
    const numerosCpfCnpjUsuarioLogado = this.authService.user.cpfcnpj.replace(/\D/g, '');

    this.proprietario.flagPreencherDadosComInformacoesCadastrais = numerosCpfCnpjForm === numerosCpfCnpjUsuarioLogado;

    if (this.proprietario.flagPreencherDadosComInformacoesCadastrais) {
      this.proprietario.CPFCNPJ = this.authService.user.cpfcnpj;
      const numerosCpfCnpj = this.proprietario.CPFCNPJ.replace(/\D/g, '');
      this.proprietario.TipoPessoa = numerosCpfCnpj.length >= 14 ? 2 : 1;

      this.buscarProprietarioPeloCPFCNPJ(e, true);
    } else {
      this.proprietario.CPFCNPJ = null;
      this.exibirCamposDoFormulario = false;
      this.proprietario.resetarDados();
    }
  }

  preencherProprietarioComDadosDoUsuarioLogado() {
    this.proprietario.Nome = this.authService.user.nome;
    this.proprietario.Email = this.authService.user.email;
    // this.proprietario.DataNascimento = this.authService.user.dataNascimento;
    this.proprietario.mapDataNascimento({ DataNascimento: this.authService.user.dataNascimento });
    this.proprietario.EstadoCivil = this.authService.obterEstadoCivil();
    this.proprietario.Sexo = this.authService.obterGenero();

    if (this.authService.user.contatos && Array.isArray(this.authService.user.contatos) && this.authService.user.contatos.length > 0) {
      this.proprietario.Contatos = this.authService.user.contatos.map(c => {
        const cc = new Contato();
        cc.DDD = c.ddd;
        cc.Numero = c.numero;
        cc.TipoContato = c.tipoContato === "Celular" ? 2 : 1;

        return cc;
      });

      this.proprietario.mapContatos(this.authService.user.contatos);
    }

    this.buscandoProprietarioPeloCPFCNPJ = false;
    this.exibirCamposDoFormulario = true;

    // this.buscarInformacoesBancariasDoUsuarioLogado();
  }

  buscarInformacoesBancariasDoUsuarioLogado() {
    this.alertaConvenioBancarioService
      .verificarAprovacaoConvenioBancario()
      .subscribe(
        response => {
          this.proprietario.informacaoBancaria.map(response, this.OpcoesBanco);

          this.buscandoProprietarioPeloCPFCNPJ = false;
          this.exibirCamposDoFormulario = true;
        },
        error => {
          this.buscandoProprietarioPeloCPFCNPJ = false;
          this.exibirCamposDoFormulario = true;

          if (error.status === 404) {
            this.exibirFormulario = true;
          }
        }
      );
  }

  buscarRepresentantePeloCPFCNPJ(e?, force?) {
    if (e) {
      e.preventDefault();
    }

    if (force || this.ultimaBuscaPorCpfCnpjRepresentante !== this.proprietario.Representante.CPFCNPJ && this.proprietario.Representante.CPFCNPJ !== null && this.proprietario.Representante.CPFCNPJ.trim() !== "") {
      this.proprietario.Representante.exibirCampos = false;
      this.proprietario.Representante.messagesBusca = null;
      this.proprietario.Representante.buscandoPeloCPFCNPJ = true;

      this.proprietario.Representante.resetarDados();

      if (this.proprietario.Representante.CPFCNPJValido()) {
        this.salvarProprietarioService
          .getRepresentanteByCPFCNPJ(this.proprietario.Representante.CPFCNPJ)
          .subscribe(
            response => {
              this.ultimaBuscaPorCpfCnpjRepresentante = this.proprietario.Representante.CPFCNPJ;
              this.proprietario.Representante.buscandoPeloCPFCNPJ = false;
              this.proprietario.Representante.exibirCampos = true;
              this.proprietario.Representante.map(response);
            },
            error => {
              this.ultimaBuscaPorCpfCnpjRepresentante = this.proprietario.Representante.CPFCNPJ;
              this.proprietario.Representante.buscandoPeloCPFCNPJ = false;
              this.proprietario.Representante.exibirCampos = true;
              this.proprietario.Representante.messagesBusca = this.tratarRetornoDeError(error);
            }
          );
      } else {
        // this.proprietario.Representante.exibirCampos = true;
        this.proprietario.Representante.buscandoPeloCPFCNPJ = false;
        this.proprietario.Representante.messagesBusca = ['CPF/ CNPJ inválido!'];
      }
    }
  }

  alterarTipoPessoaRepresentante() {
    this.proprietario.Representante.resetarDados();
  }

  alternarRepresentacao() {

  }

  atualizarTitularProprietario() {
    if (this.proprietario.TitularProprietario) {
      this.proprietario.informacaoBancaria.Titular.Nome = this.proprietario.Nome;
      this.proprietario.informacaoBancaria.Titular.TipoPessoa = this.proprietario.TipoPessoa;
      this.proprietario.informacaoBancaria.Titular.CPFCNPJ = this.proprietario.CPFCNPJ;
    } else {
      this.proprietario.informacaoBancaria.Titular.Nome = null;
      this.proprietario.informacaoBancaria.Titular.TipoPessoa = 1;
      this.proprietario.informacaoBancaria.Titular.CPFCNPJ = null;
    }
  }

  atualizarNomeProprietario() {
    if (this.proprietario.TitularProprietario) {
      this.proprietario.informacaoBancaria.Titular.Nome = this.proprietario.Nome;
    }
  }

  abrirModalConfirmarPerdaDadosContratoDeAdministracao() {
    this.confirmaPerdaContratoAdm = false;
    this.modalConfirmarPerdaDadosContratoDeAdministracao.open();
  }

  confirmarPerdaContratoAdministracao() {
    this.confirmaPerdaContratoAdm = true;
    this.salvarDadosProprietario(null);
    this.modalConfirmarPerdaDadosContratoDeAdministracao.close();
  }
}
