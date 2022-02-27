import { TestBed } from '@angular/core/testing';

import { HRAService } from './hra.service';

describe('HRAService', () => {
  let service: HRAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HRAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
