import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { BankoneHttpModule } from 'src/modules/bankone/bankone.module';

@Module({
  imports: [BankoneHttpModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
