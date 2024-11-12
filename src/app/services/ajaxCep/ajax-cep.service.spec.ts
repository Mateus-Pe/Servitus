import { TestBed } from '@angular/core/testing';

import { AjaxCepService } from './ajax-cep.service';

describe('AjaxCepService', () => {
  let service: AjaxCepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjaxCepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
