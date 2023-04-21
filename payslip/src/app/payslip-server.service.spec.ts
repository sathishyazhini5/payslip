import { TestBed } from '@angular/core/testing';

import { PayslipServerService } from './payslip-server.service';

describe('PayslipServerService', () => {
  let service: PayslipServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayslipServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
