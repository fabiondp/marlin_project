import { Injectable } from '@angular/core';
import { JwtTokenService } from 'app/services/jwt-token.service';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DefaultRequestOptionsService } from 'app/services/default-request-options.service';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';

@Injectable()
export class AnaliseCreditoService {

  constructor(
    private jwtToken: JwtTokenService,
    private http: Http,
    private httpClient: HttpClient,
    private requestOptions: DefaultRequestOptionsService,
    private _cookieService: CookieService,
  ) { }

  validarFichaCredito(data): Observable<any> {
    return this.httpClient
      .post(
        environment.apiAnalise + 'fichaCreditos/validarFichaCredito', data,
        {
          headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),

        }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao validar a ficha de crédito! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(this.getError(error));
      });
  }

  getError(error) {
    // tslint:disable-next-line:prefer-const
    let errorOutput = ['Ocorreu um erro inesperado. Tente novamente mais tarde'];
    if (error && error.error && error.error.Message) {
      errorOutput = [error.error.Message];

    } else if (error && error.error && Array.isArray(error.error) && error.error.some(e => e.hasOwnProperty('Message'))) {
      errorOutput = error.error.map(e => e.Message);

    } else if (error && Array.isArray(error) && error.some(e => e.hasOwnProperty('Message'))) {
      errorOutput = error.map(e => e.Message);
    } else if (error.Message) {
      errorOutput = [error.Message];
    } else {
      errorOutput = ['Ocorreu um erro inesperado. Tente novamente mais tarde!'];
    }

    return errorOutput;
  }
}
