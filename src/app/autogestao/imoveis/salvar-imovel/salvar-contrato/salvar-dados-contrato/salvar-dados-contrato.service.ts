import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { DefaultRequestOptionsService } from 'app/services/default-request-options.service';
import { JwtTokenService } from 'app/services/jwt-token.service';

@Injectable()
export class SalvarDadosContratoService {

  opcoesFormaPagamento;
  opcoesGarantiaImovel;
  opcoesTipoRepresentacao;

  constructor(
    private httpClient: HttpClient,
    private jwtToken: JwtTokenService,
    private requestOptions: DefaultRequestOptionsService
  ) { }

  getAllEnumFormaPagamento(): Observable<any> {
    if (!this.opcoesFormaPagamento) {
      return this.httpClient
        .get(
          environment.apiAutogestaoLocacao + 'contratos/getAllEnumFormaPagamento'
        )
        .map(res => {
          this.opcoesFormaPagamento = res;
          return res;
        })
        .catch((error: any) => {
          if (error.status === 0 || error.status === 500) {
            return Observable.throw({
              error: [
                {
                  Message:
                    'Ocorreu um erro inesperado ao carregar as opções de gênero! Por favor, tente mais tarde.'
                }
              ]
            });
          }
          return Observable.throw(error);
        });
    } else {
      return Observable.of(this.opcoesFormaPagamento);
    }
  }

  getAllEnumGarantiaImovel(): Observable<any> {
    if (!this.opcoesGarantiaImovel) {
      return this.httpClient
        .get(
          environment.apiAutogestaoLocacao + 'contratos/getAllEnumGarantiaImovel'
        )
        .map(res => {
          this.opcoesGarantiaImovel = res;
          return res;
        })
        .catch((error: any) => {
          if (error.status === 0 || error.status === 500) {
            return Observable.throw({
              error: [
                {
                  Message:
                    'Ocorreu um erro inesperado ao carregar as opções de garantia! Por favor, tente mais tarde.'
                }
              ]
            });
          }
          return Observable.throw(error);
        });
    } else {
      return Observable.of(this.opcoesGarantiaImovel);
    }
  }

  getAllEnumTipoRepresentacao(): Observable<any> {
    if (!this.opcoesTipoRepresentacao) {
      return this.httpClient
        .get(
          environment.apiAutogestaoLocacao +
          'contratos/getAllEnumTipoRepresentacao'
        )
        .map(res => {
          this.opcoesTipoRepresentacao = res;
          return res;
        })
        .catch((error: any) => {
          if (error.status === 0 || error.status === 500) {
            return Observable.throw({
              error: [
                {
                  Message:
                    'Ocorreu um erro inesperado ao carregar as opções de tipo de representação! Por favor, tente mais tarde.'
                }
              ]
            });
          }
          return Observable.throw(error);
        });
    } else {
      return Observable.of(this.opcoesTipoRepresentacao);
    }
  }

  cadastrarDadosContrato(data) {
    return this.httpClient
      .post(environment.apiAutogestaoLocacao + 'contratos', data, {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao cadastrar os dados do contrato! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  atualizarDadosContrato(data) {
    return this.httpClient
      .put(environment.apiAutogestaoLocacao + 'contratos', data, {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
        params: {
          id: data['Uid']
        }
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao cadastrar os dados do contrato! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }
}
