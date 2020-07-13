import { TestBed, inject } from '@angular/core/testing';

import { BoletosService } from './boletos.service';

describe('BoletosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoletosService]
    });
  });

  it('should be created', inject([BoletosService], (service: BoletosService) => {
    expect(service).toBeTruthy();
  }));
});
