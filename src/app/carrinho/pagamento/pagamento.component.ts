import { PedidoService } from './../pedido.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Item } from './item';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  Inject,
  NgZone
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { Message } from './message';
import { CarrinhoService } from 'app/carrinho/carrinho/carrinho.service';
import { NgForm } from '@angular/forms';

declare var $: any;
declare var Iugu: any;
declare const PAYPAL: any;

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit, AfterViewInit {
  @ViewChild('tabPagamento')
  tabPagamento: TabsetComponent;
  tabCorrent: any;
  credit_card_number;
  credit_card_cvv;
  credit_card_name;
  credit_card_expiration;

  @ViewChild('formPagamentoIugu')
  formPagamentoIugu: NgForm;

  exibirBlocoCartaoPaypal = false;
  exibirBlocoCartaoIugu = false;
  descricaoDoStatus: string;
  mensagens: Message[];
  mensagensPagamento: Message[];

  itensComprados: Item[];
  total: number;

  private readonly urlPayPalPlus = 'https://www.paypalobjects.com/webstatic/ppplusdcc/ppplusdcc.min.js';
  // private readonly urlPayPalPlus = '../assets/js/ppplusdcc.min.js';


  constructor(
    @Inject(DOCUMENT) private document,
    private elementRef: ElementRef,
    private carrinhoService: CarrinhoService,
    public pedidoService: PedidoService,
    private router: Router,
    private authService: AuthService,
    private _ngZone: NgZone
  ) {
    this.tabCorrent = 'tabCredito';
  }

  ngOnInit() {
    this.processarPedido();
  }
  ngAfterViewInit() {
    // const s = this.document.createElement('script');
    // s.type = 'text/javascript';
    // // s.src = 'https://js.iugu.com/v2';
    // s.src = '../assets/js/iugu.js';
    // const __this = this;
    // // to store the current instance to call
    // // afterScriptAdded function on onload event of
    // // script.
    // s.onload = function () {
    //   __this.afterScriptAdded();
    // };
    // this.elementRef.nativeElement.appendChild(s);
  }

  afterScriptAdded() {
    const params = {
      width: '350px',
      height: '420px'
    };
    if (typeof window['functionFromExternalScript'] === 'function') {
      window['functionFromExternalScript'](params);
    }
  }

  processarPedido() {
    if (
      this.carrinhoService.numeroPedido !== null &&
      this.pedidoService.numeroPedido == null
    ) {
      this.prosseguirComPagamento();
    } else if (
      this.pedidoService.numeroPedido != null &&
      this.pedidoService.numeroPedido === this.carrinhoService.numeroPedido
    ) {
      this.prosseguirComPagamento();
    } else if (
      this.pedidoService.numeroPedido !== null &&
      this.pedidoService.numeroPedido !== this.carrinhoService.numeroPedido
    ) {
      this.router.navigate(['/carrinho']);
    }
  }

  prosseguirComPagamento() {
    this.carregarItens();
    this.obterDadosParaPagamento();
  }

  carregarItens() {
    this.total = this.pedidoService.total();
  }

  obterDadosParaPagamento() {
    // Paypal ou Gateway pagamento
    this.mensagens = null;
    this.descricaoDoStatus = 'Obtendo dados para pagamento...';

    this.pedidoService.obterDadosParaPagamento().subscribe(
      response => {
        console.log(response);


        /*if (response['Parceiro'] === 'PAYPAL') {

          this.pedidoService.approval_url = response['AprrovalUrl'];
          this.pedidoService.mode = response['Mode'];
          this.mostrarBlocoPaypal();
        }*/ //if (response['Parceiro'] === 'IUGU') {
        this.exibirBlocoCartaoIugu = true;

        // tslint:disable-next-line:prefer-const
        let componentAngular = this;

        $.getScript('../assets/js/iugu.js')
          .done(function (script, textStatus) {
            componentAngular.descricaoDoStatus = null;

            // if (response['AccountId']) {
            Iugu.setAccountID(response['AccountId']);
            // }

            if (response['Mode'] === 'test') {
              Iugu.setTestMode(true);
            }

            Iugu.setup();

            componentAngular.mostrarBlocoCartaoIugu();
          })
          .fail(function (jqxhr, settings, exception) {
            componentAngular.mensagens = [
              {
                time: null,
                type: 'danger',
                text:
                  'Ops! Ocorreu um erro ao registrar o pagamento. Tente novamente mais tarde!'
              }
            ];
            componentAngular.descricaoDoStatus = null;
          });
        //}
      },
      error => {
        this.descricaoDoStatus = null;
        this.mensagens = [
          {
            type: 'danger',
            time: null,
            text:
              'Ops! Ocorreu um erro de comunicação com os meios de pagamento. Tente novamente mais tarde!'
          }
        ];
      }
    );
  }

  private mostrarBlocoCartaoIugu() {
    this.descricaoDoStatus = null;

    return true;
  }

  private mostrarBlocoPaypal() {
    // tslint:disable-next-line:prefer-const
    let componentAngular = this;

    this.exibirBlocoCartaoPaypal = true;

    if (typeof PAYPAL === 'undefined') {
      $.getScript(componentAngular.urlPayPalPlus)
        .done(function (script, textStatus) {
          componentAngular.descricaoDoStatus = null;

          componentAngular.initPaypalAppsPPP();
          componentAngular.addListenerFramePayPal();
        })
        .fail(function (jqxhr, settings, exception) {
          componentAngular.mensagens = [
            {
              time: null,
              type: 'danger',
              text:
                'Ops! Ocorreu um erro ao registrar o pagamento. Tente novamente mais tarde!'
            }
          ];
          componentAngular.descricaoDoStatus = null;
        });
    } else {
      componentAngular.descricaoDoStatus = null;
      componentAngular.initPaypalAppsPPP();
      componentAngular.addListenerFramePayPal();
    }
  }

  private initPaypalAppsPPP() {
    // tslint:disable-next-line:prefer-const
    let self = this;
    setTimeout(function () {
      try {
        window['ppp'] = PAYPAL.apps.PPP({
          approvalUrl: self.pedidoService.approval_url,
          placeholder: 'ppplusDiv',
          mode: self.pedidoService.mode,
          payerFirstName: self.authService.user.nome,
          payerLastName: 'compradorUltimoNome',
          payerPhone: 'compradorTelefone',
          payerEmail: self.authService.user.email,
          payerTaxId: self.authService.user.cpfcnpj,
          payerTaxIdType: self.getPayerTaxIdType(),
          language: 'pt_BR',
          country: 'BR',
          rememberedCards: self.authService.user.rememberedCards,
          enableContinue: 'continueButton',
          disableContinue: self.disableContinue
        });
      } catch (e) {
        console.error('Ocorreu um erro ao iniciar o iframe do Paypal!', e);
      }
    }, 250);
  }

  private disableContinue() {
    $('#continueButton').attr('disabled', 'disabled');
    // $('html, body')
    //   .delay(500)
    //   .animate(
    //     {
    //       scrollTop: $('.container.pagamento-wrapper').offset().top - 70
    //     },
    //     500
    //   );

    $('html, body')
      .delay(500)
      .animate(
        {
          scrollTop: $('#pagamento').offset().top - 100
        },
        500
      );

  }

  private getPayerTaxIdType(): string {
    return this.authService.user.cpfcnpj &&
      this.authService.user.cpfcnpj.length > 10
      ? 'BR_CNPJ'
      : 'BR_CPF';
  }

  private addListenerFramePayPal() {
    // tslint:disable-next-line:prefer-const
    let componentAngular = this;

    if (window.addEventListener) {
      window.addEventListener(
        'message',
        this.messageListener(componentAngular),
        false
      );
    } else if (window['attachEvent']) {
      window['attachEvent'](
        'onmessage',
        this.messageListener(componentAngular)
      );
    } else {
      throw new Error("Can't attach message listener");
    }
  }

  private messageListener(componentAngular) {
    return function (event) {
      try {
        // tslint:disable-next-line:prefer-const
        let message = JSON.parse(event.data);

        if (typeof message['cause'] !== 'undefined') {
          componentAngular.messageErrorHandling(message);
        }

        if (message['action'] === 'checkout') {
          componentAngular.messageSessionApprovedHandling(message);
        }
      } catch (e) {
        // treat exceptions here
        // <<Insert Code Here>>
      }
    };
  }

  private messageErrorHandling(message: any) {
    this.moverTelaParaOTopo();

    var ppplusError = message['cause'].replace(/['"]+/g, ' ');
    switch (ppplusError) {
      case 'INTERNAL_SERVICE_ERROR':
      case 'SOCKET_HANG_UP':
      case 'socket hang up':
      case 'connect ECONNREFUSED':
      case 'connect ETIMEDOUT':
      case 'UNKNOWN_INTERNAL_ERROR':
      case 'fiWalletLifecycle_unknown_error':
      case 'Failed to decrypt term info':
      case 'INTERNAL_SERVER_ERROR':
        break;
      case 'RISK_N_DECLINE':
      case 'NO_VALID_FUNDING_SOURCE_OR_RISK_REFUSED':
      case 'TRY_ANOTHER_CARD':
      case 'NO_VALID_FUNDING_INSTRUMENT':
        break;
      case 'CHECK_ENTRY':
        break;
      default:
    }
  }

  private moverTelaParaOTopo() {
    $('html, body')
      .delay(500)
      .animate(
        {
          scrollTop: $('#pagamento').offset().top - 100
        },
        500
      );

    // #tabPagamento .container.pagamento-wrapper
  }

  private messageSessionApprovedHandling(message: any) {
    this.descricaoDoStatus = 'Processando dados...';

    // tslint:disable-next-line:prefer-const
    let rememberedCard = message['result']['rememberedCards']; // save on user BD record
    // tslint:disable-next-line:prefer-const
    let payPalPagamentoId =
      message['result']['payer']['payer_info']['payer_id']; // use it on executePayment API
    let installmentsValue; // TBD bellow

    if (
      typeof message['result']['term'] !== 'undefined' &&
      typeof message['result']['term']['term'] !== 'undefined'
    ) {
      installmentsValue = message['result']['term']['term']; // installments value
    } else {
      installmentsValue = 1; // no installments
    }

    // this.pagamentoPaypalService.setRememberedCard(rememberedCard);
    this.pedidoService.pagamentoId = payPalPagamentoId;

    /* Next steps:
    1) Save the rememberedCard value on the user record on your Database.
    2) Save the installmentsValue value into the order (Optional).
    3) Call executePayment API using payerID value to capture the payment.
    */
    // this.executarPagamento();
    this.finalizarPedido();
  }

  finalizarPedido() {
    // this.router.navigate(['/carrinho/finalizacao']);
    this.mensagens = null;
    this.mensagensPagamento = null;
    this.descricaoDoStatus =
      'Aguarde um momento, estamos finalizando sua compra!';

    // tslint:disable-next-line:prefer-const
    let self = this;

    this.pedidoService.finalizar().subscribe(
      response => {
        this.descricaoDoStatus = null;
        this.carrinhoService.limpar();
        this.authService.atualizarDadosDoUsuario();
        this.pedidoService.limpar();
        this.router.navigate(['/carrinho/finalizacao']);
      },
      error => {
        if (
          error &&
          error.some(
            e =>
              e.hasOwnProperty('target') && e['target'] === 'GATEWAYPAGAMENTO'
          )
        ) {
          self.descricaoDoStatus = null;
          self.mensagensPagamento = error;
        } else {
          this.pedidoService.erros = error;
          this.router.navigate(['/carrinho/finalizacao']);
        }
      }
    );
  }

  public updateTabCurrent(data: TabDirective): void {
    this.tabCorrent = data.id;
  }

  public selectTab(tab_id: string) {
    this.tabPagamento.tabs.forEach(element => {
      if (element.id === tab_id) {
        element.active = true;
      }
    });
  }

  public emProcessamento(): boolean {
    return this.descricaoDoStatus != null;
  }

  public tentarNovamente() {
    this.ngOnInit();
  }

  public processarDadosIugu(e) {
    e.preventDefault();
    this.mensagensPagamento = null;
    this.moverTelaParaOTopo();

    // tslint:disable-next-line:prefer-const
    let self = this;

    this.descricaoDoStatus = 'Processando dados...';

    Object.keys(this.formPagamentoIugu.controls).forEach(item => {
      self.formPagamentoIugu.controls[item].updateValueAndValidity();
    });

    Iugu.createPaymentToken($('form#payment-form-iugu')[0], function (data) {
      self._ngZone.run(() => {
        if (data['errors']) {
          Object.keys(data['errors']).forEach(item => {
            if (self.formPagamentoIugu.controls[item]) {
              self.formPagamentoIugu.controls[item].markAsDirty();
              self.formPagamentoIugu.controls[item].setErrors({
                invalid: true
              });
            }

            if (item === 'first_name' || item === 'last_name') {
              self.formPagamentoIugu.controls['full_name'].markAsDirty();
              self.formPagamentoIugu.controls['full_name'].setErrors({
                invalid: true
              });
            }

            self.descricaoDoStatus = null;
          });
        } else if (!data['errors'] && data['id']) {
          self.pedidoService.pagamentoId = data['id'];
          console.log('teste', data['id']);
          self.finalizarPedido();
        }
      });
    });
  }
}
