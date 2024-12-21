import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TermiiHttpConfigService } from 'src/config/http.config';
import { TERMII_SERVICE } from './constants';

const dynamicTermiiHttpModule = HttpModule.registerAsync({
  useClass: TermiiHttpConfigService,
});

@Module({
  imports: [dynamicTermiiHttpModule],
  providers: [
    {
      provide: TERMII_SERVICE,
      useFactory: (httpService: HttpService) => httpService,
      inject: [HttpService],
      useExisting: [dynamicTermiiHttpModule],
    },
  ],
  exports: [TERMII_SERVICE],
})
export class TermiiHttpModule {}
