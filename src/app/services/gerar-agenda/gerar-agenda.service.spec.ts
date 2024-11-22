import { TestBed } from '@angular/core/testing';

import { GerarAgendaService } from './gerar-agenda.service';

describe('GerarAgendaService', () => {
  let service: GerarAgendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerarAgendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
