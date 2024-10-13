import { Controller, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('create')
  async createUser(@Req() req: Request, @Res() res: Response) {
    const user = await this.userService.createUser(
      req.body['email'],
      'password',
    );
    res.json(user);
  }
}
