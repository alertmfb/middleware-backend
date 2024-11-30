import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProduct,
  DisableProduct,
  EnableProduct,
  getProductsResponse,
} from './dto/products.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiResponse({ example: getProductsResponse })
  async getProducts() {
    return await this.productsService.getProducts();
  }

  @Post('/create')
  @ApiBody({ type: CreateProduct })
  async createProduct(@Body() payload: CreateProduct) {
    return await this.productsService.createProduct(payload);
  }

  @Post('/enable')
  @ApiBody({ type: EnableProduct })
  async enableProduct(@Body() payload: EnableProduct) {
    return await this.productsService.enableProduct(payload);
  }

  @Post('/disable')
  @ApiBody({ type: DisableProduct })
  async disbaleProduct(@Body() payload: DisableProduct) {
    return await this.productsService.disableProduct(payload);
  }
}
