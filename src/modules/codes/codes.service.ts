import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { PromoCode } from './dto/codes.dto';

@Injectable()
export class CodesService {
  constructor(private prisma: PrismaService) {}

  async getCodes() {
    try {
      const codes = await this.prisma.promoCode.findMany();
      return codes;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async createCode(payload: PromoCode) {
    try {
      const code = await this.prisma.promoCode.create({
        data: payload,
        select: {
          id: true,
        },
      });

      return { success: true, id: code.id };
    } catch (error) {
      throw new BadRequestException('Unable to create promo code');
    }
  }
}
