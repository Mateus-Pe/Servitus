import { TestBed } from '@angular/core/testing';

import { GetMatrizService } from './get-matriz.service';

describe('GetMatrizService', () => {
  let service: GetMatrizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMatrizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
