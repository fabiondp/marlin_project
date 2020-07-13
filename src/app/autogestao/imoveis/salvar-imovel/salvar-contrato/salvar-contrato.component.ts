import { DadosImovel } from './../salvar-dados-imovel/dados-imovel';
import { ModalComponent } from './../../../../bootstrap/modal/modal.component';
import { SalvarLocatarioFiadorGarantiaComponent } from './salvar-locatario-fiador-garantia/salvar-locatario-fiador-garantia.component';
import { Observable } from 'rxjs';

import {
    Component,
    OnInit,
    ViewChild,
    Input,
    Output,
    EventEmitter,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy,
    AfterContentInit
} from '@angular/core';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { moment } from 'ngx-bootstrap/chronos/test/chain';
import { DetalheImovelService } from '../../detalhe-imovel/detalhe-imovel.service';
// tslint:disable-next-line:max-line-length
import { SalvarDadosContratoComponent } from 'app/autogestao/imoveis/salvar-imovel/salvar-contrato/salvar-dados-contrato/salvar-dados-contrato.component';

import { DadosContratoLocacao } from 'app/autogestao/imoveis/salvar-imovel/salvar-contrato/salvar-dados-contrato/dados-contrato-locacao';
import { SessionStorageService } from 'app/services/session-storage.service';
import { LocatarioFiadorGarantia } from './salvar-locatario-fiador-garantia/locatario-fiador-garantia';

@Component({
    selector: 'app-salvar-contrato',
    templateUrl: './salvar-contrato.component.html',
    styleUrls: ['./salvar-contrato.component.scss']
})
export class SalvarContratoComponent implements OnInit, AfterViewInit {
    @ViewChild('tabContrato') tabContrato: TabsetComponent;

    @ViewChild('SalvarDadosContrato')
    tabSalvarDadosContratoComponent: SalvarDadosContratoComponent;

    @ViewChild('SalvarLocatarioFiadorGarantia')
    tabSalvarLocatarioFiadorGarantiaComponent: SalvarLocatarioFiadorGarantiaComponent;

    @Input() imovel: DadosImovel;

    @Output()
    voltarP: EventEmitter<any> = new EventEmitter<any>();

    tabCorrent: any;
    keyTabContratoCorrent = 'tabCorrentContrato';
    contrato: DadosContratoLocacao;

    contratoArquivado: DadosContratoLocacao;
    @ViewChild(ModalComponent)
    modalArquivarContrato: ModalComponent;

    disabledInitializer = false;

    messagesBuscaContrato = null;

    constructor(
        private sessionStorageService: SessionStorageService,
        private detalheImovelService: DetalheImovelService
    ) {
        this.imovel = new DadosImovel();
        this.contrato = new DadosContratoLocacao();
        this.tabCorrent = this.sessionStorageService.get(this.keyTabContratoCorrent)
            ? this.sessionStorageService.get(this.keyTabContratoCorrent)
            : 'tabDadosContrato';
    }

    ngOnInit() { }

    ngAfterViewInit() {
        // const self = this;
        // setTimeout(function() {
        //   self.selectTab(self.tabCorrent);
        // }, 100);
    }

    inicializar(atualizacaoContrato?: boolean) {
        const self = this;
        setTimeout(function () {
            self.contrato.UidImovel = self.imovel.Uid;
            self.obterContratoEmEdicao(atualizacaoContrato)
                .subscribe();
        }, 100);
    }

    obterContratoEmEdicao(atualizacaoContrato?: boolean) {
        return this.detalheImovelService
            .getDetailContrato(this.imovel.Uid)
            .map(response => {
                response.DataInicioVigencia = moment(
                    response.DataInicioVigencia
                ).format('DD-MM-YYYY');
                this.contrato.map(response);
                this.contrato.UidImovel = this.imovel.Uid;
                this.imovel.UidContrato = this.contrato.Uid;
                this.contrato.isNovoContrato = false;
                this.selectTab(this.tabCorrent);

                if (atualizacaoContrato === true) {
                    this.abrirModalNovoContrato(this.contrato);
                }

                return response;
            })
            .catch(error => {
                this.selectTab(this.tabCorrent);

                return Observable.throw(error);
            });
    }

    updateTabCurrent(data: TabDirective): void {
        if (data.id) {
            this.tabCorrent = data.id;
            this.sessionStorageService.set(
                this.keyTabContratoCorrent,
                this.tabCorrent
            );

            this.inicializarComponenteDaAbaSelecionada(data.id);
        }
    }

    selectTab(tab_id: string) {
        if (tab_id != null && tab_id !== 'null') {
            this.tabContrato.tabs.forEach((element, i) => {
                this.tabContrato.tabs[i].active = false;

                if (element.id === tab_id && (!element.disabled || this.habilitarLocatario())) {
                    this.tabContrato.tabs[i].disabled = false;
                    this.tabContrato.tabs[i].active = true;

                    this.inicializarComponenteDaAbaSelecionada(tab_id);

                    this.sessionStorageService.set(
                        this.keyTabContratoCorrent,
                        this.tabCorrent
                    );
                }
            });

            if (!this.tabContrato.tabs.some(t => t.active)) {
                this.tabContrato.tabs[0].active = true;
            }
        }
    }

    inicializarComponenteDaAbaSelecionada(tabId) {
        if (tabId === 'tabDadosContrato') {
            this.tabSalvarDadosContratoComponent.inicializarFormulario();
        } else if (tabId === 'tabDadosLocatario') {
            this.tabSalvarLocatarioFiadorGarantiaComponent.inicializarFormulario();
        }
    }

    voltar() {
        console.log('this.tabCorrent', this.tabCorrent);
        if (this.tabCorrent === "tabDadosContrato") {
            this._voltar();

        } else if (this.tabCorrent === 'tabDadosLocatario') {
            this.selectTab('tabDadosContrato');
        }

    }

    _voltar() {
        window.scrollTo(0, 0);
        this.voltarP.emit();
    }

    habilitarLocatario() {
        return (
            this.imovel &&
            this.imovel.Uid &&
            this.imovel.Uid !== '' &&
            this.imovel.Uid !== '00000000-0000-0000-0000-000000000000' &&
            this.imovel.UidContrato &&
            this.imovel.UidContrato !== '' &&
            this.imovel.UidContrato !== '00000000-0000-0000-0000-000000000000'
        );
    }

    cadastrarNovoContrato() {
        const uid = this.contratoArquivado.Uid;

        this.contrato.inicializarDados();
        this.modalArquivarContrato.close();
        // this.contrato.isNovoContrato = true;
        this.messagesBuscaContrato = null;
        this.contrato.UidInativar = uid;

        this.imovel.UidContrato = this.contrato.Uid;

        this.tabSalvarDadosContratoComponent.isNovoContrato = true;
        this.tabSalvarLocatarioFiadorGarantiaComponent.locatarioFiadorGarantia = new LocatarioFiadorGarantia();
        this.imovel.Locatario = null;

        this.selectTab('tabDadosContrato');
    }

    abrirModalNovoContrato(contrato) {
        this.contratoArquivado = contrato;
        this.modalArquivarContrato.open();
    }

    isEdicao() {
        return (this.contrato &&
            this.contrato.Uid &&
            this.contrato.Uid !== "" &&
            this.contrato.Uid !== "00000000-0000-0000-0000-000000000000");
    }

    continuar() {
        this.selectTab('tabDadosLocatario');
    }
}
