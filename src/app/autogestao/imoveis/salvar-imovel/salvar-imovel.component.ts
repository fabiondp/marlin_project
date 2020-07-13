
import { SalvarDadosProprietarioComponent } from './salvar-dados-proprietario/salvar-dados-proprietario.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalvarImovelService } from './salvar-imovel.service';
import {
  TabsetComponent,
  TabDirective
} from '../../../../../node_modules/ngx-bootstrap/tabs';
import { SessionStorageService } from 'app/services/session-storage.service';
import { SalvarContratoComponent } from './salvar-contrato/salvar-contrato.component';
import { MessageService } from 'app/services/message.service';
import { DadosImovel } from './salvar-dados-imovel/dados-imovel';
import { DetalheImovelService } from '../detalhe-imovel/detalhe-imovel.service';
import { DadosProprietario } from './salvar-dados-proprietario/dados-proprietario';
import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'app-salvar-imovel',
  templateUrl: './salvar-imovel.component.html',
  styleUrls: ['./salvar-imovel.component.scss']
})
export class SalvarImovelComponent implements OnInit, AfterViewInit {
  @ViewChild('tabImovel') tabImovel: TabsetComponent;

  @ViewChild('SalvarDadosProprietarioComponent')
  tabSalvarDadosProprietarioComponent: SalvarDadosProprietarioComponent;

  @ViewChild('SalvarContratoAdministracaoComponent')
  tabSalvarContratoAdministracaoComponent: SalvarContratoComponent;

  @ViewChild('SalvarContratoLocacaoComponent')
  tabSalvarContratoLocacaoComponent: SalvarContratoComponent;

  imovel: DadosImovel;
  tabCorrent: any;
  keyTabCorrent = 'tabCorrentImovel';
  carregando: boolean;
  messages = null;
  typeMessage = null;
  dadosTaxas;

  constructor(
    private salvarImovelService: SalvarImovelService,
    private sessionStorageService: SessionStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private detalheImovelService: DetalheImovelService,
    private authService: AuthService
  ) {
    this.messageService.message = null;
    this.imovel = new DadosImovel();
    this.carregando = true;
  }

  ngOnInit() {
    if (this.route.snapshot.params.UidImovel) {
      this.imovel.Uid = this.route.snapshot.params.UidImovel;
      this.sessionStorageService.set(
        'autogestaoImovelEmEdicaoUid',
        this.route.snapshot.params.UidImovel
      );
    } else if (this.sessionStorageService.get('autogestaoImovelEmEdicaoUid')) {
      this.imovel.Uid = this.sessionStorageService.get(
        'autogestaoImovelEmEdicaoUid'
      );
    }

    this.tabCorrent = this.sessionStorageService.get(this.keyTabCorrent + this.imovel.Uid)
      ? this.sessionStorageService.get(this.keyTabCorrent + this.imovel.Uid)
      : 'tabDadosImovel';
  }

  ngAfterViewInit() {

    this.obterImovelEmEdicao().subscribe(
      (responseImovel) => {
        this.obterProprietarioEmEdicao()
          .subscribe(
            (response) => {
              this.carregarAbas();
              this.carregando = false;
            },
            (error) => {
              this.carregarAbas();
              this.carregando = false;
            }
          );
      },
      (error) => {
        this.carregarAbas();
        this.carregando = false;
      }
    );
  }

  carregarAbas() {
    const self = this;
    setTimeout(function () {
      if (self.isNovoProprietario()) {
        self.selectTab('tabDadosProprietario');
      } else if (self.isNovoContrato()) {
        self.selectTab('tabContratoLocacao');
      } else {
        self.selectTab(self.tabCorrent);
      }
    }, 100);
  }

  obterProprietarioEmEdicao() {
    return this.detalheImovelService
      .getDetailProprietario(this.imovel.Uid)
      .map(response => {
        const proprietario = new DadosProprietario();
        proprietario.map(response);
        proprietario.flagPreencherDadosComInformacoesCadastrais = proprietario.CPFCNPJ === this.authService.user.cpfcnpj;
        proprietario.EstaEmEdicao = true;

        this.imovel.Proprietario = proprietario;

        return response;
      });
  }

  obterImovelEmEdicao() {

    return this.detalheImovelService.getDetail(this.imovel.Uid).map(
      response => {
        this.imovel.map(response);

        this.dadosTaxas = response['Taxas'];

        if (!this.imovel.Enabled) {
          this.router.navigate([
            '/autogestao',
            'imoveis',
            this.imovel.Uid,
            'detalhe'
          ]);
        }
        return response;
      }
    );
  }

  updateTabCurrent(data: TabDirective): void {
    if (data.id) {
      this.tabCorrent = data.id;
      this.sessionStorageService.set(this.keyTabCorrent + this.imovel.Uid, this.tabCorrent);
      this.inicializarComponenteDaAbaSelecionada(data.id);
    }
  }

  selectTab(tab_id: string) {
    if (tab_id != null && tab_id !== 'null') {
      this.tabImovel.tabs.forEach((element, i) => {
        this.tabImovel.tabs[i].active = false;
        if (
          element.id === tab_id &&
          (!element.disabled || this.habilitarOutros())
        ) {
          this.tabImovel.tabs[i].disabled = false;
          this.tabImovel.tabs[i].active = true;
          // this.inicializarComponenteDaAbaSelecionada(tab_id);
          this.sessionStorageService.set(this.keyTabCorrent + this.imovel.Uid, this.tabCorrent);
        }
      });
      if (!this.tabImovel.tabs.some(t => t.active)) {
        this.tabImovel.tabs[0].active = true;
      }
    }
  }

  inicializarComponenteDaAbaSelecionada(tabId) {
    if (tabId === 'tabDadosProprietario') {
      this.tabSalvarDadosProprietarioComponent.inicializarFormulario(this.isNovoProprietario());
    } else if (tabId === 'tabContratoAdministracao') {
      this.tabSalvarContratoAdministracaoComponent.inicializar();
    } else if (tabId === 'tabContratoLocacao') {
      this.tabSalvarContratoLocacaoComponent.inicializar(this.isNovoContrato());
    }
  }

  public isEdicao() {
    return (
      this.route.snapshot.params.UidImovel &&
      this.route.snapshot.params.UidImovel !== '' &&
      this.route.snapshot.params.UidImovel !==
      '00000000-0000-0000-0000-000000000000'
    );
  }

  public habilitarProprietario() {
    return (
      this.imovel &&
      this.imovel.Uid &&
      this.imovel.Uid !== '' &&
      this.imovel.Uid !== '00000000-0000-0000-0000-000000000000'
    );
  }

  public habilitarContratos() {
    return (
      this.imovel &&
      this.imovel.Uid &&
      this.imovel.Uid !== '' &&
      this.imovel.Uid !== '00000000-0000-0000-0000-000000000000' &&
      (
        (
          this.imovel.Proprietario &&
          (
            this.imovel.Proprietario.Uid !== '00000000-0000-0000-0000-000000000000' ||
            (
              this.imovel.Proprietario.UidInativar &&
              this.imovel.Proprietario.UidInativar !== '00000000-0000-0000-0000-000000000000'
            )
          )
        ) ||
        (
          this.imovel.UidContrato &&
          this.imovel.UidContrato !== '00000000-0000-0000-0000-000000000000'
        )
      )
    );
  }

  public habilitarOutros() {
    return (
      this.imovel &&
      this.imovel.Uid &&
      this.imovel.Uid !== '' &&
      this.imovel.Uid !== '00000000-0000-0000-0000-000000000000'
    );
  }

  voltar() {
    if (this.tabCorrent === 'tabDadosImovel') {
      this.router.navigate(['/autogestao', 'imoveis']);
    } else if (this.tabCorrent === 'tabDadosProprietario') {
      this.selectTab('tabDadosImovel');
    } else if (this.tabCorrent === 'tabContratoAdministracao') {
      this.selectTab('tabDadosProprietario');
    } else if (this.tabCorrent === 'tabContratoLocacao') {
      this.selectTab('tabContratoAdministracao');
    }
  }

  continuar() {
    if (this.tabCorrent === 'tabDadosImovel') {
      this.selectTab('tabDadosProprietario');
    } else if (this.tabCorrent === 'tabDadosProprietario') {
      this.selectTab('tabContratoAdministracao');
    } else if (this.tabCorrent === 'tabContratoAdministracao') {
      this.selectTab('tabContratoLocacao');
    }
  }

  isNovoProprietario() {
    return this.route.snapshot.url.some(e => e.path === 'novoProprietario');
  }

  isNovoContrato() {
    return this.route.snapshot.url.some(e => e.path === 'novoContrato');
  }
}
