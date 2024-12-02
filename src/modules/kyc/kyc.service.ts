import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';

@Injectable()
export class KycService {
  private readonly logger = new Logger(KycService.name, { timestamp: true });
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
}
