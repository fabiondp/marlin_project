import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContratoAdministracaoService {

  opcoesTipoTaxa;

  constructor(private httpClient: HttpClient
  ) {

  }

  getAllEnumTipoTaxaAdministracao(): Observable<any> {
    if (!this.opcoesTipoTaxa) {
      return this.httpClient
        .get(
          environment.apiAutogestaoLocacao +
          'contratosAdministracao/getAllEnumTipoTaxa'
        )
        .map(res => {
          this.opcoesTipoTaxa = res;
          return res;
        })
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
    } else {
      return Observable.of(this.opcoesTipoTaxa);
    }
  }

  getDetailContratoAdministracao(uid): Observable<any> {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'contratosAdministracao/getByImovel', {
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

  cadastrarContratoAdministracao(data) {
    return this.httpClient
      .post(environment.apiAutogestaoLocacao + 'contratosAdministracao', data)
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao cadastrar o contrato de administração! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  editarContratoAdministracao(data) {
    return this.httpClient
      .put(environment.apiAutogestaoLocacao + 'contratosAdministracao', data, {
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
                  'Ocorreu um erro inesperado ao cadastrar o contrato de administração! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }
}
