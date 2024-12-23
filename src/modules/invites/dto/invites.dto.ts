import { ApiProperty } from '@nestjs/swagger';

export class InviteUser {
  @ApiProperty({ example: 'victor.balogun@alertgroup.com.ng' })
  email: string;

  @ApiProperty({
    enum: ['SUPER_ADMIN', 'SENIOR', 'JUNIOR'],
    example: 'JUNIOR',
  })
  role: string;
  designationId: number = 1;
}

export const inviteUserExample = {
  token:
    'eyJhbGciOiPoZzI1NiIsInR5aAI6IkpXVCJ9.eyJlbWFpbCI6InZpM4BnbWFpbC5jb20iLCJpYXQiOjE3MzAwNTAQspIsImV4cCI6MTczMDY1NTa6Tho0.i3AuY8TceOXGbUPGfm25S79T7W4k12MNJjM6k2bYJsU',
};

export class CreateProfile {
  firstname: string;
  lastname: string;
  dob: Date;
  phoneNumber: string;
  password: string;
}

export const createPasswordExample = {
  email: 'victor.balogun@alertgroup.com.ng',
};

export const otpauthExample = {
  otpauth:
    'otpauth://totp/Middleware:vic%40gmail.com?secret=ZXWXPQZ4JAQWS3QW&period=30&digits=6&algorithm=SHA1&issuer=Middleware',
  setupKey: 'KSOWLAMOOASUP',
};
