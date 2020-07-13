import { TestBed, inject } from '@angular/core/testing';

import { RelatorioContratoService } from './relatorio-contrato.service';

describe('RelatorioContratoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RelatorioContratoService]
    });
  });

  it('should be created', inject([RelatorioContratoService], (service: RelatorioContratoService) => {
    expect(service).toBeTruthy();
  }));
});
