import { TestBed, inject } from '@angular/core/testing';

import { PaginacaoService } from './paginacao.service';

describe('PaginationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginacaoService]
    });
  });

  it('should be created', inject(
    [PaginacaoService],
    (service: PaginacaoService) => {
      expect(service).toBeTruthy();
    }
  ));
});
