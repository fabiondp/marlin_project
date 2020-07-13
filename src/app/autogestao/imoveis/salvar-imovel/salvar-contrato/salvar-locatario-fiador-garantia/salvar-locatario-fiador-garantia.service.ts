import { DefaultRequestOptionsService } from 'app/services/default-request-options.service';
import { JwtTokenService } from 'app/services/jwt-token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SalvarLocatarioFiadorGarantiaService {
  constructor(
    private httpClient: HttpClient,
    private jwtToken: JwtTokenService,
    private requestOptions: DefaultRequestOptionsService
  ) { }

  getByCPFCNPJ(CPFCNPJ) {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'Locatarios/getByCPFCNPJ', {
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
                  'Ocorreu um erro inesperado ao buscar as informações do locatário pelo CPF/ CNPJ! Por favor, tente mais tarde.'
              }
            ]
          });
        }

        return Observable.throw({
          error: [
            {
              Message:
                'Não foi encontrado nenhum locatário cadastrado com o CPF / CNPJ informado.'
            }
          ]
        });
      });
  }

  getFiadorByCPFCNPJ(CPFCNPJ) {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'Fiadores/getByCPFCNPJ', {
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
                  'Ocorreu um erro inesperado ao buscar as informações do fiador pelo CPF/ CNPJ! Por favor, tente mais tarde.'
              }
            ]
          });
        }

        return Observable.throw({
          error: [
            {
              Message:
                'Não foi encontrado nenhum fiador cadastrado com o CPF / CNPJ informado.'
            }
          ]
        });
      });
  }

  getAllEnumGarantiaImovel(): Observable<any> {
    return this.httpClient
      .get(
        environment.apiAutogestaoLocacao + 'contratos/getAllEnumGarantiaImovel',
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
                  'Ocorreu um erro inesperado ao carregar as opções de garantia! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getAllEnumOpcoesGenero(): Observable<any> {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'Locatarios/getAllEnumSexo', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
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
  }

  getAllEnumEstadoCivil() {
    return this.httpClient
      .get(
        environment.apiAutogestaoLocacao +
        'proprietarios/getAllEnumEstadoCivil',
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
                  'Ocorreu um erro inesperado ao carregar as opções de estado civil! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  cadastrarLocatarioFiadorGarantia(data) {
    return this.httpClient
      .post(
        environment.apiAutogestaoLocacao +
        'contratos/CreateLocatarioComGarantia',
        data,
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
                  'Ocorreu um erro inesperado ao cadastrar os dados do locatário! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  atualizarDadosLocatario(data) {
    return this.httpClient
      .put(environment.apiAutogestaoLocacao + 'Locatarios', data, {
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
                  'Ocorreu um erro inesperado ao atualizar os dados do locatário! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  updateLocatarioFiadorGarantia(data) {
    return this.httpClient
      .put(
        environment.apiAutogestaoLocacao +
        'contratos/updateLocatarioComGarantia',
        data,
        {
          headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
          // params: {
          //   id: data['Uid']
          // }
        }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao atualizar os dados do locatário! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }
}
