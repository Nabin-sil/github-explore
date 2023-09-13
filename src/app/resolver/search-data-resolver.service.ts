import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { SearchDataService } from '../service/search-data.service';

@Injectable({
  providedIn: 'root',
})
export class SearchDataResolverService implements Resolve<any> {
  constructor(private searchDataService: SearchDataService) {}

  resolve() {
    return {
      query: this.searchDataService.searchQuery,
      results: this.searchDataService.searchResults,
    };
  }
}
