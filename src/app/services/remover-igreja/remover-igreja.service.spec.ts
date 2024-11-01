import { TestBed } from '@angular/core/testing';

import { RemoverIgrejaService } from './remover-igreja.service';

describe('RemoverIgrejaService', () => {
  let service: RemoverIgrejaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoverIgrejaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
