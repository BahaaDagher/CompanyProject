import { TestBed } from '@angular/core/testing';

import { UsersAuthGuard } from './users-auth.guard';

describe('UsersAuthGuard', () => {
  let guard: UsersAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsersAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
