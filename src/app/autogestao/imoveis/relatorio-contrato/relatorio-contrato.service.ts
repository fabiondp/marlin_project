import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RelatorioContratoService {
  constructor(private httpClient: HttpClient) {}

  relatorioContrato(data: any): Observable<any> {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + "contratos/getRelatorio", {
        params: data
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  "Ocorreu um erro inesperado ao carregar o relatório de contratos! Por favor, tente mais tarde."
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  obterOpcoesTipoFiltro(): Observable<any> {
    return this.httpClient
      .get(
        environment.apiAutogestaoLocacao +
          "contratos/getAllEnumTipoFiltroRelatorio"
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  "Ocorreu um erro inesperado ao carregar o relatório de contratos! Por favor, tente mais tarde."
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }
}
