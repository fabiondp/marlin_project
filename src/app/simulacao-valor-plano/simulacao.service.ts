import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const SIMULACAO_KEY = 'Simulacao_Valor_Contrato';
@Injectable()
export class SimulacaoService {
  planos: Array<any> = [];

  constructor(
    private localStorage: LocalStorageService,
    private httpClient: HttpClient
  ) {
    const simulacaoLocalStorage = this.localStorage.getObject(SIMULACAO_KEY);
    this.planos = simulacaoLocalStorage ? simulacaoLocalStorage : [];
  }

  simularPlano(plano) {
    if (this.planos && this.planos.some(p => p.Uid === plano.Uid)) {
      this.planos = this.planos.splice(this.planos.findIndex(p => p.Uid === plano.Uid), 0);
      this.planos.push(plano);
    } else {
      this.planos.push(plano);
    }

    this.localStorage.setObject(SIMULACAO_KEY, this.planos);
  }

  getPlano(uid) {
    return this.planos.find(i => i.Uid === uid);
  }

  getValorPlanoContrato(data): Observable<any> {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'calculosContrato/getValorPlanoContrato', {
        params: data
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500 || error.status === 404) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao simular o valor do plano! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }
}
