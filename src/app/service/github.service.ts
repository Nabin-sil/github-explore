// github.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {}

  searchRepositories(
    query: string,
    sort: string,
    perPage: number,
    page: number
  ) {
    // Use HttpParams to construct the query parameters
    const params = new HttpParams()
      .set('q', query)
      .set('sort', sort)
      .set('per_page', perPage.toString())
      .set('page', page.toString());

    const url = `${this.apiUrl}/search/repositories`;

    // Pass the params to the API call
    return this.http.get(url, { params });
  }

  getRepository(owner: string, repo: string) {
    const url = `${this.apiUrl}/repos/${owner}/${repo}`;
    return this.http.get(url);
  }

  getReadme(owner: string, repo: string) {
    const url = `${this.apiUrl}/repos/${owner}/${repo}/readme`;
    return this.http.get(url, { responseType: 'text' });
  }

  getRepositoryDetails(owner: string, repoName: string): Observable<any> {
    const url = `${this.apiUrl}/repos/${owner}/${repoName}`;
    return this.http.get(url);
  }

  // Define a method to fetch README content
  getReadmeContent(owner: string, repoName: string): Observable<any> {
    const url = `${this.apiUrl}/repos/${owner}/${repoName}/readme`;
    return this.http.get(url);
  }
}
