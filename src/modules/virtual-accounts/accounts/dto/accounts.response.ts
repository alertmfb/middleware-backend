export const createAccountResponse = {
  IsSuccessful: true,
  CustomerIDInString: null,
  Message: {
    AccountNumber: '1100063878',
    CustomerID: '006387',
    FullName: 'Sandbox / Yemi Bolonga',
    CreationMessage: null,
    Id: 12822,
  },
  TransactionTrackingRef: null,
  Page: null,
};

export const createSubAccountResponse = {
  IsSuccessful: true,
  CustomerIDInString: null,
  Message: {
    AccountNumber: '1100229780',
    BankoneAccountNumber: '00440031010022978',
    CustomerID: '022978',
    FullName: 'Johnson Black',
    CreationMessage: null,
    Id: 506495,
  },
  TransactionTrackingRef: null,
  Page: null,
};

export const accountEnquiryResponse = {
  Name: 'okponyia chioma',
  FirstName: null,
  LastName: null,
  Email: null,
  PhoneNo: null,
  Nuban: '1100001561',
  Number: '00010011010000156',
  ProductCode: '101',
  PhoneNuber: '09072307496',
  BVN: '22407294749',
  AvailableBalance: 11487166.942,
  LedgerBalance: 11487166.942,
  Status: 'Active',
  Tier: '1',
  MaximumBalance: 11020501.326,
  MaximumDeposit: null,
  IsSuccessful: true,
  ResponseMessage: null,
  PNDStatus: 'InActive',
  LienStatus: 'InActive',
  FreezeStatus: 'InActive',
  RequestStatus: true,
  ResponseDescription: 'Successful',
  ResponseStatus: null,
};

export const balanceEnquiryResponse = {
  AvailableBalance: '1,010.00',
  LedgerBalance: '1,010.00',
  WithdrawableBalance: '510.00',
  AccountType: 'Savings/Current Account',
};

export const generateStatementResponse = {
  IsSuccessful: true,
  CustomerIDInString: null,
  Message:
    'JVBERi0xLjQKJeLjz9MKNCAwIG9iago8PC9MZW5ndGggMTQ1Ny9GaWx0ZXIvRmxhdGVEZWNvZGU+PnN0cmVhbQp4nJ1YyXLbOBC96ytwdKokBACx8SjbcsqJIzkWJzVTlQst0x6lLCpDUTWVv0+DAGUtTVCJD16E97qB1wsaZoSTESeMmFTA98Vq8N/gMhtw+MAIkj0NGBkJxajl7o9JNvgCAEYV46kmxz+rl0ECP3RqqRREME04LBlSFYPnGAm8qVQ4DrdUp0RwKlUvSzTYQFSaMnsm0UpqbEu0hgp5JpEbQZlomUKmVOgzqRJgYudUJlSLc5la0pT/CVMxS1XyR0wlKFc7Zkqt2me6HBDkI+TGB2eF/O8iqHlCrXEcwpWlPHHYeVjvSouDdQgF+LHg8xQgDZBbCBdwlg4jxj...=',
  TransactionTrackingRef: null,
  Page: null,
};

export const getSubAccountsResponse = {
  address: 'string',
  age: '23',
  BVN: '01901012829',
  branchCode: '',
  customerID: '001212',
  dateOfBirth: '2/10/2001 12:00:00 AM',
  email: 'shoes@gmail.com',
  gender: 'Male',
  localGovernmentArea: null,
  name: 'Raul, Brag',
  phoneNumber: '67542196743',
  state: '',
  Accounts: [
    {
      accessLevel: '1',
      accountNumber: '00750011050001210',
      accountStatus: 'Active',
      accountType: 'SavingsOrCurrent',
      availableBalance: '0.00',
      branch: 'Head Office',
      customerID: '001212',
      accountName: 'Raul Brag',
      productCode: '105',
      dateCreated: '10/1/2024 4:29:27 AM',
      lastActivityDate: '',
      ledgerBalance: '0.00',
      NUBAN: '1100012101',
      referenceNo: null,
      withdrawableAmount: '0.00',
      kycLevel: '3',
    },
  ],
  PostalAddress: null,
  BusinessPhoneNo: null,
  TaxIDNo: null,
  BusinessName: null,
  TradeName: null,
  IndustrialSector: null,
  CompanyRegDate: null,
  ContactPersonName: null,
  BusinessType: null,
  BusinessNature: null,
  WebAddress: null,
  DateIncorporated: null,
  BusinessCommencementDate: null,
  RegistrationNumber: null,
  CustomerMembers: null,
  TheDirectors: null,
};

export const getAccountTransactionsResponse = {
  IsSuccessful: true,
  CustomerIDInString: null,
  Message: [],
  TransactionTrackingRef: null,
  Page: null,
};

export const freezeAccountResponse = {
  RequestStatus: true,
  ResponseDescription: 'Account frozen - 1100001561',
  ResponseStatus: 'Successful',
};

export const unfreezeAccountResponse = {
  RequestStatus: true,
  ResponseDescription: 'Account successfully unfrozen.',
  ResponseStatus: 'Successful',
};

export const freezeAccountStatusResponse = {
  RequestStatus: true,
  ResponseDescription: 'Account is not frozen.',
  ResponseStatus: 'InActive',
};

export const placeLienResponse = {
  RequestStatus: true,
  ResponseDescription: 'Lien sucessfully placed on account.',
  ResponseStatus: 'Successful',
};

export const removeLienResponse = {
  RequestStatus: true,
  ResponseDescription: 'Lien sucessfully deactivated on account.',
  ResponseStatus: 'Successful',
};

export const lienStatusResponse = {
  RequestStatus: true,
  ResponseDescription: 'There is no lien on this account.',
  ResponseStatus: 'InActive',
};

export const activatePndResponse = {
  RequestStatus: true,
  ResponseDescription: 'PND successfully activated on account.',
  ResponseStatus: 'Successful',
};

export const deactivatePndResponse = {
  RequestStatus: true,
  ResponseDescription: 'PND successfully deactivated on account.',
  ResponseStatus: 'Successful',
};

export const pndStatusResponse = {
  RequestStatus: true,
  ResponseDescription: 'There is no PND restriction on this account.',
  ResponseStatus: 'InActive',
};
