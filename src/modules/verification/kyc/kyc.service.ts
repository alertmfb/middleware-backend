import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DOJAH_SERVICE } from '../dojah/constants';
import { AxiosError } from 'axios';
import { ValidateBvn } from './dto/kyc.dto';

@Injectable()
export class KycService {
  protected dojahEndpoints = {
    BVN_BASIC_ENDPOINT: '/api/v1/kyc/bvn/full',
    BVN_ADVANCED_ENDPOINT: '/api/v1/kyc/bvn/advance',
    BVN_VALIDATE_ENDPOINT: '/api/v1/kyc/bvn',
    PHONE_BASIC_ENDPOINT: '/api/v1/kyc/phone_number/basic',
    PHONE_ADVANCED_ENDPOINT: '/api/v1/kyc/phone_number',
    NUBAN_KYC_STATUS_ENDPOINT: '/api/v1/kyc/nuban/status',
    NIN_ENDPOINT: '/api/v1/kyc/nin',
  };

  constructor(@Inject(DOJAH_SERVICE) private dojahClient: HttpService) {}

  async bvnLookupBasic(bvn: string) {
    try {
      const response = await this.dojahClient.axiosRef.get(
        `${this.dojahEndpoints.BVN_BASIC_ENDPOINT}?bvn=${bvn}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }
      throw new InternalServerErrorException();
    }
  }

  async bvnLookupAdvanced(bvn: string) {
    try {
      const response = await this.dojahClient.axiosRef.get(
        `${this.dojahEndpoints.BVN_ADVANCED_ENDPOINT}?bvn=${bvn}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }
      throw new InternalServerErrorException();
    }
  }

  async validateBvn(params: ValidateBvn) {
    try {
      const firstNameParam = params.firstName
        ? `&first_name=${params.firstName}`
        : '';
      const lastNameParam = params.lastName
        ? `&last_name=${params.lastName}`
        : '';
      const dobParam = params.lastName ? `&dob=${params.dob}` : '';

      const response = await this.dojahClient.axiosRef.get(
        `${this.dojahEndpoints.BVN_VALIDATE_ENDPOINT}?bvn=${params.bvn}${firstNameParam}${lastNameParam}${dobParam}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }
      throw new InternalServerErrorException();
    }
  }

  async phoneNumberLookupBasic(phoneNumber: string) {
    try {
      const response = await this.dojahClient.axiosRef.get(
        `${this.dojahEndpoints.PHONE_BASIC_ENDPOINT}?phone_number=${phoneNumber}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }
      throw new InternalServerErrorException();
    }
  }

  async phoneNumberLookupAdvance(phoneNumber: string) {
    try {
      const response = await this.dojahClient.axiosRef.get(
        `${this.dojahEndpoints.PHONE_ADVANCED_ENDPOINT}?phone_number=${phoneNumber}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }
      throw new InternalServerErrorException();
    }
  }

  async nubanKycStatus(phoneNumber: string, bankCode: number) {
    try {
      const response = await this.dojahClient.axiosRef.get(
        `${this.dojahEndpoints.NUBAN_KYC_STATUS_ENDPOINT}?phone_number=${phoneNumber}&bank_code=${bankCode}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }
      throw new InternalServerErrorException();
    }
  }

  async ninLookup(nin: string) {
    try {
      const response = await this.dojahClient.axiosRef.get(
        `${this.dojahEndpoints.NIN_ENDPOINT}?nin=${nin}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }
      throw new InternalServerErrorException();
    }
  }
}
