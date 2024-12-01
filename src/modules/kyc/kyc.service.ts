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

  constructor(
    private config: ConfigService,
    private httpClient: HttpService,
  ) {}

  async verifyBvnBasic(bvn: string) {
    try {
      const response = await this.httpClient.axiosRef.get(
        `${this.BVN_BASIC_ENDPOINT}?bvn=${bvn}`,
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        // this.logger.error({
        //   message: error.message,
        //   code: error.code,
        //   cause: error.cause,
        // });
        throw error;
      }
      throw new BadRequestException('verification error: Please try again');
    }
  }
}
