import { TestBed } from '@angular/core/testing';

import { GetBancoImgService } from './get-banco-img.service';

describe('GetBancoImgService', () => {
  let service: GetBancoImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBancoImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
