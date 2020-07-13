import { TestBed, inject } from '@angular/core/testing';

import { ContratoAdministracaoService } from './contrato-administracao.service';

describe('ContratoAdministracaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContratoAdministracaoService]
    });
  });

  it('should be created', inject([ContratoAdministracaoService], (service: ContratoAdministracaoService) => {
    expect(service).toBeTruthy();
  }));
});
