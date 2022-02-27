import { TestBed } from '@angular/core/testing';

import { LeaveReasonTypeService } from './leave-reason-type.service';

describe('LeaveReasonTypeService', () => {
  let service: LeaveReasonTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveReasonTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
