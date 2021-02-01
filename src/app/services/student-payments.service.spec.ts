import { TestBed } from '@angular/core/testing';

import { StudentPaymentsService } from './student-payments.service';

describe('StudentPaymentsService', () => {
  let service: StudentPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
