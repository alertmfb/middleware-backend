import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ROLES } from 'src/common/roles.enum';
import { PrismaService } from 'src/config/prisma.service';
import { ModifyUserRole, SuspendUser, ToggleUserMFA } from './dto/admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async toggleUserMFA(payload: ToggleUserMFA) {
    try {
      await this.prisma.user.update({
        where: {
          id: payload.id,
        },
        data: {
          has2FAEnabled: payload.status,
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

  async suspendUserById(payload: SuspendUser) {
    try {
      await this.prisma.user.update({
        where: {
          id: payload.id,
        },
        data: {
          isSuspended: payload.status,
        },
        select: {
          isSuspended: true,
        },
      });

      return { success: true, message: 'This user has been suspended' };
    } catch (error) {
      throw new BadRequestException('Unable to suspend user');
    }
  }

  async modifyUserRole(payload: ModifyUserRole) {
    try {
      const updated = await this.prisma.user.update({
        where: {
          id: payload.userId,
        },
        data: {
          role: payload.role,
        },
        select: {
          role: true,
        },
      });

      return { success: true, message: updated.role };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getDesignations() {
    try {
      const designations = await this.prisma.designation.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      return designations;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async createDesignation(name: string) {
    try {
      // const isPresent = await this.prisma.designation.findUnique({
      //   where: { name: name },
      // });

      // if (!isPresent) {
      //   throw new BadRequestException('Designation alreay exists');
      // }

      const designation = await this.prisma.designation.upsert({
        where: {
          name: name,
        },
        update: {
          name: name,
          updatedAt: new Date(),
        },
        create: {
          name: name,
          updatedAt: new Date(),
        },
        select: {
          id: true,
          name: true,
        },
      });

      return { success: true, message: designation.name };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
