import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgModule,
  Renderer
} from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { AnuncioService } from '../../services/anuncio.service';
import { MessageService } from '../../services/message.service';
import { Router } from '@angular/router';

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-relatorio-anuncio',
  templateUrl: './relatorio-anuncio.component.html',
  styleUrls: ['./relatorio-anuncio.component.scss']
})
export class RelatorioAnuncioComponent implements OnInit {
  carregando = true;
  message = null;
  typeMessage = null;
  timeMessage = null;

  anuncios = [];

  isCollapsed = false;
  iconCollapse = 'glyphicon-chevron-up';
  textCollapse: string;

  bsConfig: Partial<BsDatepickerConfig>;
  datepickerModel: Date;
  daterangepickerModel: Date[];

  filtro = {
    periodo: [
      new Date(
        moment()
          .subtract(1, 'months')
          .format()
      ),
      new Date(moment().format())
    ]
  };

  constructor(
    private anuncioService: AnuncioService,
    private messageService: MessageService,
    private router: Router,
    private localeService: BsLocaleService
  ) {
    this.message = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
    this.timeMessage = this.messageService.timeMessage;
    this.localeService.use('pt-br');
    this.bsConfig = Object.assign({}, { containerClass: 'theme-orange' });
  }

  ngOnInit() {
    this.estatisticaAnuncios();
  }

  collapsed(): void {
    this.textCollapse = 'collapsed';
    this.iconCollapse = 'glyphicons-chevron-down';
  }

  expanded(): void {
    this.textCollapse = 'expanded';
    this.iconCollapse = 'glyphicons-chevron-up';
  }

  estatisticaAnuncios() {
    this.messageService.message = null;
    this.messageService.typeMessage = null;
    this.messageService.timeMessage = null;
    this.carregando = true;

    let dataBusca = this.mapReverseFiltro();
    this.anuncioService.estatisticasAnuncios(dataBusca).subscribe(
      data => {
        this.anuncios = data;
        this.carregando = false;
      },
      error => {

        this.carregando = false;
        if (Array.isArray(error.error)) {
          this.message = error.error.map(el => el.Message);
        } else if (typeof error === 'object') {
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

  buscar(filtroForm: NgForm) {
    if (filtroForm.valid) {
      this.estatisticaAnuncios();
    }
  }

  limpar() {
    this.filtro = {
      periodo: []
    };
  }

  mapReverseFiltro(): any {
    let filtro = {
      dataInicial: '',
      dataFinal: ''
    };

    if (this.filtro && this.filtro.periodo && this.filtro.periodo[0]) {
      filtro.dataInicial = moment(this.filtro.periodo[0]).format('YYYY-MM-DD');
    }

    if (this.filtro && this.filtro.periodo && this.filtro.periodo[1]) {
      filtro.dataFinal = moment(this.filtro.periodo[1]).format('YYYY-MM-DD');
    }

    return filtro;
  }
}
