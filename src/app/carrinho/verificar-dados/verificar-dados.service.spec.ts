import { TestBed, inject } from '@angular/core/testing';

import { VerificarDadosService } from './verificar-dados.service';

describe('VerificarDadosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerificarDadosService]
    });
  });

  it('should be created', inject([VerificarDadosService], (service: VerificarDadosService) => {
    expect(service).toBeTruthy();
  }));
});
