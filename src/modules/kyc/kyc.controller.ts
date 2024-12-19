import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiExcludeController, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { KycService } from './kyc.service';
import { Public } from '../auth/metadata';
import {
  AdvancedType,
  bvnAdvancedResponse,
  bvnBasicResponse,
  cacAdvancedResponse,
  cacBasicResponse,
  CompanyType,
  fetchBanksResponse,
  firsTinResponse,
  ninResponse,
  nubanKycStatusResponse,
  phoneNumberAdvancedResponse,
  phoneNumberBasicResponse,
} from './dto/kyc.dto';

@Controller('kyc')
@ApiTags('kyc')
@ApiExcludeController()
export class KycController {
  constructor(private kycService: KycService) {}

  @Public()
  @Get('banks')
  @ApiResponse({ example: fetchBanksResponse })
  async getBanks() {
    return await this.kycService.getBanks();
  }

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
  @Get('phoneNumber/lookup/basic')
  @ApiResponse({ example: phoneNumberBasicResponse })
  async phoneNumberLookupBasic(@Query('phoneNumber') phoneNumber: string) {
    return await this.kycService.phoneNumberLookupBasic(phoneNumber);
  }

  @Public()
  @Get('phoneNumber/lookup/advanced')
  @ApiResponse({ example: phoneNumberAdvancedResponse })
  async phoneNumberLookupAdvanced(@Query('phoneNumber') phoneNumber: string) {
    return await this.kycService.phoneNumberLookupAdvance(phoneNumber);
  }

  @Public()
  @Get('nubanKyc/status')
  @ApiResponse({ example: nubanKycStatusResponse })
  async numbanKycStatus(
    @Query('accountNumber') accountNumber: string,
    @Query('bankCode', ParseIntPipe) bankCode: number,
  ) {
    return await this.kycService.nubanKycStatus(accountNumber, bankCode);
  }

  @Public()
  @Get('nin/lookup')
  @ApiResponse({ example: ninResponse })
  async ninLookupAdvance(@Query('nin') nin: string) {
    return await this.kycService.ninLookup(nin);
  }

  @Public()
  @Get('tin')
  @ApiResponse({ example: firsTinResponse })
  async validateTin(@Query('tin') tin: string) {
    return await this.kycService.validateTin(tin);
  }

  @Public()
  @Get('cac/basic')
  @ApiQuery({ name: 'companyType', enum: CompanyType })
  @ApiResponse({ example: cacBasicResponse })
  async cacBasic(
    @Query('rcNumber') rcNumber: string,
    @Query('companyType') companyType: CompanyType,
  ) {
    return await this.kycService.cacBasic(rcNumber, companyType);
  }

  @Public()
  @Get('cac/advanced')
  @ApiQuery({ name: 'type', enum: AdvancedType })
  @ApiResponse({ example: cacAdvancedResponse })
  async cacAdvanced(
    @Query('rcNumber') rcNumber: string,
    @Query('type') type: AdvancedType,
  ) {
    return await this.kycService.cacAdvanced(rcNumber, type);
  }
}
