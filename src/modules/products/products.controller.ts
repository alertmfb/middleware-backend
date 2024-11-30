import { Controller, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Post('/create')
  async createProduct() {}

  @Post('/enable')
  async enableProduct() {}

  @Post('/disable')
  async disbaleProduct() {}
}
