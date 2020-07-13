import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { DefaultRequestOptionsService } from '../../services/default-request-options.service';
import { JwtTokenService } from '../../services/jwt-token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ImoveisService {
  public check: Boolean = false;

  constructor(
    private httpClient: HttpClient,
    private jwtToken: JwtTokenService,
    private requestOptions: DefaultRequestOptionsService
  ) {
    this.check = this.jwtToken.token ? true : false;
  }

  getMeusImoveis(): Observable<any> {
    return this.httpClient
      .get(environment.apiAutogestaoLocacao + 'imoveis/getAllByClienteId', {
        headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize())
      })
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao carregar imoveis! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return Observable.throw(error);
      });
  }

  getMeusImoveisMock() {
    const responseMock = Observable.of({
      ImoveisContratos: [
        {
          "ValorLocacao": 1000,
          VigenciaContratoMeses: 48,
          Logradouro: null,
          Numero: null,
          Bairro: null,
          Cidade: null,
          Estado: null,
          TituloPlano: "Plano Contratual COPA20182",
          TipoPlano: 1,
          DescricaoTipoPlano: "Contrato",
          SituacaoImovel: 0,
          DescricaoSituacaoImovel: null,
          NomeProprietario: null,
          NomeLocatario: null,
          Uid: "d8e4c3fb-2b94-e811-80e2-df6527a1fe6b",
          CreationDate: "0001-01-01T00:00:00",
          UpdateDate: "0001-01-01T00:00:00",
          CadastroFinalizado: false
        },
        {
          "ValorLocacao": 1200,
          VigenciaContratoMeses: 36,
          Logradouro: 'Rua Bambina',
          Numero: 250,
          Bairro: 'Botafogo',
          Cidade: 'Rio de Janeiro',
          Estado: 'RJ',
          TituloPlano: "Plano Contratual COPA20181",
          TipoPlano: 1,
          DescricaoTipoPlano: "Contrato",
          SituacaoImovel: 0,
          DescricaoSituacaoImovel: null,
          NomeProprietario: null,
          NomeLocatario: null,
          Uid: "d8e4c3fb-2b94-e811-80e2-df6527a1fe6b",
          CreationDate: "0001-01-01T00:00:00",
          UpdateDate: "0001-01-01T00:00:00",
          CadastroFinalizado: true
        }
      ],
      ImoveisMensais: [
        {
          "ValorLocacao": 1111,
          VigenciaContratoMeses: 48,
          Logradouro: null,
          Numero: null,
          Bairro: null,
          Cidade: null,
          Estado: null,
          TituloPlano: "Plano Contratual COPA20182",
          TipoPlano: 1,
          DescricaoTipoPlano: "Contrato",
          SituacaoImovel: 0,
          DescricaoSituacaoImovel: null,
          NomeProprietario: null,
          NomeLocatario: null,
          Uid: "d8e4c3fb-2b94-e811-80e2-df6527a1fe6b",
          CreationDate: "0001-01-01T00:00:00",
          UpdateDate: "0001-01-01T00:00:00",
          CadastroFinalizado: false
        },
        {
          "ValorLocacao": 2222,
          VigenciaContratoMeses: 36,
          Logradouro: 'Rua Voluntários da Pátria',
          Numero: 860,
          Bairro: 'Centro',
          Cidade: 'Rio de Janeiro',
          Estado: 'RJ',
          TituloPlano: "Plano Contratual COPA20181",
          TipoPlano: 1,
          DescricaoTipoPlano: "Contrato",
          SituacaoImovel: 0,
          DescricaoSituacaoImovel: null,
          NomeProprietario: 'Lucas Prop',
          NomeLocatario: 'Lucas Loc',
          Uid: "d8e4c3fb-2b94-e811-80e2-df6527a1fe6b",
          CreationDate: "0001-01-01T00:00:00",
          UpdateDate: "0001-01-01T00:00:00",
          CadastroFinalizado: true
        }
      ],
      TotalImoveisDisponiveis: 1
    });

    return responseMock;
  }

  disable(id): Observable<any> {
    return this.httpClient
      .delete(
        environment.apiAutogestaoLocacao + 'imoveis/disable',
        {
          headers: new HttpHeaders(this.requestOptions.getHeadersAuthorize()),
          params: {
            id: id
          }
        }
      )
      .catch((error: any) => {
        if (error.status === 0 || error.status === 500) {
          return Observable.throw({
            error: [
              {
                Message:
                  'Ocorreu um erro inesperado ao excluir o imóvel! Por favor, tente mais tarde.'
              }
            ]
          });
        }
        return this.getError(error);
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
