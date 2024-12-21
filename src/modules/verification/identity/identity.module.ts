import { Module } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { IdentityController } from './identity.controller';
import { DojahHttpModule } from '../dojah/dojah.module';
import { RegylHttpModule } from '../regyl/regyl.module';

@Module({
  imports: [DojahHttpModule, RegylHttpModule],
  controllers: [IdentityController],
  providers: [IdentityService],
})
export class IdentityModule {}
