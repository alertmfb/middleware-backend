import { Injectable, Logger } from '@nestjs/common';
import { zeptoClient } from 'src/config/zepto';
import { resend } from 'src/config/resend';

@Injectable()
export class EmailServce {
  url: string = 'https://middleware.staging.alertmfb.com.ng/register-account';

  constructor() {}

  async inviteUser({ email, token }: { email: string; token: string }) {
    const completeOnboardingUrl = this.url + '?token=' + token;
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
                We're excited to have you on board! You've been successfully onboarded to Alert MFB Middleware. To finalize your setup and get started, please complete the onboarding process by clicking the button below:
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

  // zeptoClient
  //   .sendMail({
  //     from: {
  //       address: 'victor@alertmfb.com.ng',
  //       name: 'noreply middleware',
  //     },
  //     to: [
  //       {
  //         email_address: {
  //           address: email,
  //           name: '',
  //         },
  //       },
  //     ],
  //     subject: 'Test Email',
  //     htmlbody: '<div><b> Test email sent successfully.</b></div>',
  //   })
  //   .then((resp) => Logger.log('success'))
  //   .catch((error) => Logger.log(error));

  // async makeAdmin() {
  //   const adminId = await this.prisma.user.update({
  //     where: {
  //       email: 'bar@gmail.com',
  //     },
  //     data: {
  //       role: 'SUPER_ADMIN',
  //     },
  //     select: {
  //       id: true,
  //     },
  //   });

  //   return adminId;
  // }
}
