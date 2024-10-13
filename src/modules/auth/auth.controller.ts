import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './local-auth.guard';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './jwt.auth.guard';
import { Public } from './metadata';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signIn(@Req() req: Request, @Res() res: Response) {
    const accessToken = await this.authService.signIn(req.user);
    res.json(accessToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request, @Res() res: Response) {
    res.json(req.user);
  }
}
