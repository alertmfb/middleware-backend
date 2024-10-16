import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './local-auth.guard';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './jwt.auth.guard';
import { Public } from './metadata';
import { AuthenticatedUser } from './schema';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SignIn, verifyTOTP, VerifyTOTP } from './auth.dto';

@Controller('auth')
@ApiBearerAuth()
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  @ApiBody({ description: '', type: SignIn })
  async signIn(@Req() req: Request, @Res() res: Response) {
    const accessToken = await this.authService.signIn(req.user);
    res.json(accessToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiExcludeEndpoint()
  async getProfile(@Req() req: Request, @Res() res: Response) {
    res.json(req.user);
  }

  @Post('setupMfa')
  @ApiExcludeEndpoint()
  async setupMFA(@Req() req: Request, @Res() res: Response) {
    const user = req.user as AuthenticatedUser;
    const otp = await this.authService.setupMfa(user);
    res.json({ otp });
  }

  @Post('verifyTOTP')
  @ApiResponse({ example: verifyTOTP })
  @ApiBody({ type: VerifyTOTP })
  async verifyTOTP(@Req() req: Request, @Res() res: Response) {
    const token = req.headers.authorization.slice(7);
    const otp = req.body && ((req.body['otp'] ?? '') as string);
    const data = await this.authService.verifyTOTP(otp, token);
    res.json(data);
  }
}
