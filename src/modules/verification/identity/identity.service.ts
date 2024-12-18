import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DOJAH_SERVICE } from '../dojah/constants';
import { HttpService } from '@nestjs/axios';
import {
  LivelinessCheck,
  VerifyBvnSelfie,
  VerifyNinSelfie,
} from './dto/identity.dto';
import { AxiosError } from 'axios';

@Injectable()
export class IdentityService {
  private VERIFY_NIN_SELFIE = '/api/v1/kyc/nin/verify';
  private VERIFY_BVN_SELFIE = '/api/v1/kyc/bvn/verify';
  private LIVELINESS_CHECK = '/api/v1/ml/liveness/';

  constructor(@Inject(DOJAH_SERVICE) private dojahClient: HttpService) {}

  async verifyNin(payload: VerifyNinSelfie) {
    try {
      const response = await this.dojahClient.axiosRef.post(
        `${this.VERIFY_NIN_SELFIE}`,
        payload,
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

  async verifyBvn(payload: VerifyBvnSelfie) {
    try {
      const response = await this.dojahClient.axiosRef.post(
        `${this.VERIFY_BVN_SELFIE}`,
        payload,
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

  async livelinessCheck(payload: LivelinessCheck) {
    try {
      const response = await this.dojahClient.axiosRef.post(
        `${this.LIVELINESS_CHECK}`,
        payload,
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
