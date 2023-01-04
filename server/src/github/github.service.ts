import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from 'octokit';
import { Commit } from './interfaces/commit.interface';

@Injectable()
export class GithubService {
  private octokit = new Octokit({});

  async getCommits(): Promise<Commit[]> {
    const { data } = await this.octokit.request('GET /repos/{owner}/{repo}/commits{?sha,path,author,since,until,per_page,page}', {
      owner: process.env.PROJECT_OWNER,
      repo: process.env.PROJECT_REPO
    });
    return data;
  }
}
