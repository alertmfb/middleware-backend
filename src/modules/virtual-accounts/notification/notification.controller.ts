import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TRANSACTION_RESPONSE } from './constants';
import { SendTransactionNotification } from './dto/notification.dto';
import { Public } from 'src/modules/auth/metadata';

@Public()
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern(TRANSACTION_RESPONSE)
  async sendTransactionNotification(
    @Payload() payload: SendTransactionNotification,
  ) {
    await this.notificationService.forwardNotification(payload);
  }
}
