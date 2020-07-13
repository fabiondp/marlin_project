import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { DefaultRequestOptionsService } from './default-request-options.service';
import { JwtTokenService } from './jwt-token.service';
import { RequestOptions } from '@angular/http';

@Injectable()
export class AnaliseCompletaService {
  constructor(
    private httpClient: HttpClient,
    private jwtToken: JwtTokenService,
    private requestOptions: DefaultRequestOptionsService
  ) {}

  getAllEnumTiposPretendente(): Observable<any> {
    return this.httpClient
      .get(environment.apiAnalise + 'pretendentes/getAllEnumTiposPretendente')
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar tipos de pretendente! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getAllEnumNaturezaPessoa(): Observable<any> {
    return this.httpClient
      .get(environment.apiAnalise + 'pretendentes/getAllEnumNaturezaPessoa')
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar natureza da pessoa! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }
}
