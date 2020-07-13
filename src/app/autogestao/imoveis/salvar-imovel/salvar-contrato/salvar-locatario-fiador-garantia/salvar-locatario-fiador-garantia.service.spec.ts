import { TestBed, inject } from '@angular/core/testing';

import { SalvarLocatarioFiadorGarantiaService } from './salvar-locatario-fiador-garantia.service';

describe('SalvarLocatarioFiadorGarantiaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalvarLocatarioFiadorGarantiaService]
    });
  });

  it('should be created', inject([SalvarLocatarioFiadorGarantiaService], (service: SalvarLocatarioFiadorGarantiaService) => {
    expect(service).toBeTruthy();
  }));
});
