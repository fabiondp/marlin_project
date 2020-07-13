import { LocalStorageService } from 'app/services/local-storage.service';
import { Observable } from 'rxjs/Observable';
import { DetalheImovelService } from '../../detalhe-imovel/detalhe-imovel.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { NgForm, ControlContainer } from '@angular/forms';
import { DadosImovel } from './dados-imovel';
import { SalvarImovelService } from '../salvar-imovel.service';
import { Endereco } from 'app/shared/input-busca-cep/endereco';
import { SessionStorageService } from 'app/services/session-storage.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { OpcaoViewModel } from 'app/shared/opcao-view-model';
import { AdministradoraCondominio } from './administradora-condominio';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { SeguradoraFogo } from './seguradora-fogo';

@Component({
  selector: 'app-salvar-dados-imovel',
  templateUrl: './salvar-dados-imovel.component.html',
  styleUrls: ['./salvar-dados-imovel.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class SalvarDadosImovelComponent implements OnInit, AfterViewInit {
  @Input() imovelCompleto: DadosImovel;
  @Input() dadosTaxas: DadosImovel;

  @Output() imovelCompletoChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() continuar: EventEmitter<any> = new EventEmitter<any>();

  @Output() voltar: EventEmitter<any> = new EventEmitter<any>();

  public carregandoEndereco: boolean;
  timeMessage;
  carregandoFormulario = true;
  exibirFormulario = false;
  messageStatus: string;
  enderecoValido = false;
  imovel: DadosImovel;
  messages = null;
  typeMessage = null;
  situacoes: Array<any> = [];
  representacoes: Array<any> = [];
  bloquearEdicaoDeEndereco: boolean;
  opcoesTipoTaxaImovel: OpcaoViewModel[] = [];

  opcoesAdmninistradorasCondominio: AdministradoraCondominio[];
  opcoesAdmninistradorasCondominioLoading = false;
  opcoesAdmninistradorasCondominioNoResults = false;

  opcoesSeguradorasFogo: SeguradoraFogo[];
  opcoesSeguradorasFogoLoading = false;
  opcoesSeguradorasFogoNoResults = false;

  public numberMask = createNumberMask({
    prefix: '',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: '.',
    allowDecimal: true,
    decimalSymbol: ',',
    requireDecimal: true
  });

  constructor(
    private salvarImovelService: SalvarImovelService,
    private route: ActivatedRoute,
    private router: Router,
    private datalheImovelService: DetalheImovelService,
    private sessionStorageService: SessionStorageService
  ) {
    this.imovel = new DadosImovel();
    this.imovel.TipoPlano = 2;
    this.opcoesAdmninistradorasCondominio = [];
  }

  ngOnInit() {
    if (this.route.snapshot.params.UidImovel) {
      this.imovel.Uid = this.route.snapshot.params.UidImovel;
    } else if (this.imovelCompleto.Uid) {
      this.imovel.Uid = this.imovelCompleto.Uid;
    }
  }

  ngAfterViewInit() {
    const self = this;
    setTimeout(function () {
      self.carregarOpcoes();
    }, 500);
  }

  private carregarOpcoes() {
    this.carregandoFormulario = true;
    this.messageStatus = 'Carregando...';
    this.messages = null;
    Observable.forkJoin([
      this.carregarOpcoesTipoCobrancaCondominio(),
      this.carregarOpcoesTipoTaxaImovel(),
      this.carregarOpcoesAdministrorasCondominio(),
      this.carregarOpcoesSeguradorasFogo()
    ]).subscribe(
      ([
        responseTiposCobranca,
        responseTipoTaxa,
        responseAdministradoras,
        responseSeguradorasFogo
      ]) => {
        if (this.isEdicao()) {
          // this.obterImovelEmEdicao();
          this.imovelCompleto.Taxas = this.imovel.Taxas;
          this.imovelCompleto.mapTaxas(this.dadosTaxas);         

          this.imovel = this.imovelCompleto;
         
          if (this.imovel.Endereco.possuiEndereco) {
            this.bloquearEdicaoDeEndereco = false;
          }

          if (!this.imovel.Enabled) {
            this.router.navigate([
              '/autogestao',
              'imoveis',
              this.imovel.Uid,
              'detalhe'
            ]);
          }
        }
        //  else {
        //   this.carregandoFormulario = false;
        //   this.exibirFormulario = true;
        // }

        this.carregandoFormulario = false;
        this.exibirFormulario = true;
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

  obterImovelEmEdicao() {
    this.carregandoFormulario = true;
    this.messageStatus = 'Carregando...';
    this.messages = null;
    this.datalheImovelService.getDetail(this.imovel.Uid).subscribe(
      response => {
        this.imovel.map(response);
        this.imovelCompleto.TipoPlano = this.imovel.TipoPlano;
        if (this.imovel.Endereco.possuiEndereco) {
          this.bloquearEdicaoDeEndereco = false;
        }

        if (!this.imovel.Enabled) {
          this.router.navigate([
            '/autogestao',
            'imoveis',
            this.imovel.Uid,
            'detalhe'
          ]);
        }

        this.carregandoFormulario = false;
        this.exibirFormulario = true;

        // this.imovelCompleto = this.imovel;
        // console.log('vai mudar');
        // this.imovelCompletoChange.emit(this.imovel);
      },
      error => {
        this.carregandoFormulario = false;
        this.messages = error;
        this.typeMessage = 'danger';
        window.scrollTo(0, 0);
      }
    );
  }

  imovelChange(e: any) {
    if (e !== null && e !== undefined) {
      this.imovel.Bloco = e.Bloco;
      this.imovel.TipoPlano = e.TipoPlano;
    }
  }

  carregarSituacoes() {
    return this.salvarImovelService.getAllEnumSituacaoImovel().map(data => {
      this.situacoes = data;
      return data;
    });
  }

  carregarOpcoesTipoCobrancaCondominio() {
    return this.salvarImovelService
      .getAllEnumTipoCobrancaCondominio()
      .map(data => {
        this.imovel.opcoesTipoCobrancaCondominio = data;
        return data;
      });
  }

  carregarOpcoesTipoTaxaImovel() {
    return this.salvarImovelService.getAllEnumTipoTaxaImovel().map(data => {
      // this.opcoesTipoTaxaImovel = data;
      this.imovel.carregarOpcoesTaxas(data);
      return data;
    });
  }

  carregarOpcoesAdministrorasCondominio() {
    return this.salvarImovelService
      .getAllOpcoesAdmnistradoraCondominio()
      .map(data => {
        if (data && data.length > 0) {
          this.opcoesAdmninistradorasCondominio = AdministradoraCondominio.mapList(
            data
          );
        } else {
          this.opcoesAdmninistradorasCondominio = [];
        }

        return data;
      });
  }

  carregarOpcoesSeguradorasFogo() {
    return this.salvarImovelService.getAllOpcoesSeguradoraFogo().map(data => {
      if (data && data.length > 0) {
        this.opcoesSeguradorasFogo = SeguradoraFogo.mapList(data);
      } else {
        this.opcoesSeguradorasFogo = [];
      }

      return data;
    });
  }

  selecionarAdministradoraCondominio(value: TypeaheadMatch) {
    this.imovel.AdministradoraCondominio = value.item;
  }

  selecionarSeguradoraFogo(value: TypeaheadMatch) {
    this.imovel.SeguradoraFogo = value.item;
  }

  alterarOpcoesAdmninistradorasCondominioLoading(e) {
    this.opcoesAdmninistradorasCondominioLoading = e;
  }

  alterarOpcoesAdmninistradorasCondominioNoResults(e: boolean): void {
    this.opcoesAdmninistradorasCondominioNoResults = e;
  }

  salvarDadosImovel(cadastroImovelForm: NgForm) {
    window.scrollTo(0, 0);
    this.carregandoFormulario = true;
    this.exibirFormulario = false;
    this.messageStatus = 'Enviando dados...';
    this.messages = null;
    this.imovelCompleto.messages = null;
    this.imovelCompleto.typeMessage = null;


    if (!this.isEdicao()) {
      this.cadastrarImovel();
    } else {
      this.editarImovel();
    }
  }

  cadastrarImovel() {
    this.salvarImovelService
      .salvarDadosImovel(this.imovel.obterObjetoDeEnvio())
      .subscribe(
        data => {
          window.scrollTo(0, 0);
          this.exibirFormulario = true;
          this.carregandoFormulario = false;
          this.imovelCompleto.Endereco = this.imovel.Endereco;
          this.imovelCompleto.messages = ['Dados do imóvel salvos com sucesso!'];
          this.imovelCompleto.typeMessage = 'success';
          this.imovelCompleto.timeMessage = 5000;

          if (data['Uid']) {
            this.imovel.Uid = data['Uid'];
            this.imovelCompleto.Uid = data['Uid'];
            this.sessionStorageService.set(
              'autogestaoImovelEmEdicaoUid',
              data['Uid']
            );
            this.continuar.emit();
          }
        },
        error => {
          this.messages = error;
          this.typeMessage = 'danger';
          window.scrollTo(0, 0);
          this.exibirFormulario = true;
          this.carregandoFormulario = false;
        }
      );
  }

  editarImovel() {
    this.salvarImovelService
      .atualizarDadosImovel(this.imovel.obterObjetoDeEnvio())
      .subscribe(
        data => {
          window.scrollTo(0, 0);
          this.exibirFormulario = true;
          this.carregandoFormulario = false;
          this.imovelCompleto.Endereco = this.imovel.Endereco;
          this.imovelCompleto.messages = ['Dados do imóvel salvos com sucesso!'];
          this.imovelCompleto.typeMessage = 'success';
          this.imovelCompleto.timeMessage = 5000;
          this.continuar.emit();
        },
        error => {
          this.messages = error;
          this.typeMessage = 'danger';
          window.scrollTo(0, 0);
          this.exibirFormulario = true;
          this.carregandoFormulario = false;
        }
      );
  }

  private isEdicao() {
    return (
      this.imovel &&
      this.imovel.Uid &&
      this.imovel.Uid !== '' &&
      this.imovel.Uid !== '00000000-0000-0000-0000-000000000000'
    );
  }
}
