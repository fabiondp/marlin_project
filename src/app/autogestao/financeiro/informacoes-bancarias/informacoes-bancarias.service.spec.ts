import { TestBed, inject } from '@angular/core/testing';

import { InformacoesBancariasService } from './informacoes-bancarias.service';

describe('InformacoesBancariasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InformacoesBancariasService]
    });
  });

  it('should be created', inject([InformacoesBancariasService], (service: InformacoesBancariasService) => {
    expect(service).toBeTruthy();
  }));
});
