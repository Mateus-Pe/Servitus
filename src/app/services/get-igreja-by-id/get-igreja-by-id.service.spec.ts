import { TestBed } from '@angular/core/testing';

import { GetIgrejaByIdService } from './get-igreja-by-id.service';

describe('GetIgrejaByIdService', () => {
  let service: GetIgrejaByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetIgrejaByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
