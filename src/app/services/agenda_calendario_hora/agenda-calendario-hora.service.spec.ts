import { TestBed } from '@angular/core/testing';

import { AgendaCalendarioHoraService } from './agenda-calendario-hora.service';

describe('AgendaCalendarioHoraService', () => {
  let service: AgendaCalendarioHoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendaCalendarioHoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
