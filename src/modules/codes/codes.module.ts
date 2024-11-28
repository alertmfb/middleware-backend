import { Module } from '@nestjs/common';
import { CodesController } from './codes.controller';
import { CodesService } from './codes.service';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  controllers: [CodesController],
  providers: [CodesService, PrismaService],
})
export class CodesModule {}
