import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './local-auth.guard';
import { Request, Response } from 'express';
import { Public } from './metadata';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeEndpoint,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ResetPassword,
  resetPasswordApiResponse,
  SignIn,
  signInExample,
  verifyTOTP,
  VerifyTOTP,
} from './auth.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard) // Local auth guard authenticates the user and passes it to the req.user object
  @Post('/signin')
  @ApiBody({ description: '', type: SignIn })
  @ApiResponse({ example: signInExample })
  async signIn(@Req() req: Request, @Res() res: Response) {
    const accessToken = await this.authService.signIn(req.user);
    res.json(accessToken);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiExcludeEndpoint()
  async getProfile(@Req() req: Request, @Res() res: Response) {
    res.json(req.user);
  }

  @Post('verifyTOTP')
  @ApiResponse({ example: verifyTOTP })
  @ApiBody({ type: VerifyTOTP })
  @ApiBearerAuth()
  async verifyTOTP(@Req() req: Request, @Res() res: Response) {
    const token = req.headers.authorization.slice(7);
    const otp = req.body && ((req.body['otp'] ?? '') as string);
    const data = await this.authService.verifyTOTP(otp, token, req.ip);
    res.json(data);
  }

  @Public()
  @Post('resetPassword')
  @ApiBody({ type: ResetPassword })
  @ApiResponse({ example: resetPasswordApiResponse })
  async resetPassword(@Body() { email }: ResetPassword) {
    return await this.authService.resetPassword(email);
  }
}
