import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsSerice } from './transactions.service';
import { Public } from 'src/modules/auth/metadata';
import {
  AccountTransaction,
  InterBankTransfer,
  IntraBankTransfer,
  NameEnquiry,
  Reversal,
  TSQ,
} from './dto/transactions.dto';

@Public()
@ApiTags('virtual')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionsService: TransactionsSerice) {}

  @Get('fetch-banks')
  async getBanks() {
    return await this.transactionsService.getBanks();
  }

  @Post('name-enquiry')
  async nameEnquiry(@Body() payload: NameEnquiry) {
    return await this.transactionsService.nameEnqiry(payload);
  }

  @Post('inter-bank-transfer')
  async interBankTransfer(@Body() payload: InterBankTransfer) {
    return await this.transactionsService.interBankTransfer(payload);
  }

  @Post('inter-bank-tsq')
  async interBankTsq(@Body() payload: TSQ) {
    return await this.transactionsService.interBankTsq(payload);
  }

  @Post('intra-bank-transfer')
  async intraBankTransfer(@Body() payload: IntraBankTransfer) {
    return await this.transactionsService.intraBankTransfer(payload);
  }
  @Post('credit-customer-account')
  async creditCustomerAccount(@Body() payload: AccountTransaction) {
    return await this.transactionsService.creditCustomerAccount(payload);
  }

  @Post('debit-customer-account')
  async debitCustomerAccount(@Body() payload: AccountTransaction) {
    return await this.transactionsService.debitCustomerAccount(payload);
  }

  @Post('intra-bank-tsq')
  async intraBankTsq(@Body() payload: TSQ) {
    return await this.transactionsService.intraBankTSQ(payload);
  }

  @Post('reversal')
  async reversal(@Body() payload: Reversal) {
    return await this.transactionsService.reversal(payload);
  }
}
