import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
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
  NotificationPayload,
  Reversal,
  TSQ,
} from './dto/transactions.dto';
import { PosVendorSlug, RecepientInfo, vendorSlugs } from './constants';
import { serviceLogger } from 'src/config/logger.config';
import {
  TRANSACTION_NOTIFICATION,
  TRANSACTION_RESPONSE,
} from '../notification/constants';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class TransactionsService {
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

  private slugData: Record<PosVendorSlug, RecepientInfo> = {
    'ALERT-POS-E /': {
      url: 'https://api-middleware-staging.alertmfb.com.ng/api/sharedServices/v1/virtual/accounts/account-enquiry',
      authKey: '12345',
    },
    'ALERT-POS-G /': { url: '', authKey: '' },
    'ALERT-POS-P /': { url: '', authKey: '' },
  };

  private forbiddenProductCodes = ['104', '105'];

  constructor(
    private config: ConfigService,
    @Inject(BANKONE_SERVICE) private bankoneClient: HttpService,
    @Inject(BANKONE_TSQ_SERVICE) private bankoneTsqClient: HttpService,
    @Inject(TRANSACTION_NOTIFICATION) private notificationClient: ClientProxy,
    private prisma: PrismaService,
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
      const account = await this.prisma.virtualAccount.findFirst({
        where: {
          accountNo: payload.PayerAccountNumber,
        },
        select: {
          productCode: true,
          accountNo: true,
        },
      });

      /** This block checks if the accout number making the transaction belongs to a POS account */

      if (
        account.accountNo &&
        this.forbiddenProductCodes.includes(account.productCode)
      ) {
        throw new ForbiddenException('you cannot perform this action');
      }
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
      if (error instanceof ForbiddenException) {
        throw error;
      }

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
      const account = await this.prisma.virtualAccount.findFirst({
        where: {
          accountNo: payload.FromAccountNumber,
        },
        select: {
          productCode: true,
          accountNo: true,
        },
      });

      /** This block checks if the accout number making the transaction belongs to a POS account */

      if (
        account.accountNo &&
        this.forbiddenProductCodes.includes(account.productCode)
      ) {
        throw new ForbiddenException('you cannot perform this action');
      }

      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.INTRA_BANK_TRANSFER,
        {
          ...payload,
          AuthenticationKey: this.AUTH_TOKEN,
        },
      );
      return response.data;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }

      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }

      serviceLogger.error(error, {
        class: TransactionsService.name,
        method: this.interBankTransfer.name,
      });
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

  async forwardNotification(payload: NotificationPayload) {
    try {
      const vendor = this.getNotificationRecepientBySlug(
        payload.AccountName,
        vendorSlugs,
      );

      if (!vendor) {
        throw new BadRequestException('Invalid virtual account transaction');
      }

      this.notificationClient
        .send(TRANSACTION_RESPONSE, { ...payload, Vendor: vendor })
        .subscribe();

      return 'sent';
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      serviceLogger.error(error, {
        class: TransactionsService.name,
        method: this.forwardNotification.name,
      });
      throw new InternalServerErrorException();
    }
  }

  /** */
  private getNotificationRecepientBySlug(
    accountName: string,
    vendorSlugs: PosVendorSlug[],
  ) {
    const slug = vendorSlugs.find((slug, index) => accountName.includes(slug));

    return this.slugData[slug];
  }

  private getNotificationRecepientByProductCode(
    productCode: string,
  ): RecepientInfo {
    switch (productCode) {
      case '123':
        return {
          url: '',
          authKey: '',
        };
      case '234':
        return {
          url: '',
          authKey: '',
        };
      case '345':
        return {
          url: '',
          authKey: '',
        };
      default:
        return {
          url: '',
          authKey: '',
        };
    }
  }
}
