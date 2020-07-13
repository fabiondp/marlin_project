import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DefaultRequestOptionsService } from 'app/services/default-request-options.service';
import { Observable } from 'rxjs';

@Injectable()
export class AlertaConvenioBancarioService {
  constructor(
    private httpClient: HttpClient,
    private requestOptions: DefaultRequestOptionsService
  ) { }
  verificarCadastroConvenioBancario() {
    // return Observable.of(false);
    // return Observable.throw('Ocorreu erro');

    return this.httpClient.get(environment.apiUsuario + 'conveniosBancarios', {
      headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
    });
  }

  verificarAprovacaoConvenioBancario() {
    // return Observable.of({
    //   SubContaId: '',
    //   SubContaNome: '',
    //   SubContaLiveAPIToken: '',
    //   SubContaTestAPIToken: '',
    //   SubContaUserToken: '',
    //   ClienteAutogestaoId: 0,
    //   Parceiro: 1,
    //   PodeReceberPagamento: false,
    //   FoiVerificada: true,
    //   UltimoStatusVerificacao: '',
    //   CreationDate: '2018-11-09T14:10:27.759Z',
    //   UpdateDate: '2018-11-09T14:10:27.759Z'
    // });
    // return Observable.throw('Ocorreu erro');

    // return this.httpClient.get(
    //   environment.apiParceiros + 'subcontas/getSubContaIUGU',
    //   {
    //     headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
    //   }
    // );

    // return this.httpClient.get(environment.apiUsuario + 'conveniosBancarios', {
    //   headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
    // });

    // return this.httpClient.get('http://localhost:3999/api/v1/' + 'conveniosBancarios');
    return this.httpClient.get(environment.apiUsuario + 'conveniosBancarios');
  }
}
