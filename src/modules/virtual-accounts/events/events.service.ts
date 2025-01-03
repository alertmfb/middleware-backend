import { Injectable } from '@nestjs/common';
import { serviceLogger } from 'src/config/logger.config';
import { PrismaService } from 'src/config/prisma.service';
import { SaveAccountEvent } from './dto/events.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async saveAccount(payload: SaveAccountEvent) {
    try {
      const account = await this.prisma.virtualAccount.create({
        data: {
          accountName: payload.Name,
          accountNo: payload.Nuban,
          productCode: payload.ProductCode,
        },
      });

      if (account.id) {
        serviceLogger.info(`account created:  ${account.id}`);
      }
    } catch (error) {
      serviceLogger.error(error, {
        class: EventsService.name,
        method: this.saveAccount.name,
      });
    }
  }
}
