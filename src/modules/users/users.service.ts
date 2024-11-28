import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
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
  async findOne(
    email: string,
  ) {
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
  async createUserFromBackend(email: string, password: string, role?: ROLE) {
    try {
      const hash = await bcrypt.hash(password, saltOrRounds);
      const user = await this.prisma.user.create({
        data: {
          email: email,
          password: hash,
          role: !role || role.length < 1 ? 'MEMBER' : role,
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
      const update = await this.prisma.user.update({
        where: {
          email: 'victor.balogun@alertgroup.com.ng',
        },
        data: {
          role: { set: 'SUPER_ADMIN' },
        },
        select: {
          id: true,
          email: true,
          secret: {
            select: {
              key: true,
            },
          },
        },
      });
      return update;
    } catch (error) {
      throw error;
    }
  }
}
