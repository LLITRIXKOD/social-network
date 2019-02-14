import { TestBed, async, inject } from '@angular/core/testing';

import { AuthIsAdminGuard } from './auth-is-admin.guard';

describe('AuthIsAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthIsAdminGuard]
    });
  });

  it('should ...', inject([AuthIsAdminGuard], (guard: AuthIsAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
