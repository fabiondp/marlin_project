import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { DefaultRequestOptionsService } from './default-request-options.service';
import { JwtTokenService } from './jwt-token.service';
import { RequestOptions } from '@angular/http';

@Injectable()
export class LocacaoService {
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
      .get(environment.apiAutogestaoLocacao + 'imoveis/getAllHomeByClienteId', {
        headers: new HttpHeaders(this.headersByServiceToken)
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar os imoveis! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }
}
