import { TestBed } from '@angular/core/testing';

import { ListaIgrejaService } from './lista-igreja.service';

describe('ListaIgrejaService', () => {
  let service: ListaIgrejaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaIgrejaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
