import { LocalStorageService } from 'app/services/local-storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HistoricoCobrancasFilterService {
  pagina = 1;
  quantidadesDeItensPorPagina = 20;

  constructor(private localStorage: LocalStorageService) {
    this.updateFilter();
  }

  updateFilter() {
    this.pagina = 1;

    const filter = this.getFilter();

    if (filter) {
      Object.keys(filter).forEach(item => {
        if (
          item !== 'localStorage' &&
          (filter[item] || filter[item] !== null)
        ) {
          this[item] = filter[item];
        }
      });
    }
  }

  public getFilter(): HistoricoCobrancasFilterService {
    return this.localStorage.getObject('HistoricoCobrancasFilter');
  }

  public saveFilter(): HistoricoCobrancasFilterService {
    this.localStorage.setObject('HistoricoCobrancasFilter', this);

    return this;
  }

  public clearFilter() {
    this.localStorage.remove('HistoricoCobrancasFilter');
    this.pagina = 1;
  }
}
