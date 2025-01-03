import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { NotificationModule } from './notification/notification.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [AccountsModule, TransactionsModule, NotificationModule, EventsModule],
})
export class VirtualModule {}
