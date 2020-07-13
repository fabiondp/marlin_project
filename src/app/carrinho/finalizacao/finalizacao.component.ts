import { AuthService } from './../../services/auth.service';
import { CarrinhoService } from 'app/carrinho/carrinho/carrinho.service';
import { PedidoService } from './../pedido.service';
import { Component, OnInit } from '@angular/core';
import { Message } from 'app/carrinho/pagamento/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalizacao',
  templateUrl: './finalizacao.component.html',
  styleUrls: ['./finalizacao.component.scss']
})
export class FinalizacaoComponent implements OnInit {
  descricaoDoStatus: string;
  mensagens: Message[];

  identificadorCompra = null;

  pedidoFinalizadoComSucesso = false;

  constructor(
    private pedidoService: PedidoService,
    private carrinhoService: CarrinhoService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.identificadorCompra = this.pedidoService.numeroPedido;
    this.pedidoFinalizadoComSucesso = this.pedidoService.erros == null;

    if (!this.pedidoFinalizadoComSucesso) {
      this.descricaoDoStatus = null;
      this.mensagens = this.pedidoService.erros;
    }

    console.log('this.pedidoService.pedidoStatus', this.pedidoService.pedidoStatus);

    if (!this.pedidoService.pedidoStatus) {
      this.finalizarPedido();
    }
  }

  finalizarPedido() {
    this.pedidoFinalizadoComSucesso = false;
    this.mensagens = null;
    this.descricaoDoStatus = "Aguarde um momento, estamos finalizando sua compra!";

    this.pedidoService.finalizar().subscribe(
      (response) => {
        this.descricaoDoStatus = null;
        this.carrinhoService.limpar();
        this.authService.atualizarDadosDoUsuario();
        this.pedidoService.limpar();
        this.pedidoFinalizadoComSucesso = true;
      },
      (error) => {
        if (error && error.some(e => e.hasOwnProperty('target') && e['target'] === "GATEWAYPAGAMENTO")) {
          console.log('if');
          this.router.navigate(['/carrinho/pagamento']);
        } else {
          this.descricaoDoStatus = null;
          this.mensagens = error;
          console.log('error', error);
        }
      }
    );
  }

  public emProcessamento(): boolean {
    return this.descricaoDoStatus != null;
  }
}
