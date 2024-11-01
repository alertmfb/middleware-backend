import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
// import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt.auth.guard';
import { PrismaService } from 'src/config/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EMAIL_SERVICE } from '../email/constant';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
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
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PrismaService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [AuthService],
})
export class AuthModule {}
