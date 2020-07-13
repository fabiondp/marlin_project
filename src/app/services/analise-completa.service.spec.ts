import { TestBed, inject } from '@angular/core/testing';

import { AnaliseCompletaService } from './analise-completa.service';

describe('AnaliseCompletaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnaliseCompletaService]
    });
  });

  it('should be created', inject([AnaliseCompletaService], (service: AnaliseCompletaService) => {
    expect(service).toBeTruthy();
  }));
});
