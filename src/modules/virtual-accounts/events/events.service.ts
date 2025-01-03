import { Injectable } from '@nestjs/common';
import { serviceLogger } from 'src/config/logger.config';
import { PrismaService } from 'src/config/prisma.service';
import { SaveAccountEvent } from './dto/events.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async saveAccount(payload: SaveAccountEvent) {
    try {
      serviceLogger.info(payload);
    } catch (error) {}
  }
}
