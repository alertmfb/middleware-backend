import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BANKONE_SERVICE } from '../../bankone/constants';
import { HttpService } from '@nestjs/axios';
import {
  AccountEnquiry,
  AccountFreeze,
  AccountLien,
  AccountPnd,
  AccountStatus,
  CloseAccount,
  CreateSubAccount,
  CreateAccount,
  GetAccountTransactions,
  UpdateAccountTier,
  GenerateStatement,
} from './dto/accounts.dto';
import { AxiosError } from 'axios';
import { faker } from '@faker-js/faker';

@Injectable()
export class AccountsService {
  protected AUTH_TOKEN = this.config.get('BANKONE_AUTH_TOKEN');
  protected INSTITUTION_CODE = '100626';

  private endpoints = {
    ACCOUNT_ENQUIRY: '/thirdpartyapiservice/apiservice/Account/AccountEnquiry',
    BALANCE_ENQUIRY: '/BankOneWebAPI/api/Account/GetAccountByAccountNumber/2',
    CREATE_ACCOUNT_QUICK: '/BankOneWebAPI/api/Account/CreateAccountQuick/2',
    CREATE_CUSTOMER_AND_ACCOUNT:
      '/BankOneWebAPI/api/Account/CreateCustomerAndAccount/2',
    UPDATE_ACCOUNT_TIER: '/BankOneWebAPI/api/Account/UpdateAccountTier2/2',
    GET_ACCOUNTS_BY_CUSTOMER_ID:
      '/BankOneWebAPI/api/Account/GetAccountsByCustomerId/2',
    GENERATE_STATEMENT:
      '/BankOneWebAPI/api/Account/GenerateAccountStatement2/2',
    GET_TRANSACTIONS: '/BankOneWebAPI/api/Account/GetTransactions/2',
    FREEZE_ACCOUNT: '/thirdpartyapiservice/apiservice/Account/FreezeAccount',
    UNFREEZE_ACCOUNT:
      '/thirdpartyapiservice/apiservice/Account/UnfreezeAccount',
    CHECK_FREEZE_STATUS:
      '/thirdpartyapiservice/apiservice/Account/CheckFreezeStatus',
    PLACE_LIEN: '/thirdpartyapiservice/apiservice/Account/PlaceLien',
    UNPLACE_LIEN: '/thirdpartyapiservice/apiservice/Account/UnPlaceLien',
    CHECK_LIEN_STATUS:
      '/thirdpartyapiservice/apiservice/Account/CheckLienStatus',
    ACTIVATE_PND: '/thirdpartyapiservice/apiservice/Account/ActivatePND',
    DEACTIVATE_PND: '/thirdpartyapiservice/apiservice/Account/DeactivatePND',
    CHECK_PND_STATUS: '/thirdpartyapiservice/apiservice/Account/CheckPNDStatus',
    CLOSE_ACCOUNT: '/BankOneWebAPI/api/Account/CloseAccount/2',
  };

  private productCodes = {
    SANDBOX: 112,
    POS: 113,
  };

  constructor(
    private config: ConfigService,
    @Inject(BANKONE_SERVICE) private bankoneClient: HttpService,
  ) {}

  async accountEnquiry(payload: AccountEnquiry) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.ACCOUNT_ENQUIRY,
        {
          AccountNo: payload.AccountNo,
          AuthenticationCode: this.AUTH_TOKEN,
        },
      );

      response.data?.ProductCode && delete response.data.ProductCode;

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async balanceEnquiry(accountNumber: string) {
    try {
      const response = await this.bankoneClient.axiosRef.get(
        this.endpoints.BALANCE_ENQUIRY +
          `?accountNumber=${accountNumber}&authToken=${this.AUTH_TOKEN}&computeWithdrawableBalance=true`,
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async createAccount(payload: CreateAccount) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.CREATE_ACCOUNT_QUICK + `?authToken=${this.AUTH_TOKEN}`,
        {
          ...payload,
          AccountTier: '1',
          NotificationPreference: '0',
          // AccountInformationSource: 0,
          OtherNames: payload.FirstName,
          FirstName: payload.OtherNames,
          TransactionPermission: '0',
          AccountOfficerCode: '122',
          AccountOpeningTrackingRef: this.generateRef(),
          TransactionTrackingRef: this.generateRef(),
          ProductCode: this.productCodes.SANDBOX,
        },
      );

      response.data?.ProductCode && delete response.data.ProductCode;
      response.data?.Message?.BankoneAccountNumber &&
        delete response.data.Message.BankoneAccountNumber;

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.status, {
          cause: error.cause,
        });
      }
      // throw error
      throw new InternalServerErrorException();
    }
  }

  async createSubAccount(payload: CreateSubAccount) {
    try {
      if (!payload?.CustomerId) {
        throw new BadRequestException('Customer Id not found');
      }

      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.CREATE_ACCOUNT_QUICK + `?authToken=${this.AUTH_TOKEN}`,
        {
          ...payload,
          AccountTier: '1',
          NotificationPreference: '0',
          TransactionPermission: '0',
          AccountOfficerCode: '122',
          AccountOpeningTrackingRef: this.generateRef(),
          TransactionTrackingRef: this.generateRef(),
          ProductCode: this.productCodes.SANDBOX,
          AuthenticationCode: this.config.get('AUTH_TOKEN'),
        },
      );

      response.data?.ProductCode && delete response.data.ProductCode;

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(
          { message: error.response?.data },
          error.status,
          {
            cause: error.cause,
          },
        );
      }

      throw new InternalServerErrorException();
    }
  }

  async updateAccountTier(payload: UpdateAccountTier) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.UPDATE_ACCOUNT_TIER +
          `?authToken=${this.config.get('AUTH_TOKEN')}`,
        payload,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async getSubAccounts(customerId: string) {
    try {
      const response = await this.bankoneClient.axiosRef.get(
        this.endpoints.GET_ACCOUNTS_BY_CUSTOMER_ID +
          `?customerId=${customerId}&authToken=${this.config.get('AUTH_TOKEN')}`,
      );

      response?.data?.Accounts &&
        response.data.Accounts.length > 0 &&
        response.data.Accounts.forEach((account) => {
          delete account?.productCode;
          delete account?.accessLevel;
          delete account?.accountNumber;
        });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async generateStatement({
    fromDate,
    accountNumber,
    arrangeAsc,
    isPdf,
    showInstrumentNumber,
    showReversedTransactions,
    showSerialNumber,
    showTransactionDate,
    toDate,
  }: GenerateStatement) {
    try {
      const payload: Record<keyof GenerateStatement, Date | boolean | string> =
        {
          fromDate: new Date(fromDate).toISOString(),
          toDate: new Date(toDate).toISOString(),
          accountNumber: accountNumber,
          arrangeAsc: arrangeAsc === true ? true : false,
          isPdf: isPdf === true ? true : false,
          showInstrumentNumber: showInstrumentNumber === true ? true : false,
          showReversedTransactions:
            showReversedTransactions === true ? true : false,
          showSerialNumber: showSerialNumber === true ? true : false,
          showTransactionDate: showTransactionDate === true ? true : false,
        };

      const response = await this.bankoneClient.axiosRef.get(
        `${this.endpoints.GENERATE_STATEMENT}?authToken=${this.config.get('AUTH_TOKEN')}&accountNumber=${payload.accountNumber}&fromDate=${payload.fromDate}&toDate=${payload.toDate}&isPdf=${payload.isPdf}&arrangeAsc=${payload.arrangeAsc}&showSerialNumber=${payload.showSerialNumber}&showTransactionDate=${payload.showTransactionDate}&showReversedTransactions=${payload.showReversedTransactions}&showInstrumentNumber=${payload.showInstrumentNumber}&institutionCode=${this.config.get('INSTITUTION_CODE')}
        `,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async getAccountTransactions(params: GetAccountTransactions) {
    try {
      const response = await this.bankoneClient.axiosRef.get(
        this.endpoints.GET_TRANSACTIONS +
          `?accountNumber=${params.accountNumber}&fromDate=${params.fromDate}&toDate=${params.toDate}&authToken=${this.AUTH_TOKEN}`,
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async freezeAccount(payload: AccountFreeze) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.FREEZE_ACCOUNT,
        {
          ...payload,
          AuthenticationCode: this.AUTH_TOKEN,
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async unfreezeAccount(payload: AccountFreeze) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.UNFREEZE_ACCOUNT,
        {
          ...payload,
          AuthenticationCode: this.AUTH_TOKEN,
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async checkFreezeStatus(payload: AccountStatus) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.CHECK_FREEZE_STATUS,
        {
          ...payload,
          AuthenticationCode: this.AUTH_TOKEN,
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async lienAccount(payload: AccountLien) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.PLACE_LIEN,
        {
          ...payload,
          AuthenticationCode: this.AUTH_TOKEN,
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async unlienAccount(payload: AccountLien) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.UNPLACE_LIEN,
        {
          ...payload,
          AuthenticationCode: this.AUTH_TOKEN,
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async checkLienStatus(payload: AccountStatus) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.CHECK_LIEN_STATUS,
        {
          ...payload,
          AuthenticationCode: this.AUTH_TOKEN,
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async activatePnd(payload: AccountPnd) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.ACTIVATE_PND,
        {
          ...payload,
          AuthenticationCode: this.AUTH_TOKEN,
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async deactivatePnd(payload: AccountPnd) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.DEACTIVATE_PND,
        {
          ...payload,
          AuthenticationCode: this.AUTH_TOKEN,
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async checkPndStatus(payload: AccountStatus) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.CHECK_PND_STATUS,
        {
          ...payload,
          AuthenticationCode: this.AUTH_TOKEN,
        },
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async closeAccount(payload: CloseAccount) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.FREEZE_ACCOUNT +
          `?accountNumber=${payload.accountNumber}&narration=${payload.narration}&authToken=${this.AUTH_TOKEN}`,
        {},
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  /** */

  private generateRef(): string {
    return faker.string.alphanumeric({ length: 13 });
  }
}
