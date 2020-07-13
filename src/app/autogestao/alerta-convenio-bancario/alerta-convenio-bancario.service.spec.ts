import { TestBed, inject } from '@angular/core/testing';

import { AlertaConvenioBancarioService } from './alerta-convenio-bancario.service';

describe('AlertaConvenioBancarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertaConvenioBancarioService]
    });
  });

  it('should be created', inject([AlertaConvenioBancarioService], (service: AlertaConvenioBancarioService) => {
    expect(service).toBeTruthy();
  }));
});
