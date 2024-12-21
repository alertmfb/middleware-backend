import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BANKONE_SERVICE, BANKONE_TSQ_SERVICE } from '../bankone/constants';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TransactionsSerice {
  protected AUTH_TOKEN = this.config.get('BANKONE_AUTH_TOKEN');

  private endpoints = {
    GET_COMMERCIAL_BANK:
      '/ThirdPartyAPIService/APIService/BillsPayment/GetCommercialBanks',
    NAME_ENQUIRY: '/thirdpartyapiservice/apiservice/Transfer/NameEnquiry',
    INTER_BANK_TRANSFER:
      '/thirdpartyapiservice/apiservice/Transfer/InterBankTransfer',
    INTER_BANK_TSQ:
      '/thirdpartyapiservice/apiservice/Transactions/TransactionStatusQuery',
    INTRA_BANK_TRANSFER:
      'thirdpartyapiservice/apiservice/CoreTransactions/LocalFundsTransfer',
    CREDIT_CUSTOMER_ACCOUNT:
      '/thirdpartyapiservice/apiservice/CoreTransactions/Credit',
    DEBIT_CUSTOMER_ACCOUNT:
      '/thirdpartyapiservice/apiservice/CoreTransactions/Debit',
    INTRA_BANK_TSQ:
      '/thirdpartyapiservice/apiservice/CoreTransactions/TransactionStatusQuery',
    REVERSAL: '/thirdpartyapiservice/apiservice/CoreTransactions/Reversal',
  };

  constructor(
    private config: ConfigService,
    @Inject(BANKONE_SERVICE) private bankoneClient: HttpService,
    @Inject(BANKONE_TSQ_SERVICE) private bankoneTsqClient: HttpService,
  ) {}
}
