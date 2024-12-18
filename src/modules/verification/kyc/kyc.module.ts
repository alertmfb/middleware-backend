import { Module } from '@nestjs/common';
import { KycService } from './kyc.service';
import { KycController } from './kyc.controller';
import { DojahHttpModule } from '../dojah/dojah.module';
import { RegylHttpModule } from '../regyl/regyl.module';

@Module({
  imports: [DojahHttpModule, RegylHttpModule],
  controllers: [KycController],
  providers: [KycService],
})
export class KycModule {}
