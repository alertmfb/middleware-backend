import { Module } from '@nestjs/common';
import { PosService } from './pos.service';
import { PosController } from './pos.controller';
import { AccountsService } from '../virtual-accounts/accounts/accounts.service';
import { BankoneHttpModule } from '../bankone/bankone.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ACCOUNT_EVENTS } from '../virtual-accounts/events/constants';

@Module({
  imports: [
    BankoneHttpModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: ACCOUNT_EVENTS,
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
  controllers: [PosController],
  providers: [PosService, AccountsService],
})
export class PosModule {}
