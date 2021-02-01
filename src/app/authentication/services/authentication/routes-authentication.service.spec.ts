import { TestBed } from '@angular/core/testing';

import { RoutesAuthenticationService } from './routes-authentication.service';

describe('RoutesAuthenticationService', () => {
  let service: RoutesAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutesAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
