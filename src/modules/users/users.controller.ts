import { Controller, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { Public } from '../auth/metadata';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('users')
@ApiExcludeController()
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('create')
  @Public()
  async createUser(@Req() req: Request, @Res() res: Response) {
    const token = req.query && (req.query['token'] as string);

    const user = await this.userService.createUser(
      req.body['email'],
      'password',
      token,
    );
    res.json(user);
  }
}
