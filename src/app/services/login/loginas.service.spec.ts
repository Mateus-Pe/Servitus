import { TestBed } from '@angular/core/testing';

import { ListaParoquiaService } from './login.service';

describe('ListaParoquiaService', () => {
  let service: ListaParoquiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaParoquiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
