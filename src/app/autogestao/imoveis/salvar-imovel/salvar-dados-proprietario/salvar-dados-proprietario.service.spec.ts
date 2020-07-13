import { TestBed, inject } from '@angular/core/testing';

import { SalvarDadosProprietarioService } from './salvar-dados-proprietario.service';

describe('SalvarDadosProprietarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalvarDadosProprietarioService]
    });
  });

  it('should be created', inject([SalvarDadosProprietarioService], (service: SalvarDadosProprietarioService) => {
    expect(service).toBeTruthy();
  }));
});
