import { ProdutoService } from './../services/produto.service';
import { CarrinhoService } from './../carrinho/carrinho/carrinho.service';
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  AfterViewInit
} from '@angular/core';
import { AnuncioService } from '../services/anuncio.service';
import { MessageService } from '../services/message.service';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { LocacaoService } from '../services/locacao.service';
import { JoyrideService } from 'ngx-joyride';
import { environment } from 'environments/environment';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  hideTitle = null;

  enableAnaliseDeCredito: boolean;
  enableAutoGestaoDeLocacao: boolean;

  anuncios = null;
  totalAnunciosDisponiveis = null;
  anunciosIlimitados = false;
  clientId = 1;
  carregandoAnuncios = false;
  notificacoes: any = [];
  qtdAnuncio = 5;

  message = null;
  typeMessage = null;
  timeMessage = null;
  planoDegustacaoAnuncio: any;

  solicitouFatura = false;
  erroSolicitarFatura = false;
  erroFaturaPendente = false;
  solicitandoFatura = false;

  autogestao: {
    imoveis: any;
    totalImoveisDisponiveis: number;
    carregandoLocacao: boolean;
  };

  // notificacoes: any = [
  //   {
  //     Mensagens: '1 O plano Paradigma Globalizado 23 vencerá no dia 29/06/2018.'
  //   },
  //   {
  //     Mensagens: '2 O plano Paradigma Globalizado 23 vencerá no dia 29/06/2018.'
  //   },
  //   {
  //     Mensagens: '3 O plano Paradigma Globalizado 23 vencerá no dia 29/06/2018.'
  //   }
  // ];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  constructor(
    private anuncioService: AnuncioService,
    private messageService: MessageService,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private locacaoService: LocacaoService,
    private readonly joyrideService: JoyrideService,
    private produtoService: ProdutoService
  ) {
    this.enableAnaliseDeCredito = environment.enableAnaliseDeCredito;
    this.enableAutoGestaoDeLocacao = environment.enableAutoGestaoDeLocacao;

    this.messageService.message = null;
    this.message = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
    this.timeMessage = this.messageService.timeMessage;
    this.autogestao = {
      imoveis: null,
      totalImoveisDisponiveis: 0,
      carregandoLocacao: false   
    };

    this.solicitouFatura = this.authService.user.solicitouFatura;
  }

  iniciarTutorial() {
    // this.joyrideService.startTour(
    //   {
    //     steps: [
    //       'step1@dashboard',
    //       'step2@dashboard',
    //       'step3@anuncios/cadastrar',
    //       'step4@anuncios/cadastrar'
    //     ]
    //   } // Your steps order
    // );

    let options = {
      steps: [
        'step1@dashboard',
        'step2@dashboard',
        'step3@dashboard',
        'step4@dashboard',
        'step5@dashboard'
      ],
      showPrevButton: false
    };

    this.joyrideService.startTour(options).subscribe(
      step => { },
      e => { },
      () => {
        // this.stepDone();
      }
    );
  }

  onNext(e) {
    // e.preventDefault();
  }

  onPrev() { }

  ngAfterViewInit() {
    // this.iniciarTutorial();
  }

  ngOnInit() {
    this.getNotificacoes();
    this.getAnuncios();
  
    if (this.enableAutoGestaoDeLocacao) {
      this.getLocacao();
    }

    this.produtoService.getDegustacaoProdutoAnuncio().subscribe(
      (planoDegustacaoAnuncio) => {
        this.planoDegustacaoAnuncio = planoDegustacaoAnuncio;
      }
    );
  }

  ngOnChanges() {
    // this.getNotificacoes();
    // this.getAnuncios();
    // this.getLocacao();
  }

  getAnuncios() {
    this.carregandoAnuncios = true;

    this.anuncioService.getAllHomeByClienteId().subscribe(
      data => {
        this.anuncios = data.Anuncios;
        this.totalAnunciosDisponiveis = data.TotalAnunciosDisponiveis;
        this.carregandoAnuncios = false;
        this.anunciosIlimitados = data.AnunciosIlimitado;

        this.authService.atualizarContratoDeAnuncio(data);
      },
      error => {
        this.carregandoAnuncios = false;

        if (Array.isArray(error.error)) {
          this.message = error.error.map(el => el.Message);
        } else if (typeof error === 'object') {
          this.message = [error.error.Message];
        } else if (typeof error === 'string') {
          this.message = [error];
        } else {
          this.message = ['Erro inesperado.'];
        }

        this.typeMessage = 'danger';

        window.scrollTo(0, 0);
      }
    );
  }

  getNotificacoes() {
    this.usuarioService.getNotificacoes().subscribe(
      data => {
        this.notificacoes = data;

        // this.carregando = false;
        //        this.iniciarTutorial();
      },
      error => {
        // this.carregando = false;
        if (Array.isArray(error.error)) {
          this.message = error.error.map(el => el.Message);
        } else if (typeof error === 'object') {
          this.message = [error.error.Message];
        } else if (typeof error === 'string') {
          this.message = [error];
        } else {
          this.message = ['Erro inesperado.'];
        }

        this.typeMessage = 'danger';
        //this.iniciarTutorial();

        window.scrollTo(0, 0);
      }
    );
  }

  getLocacao() {
    if (this.enableAutoGestaoDeLocacao) {
      this.autogestao.carregandoLocacao = true;

      this.locacaoService.getAllHomeByClienteId().subscribe(
        data => {
          this.autogestao.imoveis = data.Imoveis;
          this.autogestao.totalImoveisDisponiveis = data.TotalImoveisDisponiveis;
          this.autogestao.carregandoLocacao = false;
          this.authService.atualizarContratoDeAutogestao(data);
        },
        error => {
          this.autogestao.carregandoLocacao = false;

          if (Array.isArray(error.error)) {
            this.message = error.error.map(el => el.Message);
          } else if (typeof error === 'object') {
            this.message = [error.error.Message];
          } else if (typeof error === 'string') {
            this.message = [error];
          } else {
            this.message = ['Erro inesperado.'];
          }

          this.typeMessage = 'danger';

          window.scrollTo(0, 0);
        }
      );
    }
  }

  possuiPlanoAnuncioAtivo() {
    return this.possuiAnuncios() || this.possuiAnunciosDisponiveis();
  }

  possuiAnuncios() {
    return this.anuncios && this.anuncios.length;
  }

  possuiAnunciosDisponiveis() {
    return (this.totalAnunciosDisponiveis && this.totalAnunciosDisponiveis > 0) || this.anunciosIlimitados;
  }

  possuiMaisDeUmProdutoAtivo() {
    return this.possuiPlanoAnuncioAtivo() && this.possuiPlanoLocacaoAtivo();
  }

  possuiPlanoLocacaoAtivo() {
    // return false;
    // return (
    //   this.enableAutoGestaoDeLocacao &&
    //   (this.possuiImoveisDeAutogestaoDeLocacao() ||
    //     this.possuiImoveisDisponiveisParaAutogestaoDeLocacao())
    // );

    return (
      this.enableAutoGestaoDeLocacao && this.authService.user.produtosContratados.some(p => p === "AutoGestao")
    );
  }

  possuiImoveisDisponiveisParaAutogestaoDeLocacao() {
    return (
      this.autogestao.totalImoveisDisponiveis &&
      this.autogestao.totalImoveisDisponiveis > 0
    );
  }

  possuiImoveisDeAutogestaoDeLocacao() {
    return this.autogestao.imoveis && this.autogestao.imoveis.length > 0;
  }

  getTitleImovelAutogestaoContratual(imovel) {
    let output = '';

    if (imovel.EnderecoCadastrado) {
      if (imovel.Logradouro) {
        output += imovel.Logradouro;
      }

      if (imovel.Numero) {
        output += `, ${imovel.Numero}`;
      }

      if (imovel.Complemento) {
        output += ` - ${imovel.Complemento}`;
      }

      if (imovel.Cidade) {
        output += ` - ${imovel.Cidade}`;
      }
    } else {
      output += '';
    }

    return output;
  }

  onSubmitRegulariza(regularizaForm: NgForm) {
    this.solicitandoFatura = true;
    this.message = '';

    this.usuarioService.reativarAssinatura().subscribe(
      data => {
        console.log('teste reativar');

        //this.message = ['Sua fatura foi enviada por e-mail.'];      
        //this.typeMessage = 'info';

        this.authService.atualizarSolicitacaoFatura(true);
        this.solicitouFatura = true;
        this.erroSolicitarFatura = false;
        this.solicitandoFatura = false;
      },
      error => {
        this.solicitandoFatura = false;
        if (Array.isArray(error.error)) {
          this.message = error.error.map(el => el.Message);
        } else if (typeof error === 'object') {
          this.message = [error.error.Message];
        } else if (typeof error === 'string') {
          this.message = [error];
        } else {
          this.message = ['Erro inesperado.'];
        }

        this.solicitouFatura = false;
        this.erroSolicitarFatura = true;

        this.typeMessage = 'danger';
        //this.iniciarTutorial();

        window.scrollTo(0, 0);
      }
    );
  }

  onSubmitVerificarPagamento(verificaPagamentoForm: NgForm) {   
    this.authService.atualizarDadosDoUsuario();

    this.erroFaturaPendente = this.authService.user.inadimplente;
    this.authService.atualizarSolicitacaoFatura(true);
    this.solicitouFatura = true;

    console.log("testando informa pagamento", this.erroFaturaPendente);
  }

  onSubmitReenviarFatura(reenviarFaturaForm: NgForm) {   
    this.solicitandoFatura = true;
    this.message = '';

    this.usuarioService.reenviarFatura().subscribe(
      data => {
        console.log('reenviar fatura');

        this.message = ['Sua fatura foi reenviada por e-mail.'];      
        this.typeMessage = 'info'; 

        this.authService.atualizarSolicitacaoFatura(true);
        this.solicitouFatura = true;

        this.erroSolicitarFatura = false;
        this.solicitandoFatura = false;
      },
      error => {
        this.solicitandoFatura = false;
        if (Array.isArray(error.error)) {
          this.message = error.error.map(el => el.Message);
        } else if (typeof error === 'object') {
          this.message = [error.error.Message];
        } else if (typeof error === 'string') {
          this.message = [error];
        } else {
          this.message = ['Erro inesperado.'];
        }

        this.solicitouFatura = false;
        this.erroSolicitarFatura = true;

        this.typeMessage = 'danger';
        //this.iniciarTutorial();

        window.scrollTo(0, 0);
      }
    );
  }






}
