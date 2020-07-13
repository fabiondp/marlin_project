import { PedidoService } from './../pedido.service';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { CookieService } from 'ngx-cookie';

import { environment } from 'environments/environment';

import { LocalStorageService } from 'app/services/local-storage.service';
import { DefaultRequestOptionsService } from 'app/services/default-request-options.service';
import { JwtTokenService } from 'app/services/jwt-token.service';
import * as moment from 'moment';

const CARRINHO_KEY = 'carrinho';
const DESCONTO_KEY = 'CDES';
const NUMEROPEDIDO_KEY = 'CNUMPED';
const DEGUSTACAOANUNCIO_KEY = 'CDANUNCIO';

@Injectable()
export class CarrinhoService {
  items: Array<any> = [];

  get planoDegustacaoAnuncio() {
    if (this.localStorage.getObject(DEGUSTACAOANUNCIO_KEY)) {
      return this.localStorage.getObject(DEGUSTACAOANUNCIO_KEY);
    }

    this.localStorage.remove(DESCONTO_KEY);
    return null;
  }

  set planoDegustacaoAnuncio(value) {
    this.localStorage.remove(DEGUSTACAOANUNCIO_KEY);

    if (value) {
      value['TituloPlano'] = 'Experimente Grátis';
      this.localStorage.setObject(DEGUSTACAOANUNCIO_KEY, value);
    } else {
      this.localStorage.remove(DEGUSTACAOANUNCIO_KEY);
    }
  }

  get desontoInfo() {
    if (this._cookieService.getObject(DESCONTO_KEY)) {
      return this.localStorage.getObject(DESCONTO_KEY);
    }

    this._cookieService.remove(DESCONTO_KEY);

    return null;
  }

  set desontoInfo(value) {
    this._cookieService.remove(DESCONTO_KEY);

    if (value) {
      this._cookieService.putObject(DESCONTO_KEY, value['CodigoCupom'], {
        expires: moment(new Date())
          .add(1, 'd')
          .toDate()
      });
      this.localStorage.setObject(DESCONTO_KEY, value);
    } else {
      this._cookieService.remove(DESCONTO_KEY);
      this.localStorage.remove(DESCONTO_KEY);
    }
  }

  get numeroPedido() {
    if (this._cookieService.get(NUMEROPEDIDO_KEY)) {
      return this.localStorage.get(NUMEROPEDIDO_KEY);
    }

    this._cookieService.remove(NUMEROPEDIDO_KEY);

    return null;
  }

  set numeroPedido(value) {
    this._cookieService.remove(NUMEROPEDIDO_KEY);

    if (value) {
      this._cookieService.put(NUMEROPEDIDO_KEY, value, {
        expires: moment(new Date())
          .add(1, 'd')
          .toDate()
      });
      this.localStorage.set(NUMEROPEDIDO_KEY, value);
    } else {
      this._cookieService.remove(NUMEROPEDIDO_KEY);
      this.localStorage.remove(NUMEROPEDIDO_KEY);
    }
  }

  constructor(
    private jwtToken: JwtTokenService,
    private http: Http,
    private localStorage: LocalStorageService,
    private httpClient: HttpClient,
    private requestOptions: DefaultRequestOptionsService,
    private _cookieService: CookieService,
    private pedidoService: PedidoService
  ) {
    const carrinhoLocalStorage = this.localStorage.getObject(CARRINHO_KEY);

    this.items = carrinhoLocalStorage ? carrinhoLocalStorage : [];

    this.calcularDesconto();
  }

  adicionarItem(itemEnviado) {
    const item = Object.assign({}, itemEnviado);

    item.ValorSemDesconto = item.Valor;
    item.PlanoUid = item.Uid;

    if (item.TituloPlano !== 'Degustação') {
      item.TituloPlano = 'Plano ' + item.TituloPlano;
    }

    this.items.push(item);
    this.calcularDesconto();
    this.localStorage.setObject(CARRINHO_KEY, this.items);
  }

  aceitarTermo(plano) {
    if (this.items) {
      this.items.forEach(item => {
        if (item.Uid === plano.Uid) {
          item.TermoContratoAceito = plano.TermoContratoAceito;
        }
      });

      this.localStorage.setObject(CARRINHO_KEY, this.items);
    }
  }

  removerItem(item) {
    this.items.splice(this.items.indexOf(item), 1);

    if (this.items.length <= 0) {
      this.removerDesconto();
    }

    this.localStorage.setObject(CARRINHO_KEY, this.items);
  }

  limpar() {
    this.items = [];
    this.desontoInfo = null;
    this.numeroPedido = null;
    this.localStorage.remove(CARRINHO_KEY);
    this.planoDegustacaoAnuncio = null;
  }

  total(): number {
    return this.items
      .map(item => item.Valor)
      .reduce((prev, value) => prev + value, 0);
  }

  aplicarCupom(data) {
    this.removerDesconto();

    return this.httpClient
      .get(`${environment.apiProduto}cuponsDescontos/getCupomCompra`, {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
        params: data
      })
      .map(response => {
        this.desontoInfo = response;
        this.calcularDesconto();
        return response;
      });
  }

  aplicarCupomDeslogado(data) {
    this.removerDesconto();

    return this.httpClient
      .get(`${environment.apiProduto}cuponsDescontos/getCupomCompraDeslogado`, {
        params: data
      })
      .map(response => {
        this.desontoInfo = response;
        this.calcularDesconto();
        return response;
      });
  }

  calcularDesconto() {
    this.removerDescontoDosItens();
    if (this.desontoInfo) {
      if (this.desontoInfo['Planos']) {
        this.items = this.items.map(i => {
          if (
            !i.ComDesconto &&
            this.desontoInfo['Planos'].some(p => p.Uid === i.Uid) &&
            !i.TiposPromocao
          ) {
            i.ComDesconto = true;
            i.Desconto = this.desontoInfo['ValorDesconto'];

            if (this.desontoInfo['ValorDesconto']) {
              i.Valor = i.Valor - this.desontoInfo['ValorDesconto'];
            } else if (this.desontoInfo['PorcentagemDesconto']) {
              i.Valor =
                i.Valor -
                (this.desontoInfo['PorcentagemDesconto'] / 100) * i.Valor;
            }

            if (i.Valor < 0) {
              i.Valor = 0;
            }
          }

          return i;
        });
      } else {
        this.items = this.items.map(i => {
          if (!i.ComDesconto && !i.TiposPromocao) {
            i.ComDesconto = true;
            i.Desconto = this.desontoInfo['ValorDesconto'];

            if (this.desontoInfo['ValorDesconto']) {
              i.Valor = i.Valor - this.desontoInfo['ValorDesconto'];
            } else if (this.desontoInfo['PorcentagemDesconto']) {
              i.Valor =
                i.Valor -
                (this.desontoInfo['PorcentagemDesconto'] / 100) * i.Valor;
            }

            if (i.Valor < 0) {
              i.Valor = 0;
            }
          }

          return i;
        });
      }

      this.localStorage.setObject(CARRINHO_KEY, this.items);
    }
  }

  removerDescontoDosItens() {
    this.items = this.items.map(i => {
      if (i.ComDesconto) {
        i.ComDesconto = false;
        i.Desconto = null;
        i.Valor = i.ValorSemDesconto;
      }

      return i;
    });
  }

  removerDesconto() {
    this.removerDescontoDosItens();

    this.desontoInfo = null;
    this.localStorage.remove(DESCONTO_KEY);
  }

  obterDadosParaValidacao() {
    const output: any = {
      listaId: null,
      codigoCupom: null
    };

    if (this.items) {
      output.listaId = this.items.map(i => i.Uid);
    }

    if (this.desontoInfo) {
      output.codigoCupom = this.desontoInfo['CodigoCupom'];
    }
    // output.codigoCupom = 'a';

    return output;
  }

  validarCarrinhoDeslogado() {
    return this.httpClient
      .get(environment.apiProduto + 'planos/validarCarrinhoDeslogado', {
        params: this.obterDadosParaValidacao()
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao validar os itens do carrinho! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  validarCarrinhoLogado() {
    return this.httpClient
      .get(environment.apiProduto + 'planos/validarCarrinhoLogado', {
        params: this.obterDadosParaValidacao(),
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao validar os itens do carrinho! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  temPlanoDegustacao() {
    return this.items && this.items.some(i => i.Degustacao);
  }

  registrarPedido(data) {
    return this.httpClient
      .post(environment.apiPedido + 'pedidos', data, {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .map(response => {
        if (response['NumeroPedido']) {
          this.pedidoService.pedidoStatus = null;
          this.pedidoService.pagamentoId = null;

          this.numeroPedido = response['NumeroPedido'];
          this.pedidoService.numeroPedido = this.numeroPedido;
          this.pedidoService.itens = this.items;
          this.pedidoService.payCupomDesconto = this.desontoInfo
            ? this.desontoInfo['CodigoCupom']
            : null;
        }

        return response;
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao validar os itens do carrinho! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  ativarDegustacaoDeAnuncio() {
    if (this.planoDegustacaoAnuncio) {
      this.atualizarDegustacaoComPlanoOrigemMaisCaro();

      if (this.planoDegustacaoAnuncio && this.items) {
        this.items = this.items.filter(i => i.TipoProduto && i.TipoProduto !== 'Anuncio');
        this.items.push(this.planoDegustacaoAnuncio);
      }

      this.localStorage.setObject(CARRINHO_KEY, this.items);
    }
  }

  atualizarDegustacaoComPlanoOrigemMaisCaro() {
    if (this.items) {
      // tslint:disable-next-line:prefer-const
      let _itemsAnuncios = this.items.filter(
        i => i.TipoProduto && i.TipoProduto === 'Anuncio'
      );

      // tslint:disable-next-line:prefer-const
      let planoMaisCaro = _itemsAnuncios.reduce(function (prev, current) {
        return prev.Valor > current.Valor ? prev : current;
      });

      this.atualizarDegustacaoComPlanoOrigem(planoMaisCaro);
    }
  }

  atualizarDegustacaoComPlanoOrigem(planoOrigem) {
    // tslint:disable-next-line:prefer-const
    let planoDegustacaoAnuncioTemp = this.planoDegustacaoAnuncio;
    planoDegustacaoAnuncioTemp.PlanoOrigem = planoOrigem;
    planoDegustacaoAnuncioTemp.PlanoOrigemUid = planoOrigem.Uid;
    this.planoDegustacaoAnuncio = planoDegustacaoAnuncioTemp;
  }

  degustar(planoOrigem) {
    this.atualizarDegustacaoComPlanoOrigem(planoOrigem);

    if (
      this.planoDegustacaoAnuncio &&
      this.items &&
      this.items.some(i => i.Uid === this.planoDegustacaoAnuncio.Uid)
    ) {
      this.items.forEach(element => {
        if (element.Uid === this.planoDegustacaoAnuncio.Uid) {
          element.PlanoOrigem = planoOrigem;
          element.PlanoOrigemUid = planoOrigem.Uid;
        }
      });
    } else {
      this.planoDegustacaoAnuncio.TituloPlano = 'Experimente Grátis';

      // if (this.planoDegustacaoAnuncio.TituloPlano === 'Degustação') {
      //   this.planoDegustacaoAnuncio.TituloPlano = 'Experimente Grátis';
      // }
      this.items.push(this.planoDegustacaoAnuncio);
    }

    this.localStorage.setObject(CARRINHO_KEY, this.items);
  }

  getPlanoDegustacaoAnuncio() {
    if (this.planoDegustacaoAnuncio) {
      return this.planoDegustacaoAnuncio;
    } else {
    }
  }
}
