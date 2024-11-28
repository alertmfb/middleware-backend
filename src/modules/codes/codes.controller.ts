import { Body, Controller, Get, Post } from '@nestjs/common';
import { CodesService } from './codes.service';
import {
  createCodeResponse,
  getCodesResponse,
  PromoCode,
} from './dto/codes.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/metadata';

@ApiTags('codes')
@ApiBearerAuth()
@Controller('codes')
export class CodesController {
  constructor(private codesService: CodesService) {}

  @Public()
  @Get()
  @ApiResponse({ example: getCodesResponse })
  async getCodes() {
    return await this.codesService.getCodes();
  }

  @Public()
  @ApiResponse({ example: createCodeResponse })
  @Post('create')
  async createCode(@Body() payload: PromoCode) {
    return await this.codesService.createCode(payload);
  }
}
