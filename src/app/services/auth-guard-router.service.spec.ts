import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardRouterService } from './auth-guard-router.service';

describe('AuthGuardRouterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardRouterService]
    });
  });

  it('should be created', inject([AuthGuardRouterService], (service: AuthGuardRouterService) => {
    expect(service).toBeTruthy();
  }));
});
