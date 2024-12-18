import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { InvitesModule } from '../invites/invites.module';
import { EmailModule } from '../email/email.module';
import { MessagesModule } from '../messages/messages.module';
import { CodesModule } from '../codes/codes.module';
import { AdminModule } from '../admin/admin.module';
import { ProductsModule } from '../products/products.module';
import { VerificationModule } from '../verification/verification.module';
import { RouterModule } from '@nestjs/core';
import { AddressModule } from '../verification/address/address.module';
import { IdentityModule } from '../verification/identity/identity.module';
import { KybModule } from '../verification/kyb/kyb.module';
import { KycModule } from '../verification/kyc/kyc.module';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    InvitesModule,
    EmailModule,
    MessagesModule,
    CodesModule,
    ProductsModule,
    VerificationModule,
    RouterModule.register([
      {
        path: 'verification',
        module: AddressModule,
      },
      {
        path: 'verification',
        module: IdentityModule,
      },
      {
        path: 'verification',
        module: KycModule,
      },
      {
        path: 'verification',
        module: KybModule,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
