import { TestBed } from '@angular/core/testing';

import { AddressWatcherService } from './address-watcher.service';

describe('AddressWatcherService', () => {
  let service: AddressWatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressWatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
