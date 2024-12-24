import { Controller, Get } from '@nestjs/common';
import { GeneralService } from './general.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/modules/auth/metadata';
import { banksResponse } from './dto/general.response';

@Public()
@ApiTags('verification')
@Controller('general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  @Get('banks')
  @ApiResponse({ example: banksResponse })
  async getBanks() {
    return await this.generalService.getBanks();
  }
}
