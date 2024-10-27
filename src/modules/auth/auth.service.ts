import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthenticatedUser } from './schema';
import { ConfigService } from '@nestjs/config';
import { authenticator } from '@otplib/preset-default';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
    private prisma: PrismaService,
  ) {}

  private MFA_SERVICE_NAME: string = 'Middleware';

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

  async setupMfa(user: AuthenticatedUser) {
    try {
      // await this.prisma.user.update({
      //   where: {
      //     email: user.email,
      //   },
      //   data: {
      //     hasMFAEnabled: true,
      //   },
      // });
      const secret = this.config.get('TOTP_SECRET');

      const otpauth = authenticator.keyuri(
        user.email,
        this.MFA_SERVICE_NAME,
        secret,
      );

      return otpauth;
    } catch (error) {
      throw new HttpException('could not complete', HttpStatus.BAD_REQUEST);
    }
  }

  async verifyTOTP(otp: string, accessToken: string) {
    const secret = this.config.get('TOTP_SECRET');

    authenticator.options = { window: 1, step: 30 };

    const isValid = authenticator.check(otp, secret);

    if (!isValid) {
      return { isAuthenticated: false, access_token: null };
    }

    return { isAuthenticated: isValid, access_token: accessToken };
  }
}
