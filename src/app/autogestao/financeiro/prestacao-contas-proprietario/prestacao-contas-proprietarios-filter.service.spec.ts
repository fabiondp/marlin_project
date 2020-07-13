import { TestBed, inject } from '@angular/core/testing';

import { PrestacaoContasProprietariosFilterService } from './prestacao-contas-proprietarios-filter.service';

describe('PrestacaoContasProprietariosFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrestacaoContasProprietariosFilterService]
    });
  });

  it('should be created', inject(
    [PrestacaoContasProprietariosFilterService],
    (service: PrestacaoContasProprietariosFilterService) => {
      expect(service).toBeTruthy();
    }
  ));
});
