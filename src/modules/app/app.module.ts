import { Module } from '@nestjs/common';
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
import { MessagingModule } from '../messaging/messaging.module';
import { BroadcastModule } from '../messaging/broadcast/broadcast.module';
import { TokenModule } from '../messaging/token/token.module';
import { VirtualModule } from '../virtual-accounts/virtual.module';
import { AccountsModule as VirtualAccountsModule } from '../virtual-accounts/accounts/accounts.module';
import { TransactionsModule as VirtualTransactionsModule } from '../virtual-accounts/transactions/transactions.module';
import { CoreModule } from '../core-banking/core.module';
import { TransactionsModule as CoreTransactionsModule } from '../core-banking/transactions/transactions.module';
import { AccountsModule as CoreAccountsModule } from '../core-banking/accounts/accounts.module';
import { PosModule } from '../pos/pos.module';

const verificationChildren = [
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
];

const messagingChildren = [
  { path: 'messaging', module: BroadcastModule },
  { path: 'messaging', module: TokenModule },
];

const virtualChildren = [
  { path: 'virtual', module: VirtualAccountsModule },
  { path: 'virtual', module: VirtualTransactionsModule },
];

const coreChildren = [
  { path: 'core', module: CoreAccountsModule },
  { path: 'core', module: CoreTransactionsModule },
];

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
    MessagingModule,
    PosModule,
    VirtualModule,
    CoreModule,
    RouterModule.register([
      ...verificationChildren,
      ...messagingChildren,
      ...virtualChildren,
      ...coreChildren,
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
