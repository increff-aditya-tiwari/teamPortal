import { TestBed } from '@angular/core/testing';

import { AppAdminGuard } from './app.admin.guard';

describe('AdminGuard', () => {
  let guard: AppAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AppAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
