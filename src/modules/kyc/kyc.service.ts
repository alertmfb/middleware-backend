import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { AdvancedType, CompanyType } from './dto/kyc.dto';

@Injectable()
export class KycService {
  private readonly logger = new Logger(KycService.name, { timestamp: true });
  private FETCH_BANKS_ENDPOINT = '/api/v1/general/banks';
  private BVN_BASIC_ENDPOINT = '/api/v1/kyc/bvn/full';
  private BVN_ADVANCED_ENDPOINT = '/api/v1/kyc/bvn/advance';
  private PHONE_BASIC_ENDPOINT = '/api/v1/kyc/phone_number/basic';
  private PHONE_ADVANCED_ENDPOINT = '/api/v1/kyc/phone_number';
  private NUBAN_KYC_STATUS_ENDPOINT = '/api/v1/kyc/nuban/status';
  private NIN_ENDPOINT = '/api/v1/kyc/nin';
  private FIRS_TIN_ENDPOINT = '/api/v1/kyc/tin';
  private CAC_BASIC_ENDPONT = '/api/v1/kyc/cac/basic';
  private CAC_ADVANCED_ENDPONT = '/api/v1/kyc/cac/advance';

  constructor(
    private config: ConfigService,
    private httpClient: HttpService,
  ) {}

  async getBanks() {
    try {
      const response = await this.httpClient.axiosRef.get(
        `${this.FETCH_BANKS_ENDPOINT}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      throw new BadRequestException('bvn lookup error: Please try again');
    }
  }

  async bvnLookupBasic(bvn: string) {
    try {
      const response = await this.httpClient.axiosRef.get(
        `${this.BVN_BASIC_ENDPOINT}?bvn=${bvn}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      throw new BadRequestException('bvn lookup error: Please try again');
    }
  }

  async bvnLookupAdvanced(bvn: string) {
    try {
      const response = await this.httpClient.axiosRef.get(
        `${this.BVN_ADVANCED_ENDPOINT}?bvn=${bvn}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      throw new BadRequestException('bvn lookup error: Please try again');
    }
  }

  async phoneNumberLookupBasic(phoneNumber: string) {
    try {
      const response = await this.httpClient.axiosRef.get(
        `${this.PHONE_BASIC_ENDPOINT}?phone_number=${phoneNumber}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      throw new BadRequestException(
        'phone number lookup error: Please try again',
      );
    }
  }

  async phoneNumberLookupAdvance(phoneNumber: string) {
    try {
      const response = await this.httpClient.axiosRef.get(
        `${this.PHONE_ADVANCED_ENDPOINT}?phone_number=${phoneNumber}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      throw new BadRequestException(
        'phone number lookup error: Please try again',
      );
    }
  }

  async nubanKycStatus(phoneNumber: string, bankCode: number) {
    try {
      const response = await this.httpClient.axiosRef.get(
        `${this.NUBAN_KYC_STATUS_ENDPOINT}?phone_number=${phoneNumber}&bank_code=${bankCode}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      throw new BadRequestException('kyc status fetch error: Please try again');
    }
  }

  async ninLookup(nin: string) {
    try {
      const response = await this.httpClient.axiosRef.get(
        `${this.NIN_ENDPOINT}?nin=${nin}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      throw new BadRequestException('nin lookup error: Please try again');
    }
  }

  async validateTin(tin: string) {
    try {
      const response = await this.httpClient.axiosRef.get(
        `${this.FIRS_TIN_ENDPOINT}?tin=${tin}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      throw new BadRequestException('tin validation error: Please try again');
    }
  }

  async cacBasic(rcNumber: string, companyType: CompanyType) {
    try {
      const response = await this.httpClient.axiosRef.get(
        `${this.CAC_BASIC_ENDPONT}?rc_number=${rcNumber}&company_type=${companyType}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      throw new BadRequestException('cac validation error: Please try again');
    }
  }

  async cacAdvanced(rcNumber: string, type: AdvancedType) {
    try {
      const response = await this.httpClient.axiosRef.get(
        `${this.CAC_ADVANCED_ENDPONT}?rc_number=${rcNumber}&class=premium&type=${type}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error;
      }
      throw new BadRequestException('cac validation error: Please try again');
    }
  }
}
