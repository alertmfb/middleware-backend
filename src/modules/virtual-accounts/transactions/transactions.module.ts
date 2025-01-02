import { Module } from '@nestjs/common';
import { BankoneHttpModule } from '../../bankone/bankone.module';
import { TransactionController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { BankoneTSQHttpModule } from '../../bankone/bankoneTsq.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    BankoneHttpModule,
    BankoneTSQHttpModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [TransactionController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
