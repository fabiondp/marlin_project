import { HistoricoProprietarioService } from './../historico-proprietario.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'app/services/message.service';
import { DadosProprietario } from '../../salvar-imovel/salvar-dados-proprietario/dados-proprietario';
import { Observable } from 'rxjs';
import { SalvarDadosProprietarioService } from '../../salvar-imovel/salvar-dados-proprietario/salvar-dados-proprietario.service';
import { InformacoesBancariasService } from 'app/autogestao/financeiro/informacoes-bancarias/informacoes-bancarias.service';

@Component({
  selector: 'app-detalhe-proprietario',
  templateUrl: './detalhe-proprietario.component.html',
  styleUrls: ['./detalhe-proprietario.component.scss']
})
export class DetalheProprietarioComponent implements OnInit, AfterViewInit {
  imovel: any;
  proprietario: DadosProprietario;
  messages = null;
  message = null;
  typeMessage = null;
  timeMessage = null;
  opcoesGenero;
  opcoesEstadoCivil;
  opcoesTipoRepresentante;
  OpcoesBanco;

  carregando = true;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private historicoProprietarioService: HistoricoProprietarioService,
    private salvarProprietarioService: SalvarDadosProprietarioService,
    private informacoesBancariasService: InformacoesBancariasService
  ) {
    this.proprietario = new DadosProprietario();
    this.imovel = {};
    this.message = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
    this.timeMessage = this.messageService.timeMessage;
  }

  ngOnInit() {
    this.carregando = true;

    this.route.params.subscribe(params => {
      this.imovel.Uid = params['UidImovel'];
      this.proprietario.Uid = params['UidProprietario'];
    });
  }
  ngAfterViewInit() {
    const self = this;

    setTimeout(function () {
      self.carregarOpcoes();
    }, 500);
  }

  carregarOpcoes() {
    Observable.forkJoin([
      this.carregarOpcoesGenero(),
      this.carregarDeEstadoCivil(),
      this.carregarBancos(),
      this.carregarOpcoesTipoRepresentante()
    ]).subscribe(
      ([responseOpcoesGenero, responseDeEstadoCivil, responseBancos, responseTipoRepresentante]) => {
        this.buscarProprietario();
      },
      error => {
        this.carregando = false;

        this.typeMessage = 'danger';

        this.messages = this.tratarRetornoDeError([
          'Ocorreu um erro inesperado e não foi possível carregar os recursos da página. Tente novamente mais tarde!'
        ]);

        window.scrollTo(0, 0);
      }
    );
  }

  carregarOpcoesGenero() {
    return this.salvarProprietarioService.getAllEnumOpcoesGenero().map(data => {
      this.opcoesGenero = data;
      return data;
    });
  }

  carregarDeEstadoCivil() {
    return this.salvarProprietarioService.getAllEnumEstadoCivil().map(data => {
      this.opcoesEstadoCivil = data;
      return data;
    });
  }

  carregarOpcoesTipoRepresentante() {
    return this.salvarProprietarioService.getAllEnumTipoRepresentante().map(data => {
      this.opcoesTipoRepresentante = data;
      return data;
    });
  }

  carregarBancos() {
    return this.informacoesBancariasService.getAllBancos().map(data => {
      this.OpcoesBanco = data;
      return data;
    });
  }

  proprietarioCasado() {
    return this.proprietario.EstadoCivil === 2;
  }

  buscarProprietario() {
    this.historicoProprietarioService
      .getDetailsHistorico(this.proprietario.Uid, this.imovel.Uid)
      .subscribe(
        data => {

          this.proprietario.map(data, this.OpcoesBanco);
          this.proprietario.panelDadosPessoaisIsOpen = true;
          this.proprietario.panelRepresentacaoIsOpen = true;
          this.proprietario.panelInfoBancariasIsOpen = true;
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
