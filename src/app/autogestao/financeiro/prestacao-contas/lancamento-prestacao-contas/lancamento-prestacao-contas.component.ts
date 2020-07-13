import { PrestacaoContasService } from './../prestacao-contas.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lancamento-prestacao-contas',
  templateUrl: './lancamento-prestacao-contas.component.html',
  styleUrls: ['./lancamento-prestacao-contas.component.scss']
})
export class LancamentoPrestacaoContasComponent implements OnInit {
  @Input() cobranca: any;
  @Input() popLancarEntradaSaida: any;

  novaCobranca: any = [];

  carregando = false;
  exibirFormulario = false;

  messageStatus: string;
  messagesFinanceiro = null;
  messages = null;
  typeMessage = null;
  timeMessage = null;

  constructor(private prestacaoContasService: PrestacaoContasService) {}

  ngOnInit() {}

  testeee() {
    this.cobranca.LancamentosPagarReceber = [];
    this.cobranca.MesAno = '[]';
  }

  incluirEntradaSaida(cobranca: any) {
    this.carregando = true;
    if (cobranca.LancamentosPagarReceber == null) {
      cobranca.LancamentosPagarReceber = [];
    }

    // cobranca.LancamentosPagarReceber.push({
    //   TipoLancamento: cobranca.NovoLancamento.TipoLancamento,
    //   DescricaoLancamento: cobranca.NovoLancamento.DescricaoLancamento,
    //   ValorLancamento: cobranca.NovoLancamento.ValorLancamento,
    //   DataLancamento: cobranca.NovoLancamento.DataLancamento
    // });

    this.prestacaoContasService.incluirLancamento(cobranca).subscribe(
      data => {
        this.carregando = false;
        this.exibirFormulario = true;
        this.messageStatus = 'Salvando...';

        this.cobranca.LancamentosPagarReceber = data.LancamentosPagarReceber;
        this.cobranca.Totais = data.Totais;

        this.popLancarEntradaSaida.hide();
      },
      error => {
        // this.messages = error;

        if (error.error && Array.isArray(error.error)) {
          this.messages = error.error.map(el => el.Message);
        } else if (error.error && error.error.Message) {
          this.messages = [error.error.Message];
        } else {
          this.messages = Array.isArray(error) ? error : [error];
        }

        this.typeMessage = 'danger';
        window.scrollTo(0, 0);
        this.exibirFormulario = true;
        this.carregando = false;
      }
    );

    // cobranca.NovoLancamento = null;
  }

  cancelarEntradaSaida(cobranca: any) {
    cobranca.NovoLancamento = null;
    this.popLancarEntradaSaida.hide();
  }
}
