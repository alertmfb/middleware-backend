import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DOJAH_SERVICE } from '../dojah/constants';
import { AxiosError } from 'axios';
import { AdvancedType, CompanyType } from './dto/kyb.dto';

@Injectable()
export class KybService {
  private FIRS_TIN_ENDPOINT = '/api/v1/kyc/tin';
  private CAC_BASIC_ENDPONT = '/api/v1/kyc/cac/basic';
  private CAC_ADVANCED_ENDPONT = '/api/v1/kyc/cac/advance';

  constructor(@Inject(DOJAH_SERVICE) private dojahClient: HttpService) {}

  async validateTin(tin: string) {
    try {
      const response = await this.dojahClient.axiosRef.get(
        `${this.FIRS_TIN_ENDPOINT}?tin=${tin}`,
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

  async cacBasic(rcNumber: string, companyType: CompanyType) {
    try {
      const response = await this.dojahClient.axiosRef.get(
        `${this.CAC_BASIC_ENDPONT}?rc_number=${rcNumber}&company_type=${companyType}`,
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

  async cacAdvanced(rcNumber: string, type: AdvancedType) {
    try {
      const response = await this.dojahClient.axiosRef.get(
        `${this.CAC_ADVANCED_ENDPONT}?rc_number=${rcNumber}&class=premium&type=${type}`,
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
