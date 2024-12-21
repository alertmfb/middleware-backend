import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsSerice } from './transactions.service';
import { Public } from 'src/modules/auth/metadata';

@Public()
@ApiTags('virtual')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionsService: TransactionsSerice) {}

  @Get('fetch-banks')
  async getBanks() {
    return await this.transactionsService.getBanks();
  }

  @Post('something')
  async something() {
    return 1234;
  }
}
