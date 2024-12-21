import { Module } from '@nestjs/common';
import { BankoneHttpModule } from '../bankone/bankone.module';

@Module({
  imports: [BankoneHttpModule],
  controllers: [],
  providers: [],
})
export class TransactionsModule {}
