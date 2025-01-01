import { Controller, Get } from '@nestjs/common';
import { PosService } from './pos.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pos')
@Controller('pos')
export class PosController {
  constructor(private readonly posService: PosService) {}

  @Get('businesses')
  async getBusinesses() {}
}
