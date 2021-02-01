import { TestBed } from '@angular/core/testing';

import { PaymentSchemeService } from './payment-scheme.service';

describe('PaymentSchemeService', () => {
  let service: PaymentSchemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentSchemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
