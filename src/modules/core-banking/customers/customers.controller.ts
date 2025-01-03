import { Controller, Get, Post, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Public } from 'src/modules/auth/metadata';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCustomer, UpdateCustomer } from './dto/customers.dto';
import {
  createCustomerResponse,
  existsResponse,
  getByAccountNumber,
  getByBvn,
  getById,
  getByPhoneNo,
} from './dto/customers.response';

@Public()
@ApiTags('core')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('create')
  @ApiBody({ type: CreateCustomer })
  @ApiResponse({ example: createCustomerResponse })
  async createCustomer(payload: CreateCustomer) {
    return await this.customersService.createCustomer(payload);
  }

  @Post('update')
  @ApiBody({ type: UpdateCustomer })
  async updateCustomer(payload: UpdateCustomer) {
    return await this.customersService.updateCustomer(payload);
  }

  @Get('get-by-id')
  @ApiResponse({ example: getById })
  async getByCustomerId(@Query('customerId') customerId: string) {
    return await this.customersService.getCustomerByCustomerID(customerId);
  }

  @Get('get-by-accountNo')
  @ApiResponse({ example: getByAccountNumber })
  async getByAccountNo(@Query('accountNo') accountNo: string) {
    return await this.customersService.getCustomerByAccountNumber(accountNo);
  }

  @Get('get-by-phoneNo')
  @ApiResponse({ example: getByPhoneNo })
  async getByPhoneNo(@Query('phoneNumber') phoneNumber: string) {
    return this.customersService.getCustomerByPhoneNumber(phoneNumber);
  }

  @Get('get-by-bvn')
  @ApiResponse({ example: getByBvn })
  async getByBVN(@Query('bvn') bvn: string) {
    return this.customersService.getCustomerByBvn(bvn);
  }

  @Get('phone-number-exists')
  @ApiResponse({ example: existsResponse })
  async phoneNoExist(@Query('phoneNumber') phoneNumber: string) {
    return this.customersService.phoneNumberExists(phoneNumber);
  }

  @Get('email-exists')
  @ApiResponse({ example: existsResponse })
  async emailExist(@Query('email') email: string) {
    return this.customersService.emailExists(email);
  }
}
