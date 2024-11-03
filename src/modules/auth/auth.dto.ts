import { ApiProperty } from '@nestjs/swagger';

export class SignInWithPassword {
  email: string = 'victor.balogun@alertgroup.com.ng';
  password: string = 'NotApassword@1';
}

export const signInWithPasswordApiResponse = {
  success: true,
  id: 1,
  message: 'complete signup with otp verification',
};

export class VerifySignInOTP {
  id: number = 1;
  otp: string;
}

export const verifySignInOTPApiResponse = {
  isAuthenticated: true,
  access_token: 'eyJhbGciOiJIUzI1NiIsIQJyqIEvI',
};

export class SignIn {
  email: string;
  password: string;
}

export const signInExample = {
  access_token: 'eyJhbGciOiJIUzI1NiIsI...QJyqIEvI',
};

export class VerifyTOTP {
  @ApiProperty({ maxLength: 6 })
  otp: string;
}

export const verifyTOTP = {
  isAuthenticated: true,
  access_token: 'eyJhbGciOiJIUzI1NiIsI...QJyqIEvI',
};

export class RequestPasswordReset {
  email: string = 'victor.balogun@alertgroup.com.ng';
}

export const requestPasswordResetApiResponse = {
  success: true,
  email: 'victor.balogun@alertgroup.com.ng',
};

export class VerifyPasswordResetOTP {
  email: string = 'victor.balogun@alertgroup.com.ng';
  otp: string = '123456';
}

export const verifyPasswordResetOTPApiResponse = {
  id: 'dac61cdb-76c2-44c2-ad50-d1fq19c634z5',
};

export class ResetPassword {
  resetId: string = 'dac61cdb-76c2-44c2-ad50-d1fq19c634z5';
  password: string = 'NewPassword@1';
}

export const resetPasswordApiResponse = {
  succes: true,
  message: 'password successfully changed',
};
