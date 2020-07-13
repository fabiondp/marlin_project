import { AuthService } from 'app/services/auth.service';
import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { AlterarPlanoService } from '../alterar-plano.service';
import { Router } from '@angular/router';
import { MessageService } from 'app/services/message.service';
import { ModalComponent } from 'app/bootstrap/modal/modal.component';
import { DesativarImoveisAutogestaoService } from './desativar-imoveis-autogestao.service';
import { LocalStorageService } from 'app/services/local-storage.service';

import * as moment from 'moment';

@Component({
  selector: 'app-desativar-imoveis-autogestao',
  templateUrl: './desativar-imoveis-autogestao.component.html',
  styleUrls: ['./desativar-imoveis-autogestao.component.scss']
})
export class DesativarImoveisAutogestaoComponent
  implements OnInit, AfterViewInit {
  @ViewChild('modalDasativacaoImoveis')
  modalDasativacaoImoveis: ModalComponent;

  @ViewChild('modalConfirmacaoDasativacaoImoveis')
  modalConfirmacaoDasativacaoImoveis: ModalComponent;

  @ViewChild('modalResultadoDasativacaoImoveis')
  modalResultadoDasativacaoImoveis: ModalComponent;

  messages = null;
  messageStatus: string;
  typeMessage = null;
  timeMessage = null;

  imoveis: any;
  imoveisMensalOpcoesDesativar: any;
  imoveisDesativado: any;
  grupoImoveisSelecionados: any[];
  desativandoImoveis: boolean;

  carregandoListagem = true;

  exibirListaImoveisDesativar = false;
  carregandoMensagem = null;
  imoveisParaDesativar: any;
  dataHoraUltimaVerificacao;

  constructor(
    private alterarPlanoService: AlterarPlanoService,
    private router: Router,
    private messageService: MessageService,
    public authService: AuthService,
    private desativarImoveisAutogestaoService: DesativarImoveisAutogestaoService,
    private localStorage: LocalStorageService
  ) {
    this.messageService.message = null;
    this.messages = this.messageService.message;
    this.typeMessage = this.messageService.typeMessage;
    this.timeMessage = this.messageService.timeMessage;
    this.dataHoraUltimaVerificacao = this.localStorage.getObject('dataHoraUltimaVerificacao');
  }

  ngOnInit() { }

  ngAfterViewInit() { }

  verificarImoveisParaDesativarAposDowngrade() {
    if (this.authService.check && (!this.dataHoraUltimaVerificacao || moment().diff(this.dataHoraUltimaVerificacao, 'minutes') >= 2)) {
      this.localStorage.setObject('dataHoraUltimaVerificacao', new Date());
      this.desativarImoveisAutogestaoService
        .getVerificarImoveisParaDesativarAposDowngrade()
        .subscribe(
          response => {
            this.imoveisParaDesativar = response;

            // mock
            // this.imoveisParaDesativar = {
            //   QuantidadeImoveisCadastrados: 0,
            //   QuantidadeImoveisContratados: 0,
            //   QuantidadeImoveisParaDesativar: 5,
            //   Mensagem: null,
            //   Bloquear: true
            // };

            if (this.imoveisParaDesativar.Bloquear) {
              this.modalDasativacaoImoveis.open();
              this.listarImoveisMensalDesativar();
            }
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
  }

  listarImoveisMensalDesativar() {
    if (this.authService.check) {
      this.carregandoListagem = true;
      this.carregandoMensagem = 'Carregando imóveis...';

      this.alterarPlanoService.getImoveisMensalOpcoesDesativar().subscribe(
        response => {
          this.imoveis = response;

          this.carregandoListagem = false;
          this.exibirListaImoveisDesativar = true;
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
      this.modalDasativacaoImoveis.close();
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

  naoDesativarImoveis() {
    this.modalDasativacaoImoveis.open();
    this.modalConfirmacaoDasativacaoImoveis.close();
  }

  desabilitarBotaoDesativar() {

    if (
      this.imoveisParaDesativar.QuantidadeImoveisParaDesativar > 0 &&
      this.imoveis &&
      this.imoveis.filter(i => {
        return i.Selected;
      }).length >= this.imoveisParaDesativar.QuantidadeImoveisParaDesativar
    ) {
      return false;
    }

    return true;
  }
}
