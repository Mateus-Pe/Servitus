import { TestBed } from '@angular/core/testing';

import { RemoveAgendaService } from './remove-agenda.service';

describe('RemoveAgendaService', () => {
  let service: RemoveAgendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveAgendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
