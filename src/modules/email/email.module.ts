import { Module } from '@nestjs/common';
import { EmailServce } from './email.service';
import { EmailController } from './email.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EMAIL_SERVICE } from './constant';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  imports: [
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
  providers: [EmailServce, PrismaService],
  controllers: [EmailController],
})
export class EmailModule {}
