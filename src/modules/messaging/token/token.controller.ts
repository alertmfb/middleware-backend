import { Body, Controller, Post } from '@nestjs/common';
import { TokenService } from './token.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  EmailToken,
  InAppToken,
  SendToken,
  VerifyToken,
} from './dto/token.dto';
import { Public } from 'src/modules/auth/metadata';
import {
  emailTokenResponse,
  inappTokenResponse,
  sendTokenSMSResponse,
  verifyTokenResponse,
} from './dto/responses';

@Public()
@ApiTags('messaging')
@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('sms')
  @ApiBody({ type: SendToken })
  @ApiResponse({ example: sendTokenSMSResponse })
  async sendTokenSMS(@Body() payload: SendToken) {
    return await this.tokenService.sendTokenSMS(payload);
  }

  @Post('inapp')
  @ApiBody({ type: InAppToken })
  @ApiResponse({ example: inappTokenResponse })
  async sendTokenInApp(@Body() payload: InAppToken) {
    return await this.tokenService.sendTokenInApp(payload);
  }

  @Post('email')
  @ApiBody({ type: EmailToken })
  @ApiResponse({ example: emailTokenResponse })
  async sendTokenEmail(@Body() payload: EmailToken) {
    return await this.tokenService.sendTokenEmail(payload);
  }

  @Post('verify')
  @ApiResponse({ example: verifyTokenResponse })
  async verifyToken(@Body() payload: VerifyToken) {
    return await this.tokenService.verifyToken(payload);
  }
}
