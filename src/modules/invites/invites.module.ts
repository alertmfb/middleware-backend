import { Module } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { PrismaService } from 'src/config/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EMAIL_SERVICE } from '../email/constant';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.inviteSecret,
      signOptions: { expiresIn: '2d' },
    }),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: EMAIL_SERVICE,
        useFactory: async (config: ConfigService) => ({
          transport: Transport.REDIS,
          options: {
            host: config.get('REDIS_HOST') || 'middleware-redis',
            port: config.get('REDIS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [InvitesController],
  providers: [InvitesService, PrismaService],
})
export class InvitesModule {}
