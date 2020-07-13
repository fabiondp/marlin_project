import { TestBed, inject } from '@angular/core/testing';

import { ImoveisService } from './imoveis.service';

describe('ImoveisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImoveisService]
    });
  });

  it('should be created', inject([ImoveisService], (service: ImoveisService) => {
    expect(service).toBeTruthy();
  }));
});
