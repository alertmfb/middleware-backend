import * as dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const API_KEY = process.env.RESEND_API_KEY;

export const resend = new Resend(API_KEY);
