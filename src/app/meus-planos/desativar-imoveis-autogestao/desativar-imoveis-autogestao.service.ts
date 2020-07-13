import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DefaultRequestOptionsService } from 'app/services/default-request-options.service';
import { Observable } from 'rxjs';

@Injectable()
export class DesativarImoveisAutogestaoService {
  constructor(
    private httpClient: HttpClient,
    private requestOptions: DefaultRequestOptionsService
  ) {}

  getVerificarImoveisParaDesativarAposDowngrade(): Observable<any> {
    return this.httpClient
      .get(
        environment.apiUsuario +
          'planosContratados/verificarImoveisParaDesativarAposDowngrade',
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
                  'Ocorreu um erro inesperado ao verificar imóveis para desativação! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }
}
