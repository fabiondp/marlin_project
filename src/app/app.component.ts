import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { setTheme } from 'ngx-bootstrap/utils';
import { DesativarImoveisAutogestaoComponent } from './meus-planos/desativar-imoveis-autogestao/desativar-imoveis-autogestao.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  [x: string]: any;
  title = 'app';
  @ViewChild('desativarImovel')
  desativarImovel: DesativarImoveisAutogestaoComponent;

  constructor(private router: Router) {
    setTheme('bs3');
    const self = this;

    setTimeout(function() {
      self.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          (<any>window).ga('set', 'page', event.urlAfterRedirects);
          (<any>window).ga('send', 'pageview');
        }
      });
    }, 500);
  }

  ngOnInit() {
    this.router.events.subscribe(evt => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.desativarImovel.verificarImoveisParaDesativarAposDowngrade();
      window.scrollTo(0, 0);
    });
  }
}
