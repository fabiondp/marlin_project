import { TestBed, inject } from '@angular/core/testing';

import { PrestacaoContasProprietariosService } from './prestacao-contas-proprietarios.service';

describe('PrestacaoContasProprietariosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrestacaoContasProprietariosService]
    });
  });

  it('should be created', inject(
    [PrestacaoContasProprietariosService],
    (service: PrestacaoContasProprietariosService) => {
      expect(service).toBeTruthy();
    }
  ));
});
