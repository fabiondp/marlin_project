import { CobrancasService } from './../cobrancas.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'app/services/message.service';
import { ModalComponent } from 'app/bootstrap/modal/modal.component';
import { Location } from '@angular/common';
import { BsLocaleService, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-detalhe-cobranca',
  templateUrl: './detalhe-cobranca.component.html',
  styleUrls: ['./detalhe-cobranca.component.scss']
})
export class DetalheCobrancaComponent implements OnInit, AfterViewInit {
  @ViewChild('confimacaoGerarNovoBoleto')
  modalConfimacaoGerarNovoBoleto: ModalComponent;
  @ViewChild('sucessoGerarNovoBoleto')
  modalSucessoGerarNovoBoleto: ModalComponent;

  @ViewChild('reenviandoBoleto')
  modalReenviandoBoleto: ModalComponent;
  @ViewChild('resultadoReenvioBoleto')
  modalResultadoReenvioBoleto: ModalComponent;

  @ViewChild('modalGerandoNovoBoleto')
  modalGerandoNovoBoleto: ModalComponent;
  @ViewChild('modalResultadoGeracaoNovoBoleto')
  modalResultadoGeracaoNovoBoleto: ModalComponent;

  cobranca: any = {};
  carregando = true;
  messageStatus: string;
  messages = null;
  typeMessage = null;
  timeMessage = null;

  novoBoleto: any = {};

  gerandoNovoBoleto = false;

  messagensErroReenvioBoleto = null;
  messagensErroGeracaoNovoBoleto = null;

  bsConfig: Partial<BsDatepickerConfig>;

  minDate: Date;
  maxDate: Date;

  constructor(
    private cobrancasService: CobrancasService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private location: Location,
    private localeService: BsLocaleService
  ) {
    this.localeService.use('pt-br');
    this.bsConfig = Object.assign({}, { containerClass: 'theme-orange' });

    this.minDate = new Date();
    // this.maxDate = new Date();
    // this.maxDate.setDate(new Date(this.maxDate.getFullYear(), this.maxDate.getMonth() + 1, -1).getDate());
  }

  ngOnInit() {
    this.carregando = true;
    this.route.params.subscribe(params => {
      this.cobranca.Uid = params['UidCobranca'];
    });
  }

  ngAfterViewInit() {
    const self = this;
    setTimeout(function() {
      self.detalheCobranca();
    }, 800);
  }

  detalheCobranca() {
    this.cobrancasService.getCobrancaDetail(this.cobranca.Uid).subscribe(
      data => {
        this.cobranca = data;
        this.carregando = false;
        console.log('Resposta detalheCobranca:', data);
        this.cobranca.LancamentosBoleto = this.cobranca.NovoBoleto.UltimosLancamentos;
        this.obterValorTotalCobranca(this.cobranca);

        this.novoBoleto.CobrancaUid = this.cobranca.Uid;
        // this.novoBoleto.DataVencimento = this.cobranca.NovoBoleto.DataVencimentoNovoBoleto;
        this.novoBoleto.DataVencimento = moment(
          this.cobranca.NovoBoleto.DataVencimentoNovoBoleto
        ).format('DD-MM-YYYY');
        this.novoBoleto.Destinatario = this.cobranca.NovoBoleto.Destinatario;
      },
      error => {
        console.error('Mensagem de erro:', error);
        this.carregando = false;
      }
    );
  }

  exibirFormNovoLancamento(cobranca) {
    cobranca.NovoLancamento = {
      TipoLancamento: 1,
      DescricaoLancamento: '',
      ValorLancamento: null
    };
  }

  excluirCobrancaDesconto(cobranca, lancamento) {
    // cobranca.Lancamentos.splice(cobranca.Lancamentos.indexOf(lancamento), 1);
    cobranca.LancamentosBoleto.splice(
      cobranca.LancamentosBoleto.indexOf(lancamento),
      1
    );
  }

  obterValorTotalCobranca(cobranca) {
    // let resultado = cobranca.UltimoBoleto.ValorTotal;
    let resultado = cobranca.NovoBoleto.ValorAluguelAtual;

    if (cobranca.LancamentosBoleto != null) {
      cobranca.LancamentosBoleto.forEach(lancamento => {
        if (lancamento.TipoLancamento === 1) {
          resultado = resultado + lancamento.ValorLancamento;
        } else {
          resultado = resultado - lancamento.ValorLancamento;
        }
      });
    }

    return resultado;
  }

  abrirConfimarGerarNovoBoleto(cobranca) {
    this.novoBoleto.Lancamentos = cobranca.LancamentosBoleto;

    this.modalConfimacaoGerarNovoBoleto.open();
  }

  gerarNovoBoleto() {
    // this.novoBoleto.DataVencimento = this.novoBoleto.DataVencimentoFormatada;

    this.modalConfimacaoGerarNovoBoleto.close();
    this.modalGerandoNovoBoleto.open();
    this.messages = [];
    this.messagensErroGeracaoNovoBoleto = null;
    console.log('novaCobranca', this.novoBoleto);

    this.cobrancasService.gerarNovoBoleto(this.novoBoleto).subscribe(
      response => {
        this.novoBoleto = [];
        this.modalGerandoNovoBoleto.close();
        this.modalResultadoGeracaoNovoBoleto.openOnCloseAndReloadPage();
      },
      error => {
        this.messages = error;
        this.typeMessage = 'danger';

        this.messagensErroGeracaoNovoBoleto = error;
        this.modalGerandoNovoBoleto.close();
        this.modalResultadoGeracaoNovoBoleto.open();
      }
    );
  }

  acessarHistorico() {
    this.modalSucessoGerarNovoBoleto.close();
    this.router.navigate(['/autogestao', 'cobrancas', 'historico']);
  }

  goBack() {
    this.location.back();
  }

  reenviarBoleto(boleto) {
    this.messagensErroReenvioBoleto = null;
    this.modalReenviandoBoleto.open();

    this.cobrancasService.reenviarPorEmail(boleto['Uid']).subscribe(
      response => {
        this.modalReenviandoBoleto.close();
        this.modalResultadoReenvioBoleto.open();
      },
      error => {
        this.messages = error;
        this.typeMessage = 'danger';
        this.messagensErroReenvioBoleto = error;
        this.modalReenviandoBoleto.close();
        this.modalResultadoReenvioBoleto.open();
      }
    );
  }

  // getStatusBoleto(status) {
  //   switch (status) {
  //     case 'Pendente':
  //       return 'amarelo';
  //     case 'Parcialmente pago':
  //       return 'amarelo';
  //     case 'Em protesto':
  //       return 'amarelo';

  //     case 'Pago':
  //       return 'verde';

  //     case 'Expirado':
  //       return 'vermelho';
  //     case 'Cancelado':
  //       return 'vermelho';
  //     case 'Falha de pagamento':
  //       return 'vermelho';
  //     case 'Falha de emissão':
  //       return 'vermelho';

  //     case 'Em processo de emissão':
  //       return 'azul';
  //     case 'Reembolsado':
  //       return 'azul';
  //     case 'Autorizado':
  //       return 'azul';
  //     case 'AutorEstornadoizado':
  //       return 'azul';
  //   }
  // }

  // getStatusCobranca(status) {
  //   switch (status) {
  //     case 'Pago':
  //       return 'verde';
  //     case 'Aguardando pagamento':
  //       return 'azul';
  //     case 'Atrasado':
  //       return 'amarelo';
  //   }
  // }
}
