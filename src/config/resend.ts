import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

export const resend = new Resend(config.get('RESEND_API_KEY'));
