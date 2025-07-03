import { TestBed } from '@angular/core/testing';

import { MonumentServiceService } from './monument-service.service';

describe('MonumentServiceService', () => {
  let service: MonumentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonumentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
