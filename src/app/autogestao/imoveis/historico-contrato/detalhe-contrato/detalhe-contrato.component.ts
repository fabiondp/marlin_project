import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../../services/message.service';
import { HistoricoContratoService } from '../historico-contrato.service';
import { DadosContratoLocacao } from '../../salvar-imovel/salvar-contrato/salvar-dados-contrato/dados-contrato-locacao';
import { LocatarioFiadorGarantia } from '../../salvar-imovel/salvar-contrato/salvar-locatario-fiador-garantia/locatario-fiador-garantia';

@Component({
  selector: 'app-detalhe-contrato',
  templateUrl: './detalhe-contrato.component.html',
  styleUrls: ['./detalhe-contrato.component.scss']
})
export class DetalheContratoComponent implements OnInit, AfterViewInit {
  imovel: any;
  contrato: any;
  taxas: any;
  messages = null;
  message = null;
  typeMessage = null;
  timeMessage = null;

  dadosContratoLocacao: DadosContratoLocacao;
  locatarioFiadorGarantia: LocatarioFiadorGarantia;

  carregando = true;

  FiadorContatosTelFixo: any[];
  FiadorContatosTelCel: any[];

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private historicoContratoService: HistoricoContratoService
  ) {
    this.contrato = {};
    this.imovel = {};
    this.message = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
    this.timeMessage = this.messageService.timeMessage;
    this.dadosContratoLocacao = new DadosContratoLocacao();
    this.locatarioFiadorGarantia = new LocatarioFiadorGarantia();
  }

  ngOnInit() {
    this.carregando = true;
    this.route.params.subscribe(params => {
      this.imovel.Uid = params['UidImovel'];
      this.contrato.Uid = params['UidContrato'];
    });
  }

  ngAfterViewInit() {
    const self = this;

    setTimeout(function () {
      self.buscarContrato();
    }, 500);
  }

  buscarContrato() {
    window.scrollTo(0, 0);

    this.historicoContratoService
      .getDetailsHistorico(this.contrato.Uid)
      .subscribe(
        data => {
          this.contrato = data;

          if (this.contrato.Proprietarios) {
            this.contrato.Proprietarios.forEach(proproetario => {
              proproetario.panelDadosPessoaisIsOpen = true;
            });
          }

          this.dadosContratoLocacao.map(data);
          this.mapFiadorContatosTelFixo(this.contrato);
          this.mapFiadorContatosTelCel(this.contrato);

          if (this.contrato && this.contrato.Locatario) {
            this.locatarioFiadorGarantia.map(this.contrato);
          }

          this.carregando = false;
          window.scrollTo(0, 0);
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

  mapFiadorContatosTelFixo(data) {
    if (
      this.contrato.Fiador !== null &&
      this.contrato.Fiador.Contatos !== null &&
      Array.isArray(this.contrato.Fiador.Contatos) &&
      this.contrato.Fiador.Contatos.length > 0 &&
      this.contrato.Fiador.Contatos.some(c => c.TipoContato === 1)
    ) {
      // tslint:disable-next-line:prefer-const
      let fiadorContatosTelFixo = this.contrato.Fiador.Contatos.filter(
        c => c.TipoContato === 1
      );

      this.FiadorContatosTelFixo = fiadorContatosTelFixo.map(c => {
        const contato = {
          tipo: 1,
          telefone: `${c['DDD']}${c['Numero']}`
        };
        return contato;
      });
    }
  }

  mapFiadorContatosTelCel(data) {
    if (
      this.contrato.Fiador !== null &&
      this.contrato.Fiador.Contatos !== null &&
      Array.isArray(this.contrato.Fiador.Contatos) &&
      this.contrato.Fiador.Contatos.length > 0 &&
      this.contrato.Fiador.Contatos.some(c => c.TipoContato === 2)
    ) {
      // tslint:disable-next-line:prefer-const
      let fiadorContatosTelCel = this.contrato.Fiador.Contatos.filter(
        c => c.TipoContato === 2
      );

      this.FiadorContatosTelCel = fiadorContatosTelCel.map(c => {
        const contato = {
          tipo: 1,
          telefone: `${c['DDD']}${c['Numero']}`
        };
        return contato;
      });
    }
  }

  locatarioPessoaFisica() {
    return this.locatarioFiadorGarantia.Locatario.TipoPessoa === 1;
  }
}
