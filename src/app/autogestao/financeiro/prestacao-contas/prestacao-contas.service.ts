import { StatusBoletoPipe } from './../../../shared/status-boleto.pipe';
import { Injectable } from '@angular/core';
import { DefaultRequestOptionsService } from 'app/services/default-request-options.service';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MensageError } from 'app/shared/menssage.error';

@Injectable()
export class PrestacaoContasService {
  constructor(
    private httpClient: HttpClient,
    private requestOptions: DefaultRequestOptionsService
  ) { }

  getPrestacaoContasImoveis(data?: any): Observable<any> {
    return this.httpClient
      .get(
        environment.apiAutogestaoLocacao +
        'prestacaoContas/getPrestacaoContasImoveis',
        {
          headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
          params: data,
          observe: 'response'
        }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar as cobranças! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  incluirLancamento(data: any) {
    return this.httpClient
      .post(
        environment.apiAutogestaoLocacao + 'prestacaoContas/incluirLancamento',
        data,
        {
          headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
        }
      )
      .catch((error: any) => {
        if (
          error.status === 0 ||
          error.status === 500 ||
          error.status === 404
        ) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao incluir lançamento para prestação de contas! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  excluirLancamento(Uid) {
    return this.httpClient
      .delete(
        environment.apiAutogestaoLocacao + 'prestacaoContas/excluirLancamento',
        {
          headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
          params: {
            lancamentoPrestacaoContaUid: Uid
          }
        }
      )
      .catch((error: any) => {
        if (
          error.status === 0 ||
          error.status === 500 ||
          error.status === 404
        ) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao excluir lançamento para prestação de contas! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getListaImoveis() {
    return this.httpClient.get(
      environment.apiAutogestaoLocacao + 'prestacaoContas/getListaImoveis'
    );
  }

  getListaProprietarios() {
    return this.httpClient.get(
      environment.apiAutogestaoLocacao + 'prestacaoContas/getListaProprietarios'
    );
  }

  getPrestacaoContasDetail(uid): Observable<any> {
    return this.httpClient
      .get(
        environment.apiAutogestaoLocacao +
        'prestacaoContas/getDetailPrestacaoContas',
        {
          headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
          params: {
            cobrancaId: uid
          }
        }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar os dados da cobrança! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  atualizaCalculoTaxaAdministracao(data): Observable<any> {
    return this.httpClient.put(environment.apiAutogestaoLocacao + 'lancamentosBoleto/atualizaCalculoTaxaAdministracao',
      data
    )
      .catch((error) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw(MensageError.getMessagensError({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao salvar a taxa de administração! Por favor, tente mais tarde.'
              }
            ]
          }));
        }

        return Observable.throw(MensageError.getMessagensError(error));
      });   
  }

}
