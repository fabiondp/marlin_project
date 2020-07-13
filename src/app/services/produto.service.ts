import { MeusPlanosComponent } from './../meus-planos/meus-planos.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { environment } from 'environments/environment';

@Injectable()
export class ProdutoService {
  produtoAnuncio: any;
  degustacaoProdutoAnuncio: any;
  produtoAnalise: any;
  produtoAutogestao: any;

  constructor(private http: HttpClient) {}

  public getAllProdutoAnuncio(): Observable<any> {
    if (!this.produtoAnuncio) {
      return this.http
        .get(environment.apiProduto + 'produtos/anuncio')
        .map(response => {
          this.produtoAnuncio = response;

          if (this.produtoAnuncio.PlanoDegustacao) {
            this.produtoAnuncio.PlanoDegustacao.PlanoUid = this.produtoAnuncio.PlanoDegustacao.Uid;
            this.degustacaoProdutoAnuncio = this.produtoAnuncio.PlanoDegustacao;
          }

          if (response['Planos']) {
            response['Planos'].forEach(element => {
              element.TipoProduto = 'Anuncio';
              element.TituloProduto = response['TituloProduto'];
            });
          }

          return response;
        })
        .catch((error: any) => {
          if (error.status === 0) {
            return Observable.throw(
              'Ocorreu um erro inesperado ao carregar os planos de anúncio! Por favor, tente mais tarde.'
            );
          }
          return Observable.throw(error.message);
        });
    } else {
      return Observable.of(this.produtoAnuncio);
    }
  }

  public getDegustacaoProdutoAnuncio(): Observable<any> {
    if (!this.degustacaoProdutoAnuncio) {
      return this.http
        .get(environment.apiProduto + 'produtos/anuncio')
        .map(response => {
          this.produtoAnuncio = response;

          if (this.produtoAnuncio.PlanoDegustacao) {
            this.produtoAnuncio.PlanoDegustacao.PlanoUid = this.produtoAnuncio.PlanoDegustacao.Uid;
            this.degustacaoProdutoAnuncio = this.produtoAnuncio.PlanoDegustacao;

            return this.degustacaoProdutoAnuncio;
          }

          return null;
        })
        .catch((error: any) => {
          if (error.status === 0) {
            return Observable.throw(
              'Ocorreu um erro inesperado ao carregar os planos de anúncio! Por favor, tente mais tarde.'
            );
          }
          return Observable.throw(error.message);
        });
    } else {
      return Observable.of(this.degustacaoProdutoAnuncio);
    }
  }

  public getAllProdutoAnalise(): Observable<any> {
    if (!this.produtoAnalise) {
      return this.http
        .get(environment.apiProduto + 'produtos/analise')
        .map(response => {
          this.produtoAnalise = response;

          if (response['Planos']) {
            response['Planos'].forEach(element => {
              element.TipoProduto = 'Analise';
              element.TituloProduto = response['TituloProduto'];
            });
          }

          return response;
        })
        .catch((error: any) => {
          if (error.status === 0) {
            return Observable.throw(
              'Ocorreu um erro inesperado ao carregar os planos de análise cadastral! Por favor, tente mais tarde.'
            );
          }
          return Observable.throw(error.message);
        });
    } else {
      return Observable.of(this.produtoAnalise);
    }
  }

  public getAllProdutoAutogestao(): Observable<any> {
    if (!this.produtoAutogestao) {
      return this.http
        .get(environment.apiProduto + 'produtos/autogestao')
        .map(response => {
          this.produtoAutogestao = response;

          if (response['Planos']) {
            response['Planos'].forEach(element => {
              element.TipoProduto = 'Autogestao';
              element.TituloProduto = response['TituloProduto'];
            });
          }
          return response;
        })
        .catch((error: any) => {
          if (error.status === 0) {
            return Observable.throw(
              'Ocorreu um erro inesperado ao carregar os planos de autogestão! Por favor, tente mais tarde.'
            );
          }
          return Observable.throw(error.message);
        });
    } else {
      return Observable.of(this.produtoAutogestao);
    }
  }
}
