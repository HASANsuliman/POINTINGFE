import { TestBed } from '@angular/core/testing';

import { CondetionalService } from './condetional.service';

describe('CondetionalService', () => {
  let service: CondetionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CondetionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
