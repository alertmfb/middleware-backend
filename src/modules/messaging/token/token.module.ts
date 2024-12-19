import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TermiiHttpModule } from '../termii/termii.module';
import { PayloadTransformPipe } from 'src/pipes/payload.pipe';

@Module({
  imports: [TermiiHttpModule],
  controllers: [TokenController],
  providers: [TokenService, PayloadTransformPipe],
})
export class TokenModule {}
