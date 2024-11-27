import { TestBed } from '@angular/core/testing';

import { AtualizarLayoutAgendaUploadService } from './atualizar-layout-agenda-upload.service';

describe('AtualizarLayoutAgendaUploadService', () => {
  let service: AtualizarLayoutAgendaUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtualizarLayoutAgendaUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
