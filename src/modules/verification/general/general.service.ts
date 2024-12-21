import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DOJAH_SERVICE } from '../dojah/constants';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';

@Injectable()
export class GeneralService {
  private FETCH_BANKS_ENDPOINT = '/api/v1/general/banks';
  constructor(@Inject(DOJAH_SERVICE) private dojahClient: HttpService) {}

  async getBanks() {
    try {
      const response = await this.dojahClient.axiosRef.get(
        `${this.FETCH_BANKS_ENDPOINT}`,
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
