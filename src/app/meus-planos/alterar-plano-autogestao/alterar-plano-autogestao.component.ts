import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AlterarPlanoService } from '../alterar-plano.service';
import { Router } from '@angular/router';
import { ModalComponent } from '../../bootstrap/modal/modal.component';
import { MessageService } from 'app/services/message.service';

@Component({
  selector: 'app-alterar-plano-autogestao',
  templateUrl: './alterar-plano-autogestao.component.html',
  styleUrls: ['./alterar-plano-autogestao.component.scss']
})
export class AlterarPlanoAutogestaoComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  @ViewChild('modalConfirmacaoAlteracaoPlano')
  modalConfirmacaoAlteracaoPlano: ModalComponent;

  @ViewChild('modalConfirmacaoDasativacaoImoveis')
  modalConfirmacaoDasativacaoImoveis: ModalComponent;

  @ViewChild('modalResultadoDasativacaoImoveis')
  modalResultadoDasativacaoImoveis: ModalComponent;

  @ViewChild('modalMensagemAlteracaoPlano')
  modalMensagemAlteracaoPlano: ModalComponent;
  @ViewChild('modalErroAlteracaoPlano')
  modalErroAlteracaoPlano: ModalComponent;

  carregandoListagem = true;
  exibirListaPlanos = false;
  exibirListaImoveisDesativar = false;
  carregandoMensagem = null;

  planos: any;

  messages = null;
  messageStatus: string;
  typeMessage = null;
  timeMessage = null;
  closeMessage = null;

  UidPlanoNovo: string;
  UidPlanoAtual: string;
  planoAtual: any;
  novoPlano: any;
  planoSimulado: any;
  imoveis: any;
  imoveisDesativado: any;
  grupoImoveisSelecionados: any[];
  desativandoImoveis: boolean;

  planoTermoDeUso = null;
  @ViewChild('modalTermoDeUso')
  modalTermoDeUso: ModalComponent;

  planoContrato = null;
  @ViewChild('modalContratoPlano')
  modalContratoPlano: ModalComponent;

  constructor(
    private alterarPlanoService: AlterarPlanoService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.messageService.message = null;
    this.messages = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
    this.timeMessage = this.messageService.timeMessage;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // tslint:disable-next-line:prefer-const
    let self = this;
    setTimeout(function() {
      self.listarPlanos();
    }, 500);
  }

  listarPlanos() {
    this.carregandoListagem = true;

    this.alterarPlanoService
      .getOpcoesMigracaoPlanosAutogestaoMensal()
      .subscribe(
        response => {
          this.planos = response;
          this.carregandoListagem = false;
          this.exibirListaPlanos = true;

          const planoAtual = this.planos.find(p => p.PlanoAtual === true);
          this.UidPlanoAtual = planoAtual.Uid;
          this.UidPlanoNovo = planoAtual.Uid;

          this.planoAtual = planoAtual;
        },
        error => {
          this.carregandoListagem = false;
          window.scrollTo(0, 0);
          if (error.error && Array.isArray(error.error)) {
            this.messages = error.error.map(el => el.Message);
            this.typeMessage = 'danger';
            this.carregandoListagem = false;
          } else if (error.error && error.error.Message) {
            this.messages = [error.error.Message];

            this.typeMessage = 'danger';
            this.carregandoListagem = false;
          } else {
            this.messages = Array.isArray(error) ? error : [error];
            this.typeMessage = 'danger';
            this.carregandoListagem = false;
          }

          this.typeMessage = 'danger';
        }
      );
  }

  simularAlteracaoPlano(UidNovoPlano) {
    window.scrollTo(0, 0);

    this.carregandoListagem = true;
    this.carregandoMensagem = 'Simulando troca de plano...';
    this.messages = null;
    // this.exibirListaImoveisDesativar = false;
    this.exibirListaPlanos = false;

    this.alterarPlanoService
      .getSimularAlteracaoPlanoAutogestaoMensal(
        UidNovoPlano,
        this.novoPlano.TermoContratoAceito
      )
      .subscribe(
        response => {
          this.carregandoListagem = false;

          this.planoSimulado = response;
          this.TipoAlteracaoPlanoDescricao =
            response.TipoAlteracaoPlanoDescricao;

          this.DataInicioVigenciaAlteracao =
            response.DataInicioVigenciaAlteracao;

          this.DataInicioCobrancaAlteracao =
            response.DataInicioCobrancaAlteracao;

          this.TipoAlteracaoPlano = response.TipoAlteracaoPlano;

          this.ValorCobrancaProximaCompetencia =
            response.ValorCobrancaProximaCompetencia;

          this.exibirListaPlanos = true;

          this.modalConfirmacaoAlteracaoPlano.open();
        },
        error => {
          this.carregandoListagem = false;
          window.scrollTo(0, 0);
          if (error.error && Array.isArray(error.error)) {
            this.messages = error.error.map(el => el.Message);
            this.codes = error.error.map(el => el.Code);

            this.typeMessage = 'danger';
            this.carregandoListagem = false;
            this.alterandoPlano = false;
            this.modalErroAlteracaoPlano.open();

            // const erroAlterarPlano = error.error.find(
            //   e => e.Code === 'PlanoJaAlteradoNaCompetenciaAtual'
            // );

            // if (erroAlterarPlano.Code === 'PlanoJaAlteradoNaCompetenciaAtual' || erroAlterarPlano.Code === 'FaturaPlanoAtualNaoFoiCriada') {

            // if (erroAlterarPlano.Code === 'PlanoJaAlteradoNaCompetenciaAtual') {
            //   console.log('this.messages', this.messages);
            //   this.alterandoPlano = false;

            //   this.cancelarConfirmacaoAlteracaoPlano();
            //   this.modalErroAlteracaoPlano.open();
            // }
          } else if (error.error && error.error.Message) {
            this.messages = [error.error.Message];

            this.typeMessage = 'danger';
            this.carregandoListagem = false;
          } else {
            this.messages = Array.isArray(error) ? error : [error];
            this.typeMessage = 'danger';
            this.carregandoListagem = false;
          }
          this.typeMessage = 'danger';
        }
      );
  }

  cancelarAlteracaoPlano() {
    this.router.navigate(['/meus-planos']);
  }

  abrirModalConfirmacaoAlteracao(planoAtual, UidNovoPlano) {
    this.novoPlano = this.planos.find(p => p.Uid === UidNovoPlano);

    this.modalConfirmacaoAlteracao.open();
  }

  acessarMeusPlanos() {
    this.router.navigate(['/meus-planos']);
  }

  confirmarAlteracaoPlano() {
    this.alterandoPlano = true;
    this.messageStatus = 'Alterando o plano...';

    this.modalConfirmacaoAlteracaoPlano.close();
    this.modalMensagemAlteracaoPlano.open();

    this.alterarPlanoService
      .postAlterarPlanoAutogestaoMensal(
        this.UidPlanoNovo,
        this.novoPlano.TermoContratoAceito
      )
      .subscribe(
        response => {
          this.alterandoPlano = false;
          this.messages = null;
          this.dataProximaCompetencia = response;
        },
        error => {
          this.alterandoPlano = false;
          window.scrollTo(0, 0);
          if (error.error && Array.isArray(error.error)) {
            this.messages = error.error.map(el => el.Message);
            this.typeMessage = 'danger';
          } else if (error.error && error.error.Message) {
            this.messages = [error.error.Message];

            this.typeMessage = 'danger';
          } else {
            this.messages = Array.isArray(error) ? error : [error];
            this.typeMessage = 'danger';
          }

          this.typeMessage = 'danger';
        }
      );
  }

  cancelarConfirmacaoAlteracaoPlano() {
    this.exibirListaPlanos = true;
    this.UidPlanoNovo = this.planoAtual.Uid;
    this.planos.forEach(element => {
      element.TermoContratoAceito = false;
    });
  }

  listarImoveisMensalDesativar() {
    this.carregandoListagem = true;
    this.carregandoMensagem = 'Carregando imóveis...';

    this.alterarPlanoService.getImoveisMensalOpcoesDesativar().subscribe(
      response => {
        this.imoveis = response;
        this.carregandoListagem = false;

        this.exibirListaImoveisDesativar = true;
        this.exibirListaPlanos = false;
      },
      error => {
        this.carregandoListagem = false;
        window.scrollTo(0, 0);
        if (error.error && Array.isArray(error.error)) {
          this.messages = error.error.map(el => el.Message);
          this.typeMessage = 'danger';
          this.carregandoListagem = false;
        } else if (error.error && error.error.Message) {
          this.messages = [error.error.Message];

          this.typeMessage = 'danger';
          this.carregandoListagem = false;
        } else {
          this.messages = Array.isArray(error) ? error : [error];
          this.typeMessage = 'danger';
          this.carregandoListagem = false;
        }

        this.typeMessage = 'danger';
      }
    );
  }

  desativarImoveis() {
    this.modalConfirmacaoDasativacaoImoveis.close();
    this.modalResultadoDasativacaoImoveis.open();

    this.desativandoImoveis = true;
    this.messageStatus = 'Desativando imóveis...';
    this.messages = null;

    this.getImoveisSelecionados();

    const uidsImoveis = this.grupoImoveisSelecionados.map(i => {
      return i.Uid;
    });

    this.alterarPlanoService
      .deleteImoveisMensalDesativar(uidsImoveis)
      .subscribe(
        response => {
          this.desativandoImoveis = false;
          this.messages = null;
          this.simularAlteracaoPlano(this.UidPlanoNovo);
          this.modalResultadoDasativacaoImoveis.close();
        },
        error => {
          this.desativandoImoveis = false;
          window.scrollTo(0, 0);
          if (error.error && Array.isArray(error.error)) {
            this.messages = error.error.map(el => el.Message);
            this.typeMessage = 'danger';
            this.carregandoListagem = false;
          } else if (error.error && error.error.Message) {
            this.messages = [error.error.Message];

            this.typeMessage = 'danger';
            this.desativandoImoveis = false;
          } else {
            this.messages = Array.isArray(error) ? error : [error];
            this.typeMessage = 'danger';
            this.desativandoImoveis = false;
          }

          this.typeMessage = 'danger';
        }
      );
  }

  abrirConfimarDasativacaoImoveis() {
    this.messages = [];

    this.getImoveisSelecionados();

    if (this.grupoImoveisSelecionados.length > 0) {
      this.modalConfirmacaoDasativacaoImoveis.open();
    } else {
      this.messages = ['Selecione um imóvel para continuar!'];
      this.typeMessage = 'danger';
      window.scrollTo(0, 0);
    }
  }

  getImoveisSelecionados() {
    this.grupoImoveisSelecionados = [];

    this.grupoImoveisSelecionados = this.imoveis.filter(i => {
      return i.Selected;
    });
  }

  obterPlanoSelecionado(UidNovoPlano) {
    return this.planos.find(p => p.Uid === UidNovoPlano);
  }

  atualizarPlanoSelecionado(UidNovoPlano) {
    this.novoPlano = this.planos.find(p => p.Uid === UidNovoPlano);
  }

  abrirModalTermoDeUso(plano) {
    this.planoTermoDeUso = plano;
    this.modalTermoDeUso.open();
  }

  fecharModalTermoDeUso() {
    this.modalTermoDeUso.close();
    this.planoTermoDeUso = null;
  }

  abrirModalContratoPlano(plano) {
    /* DINAMICO - Cadastrado na área Administrativa */
    this.planoContrato = plano;
    this.modalContratoPlano.open();
  }

  fecharModalContratoPlano() {
    this.modalContratoPlano.close();
    this.planoContrato = null;
  }
}
