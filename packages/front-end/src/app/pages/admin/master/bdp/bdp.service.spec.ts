import { TestBed } from '@angular/core/testing';

import { BdpService } from './bdp.service';

describe('BdpService', () => {
  let service: BdpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
