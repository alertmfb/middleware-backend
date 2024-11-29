import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { ROLE, User } from '../../common/prismaTypes';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
export type UserEntity = Pick<User, 'id' | 'email' | 'password' | 'role'>;
const saltOrRounds = 10;
@Injectable({})
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async findOne(email: string) {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: email,
        },
        select: {
          id: true,
          email: true,
          password: true,
          role: true,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getUsers() {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
          role: true,
          createdAt: true,
        },
      });
      return users;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          dob: true,
          email: true,
          firstname: true,
          lastname: true,
          phoneNumber: true,
          role: true,
          Designation: {
            select: {
              name: true,
            },
          },
        },
      });

      return user;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async createUser(email: string, password: string, token: string) {
    try {
      const tok = this.jwtService.verify(token);
      if (!tok) {
        throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
      }
      const hash = await bcrypt.hash(password, saltOrRounds);
      const user = await this.prisma.user.create({
        data: {
          email: email,
          password: hash,
        },
        select: {
          id: true,
        },
      });
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async suspendUserById(id: number) {
    try {
      await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          isSuspended: true,
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

  async createUserFromBackend(email: string, password: string, role?: ROLE) {
    try {
      const hash = await bcrypt.hash(password, saltOrRounds);
      const user = await this.prisma.user.create({
        data: {
          email: email,
          password: hash,
          role: !role || role.length < 1 ? 'JUNIOR' : role,
        },
        select: {
          id: true,
        },
      });
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async tamper() {
    try {
      const user = await this.prisma.user.delete({
        where: {
          email: 'oluwatobi.oseni@alertgroup.com.ng',
        },
        select: {
          id: true,
          email: true,
        },
      });

      return user.id;
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException(error?.message);
    }
  }
}
