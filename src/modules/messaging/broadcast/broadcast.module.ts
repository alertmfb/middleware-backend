import { Module } from '@nestjs/common';
import { BroadcastService } from './broadcast.service';
import { BroadcastController } from './broadcast.controller';
import { TermiiHttpModule } from '../termii/termii.module';
import { PayloadTransformPipe } from 'src/pipes/payload.pipe';

@Module({
  imports: [TermiiHttpModule],
  controllers: [BroadcastController],
  providers: [BroadcastService, PayloadTransformPipe],
})
export class BroadcastModule {}
