import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { superAdminGuardGuard } from './super-admin-guard.guard';

describe('superAdminGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => superAdminGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
