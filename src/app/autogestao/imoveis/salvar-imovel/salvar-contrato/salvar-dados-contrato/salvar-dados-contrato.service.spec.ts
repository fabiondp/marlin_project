import { TestBed, inject } from '@angular/core/testing';

import { SalvarDadosContratoService } from './salvar-dados-contrato.service';

describe('SalvarDadosContratoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalvarDadosContratoService]
    });
  });

  it('should be created', inject([SalvarDadosContratoService], (service: SalvarDadosContratoService) => {
    expect(service).toBeTruthy();
  }));
});
