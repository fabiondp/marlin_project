import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { MessageService } from '../../services/message.service';
import { VerificarDadosService } from './verificar-dados.service';
import { Router } from '@angular/router';
import { CarrinhoService } from '../carrinho/carrinho.service';
import { FaleconoscoComponent } from 'app/faleconosco/faleconosco.component';

@Component({
  selector: 'app-verificar-dados',
  templateUrl: './verificar-dados.component.html',
  styleUrls: ['./verificar-dados.component.scss']
})
export class VerificarDadosComponent implements OnInit, AfterViewInit {
  @ViewChild('faleConosco') faleConosco: FaleconoscoComponent;


  carregando = true;
  message = null;
  typeMessage = null;
  timeMessage = null;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private verificarDadosService: VerificarDadosService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    const self = this;
    setTimeout(function () {
      self.verificarDados();
    }, 3000);
  }

  verificarDados(e?) {
    if (e) {
      e.preventDefault();
    }

    this.carregando = true;
    this.verificarDadosService.verificar().subscribe(
      (response: any) => {
        console.log(response);
        if (
          this.carrinhoService.items.length > 0 &&
          this.carrinhoService.total() <= 0
        ) {
          this.router.navigate(['/carrinho/finalizacao']);
        } else if (this.carrinhoService.total() > 0) {
          this.router.navigate(['/carrinho/pagamento']);
        } else {
          // this.message = ['Ocorreu um erro inesperado! Tente novamente!'];
          // this.typeMessage = 'danger';
          this.carregando = false;
        }
      },
      (error: any) => {
        console.log(error);
        // this.message = ['Ocorreu um erro inesperado! Tente novamente!'];
        // this.typeMessage = 'danger';
        this.carregando = false;
      }
    );
  }

  abrirModalFaleConosco(e) {
    e.preventDefault();
    this.faleConosco.abrirModalFaleConosco();
  }
}
