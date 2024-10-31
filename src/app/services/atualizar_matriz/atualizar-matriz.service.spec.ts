import { TestBed } from '@angular/core/testing';

import { AtualizarMatrizService } from './atualizar-matriz.service';

describe('AtualizarMatrizService', () => {
  let service: AtualizarMatrizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtualizarMatrizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
