import { DadosProprietario } from './../salvar-imovel/salvar-dados-proprietario/dados-proprietario';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { DetalheImovelService } from './detalhe-imovel.service';
import { MessageService } from 'app/services/message.service';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { LocatarioFiadorGarantia } from '../salvar-imovel/salvar-contrato/salvar-locatario-fiador-garantia/locatario-fiador-garantia';
import { DadosImovel } from '../salvar-imovel/salvar-dados-imovel/dados-imovel';
import { Observable } from 'rxjs/Observable';
import { SalvarImovelService } from '../salvar-imovel/salvar-imovel.service';
import { OpcaoViewModel } from 'app/shared/opcao-view-model';
import { SessionStorageService } from 'app/services/session-storage.service';
import { DadosContratoLocacao } from '../salvar-imovel/salvar-contrato/salvar-dados-contrato/dados-contrato-locacao';

@Component({
  selector: 'app-detalhe-imovel',
  templateUrl: './detalhe-imovel.component.html',
  styleUrls: ['./detalhe-imovel.component.scss']
})
export class DetalheImovelComponent implements OnInit, AfterViewInit {
  imovel: DadosImovel;
  proprietario: DadosProprietario;
  contratoLocacao: any;
  locatario: any;

  ocultarAbas = false;


  LocatarioContatosTelFixo: any[];
  LocatarioContatosTelCel: any[];

  FiadorContatosTelFixo: any[];
  FiadorContatosTelCel: any[];

  locatarioFiadorGarantia: LocatarioFiadorGarantia;

  carregando = true;
  keyTabCorrent = 'tabCorrentImovel';

  tabCorrent: any;
  @ViewChild('tabImovel')
  tabImovel: TabsetComponent;
  messages = null;
  message = null;
  typeMessage = null;
  timeMessage = null;
  constructor(
    private detalheImovelService: DetalheImovelService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private salvarImovelService: SalvarImovelService,
    private sessionStorageService: SessionStorageService
  ) {
    this.imovel = new DadosImovel();
    this.proprietario = new DadosProprietario();
    this.message = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
    this.timeMessage = this.messageService.timeMessage;
  }

  ngOnInit() {
    this.carregando = true;
    this.route.params.subscribe(params => {
      this.imovel.Uid = params['UidImovel'];
    });

    this.tabCorrent = this.sessionStorageService.get(this.keyTabCorrent + this.imovel.Uid)
      ? this.sessionStorageService.get(this.keyTabCorrent + this.imovel.Uid)
      : 'tabDadosImovel';
  }


  updateTabCurrent(data: TabDirective): void {
    this.tabCorrent = data.id;
    this.sessionStorageService.set(this.keyTabCorrent + this.imovel.Uid, this.tabCorrent);
  }

  selectTab(tab_id: string) {
    this.tabImovel.tabs.forEach(element => {
      if (element.id === tab_id) {
        element.active = true;
      }
    });

    this.sessionStorageService.set(this.keyTabCorrent + this.imovel.Uid, this.tabCorrent);
  }

  ngAfterViewInit() {
    const self = this;

    setTimeout(function () {
      self.carregarOpcoes();
      self.selectTab(self.tabCorrent);
    }, 500);
  }

  private carregarOpcoes() {
    this.ocultarAbas = true;
    this.carregando = true;
    // this.messageStatus = 'Carregando...';
    this.messages = null;
    Observable.forkJoin([
      this.carregarOpcoesTipoCobrancaCondominio(),
      this.carregarOpcoesTipoTaxaImovel()
    ]).subscribe(
      ([responseTiposImovel, responseEstados]) => {
        this.buscarImovel();
      },
      error => {
        this.carregando = false;
        this.messages = [
          'Ocorreu um erro inesperado e não foi possível carregar os recursos da página. Tente novamente mais tarde!'
        ];
        this.typeMessage = 'danger';
        window.scrollTo(0, 0);
      }
    );
  }

  carregarOpcoesTipoCobrancaCondominio() {
    return this.salvarImovelService.getAllEnumTipoCobrancaCondominio().map(data => {
      this.imovel.opcoesTipoCobrancaCondominio = data;
      return data;
    });
  }

  carregarOpcoesTipoTaxaImovel() {
    return this.salvarImovelService.getAllEnumTipoTaxaImovel().map(data => {
      // this.opcoesTipoTaxaImovel = data;
      this.imovel.carregarOpcoesTaxas(data);
      return data;
    });
  }

  buscarImovel() {
    this.detalheImovelService.getDetail(this.imovel.Uid).subscribe(
      data => {
        this.imovel.map(data);
        this.carregando = false;
        this.ocultarAbas = false;
      },
      error => {
        this.ocultarAbas = false;
        this.messages = this.tratarRetornoDeError(error);
        this.carregando = false;
        this.typeMessage = 'danger';
        window.scrollTo(0, 0);
      }
    );

    this.detalheImovelService.getDetailProprietario(this.imovel.Uid).subscribe(
      data => {
        this.proprietario.map(data);
        this.carregando = false;
      },
      error => {
        // this.messages = this.tratarRetornoDeError(error);
        this.carregando = false;
        // this.typeMessage = 'danger';
        window.scrollTo(0, 0);
      }
    );


    this.detalheImovelService.getByImovel(this.imovel.Uid).subscribe(
      data => {
        this.contratoLocacao = data;
        this.mapLocatarioContatosTelFixo(this.contratoLocacao);
        this.mapLocatarioContatosTelCel(this.contratoLocacao);
        this.mapFiadorContatosTelFixo(this.contratoLocacao);
        this.mapFiadorContatosTelCel(this.contratoLocacao);
        this.carregando = false;
      },
      error => {
        // this.messages = this.tratarRetornoDeError(error);
        this.carregando = false;
        // this.typeMessage = 'danger';
        window.scrollTo(0, 0);
      }
    );
  }

  mapLocatarioContatosTelFixo(data) {
    if (
      this.contratoLocacao.Locatario !== null &&
      this.contratoLocacao.Locatario.Contatos !== null &&
      Array.isArray(this.contratoLocacao.Locatario.Contatos) &&
      this.contratoLocacao.Locatario.Contatos.length > 0 &&
      this.contratoLocacao.Locatario.Contatos.some(c => c.TipoContato === 1)
    ) {
      // tslint:disable-next-line:prefer-const
      let locatarioContatosTelFixo = this.contratoLocacao.Locatario.Contatos.filter(
        c => c.TipoContato === 1
      );

      this.LocatarioContatosTelFixo = locatarioContatosTelFixo.map(c => {
        const contato = {
          tipo: 1,
          telefone: `${c['DDD']}${c['Numero']}`
        };
        return contato;
      });
    }
  }

  mapLocatarioContatosTelCel(data) {
    if (
      this.contratoLocacao.Locatario !== null &&
      this.contratoLocacao.Locatario.Contatos !== null &&
      Array.isArray(this.contratoLocacao.Locatario.Contatos) &&
      this.contratoLocacao.Locatario.Contatos.length > 0 &&
      this.contratoLocacao.Locatario.Contatos.some(c => c.TipoContato === 2)
    ) {
      // tslint:disable-next-line:prefer-const
      let locatarioContatosTelCel = this.contratoLocacao.Locatario.Contatos.filter(
        c => c.TipoContato === 2
      );

      this.LocatarioContatosTelCel = locatarioContatosTelCel.map(c => {
        const contato = {
          tipo: 1,
          telefone: `${c['DDD']}${c['Numero']}`
        };
        return contato;
      });
    }
  }

  mapFiadorContatosTelFixo(data) {
    if (
      this.contratoLocacao.Fiador !== null &&
      this.contratoLocacao.Fiador.Contatos !== null &&
      Array.isArray(this.contratoLocacao.Fiador.Contatos) &&
      this.contratoLocacao.Fiador.Contatos.length > 0 &&
      this.contratoLocacao.Fiador.Contatos.some(c => c.TipoContato === 1)
    ) {
      // tslint:disable-next-line:prefer-const
      let fiadorContatosTelFixo = this.contratoLocacao.Fiador.Contatos.filter(
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
      this.contratoLocacao.Fiador !== null &&
      this.contratoLocacao.Fiador.Contatos !== null &&
      Array.isArray(this.contratoLocacao.Fiador.Contatos) &&
      this.contratoLocacao.Fiador.Contatos.length > 0 &&
      this.contratoLocacao.Fiador.Contatos.some(c => c.TipoContato === 2)
    ) {
      // tslint:disable-next-line:prefer-const
      let fiadorContatosTelCel = this.contratoLocacao.Fiador.Contatos.filter(
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
