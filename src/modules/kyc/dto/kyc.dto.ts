import { ApiProperty, ApiQuery } from '@nestjs/swagger';

export class VerifyBvnBasic {
  bvn: string = '22222222222';
}

export const verifyBvnBasicResponse = {
  entity: {
    bvn: '22171234567',
    first_name: 'JOHN',
    last_name: 'DOE',
    middle_name: 'AHMED',
    gender: 'Male',
    date_of_birth: '1997-05-16',
    phone_number1: '08012345678',
    image: 'BASE 64 IMAGE',
    phone_number2: '08012345678',
  },
};
