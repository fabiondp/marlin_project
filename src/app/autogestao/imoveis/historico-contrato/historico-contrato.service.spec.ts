import { TestBed, inject } from '@angular/core/testing';

import { HistoricoContratoService } from './historico-contrato.service';

describe('HistoricoContratoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoricoContratoService]
    });
  });

  it('should be created', inject([HistoricoContratoService], (service: HistoricoContratoService) => {
    expect(service).toBeTruthy();
  }));
});
