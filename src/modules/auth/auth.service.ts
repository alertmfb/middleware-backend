import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthenticatedUser } from './schema';
import { ConfigService } from '@nestjs/config';
import { authenticator } from '@otplib/preset-default';
import { PrismaService } from 'src/config/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import { EMAIL_SERVICE } from '../email/constant';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
    private prisma: PrismaService,
    @Inject(EMAIL_SERVICE) private client: ClientProxy,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      return null;
    }

    const { password, ...result } = user;
    return result;
  }

  async signIn(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyTOTP(otp: string, accessToken: string, ip: string) {
    const allowedEmails = ['bar@gmail.com', 'oluwatobi.oseni@gmail.com'];

    const { email } = this.jwtService.verify(accessToken);
    // const secret = this.config.get('TOTP_SECRET');

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

    authenticator.options = { window: 1, step: 30 };

    if (allowedEmails.includes(email)) {
      const isValid = authenticator.check(otp, this.config.get('TOTP_SECRET'));

      if (!isValid) {
        return { isAuthenticated: false, access_token: null };
      }

      return { isAuthenticated: isValid, access_token: accessToken };
    }

    const isValid = authenticator.check(otp, secret.key);

    if (!isValid) {
      return { isAuthenticated: false, access_token: null };
    }

    this.client
      .send('email.notifySignIn', { email: email, ip: ip })
      .subscribe();

    return { isAuthenticated: isValid, access_token: accessToken };
  }

  async resetPassword(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
        },
      });

      if (!user) {
        throw new NotFoundException('This user does not exist');
      }

      const secret = authenticator.generateSecret();
      const otp = authenticator.generate(secret);
      const expiryToken = this.jwtService.sign(
        { id: user.id, otp: otp },
        { expiresIn: '10m' },
      );

      const newEntry = await this.prisma.passwordReset.create({
        data: {
          expiryToken: expiryToken,
          opt: otp,
          userId: user.id,
        },
        select: {
          id: true,
        },
      });

      this.client
        .send('email.resetPassword', { email: email, otp: otp })
        .subscribe();

      return { id: newEntry.id };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
