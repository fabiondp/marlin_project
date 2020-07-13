import { TestBed, inject } from '@angular/core/testing';

import { AdmnistracaoService } from './admnistracao.service';

describe('AdmnistracaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdmnistracaoService]
    });
  });

  it('should be created', inject([AdmnistracaoService], (service: AdmnistracaoService) => {
    expect(service).toBeTruthy();
  }));
});
