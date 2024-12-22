import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { BankoneHttpModule } from '../../bankone/bankone.module';

@Module({
  imports: [BankoneHttpModule],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
