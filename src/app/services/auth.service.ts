import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { JwtTokenService } from './jwt-token.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { LocalStorageService } from './local-storage.service';
import { DefaultRequestOptionsService } from './default-request-options.service';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const USER_KEY = 'user';
@Injectable()
export class AuthService {
  public check: Boolean = false;
  public cadastroCompleto: Boolean = false;
  public inadimplente: Boolean = false;
  public faturaPendente: Boolean = false;

  public user = {
    nome: null,
    cpf: null,
    sexo: null,
    dataNascimento: null,
    estadoCivil: null,
    enabled: null,
    uid: null,
    enderecos: [],
    perfis: [],
    indicadorSenhaRedefinida: null,
    email: null,
    cpfcnpj: null,
    rememberedCards: null,
    // possuiContratoDeAnuncios: false,
    // possuiContratoDeAutogestao: false,
    produtosContratados: [],
    cadastroCompleto: null,
    inadimplente: null,
    faturaPendente: null,
    responsavelCPF: null,
    responsavelNome: null,
    contatos: [], 
    solicitouFatura: false
  };
  _LogService: any;

  constructor(
    private jwtToken: JwtTokenService,
    private localStorage: LocalStorageService,
    private requestOptions: DefaultRequestOptionsService,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.check = this.jwtToken.token ? true : false;
    const userLocalStorage = this.localStorage.getObject(USER_KEY);

    this.user = userLocalStorage
      ? userLocalStorage
      : {
          nome: ''
        };
  }

  atualizarSolicitacaoFatura(value){
    this.user.solicitouFatura = value;
    this.user.inadimplente = value;
    this.user.faturaPendente = value;
    this.localStorage.setObject(USER_KEY, this.user);
  }

  obterEstadoCivil() {
    if (this.user.estadoCivil === 'Casado') {
      return 2;
    } else if (this.user.estadoCivil === 'Divorciado') {
      return 3;
    } else if (this.user.estadoCivil === 'Separado') {
      return 5;
    } else if (this.user.estadoCivil === 'Solteiro') {
      return 1;
    } else if (this.user.estadoCivil === 'Viúvo') {
      return 4;
    }

    return null;
  }

  obterGenero() {
    if (this.user.sexo === 'Masculino') {
      return 2;
    } else if (this.user.sexo === 'Feminino') {
      return 1;
    }

    return null;
  }

  // "Login": "luciogarcia",
  // "Senha": "123456"

  loginAreaExclusiva(data: any): Promise<any> {
    const searchParams = Object.keys(data)
      .map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      })
      .join('&');

    return this.httpClient
      .post(
        environment.apiUsuario + 'logins/loginAreaExclusiva',
        searchParams,
        {
          headers: new HttpHeaders().set(
            'Content-Type',
            'application/x-www-form-urlencoded'
          )
        }
      )
      .toPromise()
      .then((response: any) => {
        this.check = true;
        this.jwtToken.token = response.access_token;
        this.jwtToken.refresh_token = response.refresh_token;
        this.cadastroCompleto = response.cadastro_completo;
        this.inadimplente = (response.inadimplente == "True");
        this.faturaPendente = (response.fatura_pendente == "True");

        return this.obterDadosUsuario();
        //  response;
      })
      .catch((error: any) => {
        console.log('error service', error);
        if (error.status === 0) {
          return Promise.reject(
            'Ocorreu um erro inesperado ao efetuar login! Por favor, tente mais tarde.'
          );
        } else if (error.status === 400) {
          return Promise.reject(error);
        }
        return Promise.reject(error.message || error);
      });
  }

  login(data: any): Promise<any> {
    const searchParams = Object.keys(data)
      .map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      })
      .join('&');

    return this.httpClient
      .post(environment.apiAutenticacao + 'security/token', searchParams, {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        )
      })
      .toPromise()
      .then((response: any) => {
        this.check = true;
        this.jwtToken.token = response.access_token;
        this.jwtToken.refresh_token = response.refresh_token;
        this.inadimplente = (response.inadimplente == "True");
        this.faturaPendente = (response.fatura_pendente == "True");

        console.log("response.inadimplente", response.inadimplente);

        return this.obterDadosUsuario();
        //  response;
      })
      .catch((error: any) => {
        if (error.status === 0) {
          return Promise.reject(
            'Ocorreu um erro inesperado ao efetuar login! Por favor, tente mais tarde.'
          );
        } else if (error.status === 400) {
          return Promise.reject({
            error: [
              {
                Message: error.error.error_description
              }
            ]
          });
        }
        return Promise.reject(error.message || error);
      });
  }

  logout() {
    this.localStorage.remove(USER_KEY);
    this.localStorage.clear();
    this.jwtToken.token = null;
    this.check = false;
  }

  logoutTeste() {
    this.localStorage.remove(USER_KEY);
    this.localStorage.clear();
    this.jwtToken.token = null;
    this.check = false;
    this.router.navigate(['/home']);
  }

  obterDadosUsuario() {
    return this.httpClient
      .get(environment.apiAutenticacao + 'usuario/obterdados')
      .toPromise()
      .then((response: any) => {
        this.user = response;
        this.localStorage.setObject(USER_KEY, this.user);

        console.log("authService.user.inadimplente2:" ,this.user.inadimplente);
        console.log("authService.user.faturaPendente2:" , this.user.faturaPendente);

        return response;
      });
  }

  refreshToken(): Observable<string> {
    const data = {
      grant_type: 'refresh_token',
      refresh_token: this.jwtToken.refresh_token
    };
    const searchParams = Object.keys(data)
      .map(key => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
      })
      .join('&');

    return this.httpClient
      .post(environment.apiAutenticacao + 'security/token', searchParams, {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        )
      })
      .do((response: any) => {
        this.check = true;
        this.jwtToken.token = response.access_token;
        this.jwtToken.refresh_token = response.refresh_token;
        return response;
      });
  }

  atualizarDadosDoUsuario() {
    return this.refreshToken().subscribe(response => {
      this.obterDadosUsuario();
    });
  }

  atualizarContratoDeAnuncio(data: any) {
    // if (data.Anuncios || data.TotalAnunciosDisponiveis) {
    //   this.user.possuiContratoDeAnuncios = (data.TotalAnunciosDisponiveis > 0 || data.Anuncios.length > 0);
    //   this.localStorage.setObject(USER_KEY, this.user);
    // }
  }

  atualizarContratoDeAutogestao(data: any) {
    // if (data.Imoveis || data.TotalImoveisDisponiveis) {
    //   this.user.possuiContratoDeAutogestao = (data.TotalImoveisDisponiveis > 0 || data.Imoveis.length > 0);
    //   this.localStorage.setObject(USER_KEY, this.user);
    // }
  }

  possuiContratoDeAnuncios() {
    return (
      this.user.produtosContratados &&
      Array.isArray(this.user.produtosContratados) &&
      this.user.produtosContratados.some(p => p === 'Anuncio')
    );
  }

  possuiContratoDeAutogestao() {
    return (
      this.user.produtosContratados &&
      Array.isArray(this.user.produtosContratados) &&
      this.user.produtosContratados.some(p => p === 'AutoGestao')
    );
  }
}
