import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from 'octokit';
import { Commit } from './interfaces/commit.interface';
import { Repository } from './interfaces/repository.interface';

@Injectable()
export class GithubService {
  private octokit = new Octokit({});

  async getRepo(): Promise<Repository> {
    const { data } = await this.octokit.request('GET /repos/{owner}/{repo}', {
      owner: process.env.PROJECT_OWNER,
      repo: process.env.PROJECT_REPO
    });
    return data;
  }

  async getCommits(per_page: number, page: number): Promise<Commit[]> {
    const {data} = await this.octokit.request('GET /repos/{owner}/{repo}/commits{?sha,path,author,since,until,per_page,page}', {
      owner: process.env.PROJECT_OWNER,
      repo: process.env.PROJECT_REPO,
      per_page,
      page
    });
    return data;
  }
}
