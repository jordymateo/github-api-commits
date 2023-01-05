import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller("github")
export class GithubController {
  constructor(private readonly githubService: GithubService) { }

  @Get('commits')
  async getCommits(@Res() res) {
    try {
      const data = await this.githubService.getCommits();
      return res.status(HttpStatus.OK).json(data);
    } catch (ex) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json("Unexpected error. " + ex);
    }
  }

  @Get('repo')
  async getRepo(@Res() res) {
    try {
      const data = await this.githubService.getRepo();
      return res.status(HttpStatus.OK).json(data);
    } catch (ex) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json("Unexpected error. " + ex);
    }
  }
}
