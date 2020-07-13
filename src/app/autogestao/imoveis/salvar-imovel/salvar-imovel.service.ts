import { AdministradoraCondominio } from './salvar-dados-imovel/administradora-condominio';
import { SalvarDadosImovelComponent } from './salvar-dados-imovel/salvar-dados-imovel.component';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtTokenService } from 'app/services/jwt-token.service';
import { DefaultRequestOptionsService } from 'app/services/default-request-options.service';
import { environment } from 'environments/environment';

@Injectable()
export class SalvarImovelService {
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

  getAllEnumGarantiaImovel(): Observable<any> {
    return this.httpClient
      .get(
        environment.apiAutogestaoLocacao + 'imoveis/getAllEnumGarantiaImovel',
        {
          headers: new HttpHeaders(this.headersByServiceToken)
        }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar garantias! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getAllEnumSituacaoImovel(): Observable<any> {
    return this.httpClient
      .get(
        environment.apiAutogestaoLocacao + 'imoveis/getAllEnumSituacaoImovel',
        {
          headers: new HttpHeaders(this.headersByServiceToken)
        }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar situacão! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getAllEnumTipoCobrancaCondominio(): Observable<any> {
    return this.httpClient
      .get(
        environment.apiAutogestaoLocacao + 'imoveis/getAllEnumTipoCobrancaCondominio',
        {
          headers: new HttpHeaders(this.headersByServiceToken)
        }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar as opçoes de tipo cobrança de condominio! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getAllEnumTipoTaxaImovel(): Observable<any> {
    return this.httpClient
      .get(
        environment.apiAutogestaoLocacao + 'imoveis/getAllEnumTipoTaxaImovel',
        {
          headers: new HttpHeaders(this.headersByServiceToken)
        }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar as opções de tipo de taxa de imovel! Por favor, tente mais tarde.'
              }
            ]
          });
        } else if (error.status === 404) {
          Observable.of([]);
        }
        return Observable.throw(error);
      });
  }

  getAllOpcoesAdmnistradoraCondominio(): Observable<AdministradoraCondominio[]> {
    return this.httpClient
      .get(
        environment.apiAutogestaoLocacao + 'administradorasCondominio/getAllByCliente'
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar as opções de tipo de taxa de imovel! Por favor, tente mais tarde.'
              }
            ]
          });
        } else if (error.status === 404) {
          return Observable.of([]);
        }
        return Observable.throw(error);
      });
  }

  getAllOpcoesSeguradoraFogo(): Observable<AdministradoraCondominio[]> {
    return this.httpClient
      .get(
        environment.apiAutogestaoLocacao + 'seguradorasFogo/getAllByCliente'
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar as opções de tipo de taxa de imovel! Por favor, tente mais tarde.'
              }
            ]
          });
        } else if (error.status === 404) {
          return Observable.of([]);
        }
        return Observable.throw(error);
      });
  }

  getAllEnumTipoRepresentacao(): Observable<any> {
    return this.httpClient
      .get(
        environment.apiAutogestaoLocacao +
        'imoveis/getAllEnumTipoRepresentacao',
        {
          headers: new HttpHeaders(this.headersByServiceToken)
        }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar representação! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  salvarDadosImovel(data: any): Observable<any> {
    return this.httpClient
      .post(environment.apiAutogestaoLocacao + 'imoveis', data, {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao salvar dados do imóvel! Por favor, tente mais tarde.'
              }
            ]
          });
        }

        return Observable.throw(this.getError(error));
      });
  }

  getAllHomeByClienteId(): Observable<any> {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'imoveis/getAllByClienteId', {
        headers: new HttpHeaders(this.headersByServiceToken)
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar imóveis de autogestão! Por favor, tente mais tarde.'
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

  atualizarDadosImovel(data: any): Observable<any> {
    return this.httpClient
      .put(environment.apiAutogestaoLocacao + 'imoveis', data, {
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
                  'Ocorreu um erro inesperado ao salvar dados do imóvel! Por favor, tente mais tarde.'
              }
            ]
          });
        }

        return Observable.throw(this.getError(error));

        // if (error.status === 0) {
        //   return Observable.throw({
        //     error: [
        //       {
        //         Message:
        //           'Ocorreu um erro inesperado ao salvar dados do imóvel! Por favor, tente mais tarde.'
        //       }
        //     ]
        //   });
        // }
        // return Observable.throw(error.error.Message);
      });
  }
}
