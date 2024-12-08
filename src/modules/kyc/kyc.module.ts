import { Module } from '@nestjs/common';
import { KycController } from './kyc.controller';
import { KycService } from './kyc.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        baseURL: config.get('DOJAH_BASE_URL'),
        headers: {
          Authorization: config.get('DOJAH_API_KEY'),
          AppId: config.get('DOJAH_APP_ID'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [KycController],
  providers: [KycService, ConfigService],
})
export class KycModule {}
