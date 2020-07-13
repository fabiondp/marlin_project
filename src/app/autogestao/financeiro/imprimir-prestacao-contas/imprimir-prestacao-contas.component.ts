import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, Renderer2, OnDestroy } from '@angular/core';
import { PrestacaoContasService } from '../prestacao-contas/prestacao-contas.service';
import { MessageService } from 'app/services/message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalhe-prestacao-contas',
  templateUrl: './imprimir-prestacao-contas.component.html',
  styleUrls: ['./imprimir-prestacao-contas.component.scss']
})
export class ImprimirPrestacaoContasComponent implements OnInit, AfterViewInit, OnDestroy {
  message = null;
  typeMessage = null;
  timeMessage = null;
  carregando = true;
  cobranca: any;

  constructor(
    private prestacaoContasService: PrestacaoContasService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private location: Location,
    private renderer: Renderer2
  ) {
    this.cobranca = {};
    this.message = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
    this.timeMessage = this.messageService.timeMessage;

  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'page-print');
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'page-print');

    this.route.params.subscribe(params => {
      this.cobranca.Uid = params['UidCobranca'];
    });
  }

  ngAfterViewInit() {
    const self = this;

    setTimeout(function () {
      self.buscarPrestacaoContas();
    }, 500);
  }

  buscarPrestacaoContas(): any {
    this.prestacaoContasService
      .getPrestacaoContasDetail(this.cobranca.Uid)
      .subscribe(
        data => {
          this.cobranca = data;
          this.carregando = false;

          setTimeout(function () {
            window.print();
          }, 1000);
        },
        error => {
          this.carregando = false;
          this.typeMessage = 'danger';
          window.scrollTo(0, 0);
        }
      );
  }

  // goBack() {
  //   // window.history.back();
  //   this.location.back();
  // }
}

