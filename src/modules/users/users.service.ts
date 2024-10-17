import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  ): Promise<Pick<User, 'id' | 'email' | 'password' | 'role'> | undefined> {
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
          role: !role || role.length < 1 ? 'MEMBER' : 'MEMBER',
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
}
