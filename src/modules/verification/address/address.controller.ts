import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import {
  BusinessAddressVerification,
  IndividualAddressVerification,
} from './dto/address.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/modules/auth/metadata';

@Public()
@ApiTags('verification')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('individual')
  // @ApiResponse({ example: individualAddressVerificationResponse })
  async verifyIndividualAddress(
    @Body() payload: IndividualAddressVerification,
  ) {
    return await this.addressService.verifyIndividualAddress(payload);
  }

  @Post('business')
  async verifyBusinessAddress(@Body() payload: BusinessAddressVerification) {
    return await this.addressService.verifyBusinessAddress(payload);
  }

  @Get('status')
  async fetchAddressVerification(@Query('referenceId') referenceId: string) {
    return await this.addressService.fetchAddressVerification(referenceId);
  }
}
