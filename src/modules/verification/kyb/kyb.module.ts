import { Module } from '@nestjs/common';
import { KybService } from './kyb.service';
import { KybController } from './kyb.controller';
import { DojahHttpModule } from '../dojah/dojah.module';
import { RegylHttpModule } from '../regyl/regyl.module';

@Module({
  imports: [DojahHttpModule, RegylHttpModule],
  controllers: [KybController],
  providers: [KybService],
})
export class KybModule {}
