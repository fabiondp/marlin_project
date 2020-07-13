import { ModalComponent } from './../../bootstrap/modal/modal.component';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, AfterViewInit, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { ImoveisService } from './imoveis.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-imoveis',
  templateUrl: './imoveis.component.html',
  styleUrls: ['./imoveis.component.scss']
})
export class ImoveisComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(ModalComponent) modalDesativarImovelMensal: ModalComponent;
  @ViewChild('modalDesativarImovelContratual') modalDesativarImovelContratual: ModalComponent;

  carregandoImoveis: boolean;
  mensagens: any[];
  typeMessage: string;
  imoveisContratos: any[];
  imoveisMensais: any[];
  totalImoveisDisponiveis: number;

  imovelParaDesativar: any;
  processandoDesativar: boolean;
  mensagensDesativar: any[];
  mensagensSuccess: any[];
  mensagensService: any[];

  constructor(
    private imoveisService: ImoveisService,
    private sessionStorageService: SessionStorageService,
    private messageService: MessageService
  ) {
    this.carregandoImoveis = true;
    this.mensagensService = this.messageService.message;
    this.resetImoveis();
  }

  ngOnDestroy() {
    this.messageService.message = null;
  }

  ngOnInit() {
    this.sessionStorageService.set("tabCorrent", "tabDadosImovel");
    this.sessionStorageService.remove("autogestaoImovelEmEdicaoUid");
  }

  ngAfterViewInit() {
    // tslint:disable-next-line:prefer-const
    let self = this;

    setTimeout(function () {
      self.getImoveis();
    }, 500);
  }

  resetImoveis() {
    this.imoveisContratos = [];
    this.imoveisMensais = [];
    this.totalImoveisDisponiveis = 0;
  }

  mapDadosSobreImoveis(data: any) {
    this.imoveisContratos = data['ImoveisContratos'];
    this.imoveisMensais = data['ImoveisMensais'];
    this.totalImoveisDisponiveis = data['TotalImoveisDisponiveis'];
  }

  getImoveis() {
    this.carregandoImoveis = true;
    this.limparMensagens();
    this.resetImoveis();

    // getMeusImoveisMock
    this.imoveisService
      .getMeusImoveis()
      .subscribe(
        (response: any) => {
          this.carregandoImoveis = false;
          this.mapDadosSobreImoveis(response);
        },
        (error: any) => {
          this.carregandoImoveis = false;
          this.exibirError(error);
        }
      );
  }

  limparMensagens() {
    this.mensagens = null;
    this.typeMessage = null;
  }

  exibirError(error) {
    this.typeMessage = 'danger';
    if (
      error &&
      Array.isArray(error) &&
      error.some(e => e.hasOwnProperty('Message'))
    ) {
      this.mensagens = error.map(e => e.Message);
    } else if (error.message) {
      this.mensagens = [error.message];
    } else {
      this.mensagens = [
        'Ocorreu um erro inesperado ao buscar os seus imóveis. Tente novamente mais tarde!'
      ];
    }
  }

  obterLink(imovel) {
    if (this.imovelComCadastroFinalizado(imovel)) {
      return ['/autogestao', 'imoveis', imovel.Uid, 'detalhe'];
    }

    return ['/autogestao', 'imoveis', imovel.Uid, 'editar'];
  }

  possuiImoviesDePlanosContratuais() {
    return (
      this.imoveisContratos !== null &&
      this.imoveisContratos !== undefined &&
      Array.isArray(this.imoveisContratos) &&
      this.imoveisContratos.length > 0
    );
  }

  possuiImoviesDePlanosMensais() {
    return (
      (this.imoveisMensais !== null &&
        this.imoveisMensais !== undefined &&
        Array.isArray(this.imoveisMensais) &&
        this.imoveisMensais.length > 0) ||
      this.totalImoveisDisponiveis > 0
    );
  }

  imovelComCadastroFinalizado(imovel) {
    return imovel.CadastroCompleto;
  }

  abrirModalDesativarImovel(imovel) {
    this.imovelParaDesativar = imovel;
    this.modalDesativarImovelMensal.open();
    this.processandoDesativar = false;
    this.mensagensDesativar = null;
  }

  abrirModalDesativarImovelContratual(imovel) {
    this.imovelParaDesativar = imovel;
    this.modalDesativarImovelContratual.open();
    this.processandoDesativar = false;
    this.mensagensDesativar = null;
  }

  desavitarImovel(imovelParaDesativar) {
    this.processandoDesativar = true;
    this.mensagensDesativar = [];

    this.imoveisService.disable(imovelParaDesativar.Uid)
      .subscribe(
        (response) => {
          this.modalDesativarImovelMensal.close();
          this.modalDesativarImovelContratual.close();

          this.processandoDesativar = false;
          this.mensagensSuccess = [`Imóvel desativado com sucesso`];
          imovelParaDesativar.Enabled = false;
          window.scrollTo(0, 0);
        },
        (error) => {
          this.processandoDesativar = false;
          this.mensagensDesativar = error;
          window.scrollTo(0, 0);
        }
      );
  }
}
