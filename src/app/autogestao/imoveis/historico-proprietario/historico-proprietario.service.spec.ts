import { TestBed, inject } from '@angular/core/testing';

import { HistoricoProprietarioService } from './historico-proprietario.service';

describe('HistoricoProprietarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoricoProprietarioService]
    });
  });

  it('should be created', inject([HistoricoProprietarioService], (service: HistoricoProprietarioService) => {
    expect(service).toBeTruthy();
  }));
});
