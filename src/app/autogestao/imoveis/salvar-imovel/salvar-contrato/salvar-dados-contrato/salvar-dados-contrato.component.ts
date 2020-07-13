import { DadosImovel } from './../../salvar-dados-imovel/dados-imovel';
import { DetalheImovelService } from './../../../detalhe-imovel/detalhe-imovel.service';

import { SalvarDadosContratoService } from './salvar-dados-contrato.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
  ElementRef,
  Output,
  ComponentFactoryResolver,
  Input,
  EventEmitter
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { DadosContratoLocacao } from './dados-contrato-locacao';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { ModalComponent } from '../../../../../bootstrap/modal/modal.component';

@Component({
  selector: 'app-salvar-dados-contrato',
  templateUrl: './salvar-dados-contrato.component.html',
  styleUrls: ['./salvar-dados-contrato.component.scss']
})
export class SalvarDadosContratoComponent implements OnInit, AfterViewInit {
  @Input()
  imovel: DadosImovel;

  @Input()
  contratoLocacao: DadosContratoLocacao;

  @Output()
  contratoChange: EventEmitter<DadosContratoLocacao> = new EventEmitter<
    DadosContratoLocacao
  >();

  @Output()
  continuar: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  voltar: EventEmitter<any> = new EventEmitter<any>();

  carregandoFormulario = true;
  exibirFormulario = false;
  exibirCamposDoFormulario = false;
  maxDate = new Date();
  messageStatus: string;

  contratoArquivado: DadosContratoLocacao;
  messages = null;
  typeMessage = null;
  opcoesGarantia: any[];
  opcoesTipoRepresentacao: any[];
  opcoesFormaPagamento: any[];
  totalDias: any[];
  mesReajuste: any[];
  bsConfig: Partial<BsDatepickerConfig>;
  datepickerModel: Date;
  isNovoContrato = false;
  messagesBuscaContrato = null;

  tooltip = {
    collapseBonificacao: 'Vantagem apresentada por abatimento no aluguel. <br /> Ex: desconto no valor do aluguel, pois o imóvel precisa de pintura.'
  };

  filtro = {
    periodo: [
      new Date(
        moment()
          .subtract(1, 'months')
          .format()
      ),
      new Date(moment().format())
    ]
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

  public maskDate = [
    /[0-3]/,
    /\d/,
    '/',
    /[0-1]/,
    /[0-9]/,
    '/',
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salvarDadosContratoService: SalvarDadosContratoService,
    private detalheImovelService: DetalheImovelService,
    private localeService: BsLocaleService
  ) {
    this.contratoLocacao = new DadosContratoLocacao();
    this.localeService.use('pt-br');
    this.bsConfig = Object.assign({}, { containerClass: 'theme-orange' });
    this.imovel = new DadosImovel();
  }

  ngOnInit() { }

  ngAfterViewInit() {
    // const instanciaDoComponente = this;
    // setTimeout(function() {
    //   instanciaDoComponente.inicializarFormulario();
    // }, 500);
  }

  inicializarFormulario() {
    this.totalDias = Array.from({ length: 30 }, (v, k) => {
      return {
        value: k + 1,
        selected: false
      };
    });

    // this.mesReajuste = Array.from({ length: 12 }, (v, k) => k + 1);
    this.mesReajuste = [
      {
        value: 1,
        mes: 'Janeiro'
      },
      {
        value: 2,
        mes: 'Fevereiro'
      },
      {
        value: 3,
        mes: 'Março'
      },
      {
        value: 4,
        mes: 'Abril'
      },
      {
        value: 5,
        mes: 'Maio'
      },
      {
        value: 6,
        mes: 'Junho'
      },
      {
        value: 7,
        mes: 'Julho'
      },
      {
        value: 8,
        mes: 'Agosto'
      },
      {
        value: 9,
        mes: 'Setembro'
      },
      {
        value: 10,
        mes: 'Outubro'
      },
      {
        value: 11,
        mes: 'Novembro'
      },
      {
        value: 12,
        mes: 'Dezembro'
      }
    ];

    if (this.imovel.Uid) {
      this.contratoLocacao.UidImovel = this.imovel.Uid;
    } else {
      this.router.navigate(['/autogestao/imoveis/cadastrar']);
    }

    this.carregandoFormulario = true;
    this.messageStatus = 'Carregando...';
    this.messages = null;

    Observable.forkJoin([
      this.carregarOpcoesGarantia(),
      this.carregarOpcoesTipoRepresentacao(),
      this.carregarOpcoesFormaPagamento()
    ]).subscribe(
      ([
        responseOpcoesGarantia,
        responseOpcoesTipoRepresentacao,
        responseOpcoesFormaPagamento
      ]) => {
        if (!this.isNovoContrato) {
          this.obterContratoEmEdicao().subscribe(
            response => {
              this.carregandoFormulario = false;
              this.exibirFormulario = true;
              this.exibirCamposDoFormulario = true;
            },
            error => {
              if (error.status !== 404) {
                this.carregandoFormulario = false;
                this.messages = [
                  'Ocorreu um erro inesperado e não foi possível carregar as opções de formulário. Tente novamente mais tarde!'
                ];
                this.typeMessage = 'danger';
              } else {
                this.carregandoFormulario = false;
                this.exibirFormulario = true;
              }
              window.scrollTo(0, 0);
            }
          );
        } else {
          this.carregandoFormulario = false;
          this.exibirFormulario = true;
          this.exibirCamposDoFormulario = true;
        }
      },
      error => {
        this.carregandoFormulario = false;
        this.messages = [
          'Ocorreu um erro inesperado e não foi possível carregar as opções de formulário. Tente novamente mais tarde!'
        ];
        this.typeMessage = 'danger';
        window.scrollTo(0, 0);
      }
    );
  }

  carregarOpcoesGarantia() {
    return this.salvarDadosContratoService
      .getAllEnumGarantiaImovel()
      .map(data => {
        this.opcoesGarantia = data;
        return data;
      });
  }

  carregarOpcoesTipoRepresentacao() {
    return this.salvarDadosContratoService
      .getAllEnumTipoRepresentacao()
      .map(data => {
        this.opcoesTipoRepresentacao = data;
        return data;
      });
  }

  carregarOpcoesFormaPagamento() {
    return this.salvarDadosContratoService
      .getAllEnumFormaPagamento()
      .map(data => {
        this.opcoesFormaPagamento = data;
        return data;
      });
  }

  salvarDadosContrato(formCadastro) {
    window.scrollTo(0, 0);
    this.carregandoFormulario = true;
    this.exibirFormulario = false;
    this.messageStatus = 'Enviando dados...';
    this.messages = null;
    this.imovel.messages = null;
    this.imovel.typeMessage = null;

    if (!this.isEdicao()) {
      this.cadastrarDadosContrato();
    } else {
      this.atualizarDadosContrato();
    }
  }

  cadastrarDadosContrato() {
    this.salvarDadosContratoService
      .cadastrarDadosContrato(this.contratoLocacao.obterObjetoDeEnvio())
      .subscribe(
        response => {
          this.exibirFormulario = true;
          // this.messages = ['Contrato salvo com sucesso!'];
          // this.typeMessage = 'success';
          this.imovel.messages = ['Dados do contrato salvos com sucesso!'];
          this.imovel.typeMessage = 'success';
          this.imovel.timeMessage = 5000;

          this.carregandoFormulario = false;
          this.contratoLocacao.map(response);
          this.imovel.UidContrato = this.contratoLocacao.Uid;
          this.continuar.emit();
        },
        error => {
          this.messages = this.tratarRetornoDeError(error);
          this.typeMessage = 'danger';
          this.exibirFormulario = true;
          this.carregandoFormulario = false;
          window.scrollTo(0, 0);
        }
      );
  }

  atualizarDadosContrato() {
    this.contratoLocacao.mapReverse();
    this.salvarDadosContratoService
      .atualizarDadosContrato(this.contratoLocacao.obterObjetoDeEnvio())
      .subscribe(
        response => {
          this.contratoLocacao.map(this.contratoLocacao);
          this.exibirFormulario = true;
          // this.messages = ['Contrato salvo com sucesso!'];
          // this.typeMessage = 'success';
          this.imovel.messages = ['Dados do contrato salvos com sucesso!'];
          this.imovel.typeMessage = 'success';
          this.imovel.timeMessage = 5000;

          this.carregandoFormulario = false;
          this.continuar.emit();
        },
        error => {
          this.contratoLocacao.map(this.contratoLocacao);
          this.messages = this.tratarRetornoDeError(error);
          this.typeMessage = 'danger';
          this.exibirFormulario = true;
          this.carregandoFormulario = false;
          window.scrollTo(0, 0);
        }
      );
  }

  tratarRetornoDeError(error) {
    if (
      error &&
      error.error &&
      error.error.some(e => e.hasOwnProperty('Message'))
    ) {
      return error.error.map(e => e.Message);
    }
    return ['Ocorreu um erro inesperado! Tente novamente mais tarde'];
  }

  public isEdicao() {
    return (
      this.contratoLocacao &&
      this.contratoLocacao.Uid &&
      this.contratoLocacao.Uid !== '' &&
      this.contratoLocacao.Uid !== '00000000-0000-0000-0000-000000000000'
    );
  }

  obterContratoEmEdicao() {
    return this.detalheImovelService
      .getDetailContrato(this.contratoLocacao.UidImovel)
      .map(response => {
        this.contratoLocacao.map(response);
        this.isNovoContrato = false;
        this.contratoLocacao.UidImovel = this.imovel.Uid;
        this.imovel.UidContrato = this.contratoLocacao.Uid;
        this.contratoChange.emit(this.contratoLocacao);
        return response;
      });
  }

  bloquearEdicaoPlanoContratual() {
    return this.imovel.TipoPlano === 1;
  }

  _voltar() {
    window.scrollTo(0, 0);
    this.voltar.emit();
  }

  resetarMulta() {
    if (this.contratoLocacao.MultaSobreBoletoLocacao === false) {
      this.contratoLocacao.ValorPercentualMultaSobreBoletoLocacao = null;
    }
  }
}
