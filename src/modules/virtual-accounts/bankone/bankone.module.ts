import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import {
  BankoneHttpConfigService,
  BankoneHttpTsqConfigService,
} from 'src/config/http.config';
import { BANKONE_SERVICE, BANKONE_TSQ_SERVICE } from './constants';

const dynamicBankoneHttpModule = HttpModule.registerAsync({
  useClass: BankoneHttpConfigService,
});

const dynamicBankoneTsqHttpModule = HttpModule.registerAsync({
  useClass: BankoneHttpTsqConfigService,
});

@Module({
  imports: [dynamicBankoneHttpModule, dynamicBankoneTsqHttpModule],
  providers: [
    {
      provide: BANKONE_SERVICE,
      useFactory: (httpService: HttpService) => httpService,
      inject: [HttpService],
      useExisting: [dynamicBankoneHttpModule],
    },
    {
      provide: BANKONE_TSQ_SERVICE,
      useFactory: (httpService: HttpService) => httpService,
      inject: [HttpService],
      useExisting: [dynamicBankoneTsqHttpModule],
    },
  ],
  exports: [BANKONE_SERVICE, BANKONE_TSQ_SERVICE],
})
export class BankoneHttpModule {}
