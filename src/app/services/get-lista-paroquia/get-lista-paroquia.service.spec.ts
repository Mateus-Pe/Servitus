import { TestBed } from '@angular/core/testing';

import { GetListaParoquiaService } from './get-lista-paroquia.service';

describe('GetListaParoquiaService', () => {
  let service: GetListaParoquiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetListaParoquiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
