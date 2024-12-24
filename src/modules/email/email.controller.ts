import {
  Controller,
  Get,
  Inject,
  Ip,
  Logger,
  OnApplicationBootstrap,
  Req,
} from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { Public } from '../auth/metadata';
import { EmailServce } from './email.service';
import { EMAIL_SERVICE } from './constant';
import { ApiExcludeController } from '@nestjs/swagger';
import {
  NotifySignIn,
  NotifyPasswordChanged,
  PasswordReset,
  Notify2faEnabled,
} from './dto/email.dto';

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

  @MessagePattern('email.notify2faEnabled')
  async Notify2faEnabled(@Payload() payload: Notify2faEnabled) {
    await this.emailServie.notiy2faEnabled(payload);
  }

  @MessagePattern('email.notifySignIn')
  async NotifySignIn(
    @Payload() payload: NotifySignIn,
    @Ip() ip: string,
    @Req() req: Request,
  ) {
    const ipAddress = req.headers.get('x-forwarded-for') ?? '';
    await this.emailServie.notifySignIn(payload, ipAddress);
  }

  @MessagePattern('email.resetPassword')
  async ResetPassword(@Payload() payload: PasswordReset) {
    await this.emailServie.resetPassword(payload);
  }

  @MessagePattern('email.notifyPasswordChanged')
  async PasswordChanged(@Payload() payload: NotifyPasswordChanged) {
    await this.emailServie.notifyPasswordChanged(payload);
  }
}
