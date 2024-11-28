import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async disableUserMFA(userId: number) {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          has2FAEnabled: false,
        },
        select: {
          id: true,
        },
      });

      return { success: true, message: '2FA has been disabled for this user' };
    } catch (error) {
      throw new BadRequestException('Could not disable 2fa for user');
    }
  }
}
