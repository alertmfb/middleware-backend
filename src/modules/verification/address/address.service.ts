import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  BusinessAddressVerification,
  IndividualAddressVerification,
} from './dto/address.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';

@Injectable()
export class AddressService {
  private IND_ADDRESS_VERIFICATION = '/api/v1/kyc/address';
  private BUS_ADDRESS_VERIFICATION = '/api/v1/kyc/address/business';
  private VERIFICATION_STATUS = '/api/v1/kyc/address';

  constructor(
    @Inject('DOJAH_HTTP_SERVICE') private dojahClient: HttpService,
    @Inject('REGYL_HTTP_SERVICE') private regylClient: HttpService,
  ) {}

  async verifyIndividualAddress(payload: IndividualAddressVerification) {
    try {
      const response = await this.dojahClient.axiosRef.post(
        this.IND_ADDRESS_VERIFICATION,
        payload,
      );

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }
      throw error;
      throw new InternalServerErrorException();
    }
  }

  async verifyBusinessAddress(payload: BusinessAddressVerification) {
    try {
      const response = await this.dojahClient.axiosRef.post(
        this.BUS_ADDRESS_VERIFICATION,
        payload,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.message, error.status, {
          cause: error.cause,
        });
      }
      throw new InternalServerErrorException();
    }
  }

  async fetchAddressVerification(referenceId: string) {
    try {
      const response = await this.dojahClient.axiosRef.get(
        this.VERIFICATION_STATUS + '?' + `reference_id=${referenceId}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.message, error.status, {
          cause: error.cause,
        });
      }
      throw new InternalServerErrorException();
    }
  }
}
