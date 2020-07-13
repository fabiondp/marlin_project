import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { RequestOptions } from '@angular/http';
import { JwtTokenService } from '../../services/jwt-token.service';
import { DefaultRequestOptionsService } from '../../services/default-request-options.service';

@Injectable()
export class BoletosService {
  public check: Boolean = false;

  headersByServiceToken = this.requestOptions
    .merge(new RequestOptions())
    .headers.toJSON();
  constructor(
    private httpClient: HttpClient,
    private jwtToken: JwtTokenService,
    private requestOptions: DefaultRequestOptionsService
  ) {}

  getBoletos(orderBy: string): Observable<any> {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'boletos/getAllByClienteId', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
        params: {
          ordenacao: orderBy
        }
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar o imóvel! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }
}
