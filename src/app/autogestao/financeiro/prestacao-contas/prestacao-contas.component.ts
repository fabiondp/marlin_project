import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ConvenioBancarioService } from '../convenio-bancario/convenio-bancario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'app/services/message.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import * as moment from 'moment';
import { PrestacaoContasService } from './prestacao-contas.service';
import { PrestacaoContasFilterService } from './prestacao-contas-filter.service';
import { NgForm } from '@angular/forms';
import { ModalComponent } from 'app/bootstrap/modal/modal.component';
import { forEach } from '@angular/router/src/utils/collection';
import { ModalEditarTaxaAdministracaoComponent } from '../modal-editar-taxa-administracao/modal-editar-taxa-administracao.component';

@Component({
  selector: 'app-prestacao-contas',
  templateUrl: './prestacao-contas.component.html',
  styleUrls: ['./prestacao-contas.component.scss']
})
export class PrestacaoContasComponent
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

  cobrancaEmAlteracaoDeTaxaAdministracao: any;

  @ViewChild('modalEditarTaxaAdministracao')
  modalEditarTaxaAdministracao: ModalEditarTaxaAdministracaoComponent;

  processandoEdicaoTaxaAdministracao: boolean;
  messagesProcessandoEdicaoTaxaAdministracao = [];


  constructor(
    private convenioBancarioService: ConvenioBancarioService,
    private prestacaoContasService: PrestacaoContasService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private localeService: BsLocaleService,
    private filtro: PrestacaoContasFilterService
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
        this.convenioBancario = data;

        this.isEdicaoConvenioBancario = true;
        this.carregandoPagina = false;
        this.buscaSobraConvenioBancarioConcluida = true;

        this.carregarFiltro();
        this.buscarImoveis();
      },
      error => {
        this.carregandoPagina = false;

        if (error.status !== 404) {
          this.carregandoPagina = false;
          this.buscaSobraConvenioBancarioConcluida = false;
          this.isEdicaoConvenioBancario = false;

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

    this.prestacaoContasService
      .getPrestacaoContasImoveis(this.filtro.serialize())
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
          // console.log('Buscar', this.prestacaoContas);
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
    this.prestacaoContasService.excluirLancamento(lancamento.Uid).subscribe(
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
    this.carregandoListagem = true;
    this.filtro.quantidadesDeItensPorPagina = e.qtdItensPorPagina;
    this.filtro.pagina = e.paginaCorrente;
    this.buscarImoveis();
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

  getListaImoveis() {
    this.prestacaoContasService.getListaImoveis().subscribe(
      response => {
        this.listaImoveis = response;
      },
      error => {
        this.listaImoveis = [];
      }
    );
  }

  getListaProprietarios() {
    this.prestacaoContasService.getListaProprietarios().subscribe(
      response => {
        this.listaProprietarios = response;
      },
      error => {
        this.listaProprietarios = [];
      }
    );
  }

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }
}
