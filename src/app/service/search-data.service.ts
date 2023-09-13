import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchDataService {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor() {}
}
