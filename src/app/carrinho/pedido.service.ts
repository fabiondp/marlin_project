import { Message } from './pagamento/message';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { CookieService } from 'ngx-cookie';

import * as moment from 'moment';
import { environment } from 'environments/environment';
import { DefaultRequestOptionsService } from './../services/default-request-options.service';
import { LocalStorageService } from 'app/services/local-storage.service';

const NUMEROPEDIDO_KEY = 'PNUMPED';
const ITENS_KEY = 'PITENS';
const ERRORS_KEY = 'PERROS';
const PCUPOMDESCONTO_KEY = 'PCUPOMD';
const PSTATUS_KEY = 'PSTATUS';
const PPAYERID_KEY = 'PPID';

@Injectable()
export class PedidoService {
  approval_url = null;
  mode = null;
  // pagamentoId = null;

  get pagamentoId() {
    if (this.localStorage.getObject(PPAYERID_KEY)) {
      return this.localStorage.getObject(PPAYERID_KEY);
    }

    this.localStorage.remove(PPAYERID_KEY);

    return null;
  }

  set pagamentoId(value) {
    this.localStorage.remove(PPAYERID_KEY);

    if (value) {
      this.localStorage.setObject(PPAYERID_KEY, value);
    } else {
      this.localStorage.remove(PPAYERID_KEY);
    }
  }

  get numeroPedido() {
    if (this.localStorage.get(NUMEROPEDIDO_KEY)) {
      return this.localStorage.get(NUMEROPEDIDO_KEY);
    }

    this.localStorage.remove(NUMEROPEDIDO_KEY);

    return null;
  }

  set numeroPedido(value) {
    this.localStorage.remove(NUMEROPEDIDO_KEY);

    if (value) {
      // this._cookieService.put(NUMEROPEDIDO_KEY, value, {
      //   expires: moment(new Date()).add(2, 'd').toDate()
      // });
      this.localStorage.set(NUMEROPEDIDO_KEY, value);
    } else {
      this.localStorage.remove(NUMEROPEDIDO_KEY);
    }
  }

  get pedidoStatus() {
    if (this.localStorage.get(PSTATUS_KEY)) {
      return this.localStorage.get(PSTATUS_KEY);
    }

    this.localStorage.remove(PSTATUS_KEY);

    return null;
  }

  set pedidoStatus(value) {
    this.localStorage.remove(PSTATUS_KEY);

    if (value) {
      // this.localStorage.set(PSTATUS_KEY, value, {
      //   expires: moment(new Date()).add(2, 'd').toDate()
      // });
      this.localStorage.set(PSTATUS_KEY, value);
    } else {
      this.localStorage.remove(PSTATUS_KEY);
    }
  }

  get erros() {
    return this.localStorage.getObject(ERRORS_KEY);
  }

  set erros(value: any) {
    if (value) {
      // tslint:disable-next-line:prefer-const
      // let itens = Item.Map(value);
      this.localStorage.setObject(ERRORS_KEY, value);
    } else {
      this.localStorage.remove(ERRORS_KEY);
    }
  }

  get itens() {
    return this.localStorage.getObject(ITENS_KEY);
  }

  set itens(value: any) {
    if (value) {
      // tslint:disable-next-line:prefer-const
      // let itens = Item.Map(value);
      this.localStorage.setObject(ITENS_KEY, value);
    } else {
      this.localStorage.remove(ITENS_KEY);
    }
  }

  get payCupomDesconto() {
    return this.localStorage.get(PCUPOMDESCONTO_KEY);
  }

  set payCupomDesconto(value) {
    value
      ? this.localStorage.set(PCUPOMDESCONTO_KEY, value)
      : this.localStorage.remove(PCUPOMDESCONTO_KEY);
  }

  constructor(
    private _cookieService: CookieService,
    private localStorage: LocalStorageService,
    private httpClient: HttpClient,
    private requestOptions: DefaultRequestOptionsService
  ) { }

  total(): number {
    return this.itens
      .map(item => item.Valor)
      .reduce((prev, value) => prev + value, 0);
  }

  obterDadosParaPagamento() {
    return this.httpClient
      .get(environment.apiPedido + 'pedidos/obterdadosparapagamento', {
        params: {
          numeroPedido: this.numeroPedido
        },
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .map(response => {
        // return {
        //   Parceiro: 'PAYPAL',
        //   Mode: 'sandbox',
        //   AccountId: 'aaaaaaaaa',
        //   AprrovalUrl:
        //     'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-0PR13866NN065473E'
        // }; // retorno IUGU

        return response; // retorno de verdade
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao obter os dados para pagamento! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  finalizar() {
    const data = {
      NumeroPedido: this.numeroPedido,
      PagadorId: this.pagamentoId,
      PlanosContratados: this.itens
    };

    return this.httpClient
      .post(environment.apiPedido + 'pedidos/finalizar', data, {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .map(response => {
        this.pedidoStatus = 'Finalizado';
        return response;
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw(
            this.getError({
              error: [
                {
                  Message:
                    'Ocorreu um erro inesperado ao finalizar o seu pedido! Por favor, tente mais tarde.'
                }
              ]
            })
          );
        }
        return Observable.throw(this.getError(error));
      });
  }

  getError(error) {
    // tslint:disable-next-line:prefer-const
    let errorOutput = [
      {
        text: 'Ocorreu um erro inesperado. Tente novamente mais tarde',
        time: null,
        type: 'danger'
      }
    ];

    if (error && error.error && error.error.Message) {
      errorOutput = [
        {
          text: error.error.Message,
          time: null,
          type: 'danger'
        }
      ];
    } else if (
      error &&
      error.error &&
      Array.isArray(error.error) &&
      error.error.some(e => e.hasOwnProperty('Message'))
    ) {
      errorOutput = error.error.map(e => {
        return {
          text: e.Message,
          time: null,
          type: 'danger',
          target: e.Target
        };
      });
    } else if (
      error &&
      Array.isArray(error) &&
      error.some(e => e.hasOwnProperty('Message'))
    ) {
      errorOutput = error.map(e => {
        return {
          text: e.Message,
          time: null,
          type: 'danger',
          target: e.Target
        };
      });
    } else if (error.Message) {
      errorOutput = [
        {
          text: error.Message,
          time: null,
          type: 'danger'
        }
      ];
    }

    return errorOutput;
  }

  limpar() {
    this.itens = null;
    this.approval_url = null;
    this.pagamentoId = null;
    this.payCupomDesconto = null;
    this.erros = null;
  }
}
