import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { KycService } from './kyc.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidateBvn } from './dto/kyc.dto';
import { Public } from 'src/modules/auth/metadata';
import {
  advancedBvnLookupResponse,
  basicBvnLookupResponse,
  bvnValidateResponse,
  ninLookupResponse,
  nubanKycStatusResponse,
  phoneNumberAdvancedLookupResponse,
  phoneNumberBasicLookupResponse,
} from './dto/kyc.response';

@Public()
@ApiTags('verification')
@Controller('kyc')
export class KycController {
  constructor(private readonly kycService: KycService) {}

  @Get('bvn/lookup/basic')
  @ApiResponse({ example: basicBvnLookupResponse })
  async bvnLookupBasic(@Query('bvn') bvn: string) {
    return await this.kycService.bvnLookupBasic(bvn);
  }

  @Get('bvn/lookup/advanced')
  @ApiResponse({ example: advancedBvnLookupResponse })
  async bvnLookupAdvance(@Query('bvn') bvn: string) {
    return await this.kycService.bvnLookupAdvanced(bvn);
  }

  @Get('bvn/validate')
  @ApiResponse({ example: bvnValidateResponse })
  @ApiQuery({ name: 'dob', description: 'dob in yyyy-mm-dd', required: false })
  async validateBvn(@Query() params: ValidateBvn) {
    return await this.kycService.validateBvn(params);
  }

  @Get('phoneNumber/lookup/basic')
  @ApiResponse({ example: phoneNumberBasicLookupResponse })
  async phoneNumberLookupBasic(@Query('phoneNumber') phoneNumber: string) {
    return await this.kycService.phoneNumberLookupBasic(phoneNumber);
  }

  @Get('phoneNumber/lookup/advanced')
  @ApiResponse({ example: phoneNumberAdvancedLookupResponse })
  async phoneNumberLookupAdvanced(@Query('phoneNumber') phoneNumber: string) {
    return await this.kycService.phoneNumberLookupAdvance(phoneNumber);
  }

  @Get('nubanKyc/status')
  @ApiResponse({ example: nubanKycStatusResponse })
  async numbanKycStatus(
    @Query('accountNumber') accountNumber: string,
    @Query('bankCode', ParseIntPipe) bankCode: number,
  ) {
    return await this.kycService.nubanKycStatus(accountNumber, bankCode);
  }

  @Get('nin/lookup')
  @ApiResponse({ example: ninLookupResponse })
  async ninLookupAdvance(@Query('nin') nin: string) {
    return await this.kycService.ninLookup(nin);
  }
}
