import { TestBed, inject } from '@angular/core/testing';

import { ConvenioBancarioService } from './convenio-bancario.service';

describe('ConvenioBancarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConvenioBancarioService]
    });
  });

  it('should be created', inject([ConvenioBancarioService], (service: ConvenioBancarioService) => {
    expect(service).toBeTruthy();
  }));
});
