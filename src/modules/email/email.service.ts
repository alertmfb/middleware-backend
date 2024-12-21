import { Injectable, Logger } from '@nestjs/common';
import { zeptoClient } from 'src/config/zepto';
import { resend } from 'src/config/resend';
import {
  PasswordReset,
  NotifySignIn,
  NotifyPasswordChanged,
  Notify2faEnabled,
} from './dto/email.dto';
import { TZDate } from '@date-fns/tz';
import { loginNotification } from './templates/user-activity/login-notification';

@Injectable()
export class EmailServce {
  // inviteUrl: string = 'https://middleware.alertmfb.com.ng/register-account';
  // resetURL: string = 'https://middleware.alertmfb.com.ng/forgot-password';
  inviteUrl: string =
    'https://middleware.staging.alertmfb.com.ng/register-account';
  resetURL: string =
    'https://middleware.staging.alertmfb.com.ng/forgot-password';

  async inviteUser({ email, token }: { email: string; token: string }) {
    const completeOnboardingUrl = this.inviteUrl + '?token=' + token;
    const { data, error } = await resend.emails.send({
      from: 'Digital Hub <noreply@ecam.alertmfb.com.ng>',
      to: [email],
      subject: 'Welcome to Alert MFB Middleware - Complete Your Onboarding',
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto;">
          <tr>
            <td style="background-color: #0073e6; padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Welcome to Alert MFB Middleware!</h1>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f9f9f9; padding: 20px;">
              <p style="font-size: 16px; color: #555;">
                Hello, <br/><br/>
                We're excited to have you on board! You've been successfully onboarded to Alert MFB Middleware${this.inviteUrl.includes('staging') ? '--------SANDBOX ENVIRONMENT' : ''}. To finalize your setup and get started, please complete the onboarding process by clicking the button below:
              </p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="${completeOnboardingUrl}" style="background-color: #0073e6; color: #ffffff; padding: 12px 24px; font-size: 16px; text-decoration: none; border-radius: 5px;">
                  Complete Onboarding
                </a>
              </div>
              <p style="font-size: 14px; color: #777;">
                If you have any questions or need assistance, feel free to reach out to our support team.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #aaa;">
              <p style="margin: 0;">&copy; ${new Date().getFullYear()} Alert MFB Middleware. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </div>
    `,
    });

    if (error) {
      Logger.error(error);
    }

    Logger.log(data);
  }

  async notiy2faEnabled({ email }: Notify2faEnabled) {
    const { data, error } = await resend.emails.send({
      from: 'Middleware - Alert MFB <noreply@ecam.alertmfb.com.ng>',
      to: email,
      subject: 'Two-Factor Authentication Enabled on Your Account',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto;">
            <tr>
              <td style="background-color: #3498db; padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Two-Factor Authentication Enabled</h1>
              </td>
            </tr>
            <tr>
              <td style="background-color: #f9f9f9; padding: 20px;">
                <p style="font-size: 16px; color: #555;">
                  Hello,<br/><br/>
                  For added security, two-factor authentication (2FA) has been successfully enabled on your Middleware account. This extra layer of security helps to protect your account from unauthorized access.
                </p>
                <p style="font-size: 16px; color: #555;">
                  Going forward, you’ll be asked to enter a unique code generated on your authentication app each time you log in.
                </p>
              </td>
            </tr>
            <tr>
              <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #aaa;">
                <p style="margin: 0;">Thank you,<br/>The Digital Hub</p>
                <p style="margin: 0; font-size: 11px;">This is an automated message; please do not reply.</p>
              </td>
            </tr>
          </table>
        </div>
      `,
    });
    if (error) {
      Logger.error(error);
    }

    Logger.log(data);
  }

  async notifySignIn({ email }: NotifySignIn, ip: string) {
    const name = email.split('.')[0];
    const firstLetter = name[0].toUpperCase();

    const firstName = firstLetter + name.slice(1, name.length);
    const { data, error } = await resend.emails.send({
      from: 'Middleware - Alert MFB <noreply@ecam.alertmfb.com.ng>',
      to: email,
      subject: 'Login Notification',
      html: loginNotification(firstName, ip),
    });

    if (error) {
      Logger.error(error);
    }

    Logger.log(data);
  }

  async resetPassword({ email, otp }: PasswordReset) {
    const { data, error } = await resend.emails.send({
      from: 'Middleware - Alert MFB <noreply@ecam.alertmfb.com.ng>',
      to: email,
      subject: 'Password Reset OTP for Your Middleware Account',
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto;">
        <tr>
          <td style="background-color: #f39c12; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Password Reset OTP</h1>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f9f9f9; padding: 20px;">
            <p style="font-size: 16px; color: #555;">
              Hello,<br/><br/>
              We received a request to reset the password for your Middleware account. Please use the OTP below to complete the process:
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <p style="font-size: 24px; color: #f39c12; font-weight: bold;">${otp}</p>
            </div>
            <p style="font-size: 14px; color: #777;">
              If you didn’t request this password reset, please ignore this email. The OTP will expire in 10 minutes.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #aaa;">
            <p style="margin: 0;">Thank you,<br/>The Digital Hub</p>
            <p style="margin: 0; font-size: 11px;">This is an automated message; please do not reply.</p>
          </td>
        </tr>
      </table>
    </div>
    `,
    });

    if (error) {
      Logger.error(error);
    }

    Logger.log(data);
  }

  async notifyPasswordChanged({ email }: NotifyPasswordChanged) {
    const { data, error } = await resend.emails.send({
      from: 'Middleware - Alert MFB <noreply@ecam.alertmfb.com.ng>',
      to: email,
      subject: 'Your Password Has Been Changed',
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto;">
        <tr>
          <td style="background-color: #28a745; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 24px; margin: 0;">Password Changed Successfully</h1>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f9f9f9; padding: 20px;">
            <p style="font-size: 16px; color: #555;">
              Hello,<br/><br/>
              This email is to confirm that your password for the Middleware was successfully changed. If you made this change, you can disregard this message.
            </p>
            <p style="font-size: 16px; color: #555;">
              If you did not change your password, please contact our support team immediately to secure your account.
            </p>
            <p style="font-size: 14px; color: #777;">
              For further assistance, reach out to us at digitalhub@alertgroup.com.ng.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #aaa;">
            <p style="margin: 0;">Thank you,<br/>The Digital Hub</p>
            <p style="margin: 0; font-size: 11px;">This is an automated message; please do not reply.</p>
          </td>
        </tr>
      </table>
    </div>
    `,
    });

    if (error) {
      Logger.error(error);
    }

    Logger.log(data);
  }
}
