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
import { KycModule } from '../kyc/kyc.module';
import { VerificationModule } from '../verification/verification.module';
import { RouterModule } from '@nestjs/core';
import { AddressModule } from '../verification/address/address.module';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    InvitesModule,
    EmailModule,
    MessagesModule,
    CodesModule,
    ProductsModule,
    KycModule,
    VerificationModule,
    RouterModule.register([
      {
        path: 'verification',
        module: AddressModule,
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
