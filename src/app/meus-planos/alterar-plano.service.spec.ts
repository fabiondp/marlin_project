import { TestBed, inject } from '@angular/core/testing';

import { AlterarPlanoService } from './alterar-plano.service';

describe('AlterarPlanoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlterarPlanoService]
    });
  });

  it('should be created', inject([AlterarPlanoService], (service: AlterarPlanoService) => {
    expect(service).toBeTruthy();
  }));
});
