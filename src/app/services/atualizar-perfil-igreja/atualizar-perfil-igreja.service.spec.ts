import { TestBed } from '@angular/core/testing';

import { AtualizarPerfilIgrejaService } from './atualizar-perfil-igreja.service';

describe('AtualizarPerfilIgrejaService', () => {
  let service: AtualizarPerfilIgrejaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtualizarPerfilIgrejaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
