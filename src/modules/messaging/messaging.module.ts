import { Module } from '@nestjs/common';
import { BroadcastModule } from './broadcast/broadcast.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [BroadcastModule, TokenModule],
})
export class MessagingModule {}
