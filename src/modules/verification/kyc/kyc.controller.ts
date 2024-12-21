import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { KycService } from './kyc.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidateBvn } from './dto/kyc.dto';

@ApiTags('verification')
@Controller('kyc')
export class KycController {
  constructor(private readonly kycService: KycService) {}

  @Get('bvn/lookup/basic')
  async bvnLookupBasic(@Query('bvn') bvn: string) {
    return await this.kycService.bvnLookupBasic(bvn);
  }

  @Get('bvn/lookup/advanced')
  async bvnLookupAdvance(@Query('bvn') bvn: string) {
    return await this.kycService.bvnLookupAdvanced(bvn);
  }

  @Get('bvn/validate')
  @ApiQuery({ name: 'dob', description: 'dob in yyyy-mm-dd', required: false })
  async validateBvn(@Query() params: ValidateBvn) {
    return await this.kycService.validateBvn(params);
  }

  @Get('phoneNumber/lookup/basic')
  async phoneNumberLookupBasic(@Query('phoneNumber') phoneNumber: string) {
    return await this.kycService.phoneNumberLookupBasic(phoneNumber);
  }

  @Get('phoneNumber/lookup/advanced')
  async phoneNumberLookupAdvanced(@Query('phoneNumber') phoneNumber: string) {
    return await this.kycService.phoneNumberLookupAdvance(phoneNumber);
  }

  @Get('nubanKyc/status')
  async numbanKycStatus(
    @Query('accountNumber') accountNumber: string,
    @Query('bankCode', ParseIntPipe) bankCode: number,
  ) {
    return await this.kycService.nubanKycStatus(accountNumber, bankCode);
  }

  @Get('nin/lookup')
  async ninLookupAdvance(@Query('nin') nin: string) {
    return await this.kycService.ninLookup(nin);
  }
}
