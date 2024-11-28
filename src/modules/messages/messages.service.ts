import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { Message } from './dto/messages.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async getMessages() {
    try {
      const messages = await this.prisma.message.findMany();
      return messages;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async createMessage(payload: Message) {
    try {
      const message = await this.prisma.message.create({
        data: payload,
        select: { id: true },
      });

      return { success: true, id: message.id };
    } catch (error) {
      throw new BadRequestException('Unable to create message');
    }
  }
}
