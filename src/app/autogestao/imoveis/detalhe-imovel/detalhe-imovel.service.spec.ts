import { TestBed, inject } from '@angular/core/testing';

import { DetalheImovelService } from './detalhe-imovel.service';

describe('DetalheImovelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetalheImovelService]
    });
  });

  it('should be created', inject([DetalheImovelService], (service: DetalheImovelService) => {
    expect(service).toBeTruthy();
  }));
});
