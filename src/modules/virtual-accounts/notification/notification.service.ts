import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { SendTransactionNotification } from './dto/notification.dto';
import { serviceLogger } from 'src/config/logger.config';
import { AxiosError } from 'axios';

@Injectable()
export class NotificationService {
  constructor(private readonly httpClient: HttpService) {}

  async forwardNotification({
    Vendor,
    ...payload
  }: SendTransactionNotification) {
    try {
      serviceLogger.info(payload);

      if (Vendor.url === '' || Vendor.authKey === '') {
        serviceLogger.error(
          'Unable to process request: Credentials for vendor not found',
        );
        return;
      }

      const response = await this.httpClient.axiosRef.post(
        Vendor.url,
        {
          AccountNo: payload.AccountNumber,
        },
        { withCredentials: true, headers: { 'Auth-Key': Vendor.authKey } },
      );

      if (response?.data) {
        serviceLogger.info('Notification delivered to ' + Vendor.url);
        return;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.response.data, error.status, {
          cause: error.cause,
        });
      }

      serviceLogger.error(error, {
        class: NotificationService.name,
        method: this.forwardNotification.name,
      });

      throw error;
    }
  }
}
