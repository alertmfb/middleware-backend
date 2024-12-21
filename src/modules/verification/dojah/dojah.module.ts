import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpService } from '@nestjs/axios';
import { DojahHttpConfigService } from 'src/config/http.config';
import { DOJAH_SERVICE } from './constants';

const dynamicDojahHttpModule = HttpModule.registerAsync({
  useClass: DojahHttpConfigService,
});

@Module({
  imports: [dynamicDojahHttpModule],
  providers: [
    {
      provide: DOJAH_SERVICE,
      useFactory: (httpService: HttpService) => httpService,
      inject: [HttpService],
      useExisting: [dynamicDojahHttpModule],
    },
  ],
  exports: [DOJAH_SERVICE],
})
export class DojahHttpModule {}
