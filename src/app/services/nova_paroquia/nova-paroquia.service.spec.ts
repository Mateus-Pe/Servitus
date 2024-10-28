import { TestBed } from '@angular/core/testing';

import { NovaParoquiaService } from './nova-paroquia.service';

describe('NovaParoquiaService', () => {
  let service: NovaParoquiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovaParoquiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
