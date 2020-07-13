import { Injectable } from '@angular/core';
import { LocalStorageService } from 'app/services/local-storage.service';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import * as moment from 'moment';

@Injectable()
export class PrestacaoContasFilterService {
  pagina = 1;
  quantidadesDeItensPorPagina = 20;
  periodoMes: number;
  imovel = '';
  proprietario = '';
  competenciaInicial = '';
  competenciaFinal = '';
  diaRemessa?: number;
  opcoesDias: any[];
  isOutroPeriodo: boolean;


  constructor(
    private localStorage: LocalStorageService,
    private localeService: BsLocaleService
  ) {
    this.localeService.use('pt-br');
    this.diaRemessa = null;
    this.isOutroPeriodo = false;
    this.periodoMes = 1;
    this.carregarOpcoesDias();
    this.updateFilter();
  }

  updateFilter() {
    this.pagina = 1;
    this.periodoMes = 1;

    const filter = this.getFilter();
    // console.log('filter', filter);

    // if (filter) {
    //   Object.keys(filter).forEach(item => {
    //     if (
    //       item !== 'localStorage' &&
    //       (filter[item] || filter[item] !== null)
    //     ) {
    //       this[item] = filter[item];

    //       if (item === 'competenciaInicial') {
    //         console.log('competenciaInicial this[item]', this[item]);

    //         this[item] = moment(filter[item][], 'MM-YYYY').toDate();
    //       }

    //       if (item === 'competenciaFinal') {
    //         console.log('competenciaFinal this[item]', this[item]);
    //       }
    //     }
    //   });
    // }
  }


  carregarOpcoesDias() {
    this.opcoesDias = Array.from({ length: 30 }, (v, k) => {
      return {
        value: k + 1,
        selected: false
      };
    });
  }

  public getFilter(): PrestacaoContasFilterService {
    return this.localStorage.getObject('PrestacaoContasFilter');
  }

  public saveFilter(): PrestacaoContasFilterService {
    // this.localStorage.setObject('PrestacaoContasFilter', this);

    return this;
  }

  public clearFilter() {
    this.localStorage.remove('PrestacaoContasFilter');
    this.pagina = 1;
    this.periodoMes = 1;
    this.imovel = '';
    this.proprietario = '';
    this.competenciaInicial = '';
    this.competenciaFinal = '';
    this.diaRemessa = null;
    this.isOutroPeriodo = false;
  }

  public serialize(): any {
    const data: any = {};

    if (this.periodoMes) {
      data.periodoMes = this.periodoMes;
    }

    if (this.competenciaInicial) {
      data.competenciaInicial = moment(this.competenciaInicial).format(
        'MM/YYYY'
      );
    }

    if (this.competenciaFinal) {
      data.competenciaFinal = moment(this.competenciaFinal).format('MM/YYYY');
    }

    if (data.competenciaInicial || data.competenciaFinal) {
      data.periodoMes = null;
    }

    if (this.imovel) {
      data.idImovel = this.imovel;
    }

    if (this.proprietario) {
      data.idProprietario = this.proprietario;
    }

    if (this.pagina !== null) {
      data.page = this.pagina;
    }

    if (this.quantidadesDeItensPorPagina !== null) {
      data.pagesize = this.quantidadesDeItensPorPagina;
    }

    if (this.diaRemessa) {
      data.diaRemessa = this.diaRemessa;
    }

    return data;
  }
}
