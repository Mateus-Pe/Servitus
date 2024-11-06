import { TestBed } from '@angular/core/testing';

import { PreLoteService } from './pre-lote.service';

describe('PreLoteService', () => {
  let service: PreLoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreLoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
