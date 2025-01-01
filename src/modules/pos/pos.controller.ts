import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PosService } from './pos.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/metadata';
import { GenerateAccountNumber } from './dto/pos.dto';
import { CreateSubAccount } from '../core-banking/accounts/dto/accounts.dto';
import { AccountsService } from '../core-banking/accounts/accounts.service';

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

  @Post('create-business-account')
  async createBusinessAccount(@Body() payload: CreateSubAccount) {
    return this.accountsService.createSubAccount(payload);
  }
}
