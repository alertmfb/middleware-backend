import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ROLE } from '../../common/prismaTypes';
import { PrismaService } from 'src/config/prisma.service';
import { Iniviter } from './schema';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { authenticator } from 'otplib';

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
    private authService: AuthService,
  ) {}

  protected saltOrRounds = 10;

  async inviteUser(
    payload: Payload,
    inviter: Iniviter,
  ): Promise<{ token: string }> {
    try {
      const token = this.jwtServie.sign(
        { email: payload.email },
        { expiresIn: '7d' },
      );

      await this.prisma.invite.create({
        data: {
          email: payload.email,
          role: payload.role,
          inviterEmail: inviter.email,
          inviteToken: token,
        },
      });

      return { token: token };
    } catch (error) {
      throw new HttpException(
        `DB Error: ${JSON.stringify(error)}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createPassword(
    { password }: { password: string },
    inviteToken: string,
  ) {
    try {
      const { email } = this.jwtServie.verify(inviteToken);
      const secret = authenticator.generateSecret();

      const hash = await bcrypt.hash(password, this.saltOrRounds);

      const user = await this.prisma.user.create({
        data: {
          email: email,
          password: hash,
          secret: {
            create: {
              key: secret,
            },
          },
        },
        select: {
          email: true,
        },
      });
      // GENERATE SECRET
      // CREATE USER WITH SECRET

      return user;
    } catch (error) {
      throw new HttpException('error', HttpStatus.BAD_REQUEST);
    }
  }

  async generateQRCodeString(inviteToken: string) {
    const { email } = this.jwtServie.verify(inviteToken);

    const { secret } = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        secret: {
          select: {
            key: true,
          },
        },
      },
    });

    const otpauth = authenticator.keyuri(email, 'Middleware', secret.key);

    return otpauth;
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
