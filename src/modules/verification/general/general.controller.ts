import { Controller, Get } from '@nestjs/common';
import { GeneralService } from './general.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('verification')
@Controller('general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  @Get('banks')
  async getBanks() {
    return await this.generalService.getBanks();
  }
}
