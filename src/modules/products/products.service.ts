import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import {
  CreateProduct,
  DisableProduct,
  EnableProduct,
} from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProducts() {
    try {
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async createProduct(payload: CreateProduct) {
    try {
      const product = await this.prisma.product.create({
        data: payload,
        select: { name: true },
      });

      return {
        success: true,
        messgae: product.name,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async enableProduct(payload: EnableProduct) {
    try {
      const product = await this.prisma.product.update({
        where: {
          id: payload.id,
        },
        data: {
          isEnabled: true,
        },
        select: {
          name: true,
        },
      });

      return {
        success: true,
        message: `${product.name} has been enabled`,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async disableProduct(payload: DisableProduct) {
    try {
      const product = await this.prisma.product.update({
        where: {
          id: payload.id,
        },
        data: {
          isEnabled: false,
        },
        select: {
          name: true,
        },
      });

      return {
        success: true,
        message: `${product.name} has been disabled`,
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
