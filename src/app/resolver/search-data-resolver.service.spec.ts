import { TestBed } from '@angular/core/testing';

import { SearchDataResolverService } from './search-data-resolver.service';

describe('SearchDataResolverService', () => {
  let service: SearchDataResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchDataResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
