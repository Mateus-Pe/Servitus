import { TestBed } from '@angular/core/testing';

import { GetAgendaCalendarioFeedService } from './get-agenda-calendario-feed.service';

describe('GetAgendaCalendarioFeedService', () => {
  let service: GetAgendaCalendarioFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAgendaCalendarioFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
