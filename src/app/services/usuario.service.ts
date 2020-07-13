import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';

import { environment } from 'environments/environment';
import { DefaultRequestOptionsService } from './default-request-options.service';
import { RequestOptions } from '@angular/http';

const { log } = console;
@Injectable()
export class UsuarioService {
  subscribe(): any {
    throw new Error('Method not implemented.');
  }

  messageError =
    'Ocorreu um erro inesperado no cadastro de usuário! Por favor, tente mais tarde.';

  headersByServiceToken = this.requestOptions
    .merge(new RequestOptions())
    .headers.toJSON();

  constructor(
    private http: HttpClient,
    private requestOptions: DefaultRequestOptionsService
  ) { }

  getAllEnumSexo(): Observable<any> {
    return this.http
      .get(environment.apiUsuario + 'pessoas/getAllEnumSexo')
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message: this.messageError
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getAllEnumEstadoCivil(): Observable<any> {
    return this.http
      .get(environment.apiUsuario + 'pessoas/getAllEnumEstadoCivil')
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message: this.messageError
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getAllEnumTiposContato() {
    return this.http.get(
      environment.apiUsuario + 'contatos/getAllEnumTiposContato'
    );
  }

  save(data: any): Observable<any> {
    return !data.Uid || data.Uid === '00000000-0000-0000-0000-000000000000'
      ? this.http.post(environment.apiUsuario + 'pessoas', data, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
      : this.http
        .put(environment.apiUsuario + 'pessoas', data, {
          headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
        })
        .catch((error: any) => {
          if (error.status === 0 || error.status === 500) {
            return Observable.throw({
              error: [
                {
                  Message:
                    'Ocorreu um erro inesperado ao cadastrar usuário! Por favor, tente mais tarde.'
                }
              ]
            });
          }
          return Observable.throw(error);
        });
  }

  redefinirSenha(data: any) {
    return this.http
      .put(environment.apiUsuario + 'pessoas/redefinirSenha', data, {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar usuário! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        log('passou de catch error.');
        return Observable.throw(error);
      });
  }

  find(): Observable<any> {
    return this.http
      .get(environment.apiUsuario + 'pessoas', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar usuário! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      }); // Uid
  }

  validarAcessoCadastro(cpfcnpj: string, email: string): Observable<any> {
    return this.http
      .get(
        environment.apiUsuario +
        'pessoas/validarAcessoCadastro?cpfCnpj=' +
        cpfcnpj +
        '&email=' +
        email
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message: this.messageError
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  validarEmail(email: string): Observable<any> {
    return this.http
      .get(environment.apiUsuario + 'pessoas/validarEmail', {
        params: {
          email: email
        }
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw(
            this.getError({
              error: [
                {
                  Message:
                    'Ocorreu um erro inesperado ao validar e-mail. Tente novamente mais tarde!'
                }
              ]
            })
          );
        }
        return Observable.throw(this.getError(error));
      });
  }

  putPermissaoAcessoClickEAlugue(data: any): Observable<any> {
    return this.http
      .put(
        environment.apiUsuario + 'pessoas/permissaoAcessoCliqueEAlugue',
        data
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message: this.messageError
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  salvarPlanosContratados(data: any): Observable<any> {
    return this.http
      .post(environment.apiUsuario + 'planosContratados', data, {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao contratar plano! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error.error.Message);
      });
  }

  salvarPedidos(data: any): Observable<any> {
    return this.http
      .post(environment.apiPedido + 'pedidos', data, {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao contratar plano! Por favor, tente mais tarde.'
              }
            ]
          });
        }

        if (error.error.Message) {
          return Observable.throw(error.error.Message);
        }

        return Observable.throw(error.error);
      });
  }

  reativarAssinatura(): Observable<any> {
    return this.http
      .post(environment.apiPedido + 'assinaturas/reativar', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao solicitar fatura! Por favor, tente mais tarde.'
              }
            ]
          });
        }

        if (error.error.Message) {
          return Observable.throw(error.error.Message);
        }

        return Observable.throw(error.error);
      });
  }

  reenviarFatura(): Observable<any> {
    return this.http
      .post(environment.apiPedido + 'faturas/reenviarFatura', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao reenviar fatura! Por favor, tente mais tarde.'
              }
            ]
          });
        }

        if (error.error.Message) {
          return Observable.throw(error.error.Message);
        }

        return Observable.throw(error.error);
      });
  }


  planosContratados(): Observable<any> {
    return this.http
      .get(environment.apiUsuario + 'planosContratados/getMeuPlanos', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao exibir planos! Por favor, tente mais tarde.'
              }
            ]
          });
        } else if (error.status === 401) {
          return Observable.throw({
            error: [
              {
                Message: 'A autorização foi negada para este pedido.'
              }
            ]
          });
        }

        return Observable.throw(error);
      });
  }

  getPlanosAnunciosDisponiveis() {
    // return Observable.throw({
    //   error: [
    //     {
    //       Message:
    //         'Ocorreu um erro inesperado ao exibir planos! Por favor, tente mais tarde.'
    //     }
    //   ]
    // });

    // return Observable.of([]);

    return this.http
      .get(
        environment.apiUsuario +
        'planosContratados/getPlanosAnunciosDisponiveis',
        {
          headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
        }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao exibir planos! Por favor, tente mais tarde.'
              }
            ]
          });
        } else if (error.status === 401) {
          return Observable.throw({
            error: [
              {
                Message: 'A autorização foi negada para este pedido.'
              }
            ]
          });
        } else if (error.status === 404) {
          return Observable.of([]);
        }

        return Observable.throw(error);
      });
  }

  lembrarSenha(email: string): Observable<any> {
    return this.http
      .post(
        environment.apiUsuario + 'pessoas/esqueciSenha',
        '"' + email + '"',
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }
      )
      .catch((error: any) => {
        if (error.status === 0) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  faleConoscoMensagens(data: any): Observable<any> {
    return this.http
      .post(environment.apiUsuario + 'faleConoscoMensagens', data)
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado! Por favor, tente mais tarde.'
              }
            ]
          });
        } else if (error.status === 401) {
          return Observable.throw({
            error: [
              {
                Message: 'A autorização foi negada para este pedido.'
              }
            ]
          });
        }

        return Observable.throw(error);
      });
  }

  // verificarDegustacao() {
  //   return this.http
  //     .get(
  //       environment.apiUsuario +
  //       'planosContratados/getPlanoDegustacaoAdquirido',
  //       {
  //         headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
  //       }
  //     )
  //     .catch((error: any) => {
  //       if (error.status === 0 || error.status === 500) {
  //         return Observable.throw({
  //           error: [
  //             {
  //               Message:
  //                 'Ocorreu um erro inesperado ao verificar degutação! Por favor, tente mais tarde.'
  //             }
  //           ]
  //         });
  //       }
  //       return Observable.throw(error);
  //     });
  // }

  getNotificacoes() {
    return this.http
      .get(environment.apiUsuario + 'notificacoes', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao exibir notificações! Por favor, tente mais tarde.'
              }
            ]
          });
        } else if (error.status === 401) {
          return Observable.throw({
            error: [
              {
                Message: 'A autorização foi negada para este pedido.'
              }
            ]
          });
        }

        return Observable.throw(error);
      });
  }

  getClienteIUGU(): Observable<any> {
    return this.http
      .get(environment.apiParceiros + 'clientes/getClienteIUGU', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao exibir seus dados! Por favor, tente mais tarde.'
              }
            ]
          });
        } else if (error.status === 401) {
          return Observable.throw({
            error: [
              {
                Message: 'A autorização foi negada para este pedido.'
              }
            ]
          });
        }

        return Observable.throw(error);
      });
  }

  verificarCliente(): Observable<any> {
    return this.http
      .get(environment.apiParceiros + 'clientes/verificarCliente', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao verificar cliente! Por favor, tente mais tarde.'
              }
            ]
          });
        } else if (error.status === 401) {
          return Observable.throw({
            error: [
              {
                Message: 'A autorização foi negada para este pedido.'
              }
            ]
          });
        }

        return Observable.throw(error);
      });
  }

  getError(error) {
    // tslint:disable-next-line:prefer-const
    let errorOutput = [
      'Ocorreu um erro inesperado. Tente novamente mais tarde!'
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
