import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BankoneHttpTsqConfigService } from 'src/config/http.config';
import { BANKONE_TSQ_SERVICE } from './constants';

const dynamicBankoneTsqHttpModule = HttpModule.registerAsync({
  useClass: BankoneHttpTsqConfigService,
});

@Module({
  imports: [dynamicBankoneTsqHttpModule],
  providers: [
    {
      provide: BANKONE_TSQ_SERVICE,
      useFactory: (httpService: HttpService) => httpService,
      inject: [HttpService],
      useExisting: [dynamicBankoneTsqHttpModule],
    },
  ],
  exports: [BANKONE_TSQ_SERVICE],
})
export class BankoneTSQHttpModule {}
