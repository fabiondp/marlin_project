import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { DefaultRequestOptionsService } from 'app/services/default-request-options.service';
import { JwtTokenService } from 'app/services/jwt-token.service';

@Injectable()
export class SalvarDadosProprietarioService {

  opcoesGenero;
  opcoesEstadoCivil;
  opcoesTipoRepresentante;
  opcoesTipoCadastro;

  opcoesBancos;

  constructor(
    private httpClient: HttpClient,
    private jwtToken: JwtTokenService,
    private requestOptions: DefaultRequestOptionsService
  ) { }

  getAllEnumCodigoBanco(): Observable<any> {
    if (!this.opcoesBancos) {
      return this.httpClient
        .get(environment.apiAutogestaoLocacao + 'proprietarios/getAllEnumCodigoBanco')
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
                    'Ocorreu um erro inesperado ao carregar as opções de bancos! Por favor, tente mais tarde.'
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

  getAllEnumOpcoesGenero(): Observable<any> {
    if (!this.opcoesGenero) {
      return this.httpClient
        .get(environment.apiAutogestaoLocacao + 'proprietarios/getAllEnumSexo')
        .map(res => {
          this.opcoesGenero = res;
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
      return Observable.of(this.opcoesGenero);
    }
  }

  getAllEnumEstadoCivil() {
    if (!this.opcoesEstadoCivil) {
      return this.httpClient
        .get(
          environment.apiAutogestaoLocacao +
          'proprietarios/getAllEnumEstadoCivil'
        )
        .map(res => {
          this.opcoesEstadoCivil = res;
          return res;
        })
        .catch((error: any) => {
          if (error.status === 0 || error.status === 500) {
            return Observable.throw({
              error: [
                {
                  Message:
                    'Ocorreu um erro inesperado ao carregar as opções de estado civil! Por favor, tente mais tarde.'
                }
              ]
            });
          }
          return Observable.throw(error);
        });
    } else {
      return Observable.of(this.opcoesEstadoCivil);
    }
  }

  getAllEnumTipoRepresentante() {
    if (!this.opcoesTipoRepresentante) {
      return this.httpClient
        .get(
          environment.apiAutogestaoLocacao +
          'proprietarios/getAllEnumTipoRepresentante'
        )
        .map(res => {
          this.opcoesTipoRepresentante = res;
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
      return Observable.of(this.opcoesTipoRepresentante);
    }
  }

  getAllEnumTipoCadastro() {
    if (!this.opcoesTipoCadastro) {

      return this.httpClient
        .get(
          environment.apiAutogestaoLocacao +
          'proprietarios/getAllEnumTipoCadastro'
        )
        .map(res => {
          this.opcoesTipoCadastro = res;
          return res;
        })
        .catch((error: any) => {
          if (error.status === 0 || error.status === 500) {
            return Observable.throw({
              error: [
                {
                  Message:
                    'Ocorreu um erro inesperado ao carregar as opções de tipo de cadastro! Por favor, tente mais tarde.'
                }
              ]
            });
          }
          return Observable.throw(error);
        });
    } else {
      return Observable.of(this.opcoesTipoCadastro);
    }
  }

  getByCPFCNPJ(CPFCNPJ) {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'proprietarios/getByCPFCNPJ', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
        params: {
          CPFCNPJ: CPFCNPJ
        }
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao buscar as informações do proprietário pelo CPF/ CNPJ! Por favor, tente mais tarde.'
              }
            ]
          });
        }

        return Observable.throw({
          error: [
            {
              Message:
                'Não foi encontrado nenhum proprietário cadastrado com o CPF / CNPJ informado.'
            }
          ]
        });
      });
  }

  getRepresentanteByCPFCNPJ(CPFCNPJ) {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'representantes/getByCPFCNPJ', {
        params: {
          CPFCNPJ: CPFCNPJ
        }
      })
      .catch((error: any) => {
        // if (error.status === 0 || error.status === 500) {
        //   return Observable.throw({
        //     error: [
        //       {
        //         Message:
        //           'Ocorreu um erro inesperado ao buscar as informações do representante pelo CPF/ CNPJ! Por favor, tente mais tarde.'
        //       }
        //     ]
        //   });
        // }

        return Observable.throw({
          error: [
            {
              Message:
                'Não foi encontrado nenhum representante cadastrado com o CPF / CNPJ informado.'
            }
          ]
        });
      });
  }

  cadastrarDadosProprietario(data) {
    return this.httpClient
      .post(environment.apiAutogestaoLocacao + 'proprietarios', data, {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao cadastrar os dados do proprietario! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  atualizarDadosProprietario(data) {
    return this.httpClient
      .put(environment.apiAutogestaoLocacao + 'proprietarios', data, {
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
                  'Ocorreu um erro inesperado ao cadastrar os dados do proprietario! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }
}
