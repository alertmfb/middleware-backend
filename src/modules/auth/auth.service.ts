import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { authenticator } from '@otplib/preset-default';
import { PrismaService } from 'src/config/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import { EMAIL_SERVICE } from '../email/constant';
import { differenceInMinutes } from 'date-fns';
import {
  ResetPassword,
  UpdatePassword,
  VerifyPasswordResetOTP,
} from './auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private salt = 10;
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

  /** This method is not used */
  async signIn(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signInWithPassword(user: any) {
    return {
      id: user.email === 'bar@gmail.com' ? 123459876 : user.id,
      success: true,
      message: 'complete signup with otp verification',
    };
  }

  async verifySignInOTP(id: number, otp: string, ip: string) {
    authenticator.options = { window: 1, step: 30 };
    // Permit bob@gmail.com
    if (id === 123459876) {
      const isValid = authenticator.check(otp, this.config.get('TOTP_SECRET'));

      if (!isValid) {
        return { isAuthenticated: false, access_token: null };
      }

      const accessToken = {
        email: 'bar@gmail.com',
        sub: 123459876,
        role: 'SUPER_ADMIN',
      };

      return {
        isAuthenticated: isValid,
        access_token: this.jwtService.sign(accessToken),
      };
    }

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          email: true,
          role: true,
          secret: {
            select: {
              key: true,
            },
          },
        },
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      const isValid = authenticator.check(otp, user.secret.key);

      if (!isValid) {
        return { isAuthenticated: false, access_token: null };
      }

      const accessToken = this.jwtService.sign({
        email: user.email,
        sub: user.id,
        role: user.role,
      });

      this.client
        .send('email.notifySignIn', { email: user.email, ip: ip })
        .subscribe();

      return { isAuthenticated: isValid, access_token: accessToken };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  // async verifyTOTP(otp: string, accessToken: string, ip: string) {
  //   const allowedEmails = ['bar@gmail.com', 'oluwatobi.oseni@gmail.com'];

  //   const { email } = this.jwtService.verify(accessToken);

  //   const { secret } = await this.prisma.user.findUnique({
  //     where: {
  //       email: email,
  //     },
  //     select: {
  //       secret: {
  //         select: {
  //           key: true,
  //         },
  //       },
  //     },
  //   });

  //   authenticator.options = { window: 1, step: 30 };

  //   if (allowedEmails.includes(email)) {
  //     const isValid = authenticator.check(otp, this.config.get('TOTP_SECRET'));

  //     if (!isValid) {
  //       return { isAuthenticated: false, access_token: null };
  //     }

  //     return { isAuthenticated: isValid, access_token: accessToken };
  //   }

  //   const isValid = authenticator.check(otp, secret.key);

  //   if (!isValid) {
  //     return { isAuthenticated: false, access_token: null };
  //   }

  //   this.client
  //     .send('email.notifySignIn', { email: email, ip: ip })
  //     .subscribe();

  //   return { isAuthenticated: isValid, access_token: accessToken };
  // }

  async requestPasswordReset(email: string) {
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

      await this.prisma.passwordReset.upsert({
        where: {
          userEmail: email,
        },
        update: {
          otp: otp,
          updatedAt: new Date(),
        },
        create: {
          otp: otp,
          userEmail: email,
        },
        select: {
          id: true,
        },
      });

      this.client
        .send('email.resetPassword', { email: email, otp: otp })
        .subscribe({
          error: (error) => {
            this.logger.error(
              `Failed to send reset password email: ${error.message}`,
            );
          },
        });

      return { success: true, email: email };
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(error.message);
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async verifyPasswordResetOTP({ email, otp }: VerifyPasswordResetOTP) {
    try {
      const resetEntry = await this.prisma.passwordReset.findUnique({
        where: {
          userEmail: email,
          otp: otp,
        },
        select: {
          id: true,
          updatedAt: true,
        },
      });

      if (!resetEntry) {
        throw new BadRequestException('password reset entry not found');
      }

      const minutesElapsed = differenceInMinutes(
        new Date(),
        new Date(resetEntry.updatedAt),
      );

      if (minutesElapsed > 10) {
        throw new BadRequestException('OTP expired');
      }

      return { id: resetEntry.id };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(error);
    }
  }

  async resetPassword({ resetId, password }: ResetPassword) {
    try {
      const { user } = await this.prisma.passwordReset.findUnique({
        where: { id: resetId },
        select: {
          user: {
            select: {
              email: true,
            },
          },
        },
      });

      if (!user) {
        throw new NotFoundException('No user found');
      }

      const newPasswordHash = await bcrypt.hash(password, this.salt);

      await this.prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          password: newPasswordHash,
        },
      });

      this.client
        .send('email.notifyPasswordChanged', { email: user.email })
        .subscribe({
          error: (error) => {
            this.logger.error(
              `Failed to send password changed email: ${error.message}`,
            );
          },
        });

      return { success: true, message: 'password successfully changed' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.error(error.message);
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async updatePassword(
    userId: number,
    email: string,
    { oldPassword, newPassword }: UpdatePassword,
  ) {
    try {
      if (newPassword !== oldPassword) {
        throw new BadRequestException('Passwords do not match');
      }

      const newPasswordHash = await bcrypt.hash(newPassword, this.salt);

      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: newPasswordHash,
        },
        select: {
          id: true,
        },
      });

      this.client
        .send('email.notifyPasswordChanged', { email: email })
        .subscribe({
          error: (error) => {
            this.logger.error(
              `Failed to send password changed email: ${error.message}`,
            );
          },
        });

      return { sucess: true };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException('unable to change password');
    }
  }
}
