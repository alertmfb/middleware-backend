import { Body, Controller, Post } from '@nestjs/common';
import { BroadcastService } from './broadcast.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  SendBulkMessageSMS,
  SendMessageSMS,
  SendMessageWhatsapp,
} from './dto/broadcast.dto';

@ApiTags('messaging')
@Controller('broadcast')
export class BroadcastController {
  constructor(private readonly broadcastService: BroadcastService) {}

  @Post('sms')
  @ApiBody({ type: SendMessageSMS })
  async sendMessageSMS(@Body() payload: SendMessageSMS) {
    return await this.broadcastService.sendMessageSMS(payload);
  }

  @Post('sms/bulk')
  async sendBulkMessageSMS(@Body() payload: SendBulkMessageSMS) {
    return await this.broadcastService.sendBulkMessageSMS(payload);
  }

  @Post('whatsapp')
  @ApiBody({ type: SendMessageSMS })
  async sendMessageWhatsapp(@Body() payload: SendMessageWhatsapp) {
    return await this.broadcastService.sendMessageWhatsapp(payload);
  }
}
