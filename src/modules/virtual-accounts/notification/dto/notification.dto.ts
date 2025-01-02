export class SendTransactionNotification {
  Amount: string;
  AccountNumber: string;
  AccountName: string;
  AvailableBalance: string;
  LedgerBalance: string;
  Narration: string;
  Channel: number;
  Charge: number;
  DateTime: Date;
  RecipientAccountNumber: string;
  RecipientAccountName: string;
  TransactionReference: string;
  TransType: string;
  ResponseCode: string;
  GlCode: string;
  Description: string;
  AcconuntProductCode: string;
  NUBAN: string;
  Merchant: string;
  SecondaryAccount: string;
  Vendor: {
    url: string;
    authKey: string;
  };
}
