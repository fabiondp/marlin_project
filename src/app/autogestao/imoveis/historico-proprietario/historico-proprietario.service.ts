import { Observable } from 'rxjs/Observable';
import { DefaultRequestOptionsService } from 'app/services/default-request-options.service';
import { JwtTokenService } from 'app/services/jwt-token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class HistoricoProprietarioService {
  constructor(
    private httpClient: HttpClient,
    private jwtToken: JwtTokenService,
    private requestOptions: DefaultRequestOptionsService
  ) {}

  getError(error) {
    // tslint:disable-next-line:prefer-const
    let errorOutput = [
      'Ocorreu um erro inesperado. Tente novamente mais tarde'
    ];
    if (error && error.error && error.error.Message) {
      errorOutput = [error.error.Message];
    } else if (
      error &&
      error.error &&
      Array.isArray(error.error) &&
      error.error.some(e => e.hasOwnProperty('Message'))
    ) {
      errorOutput = error.error.map(e => e.Message);
    } else if (
      error &&
      Array.isArray(error) &&
      error.some(e => e.hasOwnProperty('Message'))
    ) {
      errorOutput = error.map(e => e.Message);
    } else if (error.Message) {
      errorOutput = [error.Message];
    } else {
      errorOutput = ['Ocorreu um erro inesperado. Tente novamente mais tarde!'];
    }

    return errorOutput;
  }

  getDetailsHistorico(uidProprietario, uidImovel): Observable<any> {
    return this.httpClient
      .get(
        environment.apiAutogestaoLocacao + 'proprietarios/getDetailsHistorico',
        {
          headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
          params: {
            id: uidProprietario,
            imovelId: uidImovel
          }
        }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar os dados do proprietário! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getHistoricoByImovel(uidImovel): Observable<any> {
    return this.httpClient
      .get(
        environment.apiAutogestaoLocacao + 'proprietarios/getHistoricoByImovel',
        {
          headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
          params: {
            imovelId: uidImovel
          }
        }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar os dados do proprietário! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }
}
