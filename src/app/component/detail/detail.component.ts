import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { GithubService } from 'src/app/service/github.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  owner: string = '';
  repositoryName: string = '';
  openIssues: number = 0;
  defaultBranch: string = '';
  readmeContent: string = '';
  ownerAvatarUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.owner = params.get('owner') || '';
      this.repositoryName = params.get('repo') || '';
      this.ownerAvatarUrl = `https://github.com/${this.owner}.png`; // Adjust the URL format as needed

      // Fetch additional repository details and README content here
      this.fetchRepositoryDetails();
      this.fetchReadmeContent();
    });
  }

  fetchRepositoryDetails() {
    // Call your GitHub service to fetch repository details based on owner and repositoryName
    this.githubService
      .getRepositoryDetails(this.owner, this.repositoryName)
      .subscribe(
        (data: any) => {
          this.openIssues = data.open_issues_count;
          this.defaultBranch = data.default_branch;
        },
        (error: any) => {
          console.error('Error fetching repository details:', error);
        }
      );
  }

  fetchReadmeContent() {
    // Call your GitHub service to fetch README content based on owner and repositoryName
    this.githubService
      .getReadmeContent(this.owner, this.repositoryName)
      .subscribe(
        (data: any) => {
          // Decode the content if it's base64 encoded
          this.readmeContent = atob(data.content);
        },
        (error: any) => {
          console.error('Error fetching README content:', error);
        }
      );
  }
}
