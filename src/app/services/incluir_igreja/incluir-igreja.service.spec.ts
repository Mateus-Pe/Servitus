import { TestBed } from '@angular/core/testing';

import { IncluirIgrejaService } from './incluir-igreja.service';

describe('IncluirIgrejaService', () => {
  let service: IncluirIgrejaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncluirIgrejaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
