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

  @Get('invite')
  sendInvite() {
    this.client
      .send('email.inviteUser', {
        email: 'balogunv50@gmail.com',
        token: 'apkojrinuqb89jdw0i39qj8hv5nuicom0q9nridsoP',
      })
      .subscribe();

    return { message: 'sent' };
  }

  @MessagePattern('email.inviteUser')
  async InviteUser(@Payload() payload: { email: string; token: string }) {
    await this.emailServie.inviteUser(payload);
  }

  @Get('admin')
  async makeAdmin() {
    const id = await this.emailServie.makeAdmin();
    return { id: id };
  }
}
