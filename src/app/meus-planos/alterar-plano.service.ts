import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DefaultRequestOptionsService } from 'app/services/default-request-options.service';
import { Observable } from 'rxjs';

@Injectable()
export class AlterarPlanoService {
  constructor(
    private httpClient: HttpClient,
    private requestOptions: DefaultRequestOptionsService
  ) {}

  getOpcoesMigracaoPlanosAutogestaoMensal(): Observable<any> {
    return this.httpClient
      .get(
        environment.apiUsuario +
          'planosContratados/opcoesMigracaoPlanosAutogestaoMensal',
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
                  'Ocorreu um erro inesperado ao carregar as opções de planos! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getSimularAlteracaoPlanoAutogestaoMensal(
    Uid: any,
    aceiteTermoContratoNovoPlano
  ): Observable<any> {
    return this.httpClient
      .get(
        environment.apiUsuario +
          'planosContratados/simularAlteracaoPlanoAutogestaoMensal',
        {
          headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
          params: {
            uidNovoPlano: Uid,
            aceiteTermoContratoNovoPlano: aceiteTermoContratoNovoPlano
          }
        }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao simular alteração do plano! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getImoveisMensalOpcoesDesativar(): Observable<any> {
    return this.httpClient
      .get(
        environment.apiAutogestaoLocacao + 'imoveis/mensal/opcoesDesativar',
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
                  'Ocorreu um erro inesperado ao carregar os imóveis! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  deleteImoveisMensalDesativar(uidsImoveis): Observable<any> {
    return this.httpClient
      .delete(environment.apiAutogestaoLocacao + 'imoveis/mensal/desativar', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
        params: {
          uidImoveisParaDesativacao: uidsImoveis
        }
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao desativar os imóveis! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  postAlterarPlanoAutogestaoMensal(Uid, aceiteTermoContrato) {
    return this.httpClient
      .post(
        environment.apiUsuario +
          'planosContratados/alterarPlanoAutogestaoMensal',
        {},
        {
          headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
          params: {
            uidNovoPlano: Uid,
            aceiteTermoContratoNovoPlano: aceiteTermoContrato
          }
        }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao alterar para o novo plano de Autogestão! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }
}
