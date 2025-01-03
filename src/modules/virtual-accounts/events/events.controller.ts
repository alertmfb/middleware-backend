import { Controller } from '@nestjs/common';
import { EventsService } from './events.service';
import { Public } from 'src/modules/auth/metadata';

@Public()
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
}
