import { TestBed } from '@angular/core/testing';

import { GetCitiesPdoService } from './get-cities-pdo.service';

describe('GetCitiesPdoService', () => {
  let service: GetCitiesPdoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCitiesPdoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
