import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BANKONE_SERVICE, BANKONE_TSQ_SERVICE } from '../../bankone/constants';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import {
  AccountTransaction,
  InterBankTransfer,
  IntraBankTransfer,
  NameEnquiry,
  Reversal,
  TSQ,
} from './dto/transactions.dto';

@Injectable()
export class TransactionsSerice {
  protected AUTH_TOKEN = this.config.get('BANKONE_AUTH_TOKEN');
  protected APPZONE_ACCOUNT_NUMBER = '1100063610';

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

  async getBanks() {
    try {
      const response = await this.bankoneClient.axiosRef.get(
        this.endpoints.GET_COMMERCIAL_BANK + `/${this.AUTH_TOKEN}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new BadRequestException();
    }
  }

  async nameEnqiry(payload: NameEnquiry) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.NAME_ENQUIRY,
        {
          ...payload,
          Token: this.AUTH_TOKEN,
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new BadRequestException();
    }
  }

  async interBankTransfer(payload: InterBankTransfer) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.INTER_BANK_TRANSFER,
        {
          ...payload,
          AppzoneAccount: this.APPZONE_ACCOUNT_NUMBER,
          Token: this.AUTH_TOKEN,
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new BadRequestException();
    }
  }

  async interBankTsq(payload: TSQ) {
    try {
      const response = await this.bankoneTsqClient.axiosRef.post(
        this.endpoints.INTER_BANK_TSQ,
        {
          ...payload,
          Token: this.AUTH_TOKEN,
        },
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new BadRequestException();
    }
  }

  async intraBankTransfer(payload: IntraBankTransfer) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.INTRA_BANK_TRANSFER,
        {
          ...payload,
          Token: this.AUTH_TOKEN,
        },
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new BadRequestException();
    }
  }

  async creditCustomerAccount(payload: AccountTransaction) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.CREDIT_CUSTOMER_ACCOUNT,
        {
          ...payload,
          Token: this.AUTH_TOKEN,
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new BadRequestException();
    }
  }

  async debitCustomerAccount(payload: AccountTransaction) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.DEBIT_CUSTOMER_ACCOUNT,
        {
          ...payload,
          Token: this.AUTH_TOKEN,
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new BadRequestException();
    }
  }

  async intraBankTSQ(payload: TSQ) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.INTRA_BANK_TSQ,
        {
          ...payload,
          Token: this.AUTH_TOKEN,
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new BadRequestException();
    }
  }

  async reversal(payload: Reversal) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.REVERSAL,
        {
          ...payload,
          Token: this.AUTH_TOKEN,
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new BadRequestException();
    }
  }
}
