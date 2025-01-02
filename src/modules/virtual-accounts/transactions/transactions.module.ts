import { Module } from '@nestjs/common';
import { BankoneHttpModule } from '../../bankone/bankone.module';
import { TransactionController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { BankoneTSQHttpModule } from '../../bankone/bankoneTsq.module';
import { HttpModule } from '@nestjs/axios';
import { NotificationModule } from '../notification/notification.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TRANSACTION_NOTIFICATION } from '../notification/constants';

@Module({
  imports: [
    BankoneHttpModule,
    BankoneTSQHttpModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: TRANSACTION_NOTIFICATION,
        useFactory: async (config: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: config.get('REDIS_HOST') || 'middleware-redis',
            port: config.get('REDIS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
