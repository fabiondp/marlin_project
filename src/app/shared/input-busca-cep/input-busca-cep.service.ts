import { environment } from "environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class InputBuscaCepService {
  constructor(private http: HttpClient) {}

  getEndereco(cep) {
    return this.http.get(environment.apiCep + "enderecos/getByCep", {
      params: {
        cep: cep
      }
    });
  }

  getEnderecoMock() {
    const mock = Observable.of({
      cep: "20031-142",
      logradouro: "Rua México",
      complemento: "de 106 a 148 - lado par",
      bairro: "Centro",
      localidade: "Rio de Janeiro",
      uf: "RJ",
      unidade: "",
      ibge: "3304557",
      gia: ""
    });
  }

  getEnderecoMockError() {
    return Observable.timer(500).concat(
      Observable.throw([
        {
          Message:
            "Não foi possível identificar o CEP informado. Preencha os campos abaixo!"
        }
      ])
    );
  }
}
