import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DetalheImovelService } from './../../../detalhe-imovel/detalhe-imovel.service';
import {
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ChangeDetectorRef,
  Component,
  OnChanges
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LocatarioFiadorGarantia } from './locatario-fiador-garantia';
import { SalvarLocatarioFiadorGarantiaService } from './salvar-locatario-fiador-garantia.service';
import { Observable } from 'rxjs/Observable';
import { MessageService } from 'app/services/message.service';
import { Endereco } from 'app/shared/input-busca-cep/endereco';
import { DadosImovel } from '../../salvar-dados-imovel/dados-imovel';

@Component({
  selector: 'app-salvar-locatario-fiador-garantia',
  templateUrl: './salvar-locatario-fiador-garantia.component.html',
  styleUrls: ['./salvar-locatario-fiador-garantia.component.scss']
})
export class SalvarLocatarioFiadorGarantiaComponent
  implements OnInit, OnChanges {
  @ViewChild('cadastroForm')
  cadastroForm;

  @Input()
  imovel: DadosImovel;

  @Input() enderecoImovel: Endereco;

  @Input()
  contrato: any;

  @Output()
  continuar: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  voltar: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('inputCpfCnpj')
  inputCpfCnpj: ElementRef;
  public inputCpfCnpjKeyupSub: Subscription;

  @ViewChild('inputCpfCnpjFiador')
  inputCpfCnpjFiador: ElementRef;
  public inputCpfCnpjFiadorKeyupSub: Subscription;

  locatarioFiadorGarantia: LocatarioFiadorGarantia;
  endereco = new Endereco();
  bloquearEdicaoDeEndereco: boolean;
  enderecoValido = false;

  carregandoFormulario = true;
  exibirFormulario = false;
  exibirCamposDoFormularioLocatario = false;
  exibirCamposDoFormularioFiador = false;
  messageStatus: string;
  messages = null;
  typeMessage = null;
  opcoesGenero: any[];
  opcoesGarantia: any[];
  buscandoLocatarioPeloCPFCNPJ = false;
  buscandoFiadorPeloCPFCNPJ = false;

  isEdicaoLocarioFiadorGarantia = false;

  messagesBuscaLocatario = null;
  messageStatusBuscaLocatario: string;

  messagesBuscaFiador = null;
  messageStatusBuscaFiador: string;
  ultimaBuscaCpfCnpjLocatario: string;
  ultimaBuscaCpfCnpjFiador: string;

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
  opcoesEstadoCivil: any;

  constructor(
    private salvarLocatarioFiadorGarantiaService: SalvarLocatarioFiadorGarantiaService,
    private detalheImovelService: DetalheImovelService,
    private route: ActivatedRoute,
    private cdref: ChangeDetectorRef,
    private messageService: MessageService,
    private router: Router
  ) {
    this.locatarioFiadorGarantia = new LocatarioFiadorGarantia();
    this.imovel = new DadosImovel();
  }

  ngOnInit() { }

  ngOnChanges() { }

  inicializarFormulario() {
    this.exibirFormulario = false;
    this.exibirCamposDoFormularioLocatario = false;
    this.exibirCamposDoFormularioFiador = false;
    this.isEdicaoLocarioFiadorGarantia = false;

    this.carregandoFormulario = true;
    this.messageStatus = 'Carregando...';
    this.messages = null;

    Observable.forkJoin([
      this.carregarOpcoesGarantia(),
      this.carregarDeEstadoCivil(),
      this.carregarOpcoesGenero()
    ]).subscribe(
      ([responseOpcoesGarantia, responseOpcoesGenero]) => {
        this.obterLocatarioFiardorGarantiaEmEdicao().subscribe(
          response => {
            this.carregandoFormulario = false;
            this.exibirFormulario = true;
            // this.observarCampoCpfCnpj();
            // this.observarCampoCpfCnpjFiador();
          },
          error => {
            if (error.status !== 404) {
              this.carregandoFormulario = false;
              this.isEdicaoLocarioFiadorGarantia = false;
              this.messages = [
                'Ocorreu um erro inesperado e não foi possível carregar as opções de formulário. Tente novamente mais tarde!'
              ];
              this.typeMessage = 'danger';
            } else {
              this.carregandoFormulario = false;
              this.exibirFormulario = true;
            }
            window.scrollTo(0, 0);
            // this.observarCampoCpfCnpj();
            // this.observarCampoCpfCnpjFiador();
          }
        );
      },
      error => {
        this.carregandoFormulario = false;
        this.messages = [
          'Ocorreu um erro inesperado e não foi possível carregar as opções de formulário. Tente novamente mais tarde!'
        ];
        this.typeMessage = 'danger';
        window.scrollTo(0, 0);
      }
    );
  }

  carregarOpcoesGenero() {
    return this.salvarLocatarioFiadorGarantiaService
      .getAllEnumOpcoesGenero()
      .map(data => {
        this.opcoesGenero = data;
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
          this.buscarLocatarioPeloCPFCNPJ();
          this.cdref.detectChanges();
        });
    }
  }

  observarCampoCpfCnpjFiador() {
    if (this.inputCpfCnpjFiador !== undefined) {
      this.inputCpfCnpjFiadorKeyupSub = Observable.fromEvent(
        this.inputCpfCnpjFiador.nativeElement,
        'keyup'
      )
        .debounceTime(1000)
        .subscribe((keyboardEvent: any) => {
          this.buscarFiadorPeloCPFCNPJ();
          this.cdref.detectChanges();
        });
    }
  }

  locatarioPessoaFisica() {
    return this.locatarioFiadorGarantia.Locatario.TipoPessoa === 1;
  }

  fiadorPessoaFisica() {
    return this.locatarioFiadorGarantia.Fiador.TipoPessoa === 1;
  }

  garantiaFiador() {
    return (
      this.locatarioFiadorGarantia.GarantiaImovel === 2
    );
  }

  garantiaSeguroFianca() {
    return (
      this.locatarioFiadorGarantia.GarantiaImovel === 1
    );
  }

  garantiaCaucao() {
    return (
      this.locatarioFiadorGarantia.GarantiaImovel === 3
    );
  }

  garantiaOutros() {
    return (
      this.locatarioFiadorGarantia.GarantiaImovel === 6
    );
  }

  garantiaTituloCapitalizacao() {
    return (
      this.locatarioFiadorGarantia.GarantiaImovel === 4
    );
  }

  garantiaCartaFianca() {
    return (
      this.locatarioFiadorGarantia.GarantiaImovel === 5
    );
  }

  alterarTipoPessoa() {
    this.locatarioFiadorGarantia.Locatario.CPFCNPJ = null;
    this.exibirCamposDoFormularioLocatario = false;
    this.messagesBuscaLocatario = null;
    this.locatarioFiadorGarantia.resetarDados();
  }

  alterarTipoPessoaFiador() {
    this.locatarioFiadorGarantia.Fiador.CPFCNPJ = null;
    this.locatarioFiadorGarantia.Fiador.resetarDados();
    this.exibirCamposDoFormularioFiador = false;
    this.messagesBuscaFiador = null;
  }

  buscarFiadorPeloCPFCNPJ(e?) {
    if (e) {
      e.preventDefault();
    }

    if (
      this.ultimaBuscaCpfCnpjFiador !==
      this.locatarioFiadorGarantia.Fiador.CPFCNPJ &&
      this.locatarioFiadorGarantia.Fiador.CPFCNPJ !== null &&
      this.locatarioFiadorGarantia.Fiador.CPFCNPJ.trim() !== ''
    ) {
      this.exibirCamposDoFormularioFiador = false;
      this.messagesBuscaFiador = null;
      this.buscandoFiadorPeloCPFCNPJ = true;

      this.locatarioFiadorGarantia.Fiador.resetarDados();

      if (this.CPFCNPJValidoFiador()) {
        this.salvarLocatarioFiadorGarantiaService
          .getFiadorByCPFCNPJ(this.locatarioFiadorGarantia.Fiador.CPFCNPJ)
          .subscribe(
            response => {
              this.buscandoFiadorPeloCPFCNPJ = false;
              this.exibirCamposDoFormularioFiador = true;
              this.locatarioFiadorGarantia.Fiador.map(response);
            },
            error => {
              this.buscandoFiadorPeloCPFCNPJ = false;
              this.exibirCamposDoFormularioFiador = true;
              this.messagesBuscaFiador = this.tratarRetornoDeError(error);
            }
          );
      } else {
        this.exibirCamposDoFormularioFiador = true;
        this.buscandoFiadorPeloCPFCNPJ = false;
        this.messagesBuscaFiador = ['CPF/ CNPJ inválido!'];
      }
    }
  }

  buscarLocatarioPeloCPFCNPJ(e?) {
    if (e) {
      e.preventDefault();
    }

    /*
      Bloco de código desativado que bloqueava a busca para não buscar 2x o mesmo cpf/ cnoj
      // this.ultimaBuscaCpfCnpjLocatario !==
      // this.locatarioFiadorGarantia.Locatario.CPFCNPJ &&
    */
    if (
      this.locatarioFiadorGarantia.Locatario.CPFCNPJ !== null &&
      this.locatarioFiadorGarantia.Locatario.CPFCNPJ.trim() !== ''
    ) {
      this.exibirCamposDoFormularioLocatario = false;
      this.messagesBuscaLocatario = null;
      this.buscandoLocatarioPeloCPFCNPJ = true;

      this.locatarioFiadorGarantia.resetarGarantia();
      this.locatarioFiadorGarantia.Locatario.resetarDados();

      if (this.CPFCNPJValido()) {
        this.salvarLocatarioFiadorGarantiaService
          .getByCPFCNPJ(this.locatarioFiadorGarantia.Locatario.CPFCNPJ)
          .subscribe(
            response => {
              this.ultimaBuscaCpfCnpjLocatario = this.locatarioFiadorGarantia.Locatario.CPFCNPJ;
              this.buscandoLocatarioPeloCPFCNPJ = false;
              this.exibirCamposDoFormularioLocatario = true;
              this.locatarioFiadorGarantia.Locatario.map(response);
            },
            error => {
              this.ultimaBuscaCpfCnpjLocatario = this.locatarioFiadorGarantia.Locatario.CPFCNPJ;
              this.buscandoLocatarioPeloCPFCNPJ = false;
              this.exibirCamposDoFormularioLocatario = true;
              this.messagesBuscaLocatario = this.tratarRetornoDeError(error);
            }
          );
      } else {
        this.exibirCamposDoFormularioLocatario = true;
        this.buscandoLocatarioPeloCPFCNPJ = false;
        this.messagesBuscaLocatario = ['CPF/ CNPJ inválido!'];
      }
    }
  }

  tratarRetornoDeError(error) {
    if (
      error &&
      Array.isArray(error) &&
      error.some(e => e.hasOwnProperty('Message'))
    ) {
      return error.map(e => e.Message);
    } else if (
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
      this.locatarioFiadorGarantia.Locatario.TipoPessoa > 0 &&
      this.locatarioFiadorGarantia.Locatario.CPFCNPJ !== undefined &&
      this.locatarioFiadorGarantia.Locatario.CPFCNPJ != null &&
      this.locatarioFiadorGarantia.Locatario.CPFCNPJ.trim() !== ''
    ) {
      const numerosCpfCnpj = this.locatarioFiadorGarantia.Locatario.CPFCNPJ.replace(
        /\D/g,
        ''
      );

      if (
        this.locatarioFiadorGarantia.Locatario.TipoPessoa === 1 &&
        numerosCpfCnpj.length >= 11
      ) {
        return true;
      }

      if (
        this.locatarioFiadorGarantia.Locatario.TipoPessoa === 2 &&
        numerosCpfCnpj.length >= 14
      ) {
        return true;
      }
    }

    return false;
  }

  CPFCNPJValidoFiador() {
    if (
      this.locatarioFiadorGarantia.Fiador.TipoPessoa > 0 &&
      this.locatarioFiadorGarantia.Fiador.CPFCNPJ !== undefined &&
      this.locatarioFiadorGarantia.Fiador.CPFCNPJ != null &&
      this.locatarioFiadorGarantia.Fiador.CPFCNPJ.trim() !== ''
    ) {
      const numerosCpfCnpj = this.locatarioFiadorGarantia.Fiador.CPFCNPJ.replace(
        /\D/g,
        ''
      );

      if (
        this.locatarioFiadorGarantia.Fiador.TipoPessoa === 1 &&
        numerosCpfCnpj.length >= 11
      ) {
        return true;
      }

      if (
        this.locatarioFiadorGarantia.Fiador.TipoPessoa === 2 &&
        numerosCpfCnpj.length >= 14
      ) {
        return true;
      }
    }

    return false;
  }

  addTelefoneFixo() {
    this.locatarioFiadorGarantia.Locatario.ContatosTelFixo.push({
      tipo: 1,
      telefone: ''
    });
  }

  addTelefoneFixoFiador() {
    this.locatarioFiadorGarantia.Fiador.ContatosTelFixo.push({
      tipo: 1,
      telefone: ''
    });
  }

  addTelefoneCelular() {
    this.locatarioFiadorGarantia.Locatario.ContatosTelCel.push({
      tipo: 2,
      telefone: ''
    });
  }

  addTelefoneCelularFiador() {
    this.locatarioFiadorGarantia.Fiador.ContatosTelCel.push({
      tipo: 2,
      telefone: ''
    });
  }

  deleteTelefoneFixo(i) {
    this.locatarioFiadorGarantia.Locatario.ContatosTelFixo.splice(i, 1);
  }

  deleteTelefoneFixoFiador(i) {
    this.locatarioFiadorGarantia.Fiador.ContatosTelFixo.splice(i, 1);
  }

  deleteTelefoneCelular(i) {
    this.locatarioFiadorGarantia.Locatario.ContatosTelCel.splice(i, 1);
  }

  deleteTelefoneCelularFiador(i) {
    this.locatarioFiadorGarantia.Fiador.ContatosTelCel.splice(i, 1);
  }

  addImovelFiador() {
    this.locatarioFiadorGarantia.Fiador.ImoveisFiador.push({
      Endereco: null
    });
  }

  deleteImovelFiador(i) {
    this.locatarioFiadorGarantia.Fiador.ImoveisFiador.splice(i, 1);
  }

  salvarLocatarioFiadorGarantia(formCadastro) {
    window.scrollTo(0, 0);
    this.carregandoFormulario = true;
    this.exibirFormulario = false;
    this.messageStatus = 'Enviando dados...';
    this.messages = null;

    if (!this.isEdicaoLocarioFiadorGarantia) {
      this.cadastrarLocatarioFiadorGarantia();
    } else {
      this.atualizarLocatarioFiadorGarantia();
    }
  }

  carregarOpcoesGarantia() {
    return this.salvarLocatarioFiadorGarantiaService
      .getAllEnumGarantiaImovel()
      .map(data => {
        this.opcoesGarantia = data;
        return data;
      });
  }

  carregarDeEstadoCivil() {
    return this.salvarLocatarioFiadorGarantiaService
      .getAllEnumEstadoCivil()
      .map(data => {
        this.opcoesEstadoCivil = data;
        return data;
      });
  }

  cadastrarLocatarioFiadorGarantia() {
    this.locatarioFiadorGarantia.mapReverse();

    this.salvarLocatarioFiadorGarantiaService
      .cadastrarLocatarioFiadorGarantia(this.locatarioFiadorGarantia)
      .subscribe(
        response => {
          this.exibirFormulario = true;
          // this.messages = ['Proprietário salvo com sucesso!'];
          // this.typeMessage = 'success';
          this.carregandoFormulario = false;
          this.locatarioFiadorGarantia.map(response);

          // this.imovel.messages = ['Locatário salvo com sucesso!'];
          // this.imovel.typeMessage = 'success';
          this.messageService.message = [
            'Cadastro do imóvel concluído com sucesso!'
          ];

          this.isEdicaoLocarioFiadorGarantia = true;
          this.continuar.emit();
          this.router.navigate(['autogestao', 'imoveis']);
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

  atualizarLocatarioFiadorGarantia() {
    this.locatarioFiadorGarantia.mapReverse();

    this.salvarLocatarioFiadorGarantiaService
      .updateLocatarioFiadorGarantia(this.locatarioFiadorGarantia)
      .subscribe(
        response => {
          this.exibirFormulario = true;
          // this.messages = ['Proprietário salvo com sucesso!'];
          // this.typeMessage = 'success';
          this.carregandoFormulario = false;
          // this.locatarioFiadorGarantia.map(response);
          this.messageService.message = [
            'Edição do imóvel concluída com sucesso!'
          ];
          this.router.navigate(['autogestao', 'imoveis']);

          // this.imovel.messages = ['Locatário salvo com sucesso!'];
          // this.imovel.typeMessage = 'success';
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

  private isEdicao() {
    return (
      this.locatarioFiadorGarantia &&
      this.locatarioFiadorGarantia.Locatario &&
      this.locatarioFiadorGarantia.Locatario.possuiUid()
    );
  }

  obterLocatarioFiardorGarantiaEmEdicao() {
    return this.detalheImovelService
      .getDetailsWithLocatarioFiador(this.imovel.UidContrato)
      .map(response => {
        this.locatarioFiadorGarantia.map(response, this.imovel);
        this.locatarioFiadorGarantia.setUidContrato(this.imovel.UidContrato);

        if (
          this.locatarioFiadorGarantia.Locatario &&
          this.locatarioFiadorGarantia.Locatario.possuiUid()
        ) {
          this.exibirCamposDoFormularioLocatario = true;
          this.isEdicaoLocarioFiadorGarantia = true;
          this.imovel.Locatario = this.locatarioFiadorGarantia;
        }

        if (
          this.locatarioFiadorGarantia.Fiador &&
          this.locatarioFiadorGarantia.Fiador.possuiUid()
        ) {
          this.exibirCamposDoFormularioFiador = true;
        }

        return response;
      })
      .catch(error => {
        this.locatarioFiadorGarantia.setUidContrato(this.imovel.UidContrato);
        return Observable.throw(error);
      });
  }

  _voltar(e) {
    window.scrollTo(0, 0);
    this.voltar.emit();
  }

  enderecoChange(e: any) {
    if (e !== null && e !== undefined) {
      // this.imovel.Numero = e.Numero;
      // this.imovel.Logradouro = e.Logradouro;
      // this.imovel.Bairro = e.Bairro;
      // this.imovel.Cidade = e.Cidade;
      // this.imovel.Estado = e.Estado;
      // this.imovel.CEP = e.CEP;
      // this.imovel.Complemento = e.Complemento;
    }
  }

  habilitarTrocaDeLocatario() {
    return !this.imovel.Locatario || this.imovel.Locatario == null;
  }

  habilitarTrocaDeFiador() {
    return !this.isEdicaoLocarioFiadorGarantia;
  }

  utilizarEnderecoImovel(e?) {
    if (this.locatarioFiadorGarantia.flagUtilizarEnderecoImovel) {
      this.endereco = this.imovel.obterEndereco();
      this.locatarioFiadorGarantia.Locatario.EnderecoCobranca = this.endereco;
    } else {
      this.endereco = new Endereco();
      this.locatarioFiadorGarantia.Locatario.EnderecoCobranca = this.endereco;
    }
  }

  formularioInvalido() {
    let output = false;

    if (this.locatarioFiadorGarantia.Locatario) {
      output = (this.locatarioFiadorGarantia.Locatario.possuiTelefoneFixoInvalido() || this.locatarioFiadorGarantia.Locatario.possuiTelefoneCelularInvalido());
    }

    if (!output && this.locatarioFiadorGarantia.Fiador) {
      output = (this.locatarioFiadorGarantia.Fiador.possuiTelefoneFixoInvalido() || this.locatarioFiadorGarantia.Fiador.possuiTelefoneCelularInvalido());
    }

    return output;
  }


  setMock() {
    this.locatarioFiadorGarantia.Locatario.TipoPessoa = 1;
    this.locatarioFiadorGarantia.Locatario.CPFCNPJ = "451.417.248-08";
    this.locatarioFiadorGarantia.Locatario.Nome = "Lucas Domingues";
    this.locatarioFiadorGarantia.Locatario.Email = "ldomingues@marlin.com.br";
    this.locatarioFiadorGarantia.Locatario.DataNascimento = "17-09-1991";
    this.locatarioFiadorGarantia.Locatario.Sexo = 2;

    this.locatarioFiadorGarantia.Locatario.Nacionalidade = "Brasileiro";
    this.locatarioFiadorGarantia.Locatario.EstadoCivil = "1";
    this.locatarioFiadorGarantia.Locatario.Profissao = "Desenvolvedor";

    this.locatarioFiadorGarantia.flagUtilizarEnderecoImovel = true;

    this.utilizarEnderecoImovel();

    this.buscandoLocatarioPeloCPFCNPJ = false;
    this.exibirCamposDoFormularioLocatario = true;

    this.locatarioFiadorGarantia.GarantiaImovel = 4;

    // this.locatarioFiadorGarantia.Locatario.Contatos = "Lucas Domingues";
  }
}
