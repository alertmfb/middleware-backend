import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import {
  createMessageResponse,
  getMessagesResponse,
  Message,
} from './dto/messages.dto';
import { Public } from '../auth/metadata';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Public()
  @Get('/')
  @ApiResponse({ example: getMessagesResponse })
  async getMessages() {
    return await this.messagesService.getMessages();
  }

  @Public()
  @Post('create')
  @ApiResponse({ example: createMessageResponse })
  async createMessage(@Body() payload: Message) {
    return await this.messagesService.createMessage(payload);
  }
}
