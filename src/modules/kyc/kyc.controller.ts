import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { KycService } from './kyc.service';
import { Public } from '../auth/metadata';
import { verifyBvnBasicResponse } from './dto/kyc.dto';

@Controller('kyc')
@ApiTags('kyc')
export class KycController {
  constructor(private kycService: KycService) {}

  @Public()
  @Get('bvn/basic')
  @ApiResponse({ example: verifyBvnBasicResponse })
  async verifyBvnBasic(@Query('bvn') bvn: string) {
    return await this.kycService.verifyBvnBasic(bvn);
  }
}
