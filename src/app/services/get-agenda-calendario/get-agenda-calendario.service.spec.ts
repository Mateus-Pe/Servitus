import { TestBed } from '@angular/core/testing';

import { GetAgendaCalendarioService } from './get-agenda-calendario.service';

describe('GetAgendaCalendarioService', () => {
  let service: GetAgendaCalendarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAgendaCalendarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
