import { TestBed, inject } from '@angular/core/testing';

import { AnaliseCreditoService } from './analise-credito.service';

describe('AnaliseCreditoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnaliseCreditoService]
    });
  });

  it('should be created', inject([AnaliseCreditoService], (service: AnaliseCreditoService) => {
    expect(service).toBeTruthy();
  }));
});
