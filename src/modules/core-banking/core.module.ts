import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { AccountsModule } from './accounts/accounts.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [AccountsModule, TransactionsModule, CustomersModule],
})
export class CoreModule {}
