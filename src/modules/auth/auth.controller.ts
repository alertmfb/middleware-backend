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
  RequestPasswordReset,
  requestPasswordResetApiResponse,
  ResetPassword,
  resetPasswordApiResponse,
  SignIn,
  signInExample,
  VerifyPasswordResetOTP,
  verifyPasswordResetOTPApiResponse,
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
  @Post('requestPasswordReset')
  @ApiBody({ type: RequestPasswordReset })
  @ApiResponse({ example: requestPasswordResetApiResponse })
  async requestPasswordReset(@Body() { email }: { email: string }) {
    return await this.authService.requestPasswordReset(email);
  }

  @Public()
  @Post('verifyPasswordResetOTP')
  @ApiBody({ type: VerifyPasswordResetOTP })
  @ApiResponse({ example: verifyPasswordResetOTPApiResponse })
  async verifyPasswordReset(@Body() payload: VerifyPasswordResetOTP) {
    return await this.authService.verifyPasswordResetOTP(payload);
  }

  @Public()
  @Post('resetPassword')
  @ApiBody({ type: ResetPassword })
  @ApiResponse({ example: resetPasswordApiResponse })
  async resetPassword(@Body() payload: ResetPassword) {
    return await this.authService.resetPassword(payload);
  }
}
