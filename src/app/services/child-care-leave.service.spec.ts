import { TestBed } from '@angular/core/testing';

import { ChildCareLeaveService } from './child-care-leave.service';

describe('ChildCareLeaveService', () => {
  let service: ChildCareLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildCareLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
