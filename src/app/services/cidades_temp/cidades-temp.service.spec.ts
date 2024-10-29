import { TestBed } from '@angular/core/testing';

import { CidadesTempService } from './cidades-temp.service';

describe('CidadesTempService', () => {
  let service: CidadesTempService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CidadesTempService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
