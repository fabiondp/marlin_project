import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class InformacoesBancariasService {
  opcoesBancos;

  constructor(private httpClient: HttpClient) {}

  getAllBancos(): Observable<any> {
    if (!this.opcoesBancos) {
      return this.httpClient
        .get(environment.apiUsuario + 'conveniosBancarios/getAllBancos')
        .map(res => {
          this.opcoesBancos = res;
          return res;
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
    } else {
      return Observable.of(this.opcoesBancos);
    }
  }

  cadastrarConveniosBancarios(data: any): Observable<any> {
    return this.httpClient
      .post(environment.apiUsuario + 'conveniosBancarios', data)
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw(
            this.getError({
              error: [
                {
                  Message:
                    'Ocorreu um erro inesperado ao salvar cobrança bancária! Por favor, tente mais tarde.'
                }
              ]
            })
          );
        }

        return Observable.throw(this.getError(error));
      });
  }

  editarConveniosBancarios(data: any): Observable<any> {
    return this.httpClient
      .put(environment.apiUsuario + 'conveniosBancarios', data, {
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
}
