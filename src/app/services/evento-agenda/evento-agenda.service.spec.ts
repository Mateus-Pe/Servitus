import { TestBed } from '@angular/core/testing';

import { EventoAgendaService } from './evento-agenda.service';

describe('EventoAgendaService', () => {
  let service: EventoAgendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventoAgendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
