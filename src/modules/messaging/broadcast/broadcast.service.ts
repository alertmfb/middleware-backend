import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { TERMII_SERVICE } from '../termii/constants';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PayloadTransformPipe } from 'src/pipes/payload.pipe';
import {
  SendBulkMessageSMS,
  SendMessageSMS,
  SendMessageWhatsapp,
} from './dto/broadcast.dto';
import { AxiosError } from 'axios';

@Injectable()
export class BroadcastService {
  private SEND_MESSAGE_ENDPOINT = '/api/sms/send';
  private SEND_BULK_MESSAGE_ENDPOINT = '/api/sms/send/bulk';

  constructor(
    @Inject(TERMII_SERVICE) private termiiClient: HttpService,
    private config: ConfigService,
    private payloadPipe: PayloadTransformPipe,
  ) {}

  async sendMessageSMS(payload: SendMessageSMS) {
    try {
      const response = await this.termiiClient.axiosRef.post(
        this.SEND_MESSAGE_ENDPOINT,
        this.transformPayload(payload, 'generic'),
      );

      const data = response.data;

      response.data?.balance && delete data.balance;

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.message, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async sendBulkMessageSMS(payload: SendBulkMessageSMS) {
    try {
      const response = await this.termiiClient.axiosRef.post(
        this.SEND_BULK_MESSAGE_ENDPOINT,
        this.transformPayload(payload, 'generic'),
      );

      const data = response.data;

      response.data?.balance && delete data.balance;

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.message, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async sendMessageWhatsapp(payload: SendMessageWhatsapp) {
    try {
      const response = await this.termiiClient.axiosRef.post(
        this.SEND_MESSAGE_ENDPOINT,
        this.transformPayload(payload, 'whatsapp'),
      );

      const data = response.data;

      response.data?.balance && delete data.balance;

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error.message, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  private transformPayload(
    payload: any,
    channel: 'dnd' | 'whatsapp' | 'generic',
  ) {
    switch (channel) {
      case 'dnd':
        return {
          ...this.payloadPipe.transform(payload, { type: 'custom' }),
          from: this.config.get('TERMII_SENDER_ID'),
          type: 'plain',
          channel: channel,
        };
      case 'generic':
        return {
          ...this.payloadPipe.transform(payload, { type: 'custom' }),
          from: this.config.get('TERMII_SENDER_ID'),
          type: 'plain',
          channel: channel,
        };
      case 'whatsapp':
        return {
          ...this.payloadPipe.transform(payload, { type: 'custom' }),
          from: this.config.get('TERMII_DEVICE_NAME'),
          type: 'plain',
          channel: 'whatsapp_otp',
        };
      default:
        return {
          ...this.payloadPipe.transform(payload, { type: 'custom' }),
          from: this.config.get('TERMII_SENDER_ID'),
          text: 'plain',
          channel: channel,
        };
    }
  }
}
