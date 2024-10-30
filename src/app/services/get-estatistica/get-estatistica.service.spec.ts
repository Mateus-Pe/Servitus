import { TestBed } from '@angular/core/testing';

import { GetEstatisticaService } from './get-estatistica.service';

describe('GetEstatisticaService', () => {
  let service: GetEstatisticaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetEstatisticaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
