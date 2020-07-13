import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lancamento-financeiro',
  templateUrl: './lancamento-financeiro.component.html',
  styleUrls: ['./lancamento-financeiro.component.scss']
})
export class LancamentoFinanceiroComponent implements OnInit {
  @Input() cobranca;
  @Input() popLancarEntradaSaida: any;
  constructor() {}

  ngOnInit() {}

  incluirEntradaSaida(cobranca) {
    console.log('cobranca incluir', cobranca);

    if (cobranca.LancamentosPagarReceber == null) {
      cobranca.LancamentosPagarReceber = [];
    }

    cobranca.LancamentosPagarReceber.push({
      TipoLancamento: cobranca.NovoLancamento.TipoLancamento,
      DescricaoLancamento: cobranca.NovoLancamento.DescricaoLancamento,
      ValorLancamento: cobranca.NovoLancamento.ValorLancamento,
      DataLancamento: cobranca.NovoLancamento.DataLancamento
    });

    cobranca.NovoLancamento = null;
    this.popLancarEntradaSaida.hide();
  }

  cancelarEntradaSaida(cobranca) {
    cobranca.NovoLancamento = null;
    this.popLancarEntradaSaida.hide();
  }
}
