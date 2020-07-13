import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { JwtTokenService } from 'app/services/jwt-token.service';
import { DefaultRequestOptionsService } from 'app/services/default-request-options.service';
import { environment } from 'environments/environment';

@Injectable()
export class ReajusteAluguelService {

  constructor(
    private httpClient: HttpClient,
    private jwtToken: JwtTokenService,
    private requestOptions: DefaultRequestOptionsService
  ) { }

  aplicarPercentualReajuste(data) {
    return this.httpClient
      .post(environment.apiAutogestaoLocacao + 'reajustes', data, {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao reajustar os constroratos de aluguel! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(this.getError(error));
      });
  }

  obterImoveisParaReajuste() {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'reajustes/getAllVigentes', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar os contratos a serem reajustados! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(this.getError(error));
      });
  }

  getMockImoveisParaReajuste() {
    return Observable.of(
      {
        ListaAgrupada: [
          {
            Indice: 'IPCA',
            Lista: [
              {
                Imovel: 'Rua Voluntários da Pátria 860/ 203',
                UIdContrato: "00000000-0000-0000-0000-000000000000",
                Selected: false
              },
              {
                Imovel: 'Rua Voluntários da Pátria 860/ 101',
                UIdContrato: "00000000-0000-0000-0000-000000000000",
                Selected: false
              }
            ]
          },
          {
            Indice: 'IGPM',
            Lista: [
              {
                Imovel: 'Rua Bambina 250',
                UIdContrato: "00000000-0000-0000-0000-000000000000",
                Selected: false
              }
            ]
          }
        ]
      }
    );
  }

  getError(error) {
    // tslint:disable-next-line:prefer-const
    let errorOutput = ['Ocorreu um erro inesperado. Tente novamente mais tarde'];
    if (error && error.error && error.error.Message) {
      errorOutput = [error.error.Message];

    } else if (error && error.error && Array.isArray(error.error) && error.error.some(e => e.hasOwnProperty('Message'))) {
      errorOutput = error.error.map(e => e.Message);

    } else if (error && Array.isArray(error) && error.some(e => e.hasOwnProperty('Message'))) {
      errorOutput = error.map(e => e.Message);
    } else if (error.Message) {
      errorOutput = [error.Message];
    } else {
      errorOutput = ['Ocorreu um erro inesperado. Tente novamente mais tarde!'];
    }

    return errorOutput;
  }
}
