import { Controller, Get } from '@nestjs/common';
import { PosService } from './pos.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/metadata';

@ApiTags('pos')
@Public()
@ApiBearerAuth()
@Controller('pos')
export class PosController {
  constructor(private readonly posService: PosService) {}

  @Get('businesses')
  async getBusinesses() {
    return this.posService.getBusinesses();
  }
}
