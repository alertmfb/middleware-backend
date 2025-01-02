import { Module } from '@nestjs/common';
import { BankoneHttpModule } from '../../bankone/bankone.module';
import { TransactionController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { BankoneTSQHttpModule } from '../../bankone/bankoneTsq.module';

@Module({
  imports: [BankoneHttpModule, BankoneTSQHttpModule],
  controllers: [TransactionController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
