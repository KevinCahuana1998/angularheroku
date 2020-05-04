import { TestBed, async, inject } from '@angular/core/testing';

import { NoIdentityGuard } from './no-identity.guard';

describe('NoIdentityGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoIdentityGuard]
    });
  });

  it('should ...', inject([NoIdentityGuard], (guard: NoIdentityGuard) => {
    expect(guard).toBeTruthy();
  }));
});
