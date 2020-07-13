import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'app/services/message.service';
import { HistoricoProprietarioService } from './historico-proprietario.service';
import { DetalheImovelService } from '../detalhe-imovel/detalhe-imovel.service';

@Component({
  selector: 'app-historico-proprietario',
  templateUrl: './historico-proprietario.component.html',
  styleUrls: ['./historico-proprietario.component.scss']
})
export class HistoricoProprietarioComponent implements OnInit, AfterViewInit {
  imovel: any;
  proprietarios: any;
  carregando = true;
  messages = null;
  message = null;
  typeMessage = null;
  timeMessage = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private historicoProprietarioService: HistoricoProprietarioService,
    private detalheImovelService: DetalheImovelService,
  ) {
    this.imovel = {};
    this.proprietarios = [];
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

    setTimeout(function () {
      self.buscarImovel();

    }, 500);
  }

  buscarImovel() {
    this.detalheImovelService.getDetail(this.imovel.Uid).subscribe(
      data => {
        this.imovel = data;
        this.buscarHistorico();
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
    this.historicoProprietarioService
      .getHistoricoByImovel(this.imovel.Uid)
      .subscribe(
        data => {
          this.proprietarios = data;
          this.carregando = false;
          console.log('this.proprietarios', this.proprietarios);
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
