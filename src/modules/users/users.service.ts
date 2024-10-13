import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export type UserEntity = Pick<User, 'id' | 'email' | 'password' | 'role'>;

const saltOrRounds = 10;

@Injectable({})
export class UsersService {
  constructor(private prisma: PrismaService) {}

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

  async createUser(email: string, password: string) {
    try {
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
      throw error;
    }
  }
}
