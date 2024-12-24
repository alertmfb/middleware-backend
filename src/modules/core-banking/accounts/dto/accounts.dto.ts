import { ApiProperty } from '@nestjs/swagger';

export class AccountEnquiry {
  AccountNo: string = '1100063548';
}

export class CreateAccount {
  BVN: string = '';

  @ApiProperty({ minimum: 0, maximum: 1, description: '0 = Male, 1 = Female' })
  Gender: number = 1;

  FirstName: string = '';
  LastName: string = '';
  OtherNames: string = '';
  PlaceOfBirth: string = '';
  DateOfBirth: string = 'yyyy-MM-dd';
  PhoneNo: string = '';
  Address: string = '';
  Email: string = '';
}

export class CreateSubAccount extends CreateAccount {
  CustomerId: string = '67hajl01';
}

export class UpdateAccountTier {
  AccountNumber: string;
  AccountTier: number;
  SkipAddressVerification: string;
  CustomerId: string;
  FullName: string;
}

export class GenerateStatement {
  accountNumber: string;
  fromDate: Date = new Date('2024-01-05');
  toDate: Date = new Date('2040-01-10');
  isPdf: boolean;
  arrangeAsc: boolean;
  showSerialNumber: boolean;
  showTransactionDate: boolean;
  showReversedTransactions: boolean;
  showInstrumentNumber: boolean;
}

export class GetAccountTransactions {
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
