import { Controller, Get, Query } from '@nestjs/common';
import { KybService } from './kyb.service';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdvancedType, CompanyType } from './dto/kyb.dto';
import { Public } from 'src/modules/auth/metadata';

@Public()
@ApiTags('verification')
@Controller('kyb')
export class KybController {
  constructor(private readonly kybService: KybService) {}

  @Get('tin')
  async validateTin(@Query('tin') tin: string) {
    return await this.kybService.validateTin(tin);
  }

  @Get('cac/basic')
  @ApiQuery({ name: 'companyType', enum: CompanyType })
  async cacBasic(
    @Query('rcNumber') rcNumber: string,
    @Query('companyType') companyType: CompanyType,
  ) {
    return await this.kybService.cacBasic(rcNumber, companyType);
  }

  @Get('cac/advanced')
  @ApiQuery({ name: 'type', enum: AdvancedType })
  async cacAdvanced(
    @Query('rcNumber') rcNumber: string,
    @Query('type') type: AdvancedType,
  ) {
    return await this.kybService.cacAdvanced(rcNumber, type);
  }
}
