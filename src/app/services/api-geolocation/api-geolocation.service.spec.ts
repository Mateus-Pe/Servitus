import { TestBed } from '@angular/core/testing';

import { ApiGeolocationService } from './api-geolocation.service';

describe('ApiGeolocationService', () => {
  let service: ApiGeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
