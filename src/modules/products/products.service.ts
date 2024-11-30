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
      // const product = await this.prisma.products.
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async enableProduct(payload: EnableProduct) {
    try {
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async disableProduct(payload: DisableProduct) {
    try {
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
