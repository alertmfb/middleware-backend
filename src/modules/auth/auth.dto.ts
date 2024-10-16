import { ApiProperty } from '@nestjs/swagger';

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
