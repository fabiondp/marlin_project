import { AlertaConvenioBancarioService } from './alerta-convenio-bancario.service';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-alerta-convenio-bancario',
  templateUrl: './alerta-convenio-bancario.component.html',
  styleUrls: ['./alerta-convenio-bancario.component.scss']
})
export class AlertaConvenioBancarioComponent implements OnInit, AfterViewInit {
  @Input()
  close = false;

  @Input()
  ocultarAlertaCadastro = false;
  exibirAlerta = false;

  exibirAlertaCadastroConvenioBancario = false;
  exibirAlertaVerifincandoConvenioBancario = false;
  exibirAlertaReprovadoConvenioBancario = false;
  exibirAlertaAtualizarCadastroConvenioBancario = false;

  messages = null;
  typeMessage = null;
  timeMessage = null;
  convenio: any;
  embreve = false;

  constructor(
    private alertaConvenioBancarioService: AlertaConvenioBancarioService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (
      this.authService.user.produtosContratados.some(p => p === 'AutoGestao')
    ) {
      this.AlertarCadastroConvenioBancario();
    }
  }

  ngAfterViewInit() {
    // const self = this;
    // setTimeout(function() {
    //   self.AlertarConvenioBancario();
    // }, 3000);
  }

  AlertarCadastroConvenioBancario() {
    this.alertaConvenioBancarioService
      .verificarCadastroConvenioBancario()
      .subscribe(
        response => {
          // console.log(response);
          this.exibirAlerta = true;
          this.exibirAlertaCadastroConvenioBancario = false;
          this.AlertarAprovacaoConvenioBancario();
        },
        error => {
          // console.log(error);
          this.exibirAlerta = true;
          this.exibirAlertaCadastroConvenioBancario = true;
        }
      );
  }

  AlertarAprovacaoConvenioBancario() {
    this.alertaConvenioBancarioService
      .verificarAprovacaoConvenioBancario()
      .subscribe(
        response => {
          this.exibirAlerta = true;
          this.convenio = response;
          // console.log(response);
          if (this.convenio.FoiVerificada === false) {
            this.exibirAlertaVerifincandoConvenioBancario = true;
          } else if (
            this.convenio.FoiVerificada === true &&
            this.convenio.PodeReceberPagamento === false
          ) {
            this.exibirAlertaReprovadoConvenioBancario = true;
          }
        },
        error => {
          this.messages = [
            'Ocorreu um erro inesperado e não foi possível verificar o status da sua cobrança bancária. Tente novamente mais tarde!'
          ];
          this.typeMessage = 'danger';
        }
      );
  }
}
