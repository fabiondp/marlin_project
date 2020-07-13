import { TestBed, inject } from '@angular/core/testing';

import { CobrancasService } from './cobrancas.service';

describe('CobrancasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CobrancasService]
    });
  });

  it('should be created', inject(
    [CobrancasService],
    (service: CobrancasService) => {
      expect(service).toBeTruthy();
    }
  ));
});
