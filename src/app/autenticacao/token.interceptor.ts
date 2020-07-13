import { ModalTokenExpiradoComponent } from './modal-token-expirado/modal-token-expirado.component';
import { Injectable, Injector, Component, OnInit, ViewChild } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';
import { JwtTokenService } from '../services/jwt-token.service';
import { DefaultRequestOptionsService } from '../services/default-request-options.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean = false;
  modalSessaoExpiradaEmExibicao = false;

  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  bsModalRef: BsModalRef;

  constructor(
    public jwtToken: JwtTokenService,
    public requestOptions: DefaultRequestOptionsService,
    private router: Router,
    private injector: Injector,
    private authService: AuthService,
    private modalService: BsModalService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = this.addToken(request, this.jwtToken.token);

    return next.handle(request).catch(error => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        error.url.indexOf('paypal.com') === -1
      ) {
        return this.handle401Error(request, next, error);
      }

      return Observable.throw(error);
    });
  }

  addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (
      request.url.indexOf('paypal.com') === -1 &&
      token &&
      request.url.indexOf('security/token') === -1
    ) {
      request = request.clone({
        setHeaders: { Authorization: 'Bearer ' + token }
      });
    }
    return request;
  }

  handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler,
    error: HttpErrorResponse
  ) {
    if (error.url.indexOf('paypal.com') === -1) {
      if (!this.isRefreshingToken) {
        this.isRefreshingToken = true;

        // Reset here so that the following requests wait until the token
        // comes back from the refreshToken call.
        this.tokenSubject.next(null);
        const authService: AuthService = this.injector.get<AuthService>(
          AuthService
        );

        return authService
          .refreshToken()
          .switchMap((newToken: any) => {
            if (newToken.access_token) {
              this.jwtToken.token = newToken.access_token;
              this.jwtToken.refresh_token = newToken.refresh_token;
              this.tokenSubject.next(newToken.access_token);
              const tt = req.clone();
              return next.handle(this.addToken(tt, newToken.access_token));
            }
            this.expirarSessao();


            // If we don't get a new token, we are in trouble so logout.
            // return this.logoutUser();
            // this.router.navigate(['/autenticacao/login'], {
            //   queryParams: { returnUrl: this.router.url }
            // });

          })
          .catch((error: any) => {
            // If there is an exception calling 'refreshToken', bad news so logout.
            // return this.logoutUser();
            // this.router.navigate(['/autenticacao/login'], {
            //   queryParams: { returnUrl: this.router.url }
            // });
            if (error && error.url && error.url.indexOf("security/token") !== -1) {
              this.expirarSessao();

              error.message = "Sessão expirada!";
              return Observable.throw(error);
            }

            return Observable.throw(error);
          })
          .finally(() => {
            this.isRefreshingToken = false;
          });
      } else {
        return this.tokenSubject
          .filter(token => token != null)
          .take(1)
          .switchMap(token => {
            return next.handle(this.addToken(req, this.jwtToken.token));
          });
      }
    }
  }

  private expirarSessao() {
    if (!this.modalSessaoExpiradaEmExibicao && this.router.routerState.snapshot.url.indexOf("/login") === -1) {
      this.modalSessaoExpiradaEmExibicao = true;
      this.confirm()
        .subscribe(
          (redirecionarParaLogin) => {
            this.authService.logout();
            this.redirecionarParaLogin(redirecionarParaLogin);
          },
          (error) => {
            this.authService.logout();
            this.redirecionarParaLogin();
          }
        );
    }
  }

  confirm(): Observable<string> {
    const initialState = {
      redirecionarParaLogin: false,
    };

    this.bsModalRef = this.modalService.show(ModalTokenExpiradoComponent, { initialState });

    return new Observable<string>(this.getConfirmSubscriber());
  }

  private getConfirmSubscriber() {
    return (observer) => {
      const subscription = this.modalService.onHidden.subscribe((reason: string) => {
        observer.next(this.bsModalRef.content.redirecionarParaLogin);
        observer.complete();
      });

      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      };
    }
  }

  private redirecionarParaLogin(forcarRedirecionamento?) {
    if (forcarRedirecionamento) {
      this.router.navigate(['/autenticacao/login'], {
        queryParams: { returnUrl: this.router.url }
      });
    } else if (this.router.routerState.snapshot.url.indexOf("/home") === -1 && !forcarRedirecionamento) {
      this.router.navigate(['/autenticacao/login'], {
        queryParams: { returnUrl: this.router.url }
      });
    }
  }
}