import { TestBed } from '@angular/core/testing';

import { GetEventosPrincipalService } from './get-eventos-principal.service';

describe('GetEventosPrincipalService', () => {
  let service: GetEventosPrincipalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetEventosPrincipalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
