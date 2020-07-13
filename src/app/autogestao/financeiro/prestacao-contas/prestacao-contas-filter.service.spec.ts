import { TestBed, inject } from '@angular/core/testing';

import { PrestacaoContasFilterService } from './prestacao-contas-filter.service';

describe('PrestacaoContasFilterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrestacaoContasFilterService]
    });
  });

  it('should be created', inject([PrestacaoContasFilterService], (service: PrestacaoContasFilterService) => {
    expect(service).toBeTruthy();
  }));
});
