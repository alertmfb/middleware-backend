import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomer {
  LastName: string;
  OtherNames: string;
  City: string;
  Address: string;

  @ApiProperty({ minimum: 0, maximum: 1 })
  Gender: number;
  DateOfBirth: string;
  PhoneNo: string;
  PlaceOfBirth: string;
  NationalIdentityNo: string;
  NextOfKinName: string;
  NextOfKinPhoneNumber: string;
  ReferralName: string;
  ReferralPhoneNo: string;
  BankVerificationNumber: string;
  Email: string;
  // HasCompleteDocumentatiOn: string
  AccountOfficerCode: string;
}

export class UpdateCustomer extends CreateCustomer {
  CustomerType: string;
  BranchID: string;
  BankVerificationNumber: string;
}
