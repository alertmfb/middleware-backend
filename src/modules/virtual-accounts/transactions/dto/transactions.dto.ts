import { ApiProperty } from '@nestjs/swagger';

export class NameEnquiry {
  AccountNumber: string;
  BanCode: string;
}

export class InterBankTransfer {
  Amount: string;
  AppzoneAccount: string;
  PayerAccountNumber: string;
  Payer: string;
  ReceiverBankCode: string;
  ReceiverAccountNumber: string;
  ReceiverName: string;
  ReceiverPhoneNumber: string;
  ReceiverAccountType: string;
  ReceiverKYC: string;
  ReceiverBVN: string;
  @ApiProperty({ maxLength: 12 })
  TransactionReference: string;
  Narration: string;
  NIPSessionID: string;
}

export class TSQ {
  RetrievalReference: string;
  TransactionDate: string = 'yyyy-MM-dd';
  @ApiProperty({ enum: ['LOCALFUNDTRANSFER', 'INTERBANKTRANSFER'] })
  TransactionType: string;
  Amount: string;
}

export class IntraBankTransfer {
  Amount: string;
  Fee: string;
  FromAccountNumber: string;
  ToAccountNumber: string;
  @ApiProperty({ maxLength: 12 })
  RetrievalReference: string;
  @ApiProperty({ maxLength: 100 })
  Narration: string;
}

export class AccountTransaction {
  RetrievalReference: string;
  AccountNumber: string;
  NibssCode: string;
  Amount: string;
  Fee: string;
  Narration: string;
  GLCode: string;
}

export class Reversal extends TSQ {}
