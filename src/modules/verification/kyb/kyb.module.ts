import { Module } from '@nestjs/common';
import { KybService } from './kyb.service';
import { KybController } from './kyb.controller';

@Module({
  controllers: [KybController],
  providers: [KybService],
})
export class KybModule {}
