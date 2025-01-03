import { ApiProperty } from '@nestjs/swagger';

export class AccountEnquiry {
  AccountNo: string = '1100063548';
}

export class CreateVirtualAccount {
  BVN: string = '';

  @ApiProperty({ minimum: 0, maximum: 1, description: '0 = Male, 1 = Female' })
  Gender: number = 1;

  FirstName: string = '';
  LastName: string = '';
  PlaceOfBirth: string = '';
  DateOfBirth: string = 'yyyy-MM-dd';
  PhoneNo: string = '';
  Address: string = '';
  Email: string = '';
  ProductId: string = '0193d868-2a38-76c6-925b-3cc3004e940d';
}

export class CreateVirtualSubAccount extends CreateVirtualAccount {
  CustomerId: string = '67hajl01';
}

export class UpdateAccountTier {
  AccountNumber: string;
  AccountTier: number;
  SkipAddressVerification: string;
  CustomerId: string;
  FullName: string;
}

export class GetVirtualAccountTransactions {
  accountNumber: string;
  fromDate: string = 'yyyy-MM-dd';
  toDate: string = 'yyyy-MM-dd';
  numberOfItems: number;
}

export class AccountStatus {
  AccountNo: string;
}

export class AccountFreeze extends AccountStatus {
  // AuthenticationCode: string;
  ReferenceID: string;
  Reason: string;
}

export class AccountLien extends AccountFreeze {
  Amount: string;
}

export class AccountPnd extends AccountStatus {}

export class CloseAccount {
  accountNumber: string;
  narration: string;
}
