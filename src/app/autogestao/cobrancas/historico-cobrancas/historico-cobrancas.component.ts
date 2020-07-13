import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'app/services/message.service';
import { CobrancasService } from '../cobrancas.service';
import { AlertaConvenioBancarioService } from 'app/autogestao/alerta-convenio-bancario/alerta-convenio-bancario.service';
import { HistoricoCobrancasFilterService } from './historico-cobrancas-filter.service';

@Component({
  selector: 'app-historico-cobrancas',
  templateUrl: './historico-cobrancas.component.html',
  styleUrls: ['./historico-cobrancas.component.scss']
})
export class HistoricoCobrancasComponent implements OnInit, AfterViewInit {
  selectedAll: any;

  carregandoFormulario = true;
  exibirFormulario = false;
  messageStatus: string;
  messages = null;
  typeMessage = null;
  timeMessage = null;
  contaBancaria: any;
  contaBancariaOk = false;
  cobrancas: any;
  agrupamento = '1';

  /**/
  listagemPaginacaoLoadingShowing = false;
  qtdTotalDeItensEncontrados = 0;
  indicePrimeiroResultadoApresentado = 0;
  indiceUltimoResultadoApresentado = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private cobrancasService: CobrancasService,
    private alertaConvenioBancarioService: AlertaConvenioBancarioService,
    private cobrancaFilter: HistoricoCobrancasFilterService
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    // tslint:disable-next-line:prefer-const
    let self = this;

    setTimeout(function () {
      self.buscarCobrancas();
    }, 500);
  }

  buscarCobrancas() {
    this.carregandoFormulario = true;
    this.messageStatus = 'Carregando...';
    this.messages = null;

    this.cobrancaFilter.saveFilter();

    this.cobrancasService
      .getHistoricoCobrancas(
        this.agrupamento,
        this.cobrancaFilter.pagina,
        this.cobrancaFilter.quantidadesDeItensPorPagina
      )
      .subscribe(
        data => {
          this.cobrancas = data.body;
          this.exibirFormulario = true;
          this.carregandoFormulario = false;

          console.log('data', data);

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

          console.log(
            this.qtdTotalDeItensEncontrados,
            this.indicePrimeiroResultadoApresentado,
            this.indiceUltimoResultadoApresentado
          );
        },
        error => {
          this.carregandoFormulario = false;
          // this.messages = [
          //   'Ocorreu um erro inesperado e não foi possível carregar as opçoes de formulário. Tente novamente mais tarde!'
          // ];
          // this.typeMessage = 'danger';
          window.scrollTo(0, 0);
        }
      );
  }

  existeCobrancas() {
    return (
      this.cobrancas !== null &&
      this.cobrancas !== undefined &&
      Array.isArray(this.cobrancas) &&
      this.cobrancas.length > 0
    );
  }

  verificarContaBancaria() {
    this.carregandoFormulario = true;
    this.messageStatus = 'Carregando...';
    this.messages = null;

    this.alertaConvenioBancarioService
      .verificarAprovacaoConvenioBancario()
      .subscribe(
        response => {
          this.contaBancaria = response;

          if (this.contaBancaria.FoiVerificada === false) {
            this.contaBancariaOk = false;
            this.carregandoFormulario = false;
            this.exibirFormulario = true;
          } else {
            this.contaBancariaOk = true;
            this.buscarCobrancas();
          }

          console.log('Dados da contaBancaria:', this.contaBancaria);
        },
        error => {
          this.contaBancariaOk = false;
          this.carregandoFormulario = false;
          this.exibirFormulario = true;
          console.error('Mensagem de erro:', error);
        }
      );
  }

  getStatusCobranca(status) {
    switch (status) {
      case 'Pago':
        return 'verde';
      case 'Aguardando pagamento':
        return 'azul';
      case 'Atrasado':
        return 'amarelo';
    }
  }

  public paginar(e) {
    this.cobrancaFilter.quantidadesDeItensPorPagina = e.qtdItensPorPagina;
    this.cobrancaFilter.pagina = e.paginaCorrente;

    console.log(
      'paginar - quantidadesDeItensPorPagina, pagina = ',
      this.cobrancaFilter.quantidadesDeItensPorPagina,
      this.cobrancaFilter.pagina
    );
    this.buscarCobrancas();
  }

  agrupar(agrupamento) {
    if (agrupamento == 'imovel') {
      this.agrupamento = '2';
    } else {
      this.agrupamento = '1';
    }

    this.buscarCobrancas();
  }
}
