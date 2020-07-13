import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ConvenioBancarioService } from '../convenio-bancario/convenio-bancario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'app/services/message.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import * as moment from 'moment';
import { PrestacaoContasProprietariosFilterService } from './prestacao-contas-proprietarios-filter.service';
import { PrestacaoContasProprietariosService } from './prestacao-contas-proprietarios.service';

import { NgForm } from '@angular/forms';
import { ModalEditarTaxaAdministracaoComponent } from '../modal-editar-taxa-administracao/modal-editar-taxa-administracao.component';

@Component({
  selector: 'app-prestacao-contas-proprietarios',
  templateUrl: './prestacao-contas-proprietarios.component.html',
  styleUrls: ['./prestacao-contas-proprietarios.component.scss']
})
export class PrestacaoContasProprietariosComponent
  implements OnInit, AfterViewInit, OnDestroy {
  /**/
  isCollapsed = true;
  statusCollapse: string;

  /**/
  listagemPaginacaoLoadingShowing = false;
  qtdTotalDeItensEncontrados = 0;
  indicePrimeiroResultadoApresentado = 0;
  indiceUltimoResultadoApresentado = 0;

  listaImoveis: any;
  listaProprietarios: any;

  /**/

  embreve = false;

  convenioBancario = { Uid: '' };
  prestacaoContas: any;

  carregandoPagina = true;
  carregandoListagem = true;
  exibirListagem = false;

  messageStatus: string;
  messagesFinanceiro = null;
  messages = null;
  typeMessage = null;
  timeMessage = null;
  maxDate: any;
  buscaSobraConvenioBancarioConcluida: boolean;

  isEdicaoConvenioBancario = false;
  ordenacao = '1';

  lancamento = {
    Tipo: 1,
    Descricao: '',
    Valor: null
  };

  @ViewChild('modalEditarTaxaAdministracao')
  modalEditarTaxaAdministracao: ModalEditarTaxaAdministracaoComponent;

  // Variaveis para marcara
  public numberMask = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    requireDecimal: true
  });

  bsConfig: Partial<BsDatepickerConfig>;
  datepickerModel: Date;
  prestacaoContasService: any;

  constructor(
    private convenioBancarioService: ConvenioBancarioService,
    private prestacaoContasProprietariosService: PrestacaoContasProprietariosService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private localeService: BsLocaleService,
    private prestacaoContasProprietariosFilter: PrestacaoContasProprietariosFilterService,
    private filtro: PrestacaoContasProprietariosFilterService
  ) {
    this.messages = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
    this.timeMessage = this.messageService.timeMessage;

    this.localeService.use('pt-br');
    this.bsConfig = Object.assign(
      {},
      { dateInputFormat: 'MM/YYYY', containerClass: 'theme-orange' }
    );
  }

  abrirModalEditarTaxaAdministracao(_cobrancaEmEdicao) {
    this.modalEditarTaxaAdministracao.open(_cobrancaEmEdicao);
  }

  collapsed(): void {
    this.statusCollapse = '__is-close';
  }

  expanded(): void {
    this.statusCollapse = '__is-open';
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.messageService.message = null;
  }

  ngAfterViewInit() {
    this.buscarConvenioBancario();
  }

  buscarConvenioBancario() {
    this.carregandoPagina = true;
    this.messageStatus = 'Carregando...';
    this.messagesFinanceiro = null;

    this.convenioBancarioService.getConveniosBancarios().subscribe(
      data => {
        console.log('data', data);
        this.convenioBancario = data;
        this.isEdicaoConvenioBancario = true;
        this.buscaSobraConvenioBancarioConcluida = true;

        this.carregandoPagina = false;
        this.carregarFiltro();
        this.buscarImoveis();
      },
      error => {
        if (error.status !== 404) {
          this.carregandoPagina = false;
          this.messagesFinanceiro = [
            'Ocorreu um erro inesperado e não foi possível carregar as opçoes de formulário. Tente novamente mais tarde!'
          ];
          this.typeMessage = 'danger';
        } else {
          this.carregandoPagina = false;
          this.isEdicaoConvenioBancario = false;
        }

        this.buscaSobraConvenioBancarioConcluida = true;
        window.scrollTo(0, 0);
      }
    );
  }

  carregarFiltro(): any {
    this.getListaImoveis();
    this.getListaProprietarios();
  }

  buscarImoveis(filtroForm?: NgForm) {
    this.messageStatus = 'Carregando...';
    this.messages = null;

    // if (filtroForm && !filtroForm.valid) {
    //   return;
    // }

    // this.filtro.saveFilter();

    this.prestacaoContasProprietariosService
      .getPrestacaoContasProprietarios(this.filtro.serialize())
      .subscribe(
        data => {
          this.prestacaoContas = data.body;

          // console.log('data', data);

          /** pagination */
          this.qtdTotalDeItensEncontrados = Number(
            data.headers.get('X-Total-Found')
          );
          this.indicePrimeiroResultadoApresentado = Number(
            data.headers.get('X-Index-Start')
          );
          this.indiceUltimoResultadoApresentado = Number(
            data.headers.get('X-Index-End')
          );

          this.exibirListagem = true;
          this.carregandoListagem = false;
          // console.log('Buscar Proprietários', this.prestacaoContas);
        },
        error => {
          this.carregandoListagem = false;
          this.exibirListagem = false;
          window.scrollTo(0, 0);
          // this.messages = [
          //   'Ocorreu um erro inesperado e não foi possível carregar as opçoes de formulário. Tente novamente mais tarde!'
          // ];
          // this.typeMessage = 'danger';
        }
      );
  }

  exibirFormNovoLancamento(cobranca: any) {
    console.log(cobranca);
    cobranca.Lancamento = {
      TipoLancamento: 1,
      DescricaoLancamento: '',
      ValorLancamento: null
    };
  }

  excluirEntradaSaida(cobranca: any, lancamento: any) {
    this.prestacaoContasProprietariosService
      .excluirLancamento(lancamento.Uid)
      .subscribe(
        data => {
          cobranca.LancamentosPagarReceber = data.LancamentosPagarReceber;
          cobranca.Totais = data.Totais;
        },
        error => {
          if (error.error && Array.isArray(error.error)) {
            this.messages = error.error.map(el => el.Message);
          } else if (error.error && error.error.Message) {
            this.messages = [error.error.Message];
          } else {
            this.messages = Array.isArray(error) ? error : [error];
          }

          this.typeMessage = 'danger';
          window.scrollTo(0, 0);
          this.exibirListagem = true;
          this.carregandoPagina = false;
        }
      );
  }

  existePrestacaoContas() {
    return (
      this.prestacaoContas !== null &&
      this.prestacaoContas !== undefined &&
      Array.isArray(this.prestacaoContas) &&
      this.prestacaoContas.length > 0
    );
  }

  public paginar(e) {
    this.prestacaoContasProprietariosFilter.quantidadesDeItensPorPagina =
      e.qtdItensPorPagina;
    this.prestacaoContasProprietariosFilter.pagina = e.paginaCorrente;

    console.log(
      'paginar - quantidadesDeItensPorPagina, pagina = ',
      this.prestacaoContasProprietariosFilter.quantidadesDeItensPorPagina,
      this.prestacaoContasProprietariosFilter.pagina
    );
    this.buscarImoveis();
  }

  getListaImoveis() {
    this.prestacaoContasProprietariosService.getListaImoveis().subscribe(
      response => {
        this.listaImoveis = response;
      },
      error => {
        this.listaImoveis = [];
      }
    );
  }

  getListaProprietarios() {
    this.prestacaoContasProprietariosService.getListaProprietarios().subscribe(
      response => {
        this.listaProprietarios = response;
      },
      error => {
        this.listaProprietarios = [];
      }
    );
  }

  limparFiltro() {
    this.filtro.clearFilter();
    this.buscarImoveis();
  }

  public filtrar(filtroForm?: NgForm) {
    this.carregandoListagem = true;
    this.filtro.pagina = 1;
    this.qtdTotalDeItensEncontrados = 0;
    this.indicePrimeiroResultadoApresentado = 0;
    this.indiceUltimoResultadoApresentado = 0;

    this.buscarImoveis(filtroForm);
  }

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }
}
