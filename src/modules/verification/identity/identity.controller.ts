import { Body, Controller, Post } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  LivelinessCheck,
  VerifyBvnSelfie,
  VerifyNinSelfie,
} from './dto/identity.dto';

@ApiTags('verification')
@Controller('identity')
export class IdentityController {
  constructor(private readonly identityService: IdentityService) {}

  @Post('nin/selfie')
  @ApiBody({ type: VerifyNinSelfie })
  async verifyNinSelfie(@Body() payload: VerifyNinSelfie) {
    return this.identityService.verifyNin(payload);
  }

  @Post('bvn/selfie')
  @ApiBody({ type: VerifyBvnSelfie })
  async verifyBvnSelfie(@Body() payload: VerifyBvnSelfie) {
    return this.identityService.verifyBvn(payload);
  }

  @Post('lineliness')
  @ApiBody({ type: LivelinessCheck })
  async liveliness(@Body() payload: LivelinessCheck) {
    return this.identityService.livelinessCheck(payload);
  }
}
