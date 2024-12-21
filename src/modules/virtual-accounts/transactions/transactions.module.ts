import { Module } from '@nestjs/common';
import { BankoneHttpModule } from '../bankone/bankone.module';
import { TransactionController } from './transactions.controller';
import { TransactionsSerice } from './transactions.service';
import { BankoneTSQHttpModule } from '../bankone/bankoneTsq.module';

@Module({
  imports: [BankoneHttpModule, BankoneTSQHttpModule],
  controllers: [TransactionController],
  providers: [TransactionsSerice],
})
export class TransactionsModule {}
