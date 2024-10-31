import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

export const resend = new Resend(process.env.RESEND_API_KEY);
