import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralController } from './general.controller';
import { DojahHttpModule } from '../dojah/dojah.module';
import { RegylHttpModule } from '../regyl/regyl.module';

@Module({
  imports: [DojahHttpModule, RegylHttpModule],
  controllers: [GeneralController],
  providers: [GeneralService],
})
export class GeneralModule {}
