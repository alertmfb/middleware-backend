import { Module } from '@nestjs/common';
import { InvitesService } from './invites.servce';
import { InvitesController } from './invites.controller';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { PrismaService } from 'src/config/prisma.service';

@Module({
  imports: [
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.inviteSecret,
      signOptions: { expiresIn: '2d' },
    }),
  ],
  controllers: [InvitesController],
  providers: [InvitesService, PrismaService],
})
export class InvitesModule {}
