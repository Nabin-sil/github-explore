// search.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GithubService } from 'src/app/service/github.service';
import { SearchDataService } from 'src/app/service/search-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  sortCriteria: string = 'best-match';
  resultsPerPage: number = 10;
  repositories: any[] = [];
  currentPage: number = 1;
  totalItems: number = 0;
  totalPages: number = 1;

  constructor(
    private githubService: GithubService,
    private searchDataService: SearchDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve query parameters from the URL
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
    });
  }

  searchRepositories() {
    this.githubService
      .searchRepositories(
        this.searchQuery,
        this.sortCriteria,
        this.resultsPerPage,
        this.currentPage
      )
      .subscribe((data: any) => {
        this.repositories = data.items;
        this.totalItems = data.total_count;
      });
    this.searchDataService.searchQuery = this.searchQuery;
    this.searchDataService.searchResults = this.repositories;
    // Navigate to the search page with the updated query parameter
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: this.searchQuery },
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.searchRepositories();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.searchRepositories();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchRepositories();
    }
  }
}
