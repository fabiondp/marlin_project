import { TestBed, inject } from '@angular/core/testing';

import { PrestacaoContasService } from './prestacao-contas.service';

describe('PrestacaoContasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrestacaoContasService]
    });
  });

  it('should be created', inject(
    [PrestacaoContasService],
    (service: PrestacaoContasService) => {
      expect(service).toBeTruthy();
    }
  ));
});
