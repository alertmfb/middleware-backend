import {
  Controller,
  Get,
  Inject,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { Public } from '../auth/metadata';
import { EmailServce } from './email.service';
import { EMAIL_SERVICE } from './constant';
import { ApiExcludeController } from '@nestjs/swagger';
import { NotifySignIn, PasswordReset } from './dto/email.dto';

@Public()
@ApiExcludeController()
@Controller('email')
export class EmailController implements OnApplicationBootstrap {
  constructor(
    @Inject(EMAIL_SERVICE) private client: ClientProxy,
    private emailServie: EmailServce,
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
    Logger.log('Redis Microservice running', 'NestMicroservice');
  }

  @MessagePattern('email.inviteUser')
  async InviteUser(@Payload() payload: { email: string; token: string }) {
    await this.emailServie.inviteUser(payload);
  }

  @MessagePattern('email.notifySignIn')
  async NotifySignIn(@Payload() payload: NotifySignIn) {
    await this.emailServie.notifySignIn(payload);
  }

  @MessagePattern('email.resetPassword')
  async ResetPassword(@Payload() payload: PasswordReset) {
    await this.emailServie.resetPassword(payload);
  }
}
