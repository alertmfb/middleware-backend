import { ApiProperty } from '@nestjs/swagger';

export class SendToken {
  to: string = '2349182991002';

  // @ApiProperty({ enum: ['NUMERIC', 'ALPHANUMERIC'] })
  // message_type: string = 'NUMERIC';

  @ApiProperty({ minimum: 3 })
  pin_attempts: number = 3;

  @ApiProperty({
    description:
      'Represents how long the PIN is valid before expiration. The time is in minutes. ',
    minimum: 0,
    maximum: 60,
  })
  pin_time_to_live: number = 10;

  @ApiProperty({ minimum: 4, maximum: 8 })
  pin_length: number = 6;

  @ApiProperty({
    description:
      'Text of a message that would be sent to the destination phone number. Right before sending the message, PIN code placeholder will be replaced with generate PIN code.',
  })
  message_text: string = 'Your pin is < 1234 >';
}

export class InAppToken {
  @ApiProperty({ enum: ['NUMERIC', 'ALPHANUMERIC'] })
  pin_type: string = 'NUMERIC';

  phone_number: string = '2349182991002';

  @ApiProperty({ minimum: 3 })
  pin_attempts: number = 3;

  @ApiProperty({
    description:
      'Represents how long the PIN is valid before expiration. The time is in minutes. ',
    minimum: 0,
    maximum: 60,
  })
  pin_time_to_live: number = 10;

  @ApiProperty({ minimum: 4, maximum: 8 })
  pin_length: number = 6;
}

export class EmailToken {
  email_address: string = 'victor.balogun@alertgroup.com.ng';
  code: string = '123456';
}

export class VerifyToken {
  pin_id: string = 'c8dcd048-5e7f-4347-8c89-4470c3af0b';
  pin: string = '123456';
}
