import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ROLE } from '../../common/prismaTypes';
import { PrismaService } from 'src/config/prisma.service';
import { Iniviter } from './schema';
import * as bcrypt from 'bcrypt';
import { authenticator } from 'otplib';
import { ClientProxy } from '@nestjs/microservices';
import { EMAIL_SERVICE } from '../email/constant';
import { CreateProfile } from './dto/invites.dto';

type Payload = {
  email: string;
  role: ROLE;
  designationId: number;
};

@Injectable()
export class InvitesService {
  private readonly logger = new Logger(InvitesService.name);
  protected companyDomains = ['alertgroup.com.ng', 'alertmfb.com.ng'];
  protected saltOrRounds = 10;

  constructor(
    private jwtServie: JwtService,
    private prisma: PrismaService,
    @Inject(EMAIL_SERVICE) private client: ClientProxy,
  ) {}

  async inviteUser(payload: Payload, inviter: Iniviter) {
    try {
      const isExistingUser = await this.prisma.user.findUnique({
        where: {
          email: payload.email,
        },
        select: {
          id: true,
        },
      });

      // Check if user exists
      if (isExistingUser?.id) {
        throw new BadRequestException('User already onboarded');
      }

      // Validate email
      if (!this.isValidCompanyEmail(payload.email)) {
        throw new BadRequestException(
          'Only valid company emails can be invited',
        );
      }

      const token = this.jwtServie.sign(
        { email: payload.email, designationId: payload.designationId },
        { expiresIn: '7d' },
      );

      await this.prisma.invite.upsert({
        where: {
          email: payload.email,
        },
        create: {
          email: payload.email,
          role: payload.role,
          designationId: payload.designationId,
          inviterEmail: inviter.email,
          inviteToken: token,
        },
        update: {
          inviteToken: token,
        },
      });

      this.client
        .send('email.inviteUser', { email: payload.email, token: token })
        .subscribe();

      return { token: token };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async createProfile(
    { password, firstname, lastname, dob, phoneNumber }: CreateProfile,
    inviteToken: string,
  ) {
    try {
      const { email, designationId } = this.jwtServie.verify(inviteToken);
      const secret = authenticator.generateSecret();

      const hash = await bcrypt.hash(password, this.saltOrRounds);

      const user = await this.prisma.user.create({
        data: {
          firstname: firstname,
          lastname: lastname,
          dob: dob,
          phoneNumber: phoneNumber,
          designationId: designationId,
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

      this.client.send('email.notify2faEnabled', { email: user.email });

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async generateQRCodeString(inviteToken: string) {
    try {
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

      return { otpauth: otpauth, setupKey: secret.key };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  private isValidCompanyEmail(email: string): boolean {
    const split = email.split('@');
    const domain = split[split.length - 1];

    if (this.companyDomains.includes(domain)) {
      return true;
    }

    return false;
  }
}
