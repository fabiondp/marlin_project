import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {
  InformacoesBancarias,
  InformacoesBancariasTitular
} from './informacoes-bancarias';
import { Observable } from 'rxjs/Observable';
import { InformacoesBancariasService } from './informacoes-bancarias.service';
import { AuthService } from 'app/services/auth.service';
import { ModalComponent } from 'app/bootstrap/modal/modal.component';
import { Router } from '@angular/router';
import { AlertaConvenioBancarioService } from 'app/autogestao/alerta-convenio-bancario/alerta-convenio-bancario.service';

declare var $: any;

@Component({
  selector: 'app-informacoes-bancarias',
  templateUrl: './informacoes-bancarias.component.html',
  styleUrls: ['./informacoes-bancarias.component.scss']
})
export class InformacoesBancariasComponent implements OnInit, AfterViewInit {
  @ViewChild('modalConfirmacaoInformacoesBancarias')
  modalConfirmacaoInformacoesBancarias: ModalComponent;

  @ViewChild('modalInformacaoBancariaSalvaComSucesso')
  modalInformacaoBancariaSalvaComSucesso: ModalComponent;

  informacaoBancaria: InformacoesBancarias;
  opcoesDeBancos: any;
  carregandoFormulario: boolean;
  exibirFormulario: boolean;

  messageStatus: string;
  messages = null;

  flagPreencherDadosComInformacoesCadastrais: boolean;

  public maskCPF = [
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/
  ];
  public maskCNPJ = [
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '/',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/
  ];
  contaCaixa: string;

  constructor(
    private informacoesBancariasService: InformacoesBancariasService,
    private authService: AuthService,
    private router: Router,
    private alertaConvenioBancarioService: AlertaConvenioBancarioService
  ) {
    this.informacaoBancaria = new InformacoesBancarias();
    this.carregandoFormulario = true;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // tslint:disable-next-line:prefer-const
    let self = this;

    setTimeout(function() {
      self.carregarOpcoes();
    }, 500);
  }

 

  private carregarOpcoes() {
    window.scrollTo(0, 0);
    this.carregandoFormulario = true;
    this.messageStatus = 'Carregando...';
    this.messages = null;

    Observable.forkJoin([this.carregarBancos()]).subscribe(
      ([responseBancos]) => {
        this.obterInformacoesBancariasEmEdicao();
      },
      error => {
        this.carregandoFormulario = false;
        this.messages = [
          'Ocorreu um erro inesperado e não foi possível carregar as opçoes de formulário. Tente novamente mais tarde!'
        ];
        window.scrollTo(0, 0);
      }
    );
  }

  carregarBancos() {
    return this.informacoesBancariasService.getAllBancos().map(data => {
      this.informacaoBancaria.ContaBancaria.OpcoesBanco = data;
      return data;
    });
  }

  preencherDadosComInformacoesCadastrais() {
    if (this.flagPreencherDadosComInformacoesCadastrais) {
      this.informacaoBancaria.Titular.preencherDadosComInformacoesCadastrais(
        this.authService.user
      );
    } else {
      this.informacaoBancaria.Titular = new InformacoesBancariasTitular();
    }
  }

  setOperacaoConta(){
    if(this.informacaoBancaria.ContaBancaria.CodigoBanco == '104'){
      if(this.informacaoBancaria.Titular.TipoPessoa == 1){
        if(this.informacaoBancaria.ContaBancaria.TipoConta == 1){
          this.contaCaixa = this.informacaoBancaria.ContaBancaria.Conta;
          this.informacaoBancaria.ContaBancaria.Conta = '001' + this.informacaoBancaria.ContaBancaria.Conta;
        }
        if(this.informacaoBancaria.ContaBancaria.TipoConta == 2){
          this.contaCaixa = this.informacaoBancaria.ContaBancaria.Conta;
         this.informacaoBancaria.ContaBancaria.Conta = '013' + this.informacaoBancaria.ContaBancaria.Conta; 
        }
        if(this.informacaoBancaria.ContaBancaria.TipoConta == 3){
          this.contaCaixa = this.informacaoBancaria.ContaBancaria.Conta;
          this.informacaoBancaria.ContaBancaria.Conta = '002' + this.informacaoBancaria.ContaBancaria.Conta;
        }
      } else { 
        if(this.informacaoBancaria.ContaBancaria.TipoConta == 1){
          this.contaCaixa = this.informacaoBancaria.ContaBancaria.Conta;
          this.informacaoBancaria.ContaBancaria.Conta = '003' + this.informacaoBancaria.ContaBancaria.Conta;
        }
        if(this.informacaoBancaria.ContaBancaria.TipoConta == 2){
           this.contaCaixa = this.informacaoBancaria.ContaBancaria.Conta;
          this.informacaoBancaria.ContaBancaria.Conta = '022' + this.informacaoBancaria.ContaBancaria.Conta;
        }
      }
    }

    console.log('conta com operação', this.informacaoBancaria.ContaBancaria.Conta);
    
  }


  abrirModalDeConfirmacaoDeInformacoesBancarias() {
    this.setOperacaoConta();
    this.modalConfirmacaoInformacoesBancarias.open();
  
  }

  closeModalConfirmacaoInformacoesBancarias() {
    this.modalConfirmacaoInformacoesBancarias.close();
  }

  confirmarInformacoesBancarias(form?) {
    this.modalConfirmacaoInformacoesBancarias.close();
    this.salvarInformacoesBancarias(form);
  }

  salvarInformacoesBancarias(form?) {
    this.carregandoFormulario = true;
    this.exibirFormulario = false;
    this.messages = [];

    this.moverParaTopo();

    if (!this.informacaoBancaria.isEdicao()) {
      this.cadastrarInformacoesBancarias();
    } else {
      this.editarInformacoesBancarias();
    }
  }

  moverParaTopo() {
    $('html, body')
      .delay(500)
      .animate(
        {
          scrollTop: $('#topo-component-page').offset().top - 100
        },
        300
      );
  }

  cadastrarInformacoesBancarias() {
    this.messageStatus = 'Salvando...';

    // console.log(this.informacaoBancaria.Titular.CPFCNPJ.replace(/\D/g, ''));

    // console.log(this.informacaoBancaria.obterDadosParaEnvio());

    this.informacoesBancariasService
      .cadastrarConveniosBancarios(
        this.informacaoBancaria.obterDadosParaEnvio()
      )
      .subscribe(
        data => {
          this.carregandoFormulario = false;
          this.exibirFormulario = true;
          this.modalInformacaoBancariaSalvaComSucesso.open();
        },
        error => {
          this.messages = error;
          window.scrollTo(0, 0);
          this.exibirFormulario = true;
          this.carregandoFormulario = false;
        }
      );
  }

  editarInformacoesBancarias() {
    this.messageStatus = 'Salvando...';

    this.informacoesBancariasService
      .editarConveniosBancarios(this.informacaoBancaria.obterDadosParaEnvio())
      .subscribe(
        data => {
          this.carregandoFormulario = false;
          this.exibirFormulario = true;
          this.modalInformacaoBancariaSalvaComSucesso.open();
        },
        error => {
          this.messages = error;
          window.scrollTo(0, 0);
          this.exibirFormulario = true;
          this.carregandoFormulario = false;
        }
      );
  }

  closeModalInformacaoBancariaSalvaComSucesso() {
    this.modalInformacaoBancariaSalvaComSucesso.close();
    this.exibirFormulario = true;
    this.carregandoFormulario = false;
    this.router.navigate(['/autogestao', 'financeiro', 'prestacao-contas']);
    window.scrollTo(0, 0);
  }

  obterInformacoesBancariasEmEdicao() {
    this.carregandoFormulario = true;
    this.messageStatus = 'Carregando...';
    this.messages = null;

    this.verificarContaBancaria();
  }

  verificarContaBancaria() {
    this.alertaConvenioBancarioService
      .verificarAprovacaoConvenioBancario()
      .subscribe(
        response => {
          this.informacaoBancaria.map(response);
          this.carregandoFormulario = false;
          this.exibirFormulario = true;
          window.scrollTo(0, 0);
        },
        error => {
          this.carregandoFormulario = false;
          if (error.status === 404) {
            this.exibirFormulario = true;
          }
          window.scrollTo(0, 0);
        }
      );
  }
}
