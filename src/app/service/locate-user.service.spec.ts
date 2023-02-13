import { TestBed } from '@angular/core/testing';

import { LocateUserService } from './locate-user.service';

describe('LocateUserService', () => {
  let service: LocateUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocateUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
