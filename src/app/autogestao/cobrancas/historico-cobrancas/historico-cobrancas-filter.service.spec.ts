import { TestBed, inject } from '@angular/core/testing';

import { HistoricoCobrancasFilterService } from './historico-cobrancas-filter.service';

describe('HistoricoCobrancasFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoricoCobrancasFilterService]
    });
  });

  it('should be created', inject([HistoricoCobrancasFilterService], (service: HistoricoCobrancasFilterService) => {
    expect(service).toBeTruthy();
  }));
});
