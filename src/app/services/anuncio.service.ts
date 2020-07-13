import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { DefaultRequestOptionsService } from './default-request-options.service';
import { JwtTokenService } from './jwt-token.service';
import { RequestOptions } from '@angular/http';

@Injectable()
export class AnuncioService {
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

  getAllHomeByClienteId(): Observable<any> {
    return this.httpClient
      .get(environment.apiAnuncio + 'anuncios/getAllHomeByClienteId', {
        headers: new HttpHeaders(this.headersByServiceToken)
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar anúncio! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getAllByClienteId(): Observable<any> {
    return this.httpClient
      .get(environment.apiAnuncio + 'anuncios/getAllByClienteId', {
        headers: new HttpHeaders(this.headersByServiceToken)
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar anúncio! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getAllImoveisAutogestao(): Observable<any> {
    // return Observable.throw({
    //   error: [
    //     {
    //       Message:
    //         'Ocorreu um erro inesperado ao carregar os imóveis de autogestestão! Por favor, tente mais tarde.'
    //     }
    //   ]
    // });

    // return Observable.of([]);

    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'imoveis/getAllByClienteId', {
        headers: new HttpHeaders(this.headersByServiceToken)
      })
      .catch((error: any) => {
        return Observable.of([]);
      });
  }

  getAllEnumTiposImovel(): Observable<any> {
    // return Observable.throw({
    //   error: [
    //     {
    //       Message:
    //         'Ocorreu um erro inesperado ao carregar tipo de imóvel! Por favor, tente mais tarde.'
    //     }
    //   ]
    // });

    return this.httpClient
      .get(environment.apiAnuncio + 'anuncios/getAllEnumTiposImovel/')
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar tipo de imóvel! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  save(data: any): Observable<any> {
    return !data.Uid || data.Uid === '00000000-0000-0000-0000-000000000000'
      ? this.httpClient.post(environment.apiAnuncio + 'anuncios', data, {
        headers: new HttpHeaders(this.headersByServiceToken)
      })
      : this.httpClient
        .put(environment.apiAnuncio + 'anuncios?id=' + data.Uid, data, {
          headers: new HttpHeaders(this.headersByServiceToken)
        })
        .catch((error: any) => {
          if (error.status === 0 || error.status === 500) {
            return Observable.throw({
              error: [
                {
                  Message:
                    'Ocorreu um erro inesperado ao cadastrar anúncio! Por favor, tente mais tarde.'
                }
              ]
            });
          }
          return Observable.throw(error);
        });
  }

  remove(id: any): Observable<any> {
    return this.httpClient
      .delete(environment.apiAnuncio + 'anuncios/disable?id=' + id, {
        headers: new HttpHeaders(this.headersByServiceToken)
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao excluir anúncio! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      }); // Uid
  }

  find(id: number): Observable<any> {
    return this.httpClient
      .get(environment.apiAnuncio + 'anuncios/' + id, {
        headers: new HttpHeaders(this.headersByServiceToken)
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar anúncio! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      }); // Uid
  }

  estatisticasAnuncios(data: any): Observable<any> {
    return this.httpClient
      .get(environment.apiAnuncio + 'estatisticasAnuncios', {
        params: data
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar tipo de imóvel! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }
}
