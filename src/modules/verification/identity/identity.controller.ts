import { Body, Controller, Post } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  LivelinessCheck,
  VerifyBvnSelfie,
  VerifyNinSelfie,
} from './dto/identity.dto';
import { Public } from 'src/modules/auth/metadata';
import {
  bvnSelfieResponse,
  livelinessResponse,
  ninSelfieResponse,
} from './dto/identity.response';

@Public()
@ApiTags('verification')
@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('nin/selfie')
  @ApiBody({ type: VerifyNinSelfie })
  @ApiResponse({ example: ninSelfieResponse })
  async verifyNinSelfie(@Body() payload: VerifyNinSelfie) {
    return this.identityService.verifyNin(payload);
  }

  @Post('bvn/selfie')
  @ApiBody({ type: VerifyBvnSelfie })
  @ApiResponse({ example: bvnSelfieResponse })
  async verifyBvnSelfie(@Body() payload: VerifyBvnSelfie) {
    return this.identityService.verifyBvn(payload);
  }

  @Post('liveliness')
  @ApiBody({ type: LivelinessCheck })
  @ApiResponse({ example: livelinessResponse })
  async liveliness(@Body() payload: LivelinessCheck) {
    return this.identityService.livelinessCheck(payload);
  }
}
