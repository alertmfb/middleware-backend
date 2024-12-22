import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  AccountEnquiry,
  AccountFreeze,
  AccountLien,
  AccountPnd,
  AccountStatus,
  CloseAccount,
  CreateSubAccount,
  CreateAccount,
  GetAccountTransactions,
  UpdateAccountTier,
} from './dto/accounts.dto';
import { Public } from 'src/modules/auth/metadata';

@Public()
@ApiTags('core')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('account-enquiry')
  @ApiBody({ type: AccountEnquiry })
  async accountEnquiry(@Body() payload: AccountEnquiry) {
    return this.accountsService.accountEnquiry(payload);
  }

  @Get('balance-enquiry')
  @ApiQuery({ name: 'accountNumber' })
  async balanceEnquiry(@Query('accountNumber') accountNumber: string) {
    return this.accountsService.balanceEnquiry(accountNumber);
  }

  @Post('create-virtual-account')
  @ApiBody({ type: CreateAccount })
  async createVirtualAccount(@Body() payload: CreateAccount) {
    return this.accountsService.createAccount(payload);
  }

  @Post('create-sub-account')
  @ApiBody({ type: CreateSubAccount })
  async createSubAccount(@Body() payload: CreateSubAccount) {
    return this.accountsService.createSubAccount(payload);
  }

  @Post('update-account-tier')
  @ApiBody({ type: UpdateAccountTier })
  async updateAccountTier(@Body() payload: UpdateAccountTier) {
    return this.accountsService.updateAccountTier(payload);
  }

  @Get('get-sub-accounts')
  @ApiQuery({ name: 'customerId' })
  async getSubAccounts(@Query('customerId') customerId: string) {
    return this.accountsService.getSubAccounts(customerId);
  }

  @Get('get-account-transactions')
  async getAccountTransactions(@Query() params: GetAccountTransactions) {
    return this.accountsService.getAccountTransactions(params);
  }

  @Post('freeze-account')
  async freezeAccount(@Body() payload: AccountFreeze) {
    return this.accountsService.freezeAccount(payload);
  }

  @Post('unfreeze-account')
  async unFreezeAccount(@Body() payload: AccountFreeze) {
    return this.accountsService.unfreezeAccount(payload);
  }

  @Post('check-freeze-status')
  async getFreezeStatus(@Body() payload: AccountStatus) {
    return this.accountsService.checkFreezeStatus(payload);
  }

  @Post('lien-account')
  async LienAccount(@Body() payload: AccountLien) {
    return this.accountsService.lienAccount(payload);
  }

  @Post('unlien-account')
  async unLienAccount(@Body() payload: AccountLien) {
    return this.accountsService.unlienAccount(payload);
  }

  @Post('check-lien-status')
  async getLienStatus(@Body() payload: AccountStatus) {
    return this.accountsService.checkLienStatus(payload);
  }

  @Post('activate-pnd')
  async activatePnd(@Body() payload: AccountPnd) {
    return this.accountsService.activatePnd(payload);
  }

  @Post('deactivate-pnd')
  async deactivatePnd(@Body() payload: AccountPnd) {
    return this.accountsService.deactivatePnd(payload);
  }

  @Post('check-pnd-status')
  async checkPndStatus(@Body() payload: AccountStatus) {
    return this.accountsService.checkPndStatus(payload);
  }

  @Post('close-account')
  async closeAccount(@Body() payload: CloseAccount) {
    return this.accountsService.closeAccount(payload);
  }
}
