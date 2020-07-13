import { Observable } from 'rxjs/Observable';
import { DefaultRequestOptionsService } from 'app/services/default-request-options.service';
import { JwtTokenService } from 'app/services/jwt-token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class DetalheImovelService {
  constructor(
    private httpClient: HttpClient,
    private jwtToken: JwtTokenService,
    private requestOptions: DefaultRequestOptionsService
  ) { }

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

  getDetail(uid): Observable<any> {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'imoveis/getDetail', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
        params: {
          id: uid
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
        return Observable.throw(this.getError(error));
      });
  }

  getDetailProprietario(uid): Observable<any> {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'proprietarios/getByImovel', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
        params: {
          imovelId: uid
        }
      })
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

  getDetailContrato(uid): Observable<any> {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'contratos/getByImovel', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
        params: {
          imovelId: uid
        }
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar os dados do contrato! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getDetailsWithLocatarioFiador(uid): Observable<any> {
    return this.httpClient
      .get(
        environment.apiAutogestaoLocacao +
        'contratos/getDetailsComLocatarioEGarantia',
        {
          headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
          params: {
            id: uid
          }
        }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar os dados do locatário! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getDetailLocatario(uid): Observable<any> {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'Locatarios/getByImovel', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
        params: {
          imovelId: uid
        }
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar os dados do locatário! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getByImovel(uid): Observable<any> {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'contratos/getByImovel', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
        params: {
          imovelId: uid
        }
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar os dados do locatário! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }
}
