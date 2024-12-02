import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { KycService } from './kyc.service';
import { Public } from '../auth/metadata';
import {
  bvnAdvancedResponse,
  bvnBasicResponse,
  ninResponse,
} from './dto/kyc.dto';

@Controller('kyc')
@ApiTags('kyc')
export class KycController {
  constructor(private kycService: KycService) {}

  @Public()
  @Get('bvn/lookup/basic')
  @ApiResponse({ example: bvnBasicResponse })
  async bvnLookupBasic(@Query('bvn') bvn: string) {
    return await this.kycService.bvnLookupBasic(bvn);
  }

  @Public()
  @Get('bvn/lookup/advanced')
  @ApiResponse({ example: bvnAdvancedResponse })
  async bvnLookupAdvance(@Query('bvn') bvn: string) {
    return await this.kycService.bvnLookupAdvanced(bvn);
  }

  @Public()
  @Get('nin/lookup')
  @ApiResponse({ example: ninResponse })
  async ninLookupAdvance(@Query('nin') nin: string) {
    return await this.kycService.ninLookup(nin);
  }
}
