import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PosService } from './pos.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/metadata';
import {
  AccountEnquiry,
  CreateVirtualSubAccount,
} from '../virtual-accounts/accounts/dto/accounts.dto';
import { AccountsService } from '../virtual-accounts/accounts/accounts.service';

@ApiTags('pos')
@Public()
@ApiBearerAuth()
@Controller('pos')
export class PosController {
  constructor(
    private readonly posService: PosService,
    private readonly accountsService: AccountsService,
  ) {}

  @Get('businesses')
  async getBusinesses() {
    return this.posService.getBusinesses();
  }

  @Get('businesses/:id')
  async getBusinessById(@Param('id') id: string) {
    return this.posService.getBusinessById(id);
  }

  @Get('businesses/accounts')
  async getBusinessAccountNumbers(@Query('customerId') customerId: string) {
    return this.accountsService.getVirtualSubAccounts(customerId);
  }

  @Get('businesses/accounts/:accountNumber')
  async businessAccountEnquiry(@Param('accountNumber') accountNumber: string) {
    return this.accountsService.accountEnquiry({ AccountNo: accountNumber });
  }

  @Post('create-business-account')
  async createBusinessAccount(@Body() payload: CreateVirtualSubAccount) {
    return this.accountsService.createVirtualSubAccount(payload);
  }
}
