import { TestBed, inject } from '@angular/core/testing';

import { DesativarImoveisAutogestaoService } from './desativar-imoveis-autogestao.service';

describe('DesativarImoveisAutogestaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DesativarImoveisAutogestaoService]
    });
  });

  it('should be created', inject([DesativarImoveisAutogestaoService], (service: DesativarImoveisAutogestaoService) => {
    expect(service).toBeTruthy();
  }));
});
