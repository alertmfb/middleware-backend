import { SendMailClient } from 'zeptomail';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

const url = config.get('ZEPTO_API');
const token = config.get('ZEPTO_TOKEN');

export const zeptoClient = new SendMailClient({ url, token });
