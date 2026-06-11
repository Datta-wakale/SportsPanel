import { TestBed } from '@angular/core/testing';

import { Sportsservice } from './sportsservice';

describe('Sportsservice', () => {
  let service: Sportsservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sportsservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
