import { TestBed, inject } from '@angular/core/testing';

import { SalvarImovelService } from './salvar-imovel.service';

describe('SalvarImovelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalvarImovelService]
    });
  });

  it('should be created', inject([SalvarImovelService], (service: SalvarImovelService) => {
    expect(service).toBeTruthy();
  }));
});
