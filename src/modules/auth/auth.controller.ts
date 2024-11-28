import {
  Body,
  Controller,
  Get,
  Headers,
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
  SignInWithPassword,
  signInWithPasswordApiResponse,
  UpdatePassword,
  updatePasswordApiResponse,
  VerifyPasswordResetOTP,
  verifyPasswordResetOTPApiResponse,
  VerifySignInOTP,
  verifySignInOTPApiResponse,
  verifyTOTP,
  VerifyTOTP,
} from './auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiExcludeEndpoint()
  @UseGuards(LocalAuthGuard) // Local auth guard authenticates the user and passes it to the req.user object
  @Post('/signin')
  @ApiBody({ description: '', type: SignIn })
  @ApiResponse({ example: signInExample })
  async signIn(@Req() req: Request, @Res() res: Response) {
    const accessToken = await this.authService.signIn(req.user);
    res.json(accessToken);
  }

  @Post('verifyTOTP')
  @ApiExcludeEndpoint()
  @ApiResponse({ example: verifyTOTP })
  @ApiBody({ type: VerifyTOTP })
  async verifyTOTP(@Req() req: Request, @Res() res: Response) {
    const token = req.headers.authorization.slice(7);
    const otp = req.body && ((req.body['otp'] ?? '') as string);
    const data = await this.authService.verifyTOTP(otp, token, req.ip);
    res.json(data);
  }

  @Public()
  @UseGuards(LocalAuthGuard) // Local auth guard authenticates the user and passes it to the req.user object
  @Post('/signInWithPassword')
  @ApiBody({ type: SignInWithPassword })
  @ApiResponse({ example: signInWithPasswordApiResponse })
  async signInWithPassword(@Req() req: Request, @Res() res: Response) {
    res.json(await this.authService.signInWithPassword(req.user));
  }

  @Public()
  @Post('verifySignInOTP')
  @ApiResponse({ example: verifySignInOTPApiResponse })
  @ApiBody({ type: VerifySignInOTP })
  async verifySignInOTP(@Req() req: Request, @Res() res: Response) {
    const { id, otp } = req.body as VerifySignInOTP;
    const data = await this.authService.verifySignInOTP(id, otp, req.ip);
    res.json(data);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiExcludeEndpoint()
  async getProfile(@Req() req: Request, @Res() res: Response) {
    res.json(req.user);
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

  @Post('updatePassword')
  @ApiBearerAuth()
  @ApiBody({ type: UpdatePassword })
  @ApiResponse({ example: updatePasswordApiResponse })
  async updatePassword(@Req() req: Request) {
    return await this.authService.updatePassword(
      req.user['id'],
      req.user['email'],
      req.body,
    );
  }
}
