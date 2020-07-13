import { TestBed, inject } from '@angular/core/testing';

import { ReajusteAluguelService } from './reajuste-aluguel.service';

describe('ReajusteAluguelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReajusteAluguelService]
    });
  });

  it('should be created', inject([ReajusteAluguelService], (service: ReajusteAluguelService) => {
    expect(service).toBeTruthy();
  }));
});
