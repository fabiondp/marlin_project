import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtTokenService } from '../../../services/jwt-token.service';
import { DefaultRequestOptionsService } from '../../../services/default-request-options.service';
import { RequestOptions } from '@angular/http';

@Injectable()
export class ConvenioBancarioService {
  public check: Boolean = false;

  headersByServiceToken = this.requestOptions
    .merge(new RequestOptions())
    .headers.toJSON();
  constructor(
    private httpClient: HttpClient,
    private jwtToken: JwtTokenService,
    private requestOptions: DefaultRequestOptionsService
  ) {
    this.check = this.jwtToken.token ? true : false;
  }

  getAllBancos(): Observable<any> {
    return this.httpClient
      .get(environment.apiUsuario + 'conveniosBancarios/getAllBancos', {
        headers: new HttpHeaders(this.headersByServiceToken)
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar os bancos! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  // getAllTiposCodigoProtesto(): Observable<any> {
  //   return this.httpClient
  //     .get(
  //       environment.apiUsuario + 'conveniosBancarios/getAllTiposCodigoProtesto',
  //       {
  //         headers: new HttpHeaders(this.headersByServiceToken)
  //       }
  //     )
  //     .catch((error: any) => {
  //       if (error.status === 0 || error.status === 500) {
  //         return Observable.throw({
  //           error: [
  //             {
  //               Message:
  //                 'Ocorreu um erro inesperado ao carregar os tipo de códigos de protesto! Por favor, tente mais tarde.'
  //             }
  //           ]
  //         });
  //       }
  //       return Observable.throw(error);
  //     });
  // }

  // getAllTiposCNAB(): Observable<any> {
  //   return this.httpClient
  //     .get(environment.apiUsuario + 'conveniosBancarios/getAllTiposCNAB', {
  //       headers: new HttpHeaders(this.headersByServiceToken)
  //     })
  //     .catch((error: any) => {
  //       if (error.status === 0 || error.status === 500) {
  //         return Observable.throw({
  //           error: [
  //             {
  //               Message:
  //                 'Ocorreu um erro inesperado ao carregar tipos de CNAB! Por favor, tente mais tarde.'
  //             }
  //           ]
  //         });
  //       }
  //       return Observable.throw(error);
  //     });
  // }

  cadastrarConveniosBancarios(data: any): Observable<any> {
    return this.httpClient
      .post(environment.apiUsuario + 'conveniosBancarios', data, {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw(this.getError({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao salvar cobrança bancária! Por favor, tente mais tarde.'
              }
            ]
          }));
        }

        return Observable.throw(this.getError(error));
      });
  }

  editarConveniosBancarios(data: any): Observable<any> {
    return this.httpClient
      .put(environment.apiUsuario + 'conveniosBancarios', data, {
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
                  'Ocorreu um erro inesperado ao salvar cobrança bancária! Por favor, tente mais tarde.'
              }
            ]
          });
        }

        return Observable.throw(this.getError(error));
      });
  }

  getConveniosBancarios(): Observable<any> {
    return this.httpClient
      .get(environment.apiUsuario + 'conveniosBancarios', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar cobrança bancária! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getDetailConvenio(uid): Observable<any> {
    return this.httpClient
      .get(environment.apiUsuario + 'conveniosBancarios/getDetails', {
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
                  'Ocorreu um erro inesperado ao carregar cobrança bancária! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getError(error) {
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

  verificarContaBancaria() {
    return Observable.of(true);
  }
}
