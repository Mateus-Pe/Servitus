import { TestBed } from '@angular/core/testing';

import { GetAgendaByIdService } from './get-agenda-by-id.service';

describe('GetAgendaByIdService', () => {
  let service: GetAgendaByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAgendaByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
