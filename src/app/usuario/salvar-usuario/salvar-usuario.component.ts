import { FormsModule, NgForm } from '@angular/forms';
import {
  Component,
  OnInit,
  OnDestroy,
  NgModule,
  ViewChild,
  AfterViewInit,
  OnChanges,
  NgZone
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { } from 'googlemaps';
import { UsuarioService } from '../../services/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalComponent } from '../../bootstrap/modal/modal.component';
import { LOCATION_INITIALIZED, DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../usuario';
import { UsuarioDto } from '../usuario-dto';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { conformToMask } from 'text-mask-core';

const { log } = console;
@Component({
  selector: 'app-salvar-usuario',
  templateUrl: './salvar-usuario.component.html',
  styleUrls: ['./salvar-usuario.component.scss']
})
export class SalvarUsuarioComponent implements OnInit, OnDestroy {
  @ViewChild('cadastroUsuarioForm') cadastroUserForm;
  @ViewChild(ModalComponent) modal: ModalComponent;
  @ViewChild('modalUsuarioAdm') modalUsuarioAdm;

  possuiResponsavel = false;
  enviado: boolean;
  message = null;
  typeMessage = null;
  timeMessage = null;
  messageArray = null;
  carregandoForm = false;
  redirectHome = ['/home'];
  redirectDashboard = ['/dashboard'];
  redirectLogin = ['/login'];

  /*Variáveis validação CPFCNPJ, E-mail e Aceite Termo*/
  tipoCPFCNPJ = 'CPF';
  entradaCPFCNPJ = '';
  invalidSizeCPFCNPJ = false;
  registerStatus = false;
  termoAceite = false;
  continuarClicked = false;
  invalidEmailFormat = false;
  entradaEmail = '';
  enderecoValido = false;

  /*Variáveis formulário*/
  public localizacao: any = '';
  public errorOnSubmit = null;
  localicazaoTraduzida = false;
  userSettings: any = {
    inputPlaceholderText: 'Digite o endereço completo',
    showRecentSearch: true
  };
  minimoTelefone = true;
  disableRemoveCelular = true;
  disableRemoveFixo = true;
  estadosCivis;
  sexoList;
  // tiposDeContatos = [
  //   {
  //     tipo: "",
  //     descricao: 'Escolha o tipo de telefone'
  //   },
  //   {
  //     tipo: 1,
  //     descricao: 'Telefone Fixo'
  //   },
  //   {
  //     tipo: 2,
  //     descricao: 'Telefone Celular'
  //   }
  // ];
  telefonesFixos = [
    {
      tipo: 1,
      telefone: ''
    }
  ];
  telefonesCelulares = [
    {
      tipo: 2,
      telefone: ''
    }
  ];
  autenticacao = {
    senhaAtual: '',
    senha: '',
    confirmaSenha: ''
  };
  senhaAtualServidor;
  exibirBlocoEndereco = false;

  usuario = new Usuario();
  usuarioSend = new UsuarioDto();
  ocultarAutocompleteDeEndereco = false;
  regexPadraoCelular = /\(?\d{2}\)?\s?[6-9]{1}\d{4}[-]\d{4}\d?$/;
  regexPadraoTelefoneFixo = /\(?\d{2}\)?\s?[0-5]{1}\d{3}[-]\d{4}\d?$/;

  // Variaveis para máscara
  public maskCep = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
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
  public numberMask = createNumberMask({
    prefix: '',
    suffix: '',
    thousandsSeparatorSymbol: '.'
  });
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

  modalRef: BsModalRef;
  // @ViewChild('childModal') childModal: ModalDirective;

  atualizandoPerfil: boolean;

  teste;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private authService: AuthService,
    private ngZoneService: NgZone,
    private modalService: BsModalService
  ) {
    this.message = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
  }

  clearMask(value: string) {
    if (value != null) {
      return value.replace(/\D/g, '');
    }
    return null;
  }

  getMaskDate() {
    return this.maskDate.map(el => el);
  }

  getLogradouro(): string {
    if (this.localizacao && this.localizacao.address_components) {
      const logradouro = this.localizacao.address_components.filter(function (
        i
      ) {
        return (
          i.types.filter(function (t) {
            return t === 'route';
          }).length > 0
        );
      });
      if (logradouro.length > 0) {
        return logradouro[0].long_name;
      }
    }
    return null;
  }

  getNumero(): number {
    if (this.localizacao && this.localizacao.address_components) {
      const numero = this.localizacao.address_components.filter(function (i) {
        return (
          i.types.filter(function (t) {
            return t === 'street_number';
          }).length > 0
        );
      });
      if (numero.length > 0) {
        return numero[0].long_name;
      }
    }
    return null;
  }

  getCep(): string {
    if (this.localizacao && this.localizacao.address_components) {
      const cep = this.localizacao.address_components.filter(function (i) {
        return (
          i.types.filter(function (t) {
            return t === 'postal_code';
          }).length > 0
        );
      });
      if (cep.length > 0) {
        return cep[0].long_name;
      }
    }
    return null;
  }

  getBairro(): string {
    if (this.localizacao && this.localizacao.address_components) {
      const bairro = this.localizacao.address_components.filter(function (i) {
        return (
          i.types.filter(function (t) {
            return t === 'sublocality_level_1';
          }).length > 0
        );
      });
      if (bairro.length > 0) {
        return bairro[0].long_name;
      }
    }
    return null;
  }

  getCidade(): string {
    if (this.localizacao && this.localizacao.address_components) {
      const cidade = this.localizacao.address_components.filter(function (i) {
        return (
          i.types.filter(function (t) {
            return t === 'administrative_area_level_2';
          }).length > 0
        );
      });
      if (cidade.length > 0) {
        return cidade[0].long_name;
      }
    }
    return null;
  }

  getEstado(): string {
    if (this.localizacao && this.localizacao.address_components) {
      const estado = this.localizacao.address_components.filter(function (i) {
        return (
          i.types.filter(function (t) {
            return t === 'administrative_area_level_1';
          }).length > 0
        );
      });
      if (estado.length > 0) {
        return estado[0].short_name;
      }
    }
    return null;
  }

  autoCompleteCallback1(response: any): any {
    this.localizacao = response.data;
    this.exibirBlocoEndereco = true;
    this.usuario.Enderecos[0].Numero = this.getNumero();
    this.usuario.Enderecos[0].Logradouro = this.getLogradouro();
    this.usuario.Enderecos[0].Bairro = this.getBairro();
    this.usuario.Enderecos[0].Cidade = this.getCidade();
    this.usuario.Enderecos[0].Estado = this.getEstado();
    this.usuario.Enderecos[0].CEP = this.getCep();
  }

  callValidations() {
    this.validateCPFCNPJEmail();
  }

  validateEmailFormat() {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
    const matching = this.usuario.Email.match(pattern);
    this.invalidEmailFormat = false;

    if (!matching) {
      this.invalidEmailFormat = true;
    }
  }

  resetSettingsCPFCNPJ() {
    this.invalidSizeCPFCNPJ = false;
  }

  validateCPFCNPJSize() {
    const cleanCPFCNPJ = this.clearMask(this.entradaCPFCNPJ);
    if (this.tipoCPFCNPJ === 'CPF' && cleanCPFCNPJ.length >= 11) {
      this.invalidSizeCPFCNPJ = true;
      return true;
    } else if (this.tipoCPFCNPJ === 'CNPJ' && cleanCPFCNPJ.length >= 14) {
      this.invalidSizeCPFCNPJ = true;
      return true;
    } else {
      return false;
    }
  }

  // Se CPF/CNPJ for válido chama checkValidations()
  validateCPFCNPJEmail() {
    const email = this.entradaEmail ? this.entradaEmail.toLowerCase() : '';
    const digitosEntrada = this.entradaCPFCNPJ
      ? this.clearMask(this.entradaCPFCNPJ)
      : '';
    this.continuarClicked = true; // Verificar primeiro click no botão continuar
    this.carregandoForm = true;
    this.message = null;
    this.typeMessage = null;

    this.usuario.Email = this.entradaEmail;
    this.usuario.CPFCNPJ = digitosEntrada;

    this.usuarioService.validarAcessoCadastro(digitosEntrada, email).subscribe(
      serverResponse => {
        if (this.validateCPFCNPJSize()) {
          this.usuario.Email = this.entradaEmail;
          this.validateEmailFormat();

          this.usuario.CPFCNPJ = digitosEntrada;
          this.checkValidations();
        } else {
          this.message = ['CPF/CNPJ inválido'];
          this.typeMessage = 'danger';
          this.carregandoForm = false;
          window.scrollTo(0, 0);
        }
      },
      serverResponseError => {
        this.mostrarErroCasoUsuarioAdm(serverResponseError);
      }
    );
  }

  mostrarErroCasoUsuarioAdm(error: any) {
    if (error.error) {
      const errorExistent = error.error.filter(
        i => i.Code === 'ExistAdmin' || i.Code === 'Existente Admin'
      );
      const errors = error.error.filter(
        i => i.Code !== 'ExistAdmin' || i.Code === 'Existente Admin'
      );

      if (errorExistent && errorExistent.some(i => i) && errors.length <= 0) {
        this.modalRef = this.modalService.show(this.modalUsuarioAdm);
      } else {
        this.message = errors.map(el => el.Message);
        this.typeMessage = 'danger';
        this.carregandoForm = false;
      }
    } else {
      this.message = error.error.map(el => el.Message);
      this.typeMessage = 'danger';
      this.carregandoForm = false;
    }

    this.carregandoForm = false;
  }

  atualizarPerfilDeAdministradorJaCadastrado() {
    this.atualizandoPerfil = true;

    this.usuarioService
      .putPermissaoAcessoClickEAlugue({
        Email: this.usuario.Email,
        CPFCNPJ: this.usuario.CPFCNPJ
      })
      .subscribe(
        response => {
          this.modalRef.hide();
          this.router.navigate(['autenticacao/login'], {
            queryParams: { returnUrl: 'usuario/editar' }
          });
          this.atualizandoPerfil = false;
        },
        error => {
          this.message = error.error.map(el => el.Message);
          this.typeMessage = 'danger';
          this.atualizandoPerfil = false;
        }
      );
  }

  validateAceite(): boolean {
    const termo = this.termoAceite;
    if (!termo) {
      return false;
    } else {
      return true;
    }
  }

  checkValidations() {
    const termoResponse = this.validateAceite();
    this.carregandoForm = false;
    if (termoResponse) {
      this.registerStatus = true;
    }
  }

  addTelefoneFixo() {
    this.telefonesFixos.push({
      tipo: 1,
      telefone: ''
    });
    this.checkMinimoTelefone();
  }

  deleteTelefoneFixo(i) {
    this.telefonesFixos.splice(i, 1);
    this.checkMinimoTelefone();
  }

  addTelefoneCelular() {
    this.telefonesCelulares.push({
      tipo: 2,
      telefone: ''
    });
    this.checkMinimoTelefone();
  }

  deleteTelefoneCelular(i) {
    this.telefonesCelulares.splice(i, 1);
    this.checkMinimoTelefone();
  }

  checkMinimoTelefone() {
    const fixos = this.telefonesFixos,
      celulares = this.telefonesCelulares;
    const length = fixos.length + celulares.length;

    if (fixos.length > 1) {
      this.disableRemoveFixo = false;
    } else {
      this.disableRemoveFixo = true;
    }

    if (celulares.length > 1) {
      this.disableRemoveCelular = false;
    } else {
      this.disableRemoveCelular = true;
    }

    // if (fixos[0].telefone.length >= 14 || celulares[0].telefone.length >= 13) {
    //   this.minimoTelefone = true;
    // } else {
    //   this.minimoTelefone = false;
    // }
  }

  processarTelefones() {
    let celularesStringArray,
      fixoStringArray,
      concatTelsArrays,
      telefonesUnicos;
    if (this.telefonesCelulares) {
      celularesStringArray = this.telefonesCelulares
        .map(el => el.tipo + ',' + el.telefone)
        .filter((item, pos, arr) => {
          return arr.indexOf(item) === pos;
        });
    } else {
      celularesStringArray = [];
    }

    if (this.telefonesFixos) {
      fixoStringArray = this.telefonesFixos
        .map(el => el.tipo + ',' + el.telefone)
        .filter((item, pos, arr) => {
          return arr.indexOf(item) === pos;
        });
    } else {
      fixoStringArray = [];
    }

    concatTelsArrays = celularesStringArray.concat(fixoStringArray);

    telefonesUnicos = concatTelsArrays.map(el => {
      const obj = {
        DDD: '',
        Numero: '',
        TipoContato: null
      };
      const clearValue = this.clearMask(el);
      obj.TipoContato = clearValue.substr(0, 1);
      obj.DDD = clearValue.substr(1, 2);
      obj.Numero = clearValue.substr(3);
      return obj;

    });

    telefonesUnicos = telefonesUnicos.filter(t => {
      return t.Numero && t.Numero.trim() !== ""
    })

    return telefonesUnicos;
  }

  getTelefones(contatosServidor) {
    contatosServidor.forEach(el => {
      const telefone = el.DDD + el.Numero;
      const tipo = el.TipoContato;
      if (tipo === 1) {
        this.telefonesFixos.push({
          tipo,
          telefone
        });
      }
    });

    contatosServidor.forEach(el => {
      const telefone = el.DDD + el.Numero;
      const tipo = el.TipoContato;

      if (tipo === 2) {
        this.telefonesCelulares.push({
          tipo,
          telefone
        });
      }
    });

    this.telefonesFixos = this.telefonesFixos.filter(el => el.telefone);
    this.telefonesCelulares = this.telefonesCelulares.filter(el => el.telefone);

    if (this.telefonesCelulares && this.telefonesCelulares.length > 0) {
      this.telefonesCelulares.forEach(contato => {
        const celularFormatadoMask = conformToMask(
          contato.telefone,
          this.maskcel,
          { guide: false }
        );
        contato.telefone = celularFormatadoMask.conformedValue;
      });
    } else {
      this.telefonesCelulares = [
        {
          tipo: 2,
          telefone: ''
        }
      ];
    }

    if (this.telefonesFixos && this.telefonesFixos.length > 0) {
      this.telefonesFixos.forEach(contato => {
        const telefoneFormatadoMask = conformToMask(
          contato.telefone,
          this.masktel,
          { guide: false }
        );
        contato.telefone = telefoneFormatadoMask.conformedValue;
      });
    } else {
      this.telefonesFixos = [
        {
          tipo: 1,
          telefone: ''
        }
      ];
    }
  }

  closeModal() {
    this.modal.close();
    const carrinhoLocalStorage = localStorage.getItem('carrinho');
    this.router.navigate(this.redirectLogin);
    // if (carrinhoLocalStorage && JSON.parse(carrinhoLocalStorage).length >= 1) {
    //   this.router.navigate(this.redirectLogin);
    // }
    // else {
    //   this.router.navigate(this.redirectHome);
    // }
  }

  reverseDate(date) {
    const regex = /\d{4}-\d{2}-\d{2}/g;
    if (date.match(regex)) {
      const dateOnlyNumbers = date.replace(/-/g, '');
      const day = dateOnlyNumbers.substr(6, 2);
      const month = dateOnlyNumbers.substr(4, 2);
      const year = dateOnlyNumbers.substr(0, 4);
      return day + '-' + month + '-' + year;
    }
    return date;
  }

  atualizarEnderecoPeloCep(_localizacao: google.maps.GeocoderResult) {
    this.ngZoneService.run(() => {
      if (_localizacao != null) {
        this.localizacao = _localizacao;
        this.exibirBlocoEndereco = true;
        // this.usuario.Logradouro = this.getLogradouro();
        // this.usuario.Bairro = this.getBairro();
        // this.usuario.Cidade = this.getCidade();
        // this.usuario.Estado = this.getEstado();
        // this.usuario.CEP = this.getCep();
      }
    });
  }

  onSubmit(cadastroUsuarioForm: NgForm) {
    if (cadastroUsuarioForm.valid) {
      this.carregandoForm = true;
      this.message = null;
      this.typeMessage = null;

      this.usuario.Cliente.TermoAceite = this.termoAceite;

      this.usuarioSend.MapFromUsuario(this.usuario);
      this.usuarioSend.Contatos = this.processarTelefones();

      if (cadastroUsuarioForm.valid && !this.usuario.Uid) {
        this.cadastrarUsuario(cadastroUsuarioForm);
      } else if (cadastroUsuarioForm.valid && this.usuario.Uid != null) {
        this.atualizarUsuario(cadastroUsuarioForm);
      }
    }
  }

  atualizarUsuario(cadastroUsuarioForm: NgForm) {
    window.scrollTo(0, 0);

    const senhaAtual = this.autenticacao.senhaAtual;
    const senha = this.autenticacao.senha;
    const confirmaSenha = this.autenticacao.confirmaSenha;

    this.usuarioSend.SenhaAtual = senhaAtual;
    this.usuarioSend.Senha = senha;
    this.usuarioSend.ConfirmacaoSenha = confirmaSenha;    

    if (this.validateCPFCNPJSize()) {
      this.usuarioService.save(this.usuarioSend).subscribe(
        () => {
          this.carregandoForm = false;
          this.messageService.message = [
            'Edição de perfil realizada com sucesso'
          ];
          this.messageService.typeMessage = 'success';
          this.messageService.timeMessage = 4000;
          // this.enviado = true;
          this.router.navigate(['/dashboard']);
          window.scrollTo(0, 0);
        },
        (err: HttpErrorResponse) => {
          this.carregandoForm = false;
          this.message = err.error.map(el => el.Message);
          this.typeMessage = 'danger';
          window.scrollTo(0, 0);
        }
      );
    } else {
      this.message = ['CPF/CNPJ inválido'];
      this.typeMessage = 'danger';
      window.scrollTo(0, 0);
    }
  }

  cadastrarUsuario(cadastroUsuarioForm: NgForm) {
    window.scrollTo(0, 0);

    this.usuarioService.save(this.usuarioSend).subscribe(
      response => {
        this.carregandoForm = false;
        this.message = [
          `Atenção! Confira seu e-mail, pois
          enviaremos uma senha temporária junto a um link para que você redefina essa senha no primeiro acesso.`
        ];
        this.typeMessage = 'success';
        this.enviado = true;
        this.modal.open();
      },
      (err: HttpErrorResponse) => {
        this.mostrarErroCasoUsuarioAdm(err);
        // this.carregandoForm = false;
        // this.message = err.error.map(el => el.Message);
        // this.typeMessage = 'danger';

        setTimeout(() => {
          err.error.forEach(element => {
            if (element.Target && element.Target !== 'CPFCNPJ') {
              cadastroUsuarioForm.form.controls[element.Target].setErrors({
                incorrect: true
              });
            } else if (element.Target && element.Target === 'CPFCNPJ') {
              if (cadastroUsuarioForm.form.controls['CPF']) {
                cadastroUsuarioForm.form.controls['CPF'].setErrors({
                  incorrect: true
                });
              }

              if (cadastroUsuarioForm.form.controls['CNPJ']) {
                cadastroUsuarioForm.form.controls['CNPJ'].setErrors({
                  incorrect: true
                });
              }
            }
          });
        }, 500);
      }
    );
  }

  ngOnDestroy() {
    if (this.enviado && this.authService.check) {
      this.authService.obterDadosUsuario(); // atualizando dados do usuário
    }
  }

  ngOnInit() {
    const estadoCivilObserver = this.usuarioService
      .getAllEnumEstadoCivil()
      .subscribe(
        data => {
          this.estadosCivis = data;
        },
        (err: HttpErrorResponse) => {
          this.carregandoForm = false;
          this.message = err.error.map(el => el.Message);
          this.typeMessage = 'danger';
          window.scrollTo(0, 0);
        }
      );
    const sexoObserver = this.usuarioService.getAllEnumSexo().subscribe(
      data => {
        this.sexoList = data;
      },
      (err: HttpErrorResponse) => {
        this.carregandoForm = false;
        this.message = err.error.map(el => el.Message);
        this.typeMessage = 'danger';
        window.scrollTo(0, 0);
      }
    );

    setTimeout(() => {
      this.messageService.message = null;
      this.messageService.typeMessage = null;
      this.messageService.timeMessage = null;
    }, 4000);

    this.message = null;
    this.typeMessage = null;
    this.timeMessage = null;

    this.enviado = false;
    this.entradaEmail = sessionStorage.getItem('emailCadastro');

    if (this.authService.check) {
      this.carregandoForm = true;
      this.usuarioService.find().subscribe(
        data => {
          const usuarioServer = data;
          this.exibirBlocoEndereco = true;
          this.entradaCPFCNPJ = usuarioServer.CPFCNPJ;
          this.usuario.CPFCNPJ = usuarioServer.CPFCNPJ.toString();
          this.tipoCPFCNPJ =
            usuarioServer.CPFCNPJ.toString().length >= 14 ? 'CNPJ' : 'CPF';
          this.usuario.Email = usuarioServer.Email;
          this.termoAceite = true;
          this.usuario.Nome = usuarioServer.Nome;
          this.usuario.ResponsavelCPF = usuarioServer.ResponsavelCPF;
          this.usuario.ResponsavelNome = usuarioServer.ResponsavelNome;
          this.usuario.UsuarioAreaExclusiva = usuarioServer.UsuarioAreaExclusiva;

          if (usuarioServer.DataNascimento !== null) {
            const dataTemp = new Date(
              usuarioServer.DataNascimento
            ).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            this.usuario.DataNascimento = dataTemp;
          }

          this.usuario.EstadoCivil = usuarioServer.EstadoCivil;
          this.usuario.Sexo = usuarioServer.Sexo;

          if (usuarioServer.Enderecos != null) {
            this.usuario.Enderecos[0].Complemento =
              usuarioServer.Enderecos[0].Complemento;
            this.usuario.Enderecos[0].Numero =
              usuarioServer.Enderecos[0].Numero;
            this.usuario.Enderecos[0].Logradouro =
              usuarioServer.Enderecos[0].Logradouro;
            this.usuario.Enderecos[0].Bairro =
              usuarioServer.Enderecos[0].Bairro;
            this.usuario.Enderecos[0].Cidade =
              usuarioServer.Enderecos[0].Cidade;
            this.usuario.Enderecos[0].Estado =
              usuarioServer.Enderecos[0].Estado;
            this.usuario.Enderecos[0].CEP = usuarioServer.Enderecos[0].CEP;
            this.ocultarAutocompleteDeEndereco = true;
          }

          this.usuario.Uid = this.authService.user.uid;
          this.usuario.Cliente.Uid = this.authService.user.uid;

          if (usuarioServer.Contatos != null) {
            this.getTelefones(usuarioServer.Contatos);
          }

          this.possuiResponsavel =
            this.usuario.ResponsavelCPF != null &&
            this.usuario.ResponsavelNome != null;
          this.registerStatus = true;
          this.carregandoForm = false;
        },
        err => {
          if (Array.isArray(err.error)) {
            this.messageArray = err.error.map(el => el.Message);
          } else if (typeof err === 'object') {
            this.message = err.error.Message;
          } else {
            this.message = 'Error inesperado';
          }

          this.typeMessage = 'danger';
          this.carregandoForm = false;
        }
      );
    }
  }

  alterarTipoPessoa() {
    this.usuario.DataNascimento = null;
    this.usuario.EstadoCivil = null;
    this.usuario.CPFCNPJ = null;
    this.entradaCPFCNPJ = null;
  }

  possuiTelefoneCelular() {
    return (
      this.telefonesCelulares.length > 0 &&
      this.telefonesCelulares.some(
        t =>
          t.telefone != null &&
          t.telefone.trim() !== '' &&
          t.telefone.length >= 15 &&
          new RegExp(this.regexPadraoCelular).test(t.telefone)

      )
    );
  }

  possuiTelefoneFixoInvalido() {
    return this.telefonesFixos.some(t => t.telefone != null && t.telefone.trim() !== '' && (t.telefone.length < 14 || !(new RegExp(this.regexPadraoTelefoneFixo).test(t.telefone))));
  }

  possuiTelefoneCelularInvalido() {
    return this.telefonesCelulares.some(t => t.telefone == null || t.telefone.trim() === '' || t.telefone.length < 15 || !(new RegExp(this.regexPadraoCelular).test(t.telefone)));
  }

  // possuiResponsavel() {
  //   return this.usuario.ResponsavelCPF && this.usuario.ResponsavelNome;
  // }
}
