import { Controller, Get, Param, Query } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/metadata';
import { AccountsService } from '../core-banking/accounts/accounts.service';
import { GetAccountTransactions } from '../core-banking/accounts/dto/accounts.dto';

@ApiTags('consumer-banking')
@ApiBearerAuth()
@Public()
@Controller('consumer')
export class ConsumerController {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly accountsService: AccountsService,
  ) {}

  @Get('customers')
  async getCustomers() {
    return this.consumerService.getCustomers();
  }

  @Get('customers/:id')
  async getCustomerById(@Param('id') id: string) {
    return this.consumerService.getCustomerById(id);
  }

  @Get('customers/get-customer-accounts')
  async getCustomerAccounts(@Query('customerId') customerId: string) {
    return this.accountsService.getSubAccounts(customerId);
  }

  @Get('customers/get-customer-transactions')
  async getCustomerTransactions(@Query() options: GetAccountTransactions) {
    return this.accountsService.getAccountTransactions(options);
  }
}
