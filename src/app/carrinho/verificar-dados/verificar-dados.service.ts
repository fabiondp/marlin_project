import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DefaultRequestOptionsService } from '../../services/default-request-options.service';

@Injectable()
export class VerificarDadosService {
  constructor(
    private httpClient: HttpClient,
    private requestOptions: DefaultRequestOptionsService
  ) {}

  verificar() {
    // mandar o toke de autenticacao

    // return Observable.of(true);

    // return Observable.throw('Ocorreu erro');

    return this.httpClient.get(
      environment.apiUsuario + 'clientes/verificarCliente',
      {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      }
    );
  }
}
