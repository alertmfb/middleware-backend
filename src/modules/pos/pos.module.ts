import { Module } from '@nestjs/common';
import { PosService } from './pos.service';
import { PosController } from './pos.controller';
import { AccountsService } from '../core-banking/accounts/accounts.service';
import { BankoneHttpModule } from '../bankone/bankone.module';

@Module({
  imports: [BankoneHttpModule],
  controllers: [PosController],
  providers: [PosService, AccountsService],
})
export class PosModule {}
