import { TestBed, inject } from '@angular/core/testing';

import { ModeloContratoService } from './modelo-contrato.service';

describe('ModeloContratoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModeloContratoService]
    });
  });

  it('should be created', inject([ModeloContratoService], (service: ModeloContratoService) => {
    expect(service).toBeTruthy();
  }));
});
