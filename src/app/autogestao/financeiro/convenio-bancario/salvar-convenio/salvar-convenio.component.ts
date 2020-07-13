import { ConvenioBancarioService } from '../convenio-bancario.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ConvenioBancario } from '../convenio-bancario';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../../services/message.service';
import { ModalComponent } from 'app/bootstrap/modal/modal.component';
import { AlertaConvenioBancarioService } from 'app/autogestao/alerta-convenio-bancario/alerta-convenio-bancario.service';
import { AuthService } from 'app/services/auth.service';
import { Location } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-salvar-convenio',
  templateUrl: './salvar-convenio.component.html',
  styleUrls: ['./salvar-convenio.component.scss']
})
export class SalvarConvenioComponent implements OnInit, AfterViewInit {
  @ViewChild('modalConvenioBancario')
  modalConvenioBancario: ModalComponent;

  @ViewChild('modalConfirmacaoConvenioBancario')
  modalConfirmacaoConvenioBancario: ModalComponent;

  bancos: any;
  tiposCNAB: any;
  tiposCodigoProtesto: any;
  BancoSelecionado: any;
  convenioBancario: ConvenioBancario;
  tipoAceite = false;

  carregandoFormulario = true;
  exibirFormulario = false;
  messageStatus: string;

  messages = null;
  typeMessage = null;
  timeMessage = null;

  formTypeEdit = false;
  exibirCampos = false;
  disablePJ = false;

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
  contaBancaria: any;

  // contaBancaria: {
  //   SubContaId: string;
  //   SubContaNome: string;
  //   SubContaLiveAPIToken: string;
  //   SubContaTestAPIToken: string;
  //   SubContaUserToken: string;
  //   ClienteAutogestaoId: number;
  //   Parceiro: number;
  //   PodeReceberPagamento: boolean;
  //   FoiVerificada: boolean;
  //   UltimoStatusVerificacao: string;
  //   CreationDate: string;
  //   UpdateDate: string;
  // };

  arrayTooltip: any;

  constructor(
    private convenioBancarioService: ConvenioBancarioService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private alertaConvenioBancarioService: AlertaConvenioBancarioService,
    private authService: AuthService,
    private location: Location
  ) {
    this.convenioBancario = new ConvenioBancario();
    this.convenioBancario.TipoConta = 1;

    this.messages = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
    this.timeMessage = this.messageService.timeMessage;

    this.arrayTooltip = {
      [0]: 'Banco',
      // [0]: 'Número do Banco <br /> 001 -> Banco do Brasil <br /> 033 -> Santander <br /> 104 -> Caixa Econômica <br /> 237 -> Bradesco <br /> 341 -> Itaú <br /> 041 -> Banrisul <br /> 748 -> Sicredi <br /> 756 -> Sicoob <br /> 077 -> Inter <br /> 070 -> BRB',
      [1]: 'Conta Corrente ou Conta Poupança',
      [2]: 'Agência bancária',
      [3]: 'Número da conta',
      [4]: 'Nome do responsável pela conta',
      [5]: 'CPF do responsável',
      [6]: 'teste',
      [7]: 'teste'
    };
  }

  ngOnInit() {
    if (this.route.snapshot.params.UidConvenio) {
      this.convenioBancario.Uid = this.route.snapshot.params.UidConvenio;
    }
  }

  ngAfterViewInit() {
    // tslint:disable-next-line:prefer-const
    let self = this;

    setTimeout(function () {
      self.carregarOpcoes();
    }, 500);
  }

  private carregarOpcoes() {
    this.carregandoFormulario = true;
    this.messageStatus = 'Carregando...';
    this.messages = null;

    Observable.forkJoin([this.carregarBancos()]).subscribe(
      ([responseBancos]) => {
        this.exibirFormulario = true;
        if (this.isEdicao()) {
          this.obterConvenioBancarioEmEdicao();
        } else {
          this.carregandoFormulario = false;
        }
      },
      error => {
        this.carregandoFormulario = false;
        this.messages = [
          'Ocorreu um erro inesperado e não foi possível carregar as opçoes de formulário. Tente novamente mais tarde!'
        ];
        this.typeMessage = 'danger';
        window.scrollTo(0, 0);
      }
    );
  }

  carregarBancos() {
    return this.convenioBancarioService.getAllBancos().map(data => {
      this.bancos = data;
      return data;
    });
  }

  onChangeBanco(newValue) {
    this.BancoSelecionado = this.bancos.find(b => b.CodigoBanco === newValue);
    this.exibirCampos = true;
  }

  verificarContaBancaria() {
    this.alertaConvenioBancarioService
      .verificarAprovacaoConvenioBancario()
      .subscribe(
        response => {
          this.contaBancaria = response;

          if (this.contaBancaria.FoiVerificada === false) {
            this.formTypeEdit = true;
          } else {
            this.formTypeEdit = false;
            if (this.contaBancaria.ResponsavelCPF) {
              this.disablePJ = true;
            }
          }
        },
        error => {
          this.formTypeEdit = true;
        }
      );
  }

  obterConvenioBancarioEmEdicao() {
    this.carregandoFormulario = true;
    this.messageStatus = 'Carregando...';
    this.messages = null;

    this.verificarContaBancaria();

    this.convenioBancarioService
      .getDetailConvenio(this.convenioBancario.Uid)
      .subscribe(
        data => {
          this.convenioBancario.map(data);

          this.BancoSelecionado = this.bancos.find(item => {
            return item.CodigoBanco === this.convenioBancario.CodigoBanco;
          });

          this.carregandoFormulario = false;
          this.exibirFormulario = true;
          this.exibirCampos = true;
        },
        error => {
          this.carregandoFormulario = false;
          this.messages = [
            'Ocorreu um erro inesperado e não foi possível buscar suas informações bancárias. Tente novamente mais tarde!'
          ];
          this.typeMessage = 'danger';
          window.scrollTo(0, 0);
        }
      );
  }

  private isEdicao() {
    return (
      this.convenioBancario &&
      this.convenioBancario.Uid &&
      this.convenioBancario.Uid !== '' &&
      this.convenioBancario.Uid !== '00000000-0000-0000-0000-000000000000'
    );
  }

  abrirModalDeConfirmacaoDeInformacoesBancarias() {
    this.modalConfirmacaoConvenioBancario.open();
  }

  moverParaTopo() {
    $('html, body')
      .delay(500)
      .animate(
        {
          scrollTop: $('#topo-component-page').offset().top - 100
        },
        300
      );
  }

  salvarConvenioBancario(form) {
    this.carregandoFormulario = true;
    this.exibirFormulario = false;
    this.messages = [];

    this.moverParaTopo();

    if (!this.isEdicao()) {
      this.cadastrarConvenioBancario();
    } else {
      this.editarConvenioBancario();
    }
  }

  cadastrarConvenioBancario() {
    this.convenioBancarioService
      .cadastrarConveniosBancarios(this.convenioBancario)
      .subscribe(
        data => {
          this.carregandoFormulario = false;
          this.exibirFormulario = true;
          this.messageStatus = 'Salvando...';

          this.modalConvenioBancario.open();
        },
        error => {
          this.messages = error;
          this.typeMessage = 'danger';
          window.scrollTo(0, 0);
          this.exibirFormulario = true;
          this.carregandoFormulario = false;
        }
      );
  }

  editarConvenioBancario() {
    this.convenioBancarioService
      .editarConveniosBancarios(this.convenioBancario)
      .subscribe(
        data => {
          this.modalConvenioBancario.open();

          this.carregandoFormulario = false;
          this.exibirFormulario = true;
          this.messageStatus = 'Salvando...';

          // this.exibirFormulario = true;
          // this.messageService.message = [
          //   'Cobrança bancária salva com sucesso!'
          // ];
          // this.messageService.typeMessage = 'success';
          // this.messageService.timeMessage = 4000;
          // this.carregandoFormulario = false;
          // this.router.navigate(['/autogestao', 'financeiro']);
          // window.scrollTo(0, 0);
        },
        error => {
          this.messages = error;
          this.typeMessage = 'danger';
          window.scrollTo(0, 0);
          this.exibirFormulario = true;
          this.carregandoFormulario = false;
        }
      );
  }

  closeModalConvenioBancario() {
    this.modalConvenioBancario.close();
    this.exibirFormulario = true;

    // this.messageService.message = ['Cobrança bancária salva com sucesso!'];
    // this.messageService.typeMessage = 'success';

    this.carregandoFormulario = false;
    this.router.navigate(['/autogestao', 'financeiro', 'prestacao-contas']);
    window.scrollTo(0, 0);
  }

  closeModalConfirmacaoConvenioBancario() {
    this.modalConfirmacaoConvenioBancario.close();
  }

  confirmarInformacoesBancarias(form) {
    this.modalConfirmacaoConvenioBancario.close();
    this.salvarConvenioBancario(form);
  }

  getNaturezaPessoa(): string {
    return this.authService.user.cpfcnpj &&
      this.authService.user.cpfcnpj.length > 11
      ? 'CNPJ'
      : 'CPF';
  }

  getResponsavelCadastrado(): boolean {
    return this.authService.user.responsavelNome ||
      this.authService.user.responsavelCPF
      ? true
      : false;
  }

  goBack() {
    // window.history.back();
    this.location.back();
  }
}
