import { ModalComponent } from 'app/bootstrap/modal/modal.component';
import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  HostListener,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { CobrancasService } from './cobrancas.service';
import { AlertaConvenioBancarioService } from '../alerta-convenio-bancario/alerta-convenio-bancario.service';

@Component({
  selector: 'app-cobrancas',
  templateUrl: './cobrancas.component.html',
  styleUrls: ['./cobrancas.component.scss']
})
export class CobrancasComponent
  implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('confimacaoGerarCobranca')
  modalConfimacaoGerarCobranca: ModalComponent;
  @ViewChild(ModalComponent) modalSucessoGerarCobranca: ModalComponent;
  @ViewChild('content') content: ElementRef;

  embreve = false;

  selectedAll: any;
  contaBancaria: any;
  contaBancariaOk = false;

  carregandoFormulario = true;
  exibirFormulario = false;
  messageStatus: string;
  messages = null;
  typeMessage = null;
  timeMessage = null;
  cobrancas: any;

  agrupamento = '1';
  lancamentos = [];
  lancamento = {
    Tipo: 1,
    Descricao: '',
    Valor: null
  };
  gerandoCobrancas = false;

  grupoCobrancasSelectionadas = [];

  isFim = false;
  contentScrollHeight: any;

  // @HostListener('window:scroll', ['$event'])
  // checkScroll() {
  //   const componentPosition = this.el.nativeElement.offsetTop;

  //   const scrollPosition = window.pageYOffset;

  //   console.log('@HostListener', componentPosition, scrollPosition);

  //   console.log('this.contentScrollHeight', this.contentScrollHeight);

  //   if (scrollPosition >= this.contentScrollHeight) {
  //     this.isFim = true;
  //   } else {
  //     this.isFim = false;
  //   }
  // }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private cobrancasService: CobrancasService,
    private alertaConvenioBancarioService: AlertaConvenioBancarioService,
    public el: ElementRef
  ) {}

  ngAfterViewChecked() {
    // this.contentScrollHeight = this.content.nativeElement.scrollHeight - 600;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // tslint:disable-next-line:prefer-const
    let self = this;

    setTimeout(function() {
      self.verificarContaBancaria();
    }, 500);
  }

  buscarCobrancas() {
    this.carregandoFormulario = true;
    this.messageStatus = 'Carregando...';
    this.messages = null;

    this.cobrancasService.getCobrancas(this.agrupamento).subscribe(
      data => {
        this.cobrancas = data.ListaAgrupada;

        this.exibirFormulario = true;
        this.carregandoFormulario = false;
        // console.log('Resposta getCobrancas:', this.cobrancas);
      },
      error => {
        this.carregandoFormulario = false;
        this.messages = [
          'Ocorreu um erro inesperado e não foi possível carregar as opçoes de formulário. Tente novamente mais tarde!'
        ];
        this.typeMessage = 'danger';
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

  selectAll() {
    this.cobrancas.forEach(grupoData => {
      grupoData.Lista.forEach(itemImovel => {
        itemImovel.Selected = this.selectedAll;
      });
    });
  }

  checkIfAllSelected() {
    this.selectedAll = this.cobrancas.every(function(grupoData: any) {
      return grupoData.Lista.every(itemImovel => {
        return itemImovel.Selected;
      });
    });
  }

  excluirCobrancaDesconto(cobranca, lancamento) {
    cobranca.LancamentosBoleto.splice(
      cobranca.LancamentosBoleto.indexOf(lancamento),
      1
    );
  }

  exibirFormNovoLancamento(cobranca) {
    cobranca.NovoLancamento = {
      TipoLancamento: 1,
      DescricaoLancamento: '',
      ValorLancamento: null
    };
  }

  obterValorTotalCobranca(cobranca) {
    let resultado = cobranca.ValorTotal;

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

  abrirConfimarGeracaoCobranca() {
    this.messages = [];

    this.getCobrancasSelecionados();

    if (this.grupoCobrancasSelectionadas.length > 0) {
      this.modalConfimacaoGerarCobranca.open();
    } else {
      this.messages = ['Selecione uma cobrança para ser gerada!'];
      this.typeMessage = 'danger';
      window.scrollTo(0, 0);
    }
  }

  getCobrancasSelecionados() {
    this.grupoCobrancasSelectionadas = [];

    this.cobrancas.forEach(gc => {
      const listaCobrancas =
        gc.Lista.filter(c => {
          return c.Selected;
        }) || [];

      if (listaCobrancas.length > 0) {
        let gcTemp = {};

        Object.keys(gc).forEach(item => {
          if (gc[item] || gc[item] !== null) {
            gcTemp[item] = gc[item];
          }
        });

        gcTemp['Lista'] = listaCobrancas;

        this.grupoCobrancasSelectionadas.push(gcTemp);
      }
    });
  }

  gerarCobrancas(form) {
    this.modalConfimacaoGerarCobranca.close();
    this.modalSucessoGerarCobranca.open();
    this.messageStatus = 'Gerando cobranças...';
    this.messages = null;

    this.getCobrancasSelecionados();

    this.gerandoCobrancas = true;

    const objetoFormatadoParaEnvio = {
      ListaAgrupada: this.grupoCobrancasSelectionadas
    };

    this.cobrancasService.gerarCobrancas(objetoFormatadoParaEnvio).subscribe(
      response => {
        this.removerCobrancasGeradasDaLista();
        this.gerandoCobrancas = false;
      },
      error => {
        this.modalConfimacaoGerarCobranca.close();
        console.error('error', error);
        this.messages = error;
        this.typeMessage = 'danger';
        this.gerandoCobrancas = false;
      }
    );

    // this.router.navigate(['/autogestao', 'cobrancas', 'historico']);
  }

  removerCobrancasGeradasDaLista() {
    this.grupoCobrancasSelectionadas.forEach(gcs => {
      const grupoCobranca =
        this.cobrancas.filter(gc => gc.Agrupador === gcs.Agrupador) || [];

      if (grupoCobranca.length > 0 && gcs.Lista.length > 0) {
        gcs.Lista.forEach(cs => {
          grupoCobranca.forEach(gc => {
            const indexCobrancaSelecionada = gc.Lista.findIndex(
              c =>
                c.UidImovel === cs.UidImovel &&
                c.DataVencimento === cs.DataVencimento &&
                c.UidContrato === cs.UidContrato &&
                c.Selected
            );
            gc.Lista.splice(indexCobrancaSelecionada, 1);
          });
        });
      }
    });
  }

  acessarHistorico() {
    this.modalSucessoGerarCobranca.close();
    this.router.navigate(['/autogestao', 'cobrancas', 'historico']);
  }

  agrupar(agrupamento) {
    if (agrupamento === 'imovel') {
      this.agrupamento = '2';
    } else {
      this.agrupamento = '1';
    }

    this.buscarCobrancas();
  }
}
