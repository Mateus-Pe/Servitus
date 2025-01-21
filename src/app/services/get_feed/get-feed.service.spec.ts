import { TestBed } from '@angular/core/testing';

import { GetFeedService } from './get-feed.service';

describe('GetFeedService', () => {
  let service: GetFeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
