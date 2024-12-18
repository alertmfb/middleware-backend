import { Module } from '@nestjs/common';
import { GeneralModule } from './general/general.module';
import { IdentityModule } from './identity/identity.module';
import { KybModule } from './kyb/kyb.module';
import { KycModule } from './kyc/kyc.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [GeneralModule, IdentityModule, KybModule, KycModule, AddressModule],
})
export class VerificationModule {}
