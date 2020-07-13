import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { HistoricoContratoService } from './historico-contrato.service';
import { DetalheImovelService } from '../detalhe-imovel/detalhe-imovel.service';

@Component({
  selector: 'app-historico-contrato',
  templateUrl: './historico-contrato.component.html',
  styleUrls: ['./historico-contrato.component.scss']
})
export class HistoricoContratoComponent implements OnInit, AfterViewInit {
  imovel: any;
  contratos: any;
  carregando = true;
  messages = null;
  message = null;
  typeMessage = null;
  timeMessage = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private historicoContratoService: HistoricoContratoService,
    private detalheImovelService: DetalheImovelService
  ) {
    this.imovel = {};
    this.contratos = [];
    this.message = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
    this.timeMessage = this.messageService.timeMessage;
  }

  ngOnInit() {
    this.carregando = true;
    this.route.params.subscribe(params => {
      this.imovel.Uid = params['UidImovel'];
    });
  }
  ngAfterViewInit() {
    const self = this;

    setTimeout(function() {
      self.buscarImovel();
      self.buscarHistorico();
    }, 500);
  }
  buscarImovel() {
    this.detalheImovelService.getDetail(this.imovel.Uid).subscribe(
      data => {
        this.imovel = data;
        this.carregando = false;
      },
      error => {
        this.messages = this.tratarRetornoDeError(error);
        this.carregando = false;
        this.typeMessage = 'danger';
        window.scrollTo(0, 0);
      }
    );
  }

  buscarHistorico() {
    this.historicoContratoService
      .getHistoricoByImovel(this.imovel.Uid)
      .subscribe(
        data => {
          this.contratos = data;
          this.carregando = false;
          console.log('this.contratos', this.contratos);
        },
        error => {
          this.messages = this.tratarRetornoDeError(error);
          this.carregando = false;
          this.typeMessage = 'danger';
          window.scrollTo(0, 0);
        }
      );
  }
  tratarRetornoDeError(error) {
    if (
      error &&
      Array.isArray(error) &&
      error.some(e => e.hasOwnProperty('Message'))
    ) {
      return error.map(e => e.Message);
    } else if (
      error &&
      error.error &&
      error.error.some(e => e.hasOwnProperty('Message'))
    ) {
      return error.error.map(e => e.Message);
    }
    return ['Ocorreu um erro inesperado! Tente novamente mais tarde'];
  }
}
