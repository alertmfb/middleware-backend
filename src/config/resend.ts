import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);
// import { ConfigService } from '@nestjs/config';

// const config = new ConfigService();
