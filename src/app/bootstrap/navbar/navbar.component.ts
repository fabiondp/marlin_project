import { UsuarioService } from '../../services/usuario.service';
import { CarrinhoService } from '../../carrinho/carrinho/carrinho.service';
import { CarrinhoComponent } from '../../carrinho/carrinho/carrinho.component';
import { AuthService } from '../../services/auth.service';
import {
  Component,
  OnInit,
  AfterViewChecked,
  Renderer,
  ElementRef
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationStart,
  NavigationEnd
} from '@angular/router';

import { Location } from '@angular/common';
import { environment } from 'environments/environment';

declare var window;
declare var $;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewChecked {
  enableAnaliseDeCredito: boolean;
  enableAutoGestaoDeLocacao: boolean;
  enableAluguelTemporada: boolean;

  router: Router;
  navLogin: any;
  navSite: any;
  navAnuncios: any;
  navAutogestao: any;
  isHome: boolean;
  isMeusAnuncios: boolean;
  isMeusImoveis: boolean;
  isFinanceiro: boolean;
  redirectAfterLogout = ['/home'];
  notificacoes: any;

  message = null;
  typeMessage = null;
  timeMessage = null;

  constructor(
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private carrinhoService: CarrinhoService,
    private route: ActivatedRoute,
    private location: Location,
    private usuarioService: UsuarioService,
    private el: ElementRef,
    private renderer: Renderer
  ) {
    this.enableAnaliseDeCredito = environment.enableAnaliseDeCredito;
    this.enableAutoGestaoDeLocacao = environment.enableAutoGestaoDeLocacao;

    _router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.search('/anuncios') !== -1) {
          this.navAnuncios = true;
        } else {
          this.navAnuncios = false;
        }

        this.isMeusAnuncios = !this._router.url.includes('/anuncios/relatorio');
      }
    });

    _router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.search('/autogestao') !== -1) {
          this.navAutogestao = true;
        } else {
          this.navAutogestao = false;
        }

        this.isMeusImoveis = this._router.url.includes('/autogestao/imoveis');
        this.isFinanceiro = this._router.url.includes('/autogestao/financeiro');
      }
    });

    _router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        document.body.scrollTop = 0;

        this.isHome = this._router.url.includes('/home');

        if (this._router.url.includes('/home/1')) {
          this.enableAnaliseDeCredito = false;
          this.enableAutoGestaoDeLocacao = false;
          this.enableAluguelTemporada = false;
        }

        if (!this.isHome) {
          this.navSite = true;
        } else {
          this.navSite = false;
        }
      }
    });
  }

  ngOnInit() {
    if (this.authService.check) {
      this.usuarioService.getNotificacoes().subscribe(
        data => {
          this.notificacoes = data;

          // this.carregando = false;
        },
        error => {
          // this.carregando = false;
          if (Array.isArray(error.error)) {
            this.message = error.error.map(el => el.Message);
          } else if (typeof error === 'object' && error.error) {
            this.message = [error.error.Message];
          } else if (typeof error === 'string') {
            this.message = [error];
          } else {
            this.message = ['Erro inesperado.'];
          }

          this.typeMessage = 'danger';

          window.scrollTo(0, 0);
        }
      );
    }
  }

  logout() {
    this.authService.logout();

    // setTimeout(function () {
    //   this._router.navigate(this.redirectAfterLogout);
    // }, 1000);
  }

  emAnimacao = false;

  ngAfterViewChecked(): void {
    try {
      this._router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const tree = this._router.parseUrl(this._router.url);

          if (tree.fragment && !this.emAnimacao) {
            this.emAnimacao = true;
            let self = this;

            setTimeout(function() {
              const elementt = document.querySelector('#' + tree.fragment);

              $('html, body').animate(
                { scrollTop: $(elementt).offset().top - 90 },
                800,
                function() {
                  self.emAnimacao = false;
                }
              );
            }, 300);
          }
        }
      });
    } catch (e) {}
  }

  items() {
    return this.carrinhoService.items.length > 0
      ? this.carrinhoService.items.length
      : '';
  }

  onMenuClick() {
    //console.log('heyyyy');
    this.renderer.setElementClass(
      this.el.nativeElement.querySelector('.navbar-collapse'),
      'in',
      false
    );
  }
}
