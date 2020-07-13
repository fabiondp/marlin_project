import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'app/bootstrap/modal/modal.component';
import { PrestacaoContasService } from '../prestacao-contas/prestacao-contas.service';

@Component({
  selector: 'app-modal-editar-taxa-administracao',
  templateUrl: './modal-editar-taxa-administracao.component.html',
  styleUrls: ['./modal-editar-taxa-administracao.component.scss']
})
export class ModalEditarTaxaAdministracaoComponent implements OnInit {

  @ViewChild('_modalEditarTaxaAdministracao')
  _modalEditarTaxaAdministracao: ModalComponent;

  processandoEdicaoTaxaAdministracao: boolean;
  messagesProcessandoEdicaoTaxaAdministracao = [];

  cobrancaEmAlteracaoDeTaxaAdministracao: any;

  constructor(
    private prestacaoContasService: PrestacaoContasService
  ) { }

  ngOnInit() {
  }

  open(_cobrancaEmEdicao) {
    this.processandoEdicaoTaxaAdministracao = false;
    this.cobrancaEmAlteracaoDeTaxaAdministracao = _cobrancaEmEdicao;
    this.cobrancaEmAlteracaoDeTaxaAdministracao.Totais.SimuladorValorTotalPagoCalculoTaxaAdministracao = this.cobrancaEmAlteracaoDeTaxaAdministracao.Totais.ValorTotalPagoCalculoTaxaAdministracao;
    this.cobrancaEmAlteracaoDeTaxaAdministracao.Taxas.TaxaAdministracao.SimuladorPago = this.cobrancaEmAlteracaoDeTaxaAdministracao.Taxas.TaxaAdministracao.Pago;
    this.cobrancaEmAlteracaoDeTaxaAdministracao.Totais.SimuladorSaldoLiquido = this.cobrancaEmAlteracaoDeTaxaAdministracao.Totais.SaldoLiquido;

    this._modalEditarTaxaAdministracao.open();
  }

  close() {
    this._modalEditarTaxaAdministracao.close();
    this.cobrancaEmAlteracaoDeTaxaAdministracao = null;
  }

  recalcularTaxaAdministracao(cobrancaASerRecalculada) {
    let valorTaxaAdministracao = 0;

    if (cobrancaASerRecalculada && cobrancaASerRecalculada.BoletosPagos && cobrancaASerRecalculada.BoletosPagos) {
      cobrancaASerRecalculada.BoletosPagos.forEach(boleto => {

        boleto.Lancamentos.forEach(lancamento => {
          if (lancamento.CalculoTaxaAdministracao && lancamento.TipoLancamento === 1) {
            valorTaxaAdministracao = valorTaxaAdministracao + lancamento.ValorLancamento;
          } else if (lancamento.CalculoTaxaAdministracao && lancamento.TipoLancamento === 2) {
            valorTaxaAdministracao = valorTaxaAdministracao - lancamento.ValorLancamento;
          }
        });

      });
    }

    cobrancaASerRecalculada.Totais.SimuladorValorTotalPagoCalculoTaxaAdministracao = valorTaxaAdministracao;
    cobrancaASerRecalculada.Taxas.TaxaAdministracao.SimuladorPago = (valorTaxaAdministracao * (cobrancaASerRecalculada.Taxas.TaxaAdministracao.percentualTaxa / 100));


    cobrancaASerRecalculada.Totais.SimuladorSaldoLiquido = cobrancaASerRecalculada.Totais.ValorTotalPago + cobrancaASerRecalculada.Totais.ValorTotalLancamentosReceber;
    cobrancaASerRecalculada.Totais.SimuladorSaldoLiquido = cobrancaASerRecalculada.Totais.SimuladorSaldoLiquido - cobrancaASerRecalculada.Totais.ValorTotalLancamentosPagar;
    cobrancaASerRecalculada.Totais.SimuladorSaldoLiquido = cobrancaASerRecalculada.Totais.SimuladorSaldoLiquido - cobrancaASerRecalculada.Taxas.TaxaIntermediacao.Esperado;
    cobrancaASerRecalculada.Totais.SimuladorSaldoLiquido = cobrancaASerRecalculada.Totais.SimuladorSaldoLiquido - cobrancaASerRecalculada.Taxas.TaxaAdministracao.SimuladorPago;
    cobrancaASerRecalculada.Totais.SimuladorSaldoLiquido = cobrancaASerRecalculada.Totais.SimuladorSaldoLiquido - cobrancaASerRecalculada.Taxas.TaxaBancaria.Pago;
    console.log('cobrancaASerRecalculada.Totais.SimuladorSaldoLiquido ', cobrancaASerRecalculada.Totais.SimuladorSaldoLiquido);
  }

  salvarEdicaoTaxaAdministracao() {
    const lancamentos = [];

    this.cobrancaEmAlteracaoDeTaxaAdministracao.BoletosPagos.forEach(boleto => {
      boleto.Lancamentos.forEach(lancamento => {
        lancamentos.push(lancamento);
      });
    });

    this.processandoEdicaoTaxaAdministracao = true;
    this.prestacaoContasService.atualizaCalculoTaxaAdministracao(lancamentos)
      .subscribe(
        (response) => {
          this.cobrancaEmAlteracaoDeTaxaAdministracao.Totais.ValorTotalPagoCalculoTaxaAdministracao = this.cobrancaEmAlteracaoDeTaxaAdministracao.Totais.SimuladorValorTotalPagoCalculoTaxaAdministracao;
          this.cobrancaEmAlteracaoDeTaxaAdministracao.Taxas.TaxaAdministracao.Pago = this.cobrancaEmAlteracaoDeTaxaAdministracao.Taxas.TaxaAdministracao.SimuladorPago;
          this.cobrancaEmAlteracaoDeTaxaAdministracao.Totais.SaldoLiquido = this.cobrancaEmAlteracaoDeTaxaAdministracao.Totais.SimuladorSaldoLiquido;
          this.processandoEdicaoTaxaAdministracao = false;
          this._modalEditarTaxaAdministracao.close();
          this.cobrancaEmAlteracaoDeTaxaAdministracao = null;
        },
        (error) => {
          this.messagesProcessandoEdicaoTaxaAdministracao = error;
          this.processandoEdicaoTaxaAdministracao = false;
        }
      );
  }

}
