import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtTokenService } from 'app/services/jwt-token.service';
import { DefaultRequestOptionsService } from 'app/services/default-request-options.service';
import { environment } from 'environments/environment';
import { ModeloContrato } from './modelo-contrato';

@Injectable()
export class ModeloContratoService {

  modelosContrato: any;

  constructor(
    private httpClient: HttpClient,
    private jwtToken: JwtTokenService,
    private requestOptions: DefaultRequestOptionsService
  ) {
  }

  getOpcoesModeloParaDownload() {
    // return Observable.of([
    //   {
    //     TipoModeloContratoDescricao: 'Modelo 1',
    //     Uid: '123456'
    //   },
    //   {
    //     TipoModeloContratoDescricao: 'Modelo 1',
    //     Uid: '123456'
    //   }
    // ]);

    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'modelosContrato/getAllDisponiveisParaDownload', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .map((response) => {
        this.modelosContrato = response;
        return response
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw(this.getError({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar imoveis! Por favor, tente mais tarde.'
              }
            ]
          }));
        }
        return Observable.throw(this.getError(error));
      });
  }

  downloadArquivo(uid) {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'modelosContrato/getDownloadModeloContrato/' + uid, {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
        // params: {
        //   uid: uid
        // }
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw(this.getError({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar imoveis! Por favor, tente mais tarde.'
              }
            ]
          }));
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
