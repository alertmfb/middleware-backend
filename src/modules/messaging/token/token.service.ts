import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { TERMII_SERVICE } from '../termii/constants';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  EmailToken,
  InAppToken,
  SendToken,
  VerifyToken,
} from './dto/token.dto';
import { AxiosError } from 'axios';
import { PayloadTransformPipe } from 'src/pipes/payload.pipe';

@Injectable()
export class TokenService {
  private SEND_TOKEN_ENDPOINT = '/api/sms/otp/send';
  private INAPP_TOKEN_ENDPOINT = '/api/sms/otp/generate';
  private EMAIL_TOKEN_ENDPOINT = '/api/email/otp/send';
  private VERIFY_TOKEN_ENDPOINT = '/api/sms/otp/verify';

  constructor(
    @Inject(TERMII_SERVICE) private termiiClient: HttpService,
    private config: ConfigService,
    private payloadPipe: PayloadTransformPipe,
  ) {}

  async sendTokenSMS(payload: SendToken) {
    try {
      const response = await this.termiiClient.axiosRef.post(
        this.SEND_TOKEN_ENDPOINT,
        this.transformPayload(payload, 'generic'),
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

  async sendTokenWhatsapp(payload: SendToken) {
    try {
      const response = await this.termiiClient.axiosRef.post(
        this.SEND_TOKEN_ENDPOINT,
        this.transformPayload(payload, 'whatsapp'),
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

  async sendTokenInApp(payload: InAppToken) {
    try {
      const response = await this.termiiClient.axiosRef.post(
        this.INAPP_TOKEN_ENDPOINT,
        this.payloadPipe.transform(payload, { type: 'custom' }),
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

  async sendTokenEmail(payload: EmailToken) {
    try {
      const response = await this.termiiClient.axiosRef.post(
        this.EMAIL_TOKEN_ENDPOINT,
        {
          ...this.payloadPipe.transform(payload, { type: 'custom' }),
          email_configuration_id: this.config.get(
            'TERMII_EMAIL_CONFIGURATION_ID',
          ),
        },
      );

      const data = response.data;

      response.data?.balance && delete data.balance;

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error?.response?.data, error.status, {
          cause: error.cause,
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async verifyToken(payload: VerifyToken) {
    try {
      const response = await this.termiiClient.axiosRef.post(
        this.VERIFY_TOKEN_ENDPOINT,
        this.payloadPipe.transform(payload, { type: 'custom' }),
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

  private transformPayload(
    payload: any,
    channel: 'dnd' | 'whatsapp' | 'generic' | 'email',
  ) {
    switch (channel) {
      case 'dnd':
        return {
          ...this.payloadPipe.transform(payload, { type: 'custom' }),
          from: this.config.get('TERMII_SENDER_ID'),
          channel: channel,
        };
      case 'generic':
        return {
          ...this.payloadPipe.transform(payload, { type: 'custom' }),
          from: this.config.get('TERMII_SENDER_ID'),
          message_type: 'ALPHANUMERIC',
          channel: channel,
          pin_placeholder: '< 1234 >',
          pin_type: 'NUMERIC',
        };
      case 'whatsapp':
        return {
          ...this.payloadPipe.transform(payload, { type: 'custom' }),
          from: this.config.get('TERMII_DEVICE_NAME'),
          channel: channel,
          message_type: 'ALPHANUMERIC',
          pin_type: 'NUMERIC',
        };
      case 'email':
        return {
          ...this.payloadPipe.transform(payload, { type: 'custom' }),
          from: this.config.get('TERMII_EMAIL_CONFIGURATION_ID'),
          channel: channel,
        };
      default:
        return {
          ...this.payloadPipe.transform(payload, { type: 'custom' }),
          from: this.config.get('TERMII_SENDER_ID'),
          channel: channel,
        };
    }
  }
}
