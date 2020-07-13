import { DadosImovel } from './../salvar-dados-imovel/dados-imovel';
import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ContratoAdministracao } from './contrato-administracao';
import { ContratoAdministracaoService } from './contrato-administracao.service';
import { DadosProprietario } from '../salvar-dados-proprietario/dados-proprietario';
import { MensageError } from 'app/shared/menssage.error';

@Component({
  selector: 'app-salvar-contrato-administracao',
  templateUrl: './salvar-contrato-administracao.component.html',
  styleUrls: ['./salvar-contrato-administracao.component.scss']
})
export class SalvarContratoAdministracaoComponent implements OnInit, AfterViewInit {
  contratoAdministracao: ContratoAdministracao;
  opcoesDiaRemessa: any[];
  opcoesTipoTaxaAdministracao: any[];
  opcoesDias: any[];

  carregandoFormulario = true;
  messageStatus: string;
  messages = null;
  typeMessage = null;
  tooltip = {
    diaRemessa: '<strong>Dia para remessa</strong> é o dia do mês acordado com o proprietário para repassar o valor líquido referente ao imóvel locado.',
    taxaIntermediacao: 'A <strong>taxa de intermediação</strong> corresponde a comissão que será cobrada do proprietário, destinada a cobrir as despesas para concretizar a locação do imóvel.',
    taxaAdministracao: 'A <strong>taxa de intermediação</strong> corresponde a comissão que será cobrada do proprietário, destinada a cobrir as despesas para concretizar a locação do imóvel.'
  }

  @Input()
  imovel: DadosImovel;

  @Input()
  proprietario: DadosProprietario;

  @Output()
  continuar: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  voltar: EventEmitter<any> = new EventEmitter<any>();

  isDetail: boolean;

  constructor(
    private route: ActivatedRoute,
    private contratoAdministracaoService: ContratoAdministracaoService
  ) {
    this.isDetail = false;
    this.contratoAdministracao = new ContratoAdministracao();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.route.snapshot.url.some(u => u.path === "detalhe")) {
      this.isDetail = true;
      const instanciaDoComponente = this;
      setTimeout(function () {
        instanciaDoComponente.inicializar();
      }, 500);
    }
  }

  inicializar() {
    this.contratoAdministracao = new ContratoAdministracao();
    this.carregandoFormulario = true;
    this.messages = null;

    if (this.imovel) {
      this.contratoAdministracao.UidImovel = this.imovel.Uid;
    }

    this.carregarOpcoesDias();

    Observable.forkJoin([
      this.carregarOpcoesTipoTaxaAdministracao()
    ])
      .subscribe(
        (responseTiposTaxaAdministracao) => {
          this.obterContratoAdministracaoEmEdicao().subscribe(
            (response) => {
              this.carregandoFormulario = false;
              this.messages = null;
            },
            (error) => {
              this.contratoAdministracao.resetarDados();
              this.carregandoFormulario = false;
              this.messages = null;
            }
          );
        },
        (error) => {
          this.carregandoFormulario = false;
          this.messages = null;
        }
      );
  }

  carregarOpcoesTipoTaxaAdministracao() {
    return this.contratoAdministracaoService.getAllEnumTipoTaxaAdministracao().map(data => {
      this.opcoesTipoTaxaAdministracao = data;
      return data;
    });
  }

  carregarOpcoesDias() {
    this.opcoesDias = Array.from({ length: 30 }, (v, k) => {
      return {
        value: k + 1,
        selected: false
      };
    });
  }

  obterContratoAdministracaoEmEdicao() {
    return this.contratoAdministracaoService
      .getDetailContratoAdministracao(this.imovel.Uid)
      .map(response => {
        this.contratoAdministracao.map(response);
        return response;
      });
  }

  salvarContratoAdministracao(form) {
    window.scrollTo(0, 0);
    this.carregandoFormulario = true;
    this.messageStatus = 'Enviando dados...';
    this.messages = null;
    this.imovel.typeMessage = null;

    this.imovel.messages = null;

    if (!this.contratoAdministracao.isEdicao()) {
      this.cadastrarContratoAdministracao();
    } else {
      this.editarContratoAdministracao();
    }
  }


  cadastrarContratoAdministracao() {
    this.contratoAdministracaoService
      .cadastrarContratoAdministracao(this.contratoAdministracao.obterObjetoDeEnvio())
      .subscribe(
        response => {
          this.imovel.messages = ['Dados do contrato de administração salvos com sucesso!'];
          this.imovel.typeMessage = 'success';
          this.imovel.timeMessage = 5000;
          this.carregandoFormulario = false;
          this.contratoAdministracao.map(response);
          this.continuar.emit();
          window.scrollTo(0, 0);
        },
        error => {
          this.messages = MensageError.getMessagensError(error);
          this.typeMessage = 'danger';
          this.carregandoFormulario = false;
          window.scrollTo(0, 0);
        }
      );
  }

  editarContratoAdministracao() {
    this.contratoAdministracaoService
      .editarContratoAdministracao(this.contratoAdministracao.obterObjetoDeEnvio())
      .subscribe(
        response => {
          this.imovel.messages = ['Dados do contrato de administração salvos com sucesso!'];
          this.imovel.typeMessage = 'success';
          this.imovel.timeMessage = 5000;
          this.carregandoFormulario = false;
          this.contratoAdministracao.map(response);
          this.continuar.emit();
          window.scrollTo(0, 0);
        },
        error => {
          this.messages = MensageError.getMessagensError(error);
          this.typeMessage = 'danger';
          this.carregandoFormulario = false;
          window.scrollTo(0, 0);
        }
      );
  }

  alterarRegistrarInformacoes() {
    if (!this.contratoAdministracao.RegistrarInformacoes) {
      this.contratoAdministracao.resetarDados();
    }
  }

  _voltar() {
    window.scrollTo(0, 0);
    this.contratoAdministracao.resetarDados();
    this.voltar.emit();
  }
}
