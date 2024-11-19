import { TestBed } from '@angular/core/testing';

import { GerarAgendaEspecificaService } from './gerar-agenda-especifica.service';

describe('GerarAgendaEspecificaService', () => {
  let service: GerarAgendaEspecificaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerarAgendaEspecificaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
