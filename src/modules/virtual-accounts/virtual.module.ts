import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [AccountsModule, TransactionsModule, NotificationModule],
})
export class VirtualModule {}
