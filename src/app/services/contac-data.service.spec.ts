import { TestBed } from '@angular/core/testing';

import { ContacDataService } from './contac-data.service';

describe('ContacDataService', () => {
  let service: ContacDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContacDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
