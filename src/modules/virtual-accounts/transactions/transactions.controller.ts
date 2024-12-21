import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsSerice } from './transactions.service';

@ApiTags('virtual')
@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionsService: TransactionsSerice) {}
}
