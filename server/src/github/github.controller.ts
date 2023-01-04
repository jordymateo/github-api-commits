import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { GithubService } from './github.service';
import { Commit } from './interfaces/commit.interface';

@Controller("github")
export class GithubController {
  constructor(private readonly appService: GithubService) { }

  @Get('commits')
  async getCommits(@Res() res) {
    try {
      const data = await this.appService.getCommits();
      return res.status(HttpStatus.OK).json(data);
    } catch (ex) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json("Unexpected error. " + ex);
    }
  }
}
