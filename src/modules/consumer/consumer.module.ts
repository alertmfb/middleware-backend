import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ConsumerController } from './consumer.controller';
import { BankoneHttpModule } from '../bankone/bankone.module';
import { AccountsService } from '../core-banking/accounts/accounts.service';

@Module({
  imports: [BankoneHttpModule],
  controllers: [ConsumerController],
  providers: [ConsumerService, AccountsService],
})
export class ConsumerModule {}
