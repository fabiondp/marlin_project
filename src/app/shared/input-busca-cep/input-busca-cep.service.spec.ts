import { TestBed, inject } from '@angular/core/testing';

import { InputBuscaCepService } from './input-busca-cep.service';

describe('InputBuscaCepService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputBuscaCepService]
    });
  });

  it('should be created', inject([InputBuscaCepService], (service: InputBuscaCepService) => {
    expect(service).toBeTruthy();
  }));
});
