import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BankoneHttpConfigService } from 'src/config/http.config';
import { BANKONE_SERVICE } from './constants';

const dynamicBankoneHttpModule = HttpModule.registerAsync({
  useClass: BankoneHttpConfigService,
});

@Module({
  imports: [dynamicBankoneHttpModule],
  providers: [
    {
      provide: BANKONE_SERVICE,
      useFactory: (httpService: HttpService) => httpService,
      inject: [HttpService],
      useExisting: [dynamicBankoneHttpModule],
    },
  ],
  exports: [BANKONE_SERVICE],
})
export class BankoneHttpModule {}
