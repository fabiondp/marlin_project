import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DefaultRequestOptionsService } from 'app/services/default-request-options.service';

@Injectable()
export class FinanceiroService {
  constructor(
    private httpClient: HttpClient,
    private requestOptions: DefaultRequestOptionsService
  ) {}

  mockadoGetFinanceiroImoves(orderBy?: string) {
    return Observable.of({
      ListaAgrupada: [
        {
          Agrupador: 'Rua México 3, Centro', //Imóvel / Proprietário
          Cobrancas: [
            {
              MesAno: '09/2018',
              ValorUltimoBoleto: 1000,
              ValorPago: 3000, //soma de todos os boletos pagos
              TaxaIntermediacao: {
                Pago: '1000', //Cálculo em cima do valor pago
                Esperado: '1000' //Cálculo em cima do valor do último boleto gerado
              },
              TaxaAdministracao: {
                Pago: '1000', //Cálculo em cima do valor pago
                Esperado: '1000' //Cálculo em cima do valor do último boleto gerado
              },
              BoletosPagos: [
                {
                  DataEmissao: '2018-12-14T16:24:41',
                  DataVencimento: '2018-12-19T16:24:41',
                  ValorTotal: 1500,
                  ValorPago: 1500,
                  Lancamentos: [
                    {
                      DescricaoLancamento: 'Aluguel',
                      TipoLancamento: 1,
                      ValorLancamento: 1500,
                      Editavel: false
                    }
                  ]
                }
              ],
              LancamentosPagarReceber: [
                {
                  DescricaoLancamento: 'IPTU',
                  TipoLancamento: 1,
                  ValorLancamento: 1500,
                  DataLancamento: '2018-12-14T16:24:41'
                },
                {
                  DescricaoLancamento: 'Manutenção',
                  TipoLancamento: 2,
                  ValorLancamento: 500,
                  DataLancamento: '2018-12-14T16:24:41'
                }
              ]
            },
            {
              MesAno: '08/2018',
              ValorUltimoBoleto: 1000,
              ValorPago: 3000, //soma de todos os boletos pagos
              TaxaIntermediacao: {
                Pago: '1000', //Cálculo em cima do valor pago
                Esperado: '1000' //Cálculo em cima do valor do último boleto gerado
              },
              TaxaAdministracao: {
                Pago: '1000', //Cálculo em cima do valor pago
                Esperado: '1000' //Cálculo em cima do valor do último boleto gerado
              },
              BoletosPagos: [
                {
                  DataEmissao: '2018-12-14T16:24:41',
                  DataVencimento: '2018-12-19T16:24:41',
                  ValorTotal: 1500,
                  ValorPago: 1500,
                  Lancamentos: [
                    {
                      DescricaoLancamento: 'Aluguel',
                      TipoLancamento: 1,
                      ValorLancamento: 1500,
                      Editavel: false
                    }
                  ]
                }
              ],
              LancamentosPagarReceber: [
                {
                  DescricaoLancamento: 'Manutenção',
                  TipoLancamento: 2,
                  ValorLancamento: 500,
                  DataLancamento: '2018-12-14T16:24:41'
                }
              ]
            }
          ]
        }
      ]
    });
  }
}
