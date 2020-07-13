import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DefaultRequestOptionsService } from 'app/services/default-request-options.service';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { MensageError } from 'app/shared/menssage.error';

@Injectable()
export class CobrancasService {
  constructor(
    private httpClient: HttpClient,
    private requestOptions: DefaultRequestOptionsService
  ) { }

  getCobrancas(orderBy: string): Observable<any> {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'cobrancas/getAllByClienteId', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
        params: {
          agrupamento: orderBy
        }
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar o imóvel! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getHistoricoCobrancas(orderBy: string, page, pagesize): Observable<any> {
    return this.httpClient
      .get(
        environment.apiAutogestaoLocacao + 'cobrancas/getHistoricoByClienteId',
        {
          headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
          params: {
            agrupamento: orderBy,
            page: page,
            pagesize: pagesize
          },
          observe: 'response'
        }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar o imóvel! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  // getCobrancas(orderBy?: string) {
  //   return Observable.of({
  //     ListaAgrupada: [
  //       {
  //         Agrupador: 'Vencimento: 10/11/2018',
  //         Lista: [
  //           {
  //             DataVencimento: '2018-11-10T00:00:00',
  //             Imovel: 'Rua México 3, Centro',
  //             ValorLocacao: 2000.0,
  //             ValorCondominio: 200.0,
  //             ValorIPTU: 150.0,
  //             ValorTotal: 2350.0,
  //             UIdContrato: '8625b098-a1db-e811-80e6-000c29c76f6e',
  //             UIdImovel: 'e19ec9a3-85db-e811-80e6-000c29c76f6e',
  //             UIdBoleto: '00000000-0000-0000-0000-000000000000',
  //             Selected: false,
  //             Lancamentos: null
  //           },
  //           {
  //             DataVencimento: '2018-11-10T00:00:00',
  //             Imovel: 'Rua França 50, Centro',
  //             ValorLocacao: 2100.0,
  //             ValorCondominio: 200.0,
  //             ValorIPTU: 150.0,
  //             ValorTotal: 2450.0,
  //             UIdContrato: '8625b098-a1db-e811-80e6-000c29c76f6e',
  //             UIdImovel: 'e19ec9a3-85db-e811-80e6-000c29c76f6e',
  //             UIdBoleto: '00000000-0000-0000-0000-000000000000',
  //             Selected: false,
  //             Lancamentos: null
  //           }
  //         ]
  //       },
  //       {
  //         Agrupador: 'Vencimento: 10/12/2018',
  //         Lista: [
  //           {
  //             DataVencimento: '2018-12-10T00:00:00',
  //             Imovel: 'Rua Paris 3, Centro',
  //             ValorLocacao: 2000.0,
  //             ValorCondominio: 200.0,
  //             ValorIPTU: 150.0,
  //             ValorTotal: 2350.0,
  //             UIdContrato: '8625b098-a1db-e811-80e6-000c29c76f6e',
  //             UIdImovel: 'e19ec9a3-85db-e811-80e6-000c29c76f6e',
  //             UIdBoleto: '00000000-0000-0000-0000-000000000000',
  //             Selected: false,
  //             Lancamentos: null
  //           },
  //           {
  //             DataVencimento: '2018-12-10T00:00:00',
  //             Imovel: 'Rua Brasil 50, Centro',
  //             ValorLocacao: 2100.0,
  //             ValorCondominio: 200.0,
  //             ValorIPTU: 150.0,
  //             ValorTotal: 2450.0,
  //             UIdContrato: '8625b098-a1db-e811-80e6-000c29c76f6e',
  //             UIdImovel: 'e19ec9a3-85db-e811-80e6-000c29c76f6e',
  //             UIdBoleto: '00000000-0000-0000-0000-000000000000',
  //             Selected: false,
  //             Lancamentos: null
  //           }
  //         ]
  //       }
  //     ]
  //   });
  // }

  getMockCobrancaDetail() {
    return Observable.of({
      Imovel: 'Rua México 3, Centro',
      Status: 'Paga',
      UIdImovel: 'e19ec9a3-85db-e811-80e6-000c29c76f6e',
      ValorLocacao: 2000.0,
      ValorCondominio: 200.0,
      ValorIPTU: 150.0,
      ValorTotal: 2350.0,
      Lancamentos: null,
      Data: '2018-09-10T00:00:00',
      Faturas: [
        {
          DataVencimento: '2018-10-10T00:00:00',
          Status: 'Pendente',
          Selected: false,
          UIdBoleto: '00000000-0000-0000-0000-000000000000',
          UIdContrato: '8625b098-a1db-e811-80e6-000c29c76f6e',
          UIdImovel: 'e19ec9a3-85db-e811-80e6-000c29c76f6e',
          ValorCondominio: 200,
          ValorIPTU: 150,
          ValorLocacao: 2000,
          ValorTotal: 2350
        },
        {
          DataVencimento: '2018-09-10T00:00:00',
          Status: 'Expirado',
          Selected: false,
          UIdBoleto: '00000000-0000-0000-0000-000000000000',
          UIdContrato: '8625b098-a1db-e811-80e6-000c29c76f6e',
          UIdImovel: 'e19ec9a3-85db-e811-80e6-000c29c76f6e',
          ValorCondominio: 200,
          ValorIPTU: 150,
          ValorLocacao: 2000,
          ValorTotal: 2350
        }
      ]
    });
  }

  getCobrancaDetail(uid): Observable<any> {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'cobrancas/getDetails', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
        params: {
          uidCobranca: uid
        }
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar os dados da cobrança! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  gerarCobrancas(data) {
    return this.httpClient
      .post(
        environment.apiAutogestaoLocacao + 'cobrancas/gerarCobrancas',
        data,
        {
          headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
        }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw(
            MensageError.getMessagensError({
              error: [
                {
                  Message:
                    'Ocorreu um erro inesperado ao gerar as cobranças! Por favor, tente mais tarde.'
                }
              ]
            })
          );
        }
        return Observable.throw(MensageError.getMessagensError(error));
      });
  }

  gerarNovoBoleto(data) {
    return this.httpClient
      .post(
        environment.apiAutogestaoLocacao + 'boletos/gerarNovoBoleto',
        data,
        // {
        //   headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
        // }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw(
            MensageError.getMessagensError({
              error: [
                {
                  Message:
                    'Ocorreu um erro inesperado ao gerar novo boleto! Por favor, tente mais tarde.'
                }
              ]
            })
          );
        }
        return Observable.throw(MensageError.getMessagensError(error));
      });
  }



  reenviarPorEmail(data) {
    return this.httpClient
      .post(
        `${environment.apiAutogestaoLocacao}boletos/${data}/reenviarEmail`,
        data,
        // {
        //   headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
        // }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw(
            MensageError.getMessagensError({
              error: [
                {
                  Message:
                    'Ocorreu um erro inesperado ao reenviar o boleto! Por favor, tente mais tarde.'
                }
              ]
            })
          );
        }
        return Observable.throw(MensageError.getMessagensError(error));
      });
  }
}
