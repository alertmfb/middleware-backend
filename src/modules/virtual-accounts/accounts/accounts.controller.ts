import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AccountEnquiry,
  AccountFreeze,
  AccountLien,
  AccountPnd,
  AccountStatus,
  CloseAccount,
  CreateVirtualSubAccount,
  CreateVirtualAccount,
  GetAccountTransactions,
  UpdateAccountTier,
} from './dto/accounts.dto';
import { Public } from 'src/modules/auth/metadata';
import {
  accountEnquiryResponse,
  activatePndResponse,
  balanceEnquiryResponse,
  createAccountResponse,
  createSubAccountResponse,
  deactivatePndResponse,
  freezeAccountResponse,
  freezeAccountStatusResponse,
  getAccountTransactionsResponse,
  getSubAccountsResponse,
  lienStatusResponse,
  placeLienResponse,
  pndStatusResponse,
  removeLienResponse,
  unfreezeAccountResponse,
} from './dto/accounts.response';

@Public()
@ApiTags('virtual')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('account-enquiry')
  @ApiBody({ type: AccountEnquiry })
  @ApiResponse({ example: accountEnquiryResponse })
  async accountEnquiry(@Body() payload: AccountEnquiry) {
    return this.accountsService.virtualAccountEnquiry(payload);
  }

  @Get('balance-enquiry')
  @ApiResponse({ example: balanceEnquiryResponse })
  async balanceEnquiry(@Query('accountNumber') accountNumber: string) {
    return this.accountsService.balanceEnquiry(accountNumber);
  }

  @Post('create-virtual-account')
  @ApiBody({ type: CreateVirtualAccount })
  @ApiResponse({ example: createAccountResponse })
  async createVirtualAccount(@Body() payload: CreateVirtualAccount) {
    return this.accountsService.createVirtualAccount(payload);
  }

  @Post('create-sub-account')
  @ApiBody({ type: CreateVirtualSubAccount })
  @ApiResponse({ example: createSubAccountResponse })
  async createSubAccount(@Body() payload: CreateVirtualSubAccount) {
    return this.accountsService.createVirtualSubAccount(payload);
  }

  @Post('update-account-tier')
  @ApiBody({ type: UpdateAccountTier })
  async updateAccountTier(@Body() payload: UpdateAccountTier) {
    return this.accountsService.updateAccountTier(payload);
  }

  @Get('get-sub-accounts')
  @ApiQuery({ name: 'customerId' })
  @ApiResponse({ example: getSubAccountsResponse })
  async getSubAccounts(@Query('customerId') customerId: string) {
    return this.accountsService.getVirtualSubAccounts(customerId);
  }

  @Get('get-account-transactions')
  @ApiResponse({ example: getAccountTransactionsResponse })
  async getAccountTransactions(@Query() params: GetAccountTransactions) {
    return this.accountsService.getAccountTransactions(params);
  }

  @Post('freeze-account')
  @ApiResponse({ example: freezeAccountResponse })
  async freezeAccount(@Body() payload: AccountFreeze) {
    return this.accountsService.freezeAccount(payload);
  }

  @Post('unfreeze-account')
  @ApiResponse({ example: unfreezeAccountResponse })
  async unFreezeAccount(@Body() payload: AccountFreeze) {
    return this.accountsService.unfreezeAccount(payload);
  }

  @Post('check-freeze-status')
  @ApiResponse({ example: freezeAccountStatusResponse })
  async getFreezeStatus(@Body() payload: AccountStatus) {
    return this.accountsService.checkFreezeStatus(payload);
  }

  @Post('lien-account')
  @ApiResponse({ example: placeLienResponse })
  async LienAccount(@Body() payload: AccountLien) {
    return this.accountsService.lienAccount(payload);
  }

  @Post('unlien-account')
  @ApiResponse({ example: removeLienResponse })
  async unLienAccount(@Body() payload: AccountLien) {
    return this.accountsService.unlienAccount(payload);
  }

  @Post('check-lien-status')
  @ApiResponse({ example: lienStatusResponse })
  async getLienStatus(@Body() payload: AccountStatus) {
    return this.accountsService.checkLienStatus(payload);
  }

  @Post('activate-pnd')
  @ApiResponse({ example: activatePndResponse })
  async activatePnd(@Body() payload: AccountPnd) {
    return this.accountsService.activatePnd(payload);
  }

  @Post('deactivate-pnd')
  @ApiResponse({ example: deactivatePndResponse })
  async deactivatePnd(@Body() payload: AccountPnd) {
    return this.accountsService.deactivatePnd(payload);
  }

  @Post('check-pnd-status')
  @ApiResponse({ example: pndStatusResponse })
  async checkPndStatus(@Body() payload: AccountStatus) {
    return this.accountsService.checkPndStatus(payload);
  }

  @Post('close-account')
  async closeAccount(@Body() payload: CloseAccount) {
    return this.accountsService.closeAccount(payload);
  }
}
