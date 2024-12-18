import { TestBed } from '@angular/core/testing';

import { GetEventoByAgendaIdService } from './get-evento-by-agenda-id.service';

describe('GetEventoByAgendaIdService', () => {
  let service: GetEventoByAgendaIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetEventoByAgendaIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
