import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { DojahHttpModule } from '../dojah/dojah.module';
import { RegylHttpModule } from '../regyl/regyl.module';

@Module({
  imports: [DojahHttpModule, RegylHttpModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
