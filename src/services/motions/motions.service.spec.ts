import { TestBed } from '@angular/core/testing';

import { MotionsService } from './motions.service';

describe('MotionsService', () => {
  let service: MotionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
