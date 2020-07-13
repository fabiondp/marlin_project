import {
  Component,
  OnInit,
  trigger,
  state,
  style,
  sequence,
  transition,
  animate,
  ViewChild,
  OnChanges,
  ViewEncapsulation,
  Pipe,
  PipeTransform
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Endereco } from '../../usuario/endereco';
import { Subscription } from 'rxjs/Subscription';

import { LocalStorageService } from '../../services/local-storage.service';
import { MessageService } from '../../services/message.service';

import { AuthService } from '../../services/auth.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarrinhoService } from './carrinho.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { environment } from 'environments/environment';
import { ModalComponent } from '../../bootstrap/modal/modal.component';
import { UsuarioService } from 'app/services/usuario.service';

declare let paypal: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss'],
  animations: [
    trigger('animationRemove', [
      transition('* => void', [
        style({
          height: '*',
          opacity: '1',
          transform: 'translateX(0)',
          'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)'
        }),
        sequence([
          animate(
            '.25s ease',
            style({
              height: '*',
              opacity: '.2',
              transform: 'translateX(20px)',
              'box-shadow': 'none'
            })
          ),
          animate(
            '.1s ease',
            style({
              height: '0',
              opacity: 0,
              transform: 'translateX(20px)',
              'box-shadow': 'none'
            })
          )
        ])
      ]),
      transition('void => active', [
        style({
          height: '0',
          opacity: '0',
          transform: 'translateX(20px)',
          'box-shadow': 'none'
        }),
        sequence([
          animate(
            '.1s ease',
            style({
              height: '*',
              opacity: '.2',
              transform: 'translateX(20px)',
              'box-shadow': 'none'
            })
          ),
          animate(
            '.35s ease',
            style({
              height: '*',
              opacity: 1,
              transform: 'translateX(0)',
              'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)'
            })
          )
        ])
      ])
    ])
  ]
})
export class CarrinhoComponent implements OnInit, OnChanges {
  //@ViewChild('modal1') modalFaleConosco: ModalComponent;
  @ViewChild('modalTermoDeUso')
  modalTermoDeUso: ModalComponent;
  @ViewChild('modalContratoPlano')
  modalContratoPlano: ModalComponent;

  retornoPagamento: any;
  accessTokenPayPal = null;
  carregando = false;
  message = null;
  carregandoMensagem = null;
  typeMessage = null;
  timeMessage = null;
  cupom = null;
  planos = [
    {
      PlanoUid: null
    }
  ];
  itensComprados = [
    {
      name: null,
      description: null,
      quantity: '',
      price: null,
      tax: '',
      sku: null,
      currency: ''
    }
  ];

  planoTermoDeUso = null;
  planoContrato = null;
  planosComContrato = [];

  aindaNaoDegustou = false;
  verificouDegustacao = false;
  planoDegustacaoAtivo = false;

  constructor(
    private usuarioService: UsuarioService,
    public carrinhoService: CarrinhoService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.messageService.message = null;
    this.message = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
    this.timeMessage = this.messageService.timeMessage;
  }

  ngOnInit() {
    if (this.carrinhoService.desontoInfo) {
      this.cupom = this.carrinhoService.desontoInfo['CodigoCupom'];
    }

    this.getPlanosComContrato();

    // if (this.authService.check) {
    //   this.verificarDegustacaoSemRegistrarPedido();
    // }
  }

  ngOnChanges() {
    this.getPlanosComContrato();
  }

  removerItem(item) {
    this.carrinhoService.removerItem(item);
    this.getPlanosComContrato();
    //this.verificarDegustacaoSemRegistrarPedido();
  }

  limparCarrinho() {
    return this.carrinhoService.limpar();
  }

  total() {
    return this.carrinhoService.total();
  }

  confirmarCompra() {
    if (this.authService.check) {
      this.validarCarrinhoLogado();
    } else {
      this.validarCarrinhoDeslogado();
    }
  }

  validarCarrinhoLogado() {
    window.scrollTo(0, 0);

    this.carregando = true;
    this.carregandoMensagem = 'Validando itens...';
    this.message = null;

    this.carrinhoService.validarCarrinhoLogado().subscribe(
      response => {
        if (!this.verificouDegustacao) {
          this.verificarDegustacao();
        } else {
          this.registrarPedido();
        }
      },
      error => {
        if (error.error && Array.isArray(error.error)) {
          this.message = error.error.map(el => el.Message);
          this.typeMessage = 'danger';
          this.carregando = false;
        } else if (error.error && error.error.Message) {
          this.message = [error.error.Message];

          this.typeMessage = 'danger';
          this.carregando = false;
        } else {
          this.message = Array.isArray(error) ? error : [error];
          this.typeMessage = 'danger';
          this.carregando = false;
        }
      }
    );
  }

  registrarPedido() {
    const data = {
      ValorSimulado: this.carrinhoService.total(),
      PlanosContratados: this.carrinhoService.items,
      CodigoCupomDesconto: this.carrinhoService.desontoInfo
        ? this.carrinhoService.desontoInfo.CodigoCupom
        : null
    };

    this.carrinhoService.registrarPedido(data).subscribe(
      response => {
        if (response['NumeroPedido']) {
          this.carrinhoService.numeroPedido = response['NumeroPedido'];
          this.continuarPedido();
          // this.carregando = false;
        }
      },
      error => {
        if (error.error && Array.isArray(error.error)) {
          this.message = error.error.map(el => el.Message);
        } else if (error.error && error.error.Message) {
          this.message = [error.error.Message];
        } else {
          this.message = Array.isArray(error) ? error : [error];
        }

        this.typeMessage = 'danger';
        this.carregando = false;
      }
    );
  }

  continuarPedido() {
    this.router.navigate(['/carrinho/verificando-seus-dados']);

    // if (
    //   this.carrinhoService.items.length > 0 &&
    //   this.carrinhoService.total() <= 0
    // ) {
    //   this.router.navigate(['/carrinho/finalizacao']);
    // } else if (this.carrinhoService.total() > 0) {
    //   this.router.navigate(['/carrinho/pagamento']);
    // } else {
    //   this.message = ['Ocorreu um erro inesperado! Tente novamente!'];
    //   this.typeMessage = 'danger';
    //   this.carregando = false;
    // }
  }

  validarCarrinhoDeslogado() {
    window.scrollTo(0, 0);

    this.carregando = true;
    this.carregandoMensagem = 'Validando itens...';
    this.message = null;

    this.carrinhoService.validarCarrinhoDeslogado().subscribe(
      response => {
        this.router.navigate(['/autenticacao/login'], {
          queryParams: { returnUrl: '/carrinho' }
        });
        this.carregando = false;
      },
      error => {
        if (error.error && Array.isArray(error.error)) {
          this.message = error.error.map(el => el.Message);
          this.typeMessage = 'danger';
          this.carregando = false;
        } else if (error.error && error.error.Message) {
          this.message = [error.error.Message];

          this.typeMessage = 'danger';
          this.carregando = false;
        } else {
          this.message = Array.isArray(error) ? error : [error];
          this.typeMessage = 'danger';
          this.carregando = false;
        }
      }
    );
  }

  aplicarCupom() {
    if (this.cupom && this.cupom.trim() !== '') {
      window.scrollTo(0, 0);

      this.carregando = true;
      this.carregandoMensagem = 'Validando cupom...';
      this.message = null;

      let data = {
        codigoCupom: this.cupom,
        listaId: this.carrinhoService.items.map(i => i.Uid)
      };

      let servicoAplicarCupom = this.carrinhoService.aplicarCupomDeslogado(
        data
      );
      if (this.authService.check && this.authService.user.enabled) {
        servicoAplicarCupom = this.carrinhoService.aplicarCupom(data);
      }

      servicoAplicarCupom.subscribe(
        response => {
          this.carregando = false;
        },
        error => {
          if (error.status === 404) {
            this.message = ['Cupom inválido'];
            this.typeMessage = 'danger';
            this.carregando = false;
          } else if (error.error && Array.isArray(error.error)) {
            let messages = error.error.map(el => el.Message);
            this.message = Array.isArray(error) ? error : [error];
            this.typeMessage = 'danger';
            this.carregando = false;
          } else if (error.error && error.error.Message) {
            this.message = [error.error.Message];

            this.typeMessage = 'danger';
            this.carregando = false;
          } else {
            // this.message = Array.isArray(error) ? error : [error];
            this.message = [
              'Ocorreu um erro inesperado ao aplicar o cupom. Tente novamente mais tarde!'
            ];
            this.typeMessage = 'danger';
            this.carregando = false;
          }
        }
      );
    }
  }

  removerCupom() {
    this.carrinhoService.removerDesconto();
    this.cupom = null;
  }

  abrirModalContratoPlano(plano) {
    /* DINAMICO - Cadastrado na área Administrativa */
    this.planoContrato = plano;
    this.modalContratoPlano.open();
  }

  abrirModalTermoDeUso(plano) {
    /* Estático - Conteudo está no  component */
    this.planoTermoDeUso = plano;
    this.modalTermoDeUso.open();
  }

  getPlanosComContrato() {
    this.planosComContrato = this.carrinhoService.items.filter(
      i => i.TermoContrato
    );

    /*
     * unique
     * */
    const planosComContrato = [];
    this.carrinhoService.items.forEach(element => {
      if (
        element.TermoContrato &&
        !planosComContrato.some(p => p.Uid === element.Uid)
      ) {
        planosComContrato.push(element);
      }
    });

    this.planosComContrato = planosComContrato;
    // return planosComContrato;
  }

  updateAceitarTermoPlano(plano, e) {
    this.carrinhoService.aceitarTermo(plano);
  }

  fecharModalTermoDeUso() {
    this.modalTermoDeUso.close();
    this.planoTermoDeUso = null;
  }

  fecharModalContratoPlano() {
    this.modalContratoPlano.close();
    this.planoContrato = null;
  }

  verificarDegustacao() {
    this.aindaNaoDegustou = false;
    this.registrarPedido();

    // if (
    //   !this.carrinhoService.items.some(
    //     i => i.TiposPromocao !== null && i.TiposPromocao.some(tp => tp)
    //   )
    //   && (
    //     this.carrinhoService.items.some(
    //       i => i.TipoProduto === "Anuncio"
    //     )
    //   )
    // ) {
    //   this.usuarioService.verificarDegustacao().subscribe(
    //     response => {
    //       this.verificouDegustacao = true;
    //       if (response === true) {
    //         // this.message = ['Você já possui um Plano de Degustação e só pode possuir um.'];
    //         // this.typeMessage = 'danger';
    //         this.registrarPedido();
    //       } else if (response === false) {
    //         this.aindaNaoDegustou = true;
    //         this.carregando = false;

    //         setTimeout(function () {
    //           let el = document.getElementById('row-ainda-nao-degustou');
    //           el.scrollIntoView({ behavior: 'smooth' });
    //         }, 500);
    //       }
    //     },
    //     error => {
    //       if (error.error && Array.isArray(error.error)) {
    //         this.message = error.error.map(el => el.Message);
    //         this.typeMessage = 'danger';
    //         this.carregando = false;
    //       } else if (error.error && error.error.Message) {
    //         this.message = [error.error.Message];

    //         this.typeMessage = 'danger';
    //         this.carregando = false;
    //       } else {
    //         this.message = Array.isArray(error) ? error : [error];
    //         this.typeMessage = 'danger';
    //         this.carregando = false;
    //       }
    //     }
    //   );
    // } else {
    //   this.registrarPedido();
    // }
  }

  // verificarDegustacaoSemRegistrarPedido() {
  //   this.aindaNaoDegustou = false;

  //   if (
  //     !this.carrinhoService.items.some(
  //       i => i.TiposPromocao !== null && i.TiposPromocao.some(tp => tp)
  //     )
  //     && (
  //       this.carrinhoService.items.some(
  //         i => i.TipoProduto === "Anuncio"
  //       )
  //     )
  //   ) {
  //     this.usuarioService.verificarDegustacao().subscribe(
  //       response => {
  //         this.verificouDegustacao = true;
  //         if (response === true) 
  //         {

  //         } else if (response === false) {
  //           this.aindaNaoDegustou = true;
  //           this.carregando = false;

  //           if (this.carrinhoService.items.length > 0) {
  //             setTimeout(function () {
  //               let el = document.getElementById('row-ainda-nao-degustou');
  //               el.scrollIntoView({ behavior: 'smooth' });
  //             }, 500);
  //           }
  //         }
  //       },
  //       error => {
  //         if (error.error && Array.isArray(error.error)) {
  //           this.message = error.error.map(el => el.Message);
  //           this.typeMessage = 'danger';
  //           this.carregando = false;
  //         } else if (error.error && error.error.Message) {
  //           this.message = [error.error.Message];

  //           this.typeMessage = 'danger';
  //           this.carregando = false;
  //         } else {
  //           this.message = Array.isArray(error) ? error : [error];
  //           this.typeMessage = 'danger';
  //           this.carregando = false;
  //         }
  //       }
  //     );
  //   }
  // }

  degustarAnuncio() {
    this.carrinhoService.ativarDegustacaoDeAnuncio();
    this.removerCupom();
    this.planoDegustacaoAtivo = true;
    this.getPlanosComContrato();
    window.scrollTo(0, 0);
  }
}
