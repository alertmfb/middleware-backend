import { Controller, Get } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/metadata';
import { AccountsService } from '../core-banking/accounts/accounts.service';

@ApiTags('consumer-banking')
@ApiBearerAuth()
@Public()
@Controller('consumer')
export class ConsumerController {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly accountsService: AccountsService,
  ) {}

  @Get('customers')
  async getCustomers() {
    return this.consumerService.getCustomers();
  }
}
