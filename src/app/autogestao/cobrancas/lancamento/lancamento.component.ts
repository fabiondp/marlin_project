import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.scss']
})
export class LancamentoComponent implements OnInit {
  @Input() cobranca;
  constructor() {}

  ngOnInit() {}

  incluirCobrancaDesconto(cobranca) {
    if (cobranca.LancamentosBoleto == null) {
      cobranca.LancamentosBoleto = [];
    }

    cobranca.LancamentosBoleto.push({
      TipoLancamento: cobranca.NovoLancamento.TipoLancamento,
      DescricaoLancamento: cobranca.NovoLancamento.DescricaoLancamento,
      ValorLancamento: cobranca.NovoLancamento.ValorLancamento
    });

    cobranca.NovoLancamento = null;
  }

  cancelarCobrancaDesconto(cobranca) {
    cobranca.NovoLancamento = null;
  }
}
