import { Controller } from '@nestjs/common';
import { EventsService } from './events.service';
import { Public } from 'src/modules/auth/metadata';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SAVE_ACCOUNT } from './constants';
import { SaveAccountEvent } from './dto/events.dto';

@Public()
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @MessagePattern(SAVE_ACCOUNT)
  async saveAccount(@Payload() payload: SaveAccountEvent) {
    return this.eventsService.saveAccount(payload);
  }
}
