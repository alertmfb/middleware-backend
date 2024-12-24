import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BANKONE_SERVICE } from 'src/modules/bankone/constants';
import { CreateCustomer, UpdateCustomer } from './dto/customers.dto';
import { AxiosError } from 'axios';

@Injectable()
export class CustomersService {
  protected AUTH_TOKEN = this.config.get('BANKONE_AUTH_TOKEN');

  private endpoints = {
    CREATE_CUSTOMER: '/BankOneWebAPI/api/Customer/GetByCustomerID/2',
    UPDATE_CUSTOMER: '/BankOneWebAPI/api/Customer/UpdateCustomer/2',
    GET_CUSTOMER_BY_CUSTOMER_ID:
      '/BankOneWebAPI/api/Customer/GetByCustomerID/2',
    GET_CUSTOMER_BY_ACCOUNT_NUMBER:
      '/BankOneWebAPI/api/Customer/GetByAccountNo2/2',
  };

  constructor(
    private config: ConfigService,
    @Inject(BANKONE_SERVICE) private bankoneClient: HttpService,
  ) {}

  async createCustomer(payload: CreateCustomer) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.CREATE_CUSTOMER + `?authToken=${this.AUTH_TOKEN}`,
        {
          ...payload,
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

  async updateCustomer(payload: UpdateCustomer) {
    try {
      const response = await this.bankoneClient.axiosRef.post(
        this.endpoints.UPDATE_CUSTOMER + `?authToken=${this.AUTH_TOKEN}`,
        {
          ...payload,
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

  async getCustomerByAccountNumber(accountNumber: string) {
    try {
      const response = await this.bankoneClient.axiosRef.get(
        this.endpoints.GET_CUSTOMER_BY_ACCOUNT_NUMBER +
          `?authToken=${this.AUTH_TOKEN}&accountNumber=${accountNumber}`,
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

  async getCustomerByCustomerID(customerId: string) {
    try {
      const response = await this.bankoneClient.axiosRef.get(
        this.endpoints.GET_CUSTOMER_BY_ACCOUNT_NUMBER +
          `?authToken=${this.AUTH_TOKEN}&CustomerID=${customerId}`,
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
