import { Controller, Get, Post, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Public } from 'src/modules/auth/metadata';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCustomer, UpdateCustomer } from './dto/customers.dto';
import { createCustomerResponse } from './dto/customers.response';

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
  async getByCustomerId(@Query('customerId') customerId: string) {
    return await this.customersService.getCustomerByCustomerID(customerId);
  }

  @Get('get-by-accountNo')
  async getByAccountNo(@Query('accountNo') accountNo: string) {
    return await this.customersService.getCustomerByAccountNumber(accountNo);
  }

  @Get('get-by-phoneNo')
  async getByPhoneNo(@Query('phoneNumber') phoneNumber: string) {
    return this.customersService.getCustomerByPhoneNumber(phoneNumber);
  }

  @Get('get-by-bvn')
  async getByBVN(@Query('bvn') bvn: string) {
    return this.customersService.getCustomerByBvn(bvn);
  }

  @Get('phone-number-exists')
  async phoneNoExist(@Query('phoneNumber') phoneNumber: string) {
    return this.customersService.phoneNumberExists(phoneNumber);
  }

  @Get('email-exists')
  async emailExist(@Query('email') email: string) {
    return this.customersService.emailExists(email);
  }
}
