import { Body, Controller, Post } from '@nestjs/common';
import { BroadcastService } from './broadcast.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  SendBulkMessageSMS,
  SendMessageSMS,
  SendMessageWhatsapp,
} from './dto/broadcast.dto';
import { Public } from 'src/modules/auth/metadata';
import {
  sendBulkMessageSMSResponse,
  sendMessageSMSResponse,
  sendMessageWhatsappResponse,
} from './dto/responses';

@Public()
@ApiTags('messaging')
@Controller('broadcast')
export class BroadcastController {
  constructor(private readonly broadcastService: BroadcastService) {}

  @Post('sms')
  @ApiBody({ type: SendMessageSMS })
  @ApiResponse({ example: sendMessageSMSResponse })
  async sendMessageSMS(@Body() payload: SendMessageSMS) {
    return await this.broadcastService.sendMessageSMS(payload);
  }

  @Post('sms/bulk')
  @ApiResponse({ example: sendBulkMessageSMSResponse })
  async sendBulkMessageSMS(@Body() payload: SendBulkMessageSMS) {
    return await this.broadcastService.sendBulkMessageSMS(payload);
  }

  @Post('whatsapp')
  @ApiBody({ type: SendMessageSMS })
  @ApiResponse({ example: sendMessageWhatsappResponse })
  async sendMessageWhatsapp(@Body() payload: SendMessageWhatsapp) {
    return await this.broadcastService.sendMessageWhatsapp(payload);
  }
}
