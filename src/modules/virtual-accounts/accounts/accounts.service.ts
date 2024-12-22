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
  CreateVirtualAccount,
  GetAccountTransactions,
  UpdateAccountTier,
} from './dto/accounts.dto';
import { AxiosError } from 'axios';
import { faker } from '@faker-js/faker';

@Injectable()
export class AccountsService {
  protected AUTH_TOKEN = this.config.get('BANKONE_AUTH_TOKEN');

  private endpoints = {
    ACCOUNT_ENQUIRY: '/thirdpartyapiservice/apiservice/Account/AccountEnquiry',
    BALANCE_ENQUIRY: '/BankOneWebAPI/api/Account/GetAccountByAccountNumber/2',
    CREATE_ACCOUNT_QUICK: '/BankOneWebAPI/api/Account/CreateAccountQuick/2',
    CREATE_CUSTOMER_AND_ACCOUNT:
      '/BankOneWebAPI/api/Account/CreateCustomerAndAccount/2',
    UPDATE_ACCOUNT_TIER: '/BankOneWebAPI/api/Account/UpdateAccountTier2/2',
    GET_ACCOUNTS_BY_CUSTOMER_ID:
      '/BankOneWebAPI/api/Account/GetAccountsByCustomerId/2',
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

  private products = [
    {
      id: '0193d868-2a38-76c6-925b-3cc3004e940d',
      slug: 'Sandbox /',
      bankoneCode: 112,
    },
    {
      id: '0193d86f-0a7b-722f-8af7-18cf7d268bd5',
      slug: 'ALERT-PosG /',
      bankoneCode: 113,
    },
  ];

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
          AuthenticationCode: this.config.get('AUTH_TOKEN'),
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

  async createVirtualAccount({ ProductId, ...payload }: CreateVirtualAccount) {
    // TODO: Fetch slugs from the database
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.CREATE_ACCOUNT_QUICK + `?authToken=${this.AUTH_TOKEN}`,
        {
          ...payload,
          AccountTier: '1',
          NotificationPreference: '0',
          // AccountInformationSource: 0,
          TransactionPermission: '0',
          AccountOfficerCode: '122',
          AccountOpeningTrackingRef: this.generateRef(),
          TransactionTrackingRef: this.generateRef(),
          ProductCode: this.productCodes.SANDBOX,
          name: '',
          LastName: this.getProductSlug(ProductId),
          OtherNames: payload.FirstName + ' ' + payload.LastName,
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

  async createSubAccount({ ProductId, ...payload }: CreateSubAccount) {
    //TODO: fetch slug from database
    try {
      //FIXME: create a pipe for this
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
          name: '',
          LastName: this.getProductSlug(ProductId),
          OtherNames: payload.FirstName + ' ' + payload.LastName,
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

  private getProductSlug(id: string): string {
    const product = this.products.filter((product, idx) => product.id === id);

    if (product.length < 1) {
      return 'Sandbox /';
    }

    return product[0].slug;
  }
}
