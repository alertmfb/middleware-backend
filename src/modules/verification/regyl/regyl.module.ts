import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { RegylHttpConfigService } from 'src/config/http.config';
import { REGYL_SERVICE } from './constants';

const dynamicRegylHttpModule = HttpModule.registerAsync({
  imports: [ConfigModule],
  useClass: RegylHttpConfigService,
});

@Module({
  imports: [dynamicRegylHttpModule],
  providers: [
    {
      provide: REGYL_SERVICE,
      useFactory: (httpService: HttpService) => httpService,
      inject: [HttpService],
      useExisting: [dynamicRegylHttpModule],
    },
  ],
  exports: [REGYL_SERVICE],
})
export class RegylHttpModule {}
