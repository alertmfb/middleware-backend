import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ROLE } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { Iniviter } from './schema';

type DeodedPayload = {
  email: string;
  role: ROLE;
  iat: number;
  exp: number;
};

type Payload = {
  email: string;
  role: ROLE;
};

@Injectable()
export class InvitesService {
  constructor(
    private jwtServie: JwtService,
    private prisma: PrismaService,
  ) {}

  async inviteUser(payload: Payload, inviter: Iniviter): Promise<string> {
    try {
      if (inviter.role !== 'SUPER_ADMIN') {
        throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const token = this.jwtServie.sign(payload, { expiresIn: '7d' });

      await this.prisma.invite.create({
        data: {
          email: payload.email,
          role: payload.role,
          userEmail: inviter.email,
        },
      });

      return token;
    } catch (error) {
      throw new HttpException(
        `DB Error: ${JSON.stringify(error)}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async acceptInvitation(token: string) {
    try {
      const payload = this.jwtServie.verify<DeodedPayload>(token);
      return { token, payload };
    } catch (error) {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
  }
}
