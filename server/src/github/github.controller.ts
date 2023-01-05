import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller("github")
export class GithubController {
  constructor(private readonly githubService: GithubService) { }

  @Get('commits')
  async getCommits(@Query('per_page') per_page: number, @Query('page') page: number, @Res() res) {
    try {
      const data = await this.githubService.getCommits(per_page, page);
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
