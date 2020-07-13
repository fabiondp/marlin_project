import { CarrinhoService } from '../carrinho/carrinho/carrinho.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MessageService } from '../services/message.service';
import { SimulacaoService } from './simulacao.service';

@Component({
  selector: 'app-simulacao-valor-plano',
  templateUrl: './simulacao-valor-plano.component.html',
  styleUrls: ['./simulacao-valor-plano.component.scss']
})
export class SimulacaoValorPlanoComponent implements OnInit {
  plano: any;

  erros: any[];
  carregando = false;
  carregandoMensagem = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private simulacaoService: SimulacaoService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.params.UidPlano) {
      this.plano = this.simulacaoService.getPlano(this.route.snapshot.params.UidPlano);
      this.plano.Valor = null;
      this.plano.DadosContrato = {
        VigenciaContratoMeses: null,
        ValorLocacao: null
      }
    }
  }

  calcularSimulacao(simulacaoValorForm: NgForm) {
    this.plano.Valor = null;

    if (simulacaoValorForm.valid) {
      this.erros = [];
      this.carregando = true;
      this.carregandoMensagem = 'Calculando valor do plano...';

      const data = {
        valorAluguel: this.plano.DadosContrato.ValorLocacao,
        vigenciaMeses: this.plano.DadosContrato.VigenciaContratoMeses,
      }

      this.simulacaoService.getValorPlanoContrato(data).subscribe(
        (response) => {
          if (typeof response === "number") {
            this.plano.Valor = response;
          }
          this.carregando = false;
        },
        (error) => {
          if (error.error && Array.isArray(error.error)) {
            this.erros = error.error.map(el => el.Message);
          } else if (error.error && error.error.Message) {
            this.erros = [error.error.Message];
          } else {
            this.erros = Array.isArray(error) ? error : [error];
          }

          this.carregando = false;
        }
      );
    }
  }

  contratarPlano() {
    this.carrinhoService.adicionarItem(this.plano);
    this.router.navigate(['/carrinho']);
  }
}
