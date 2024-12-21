import { ApiProperty } from '@nestjs/swagger';

interface Message {
  sms: string;
  to: string | string[];
}

export class SendMessageSMS implements Message {
  to: string = '2349182991002';
  sms: string = 'Hello, welcome to Alert Microfinance Bank!';
}

export class SendBulkMessageSMS implements Message {
  @ApiProperty({ minItems: 1, maxItems: 100 })
  to: string[] = ['2349182991002', '2349182991003', '2349182991004'];
  sms: string = 'Hello, welcome to Alert Microfinance Bank!';
}

export class SendMessageWhatsapp implements Message {
  to: string = '2349182991002';
  sms: string = 'Hello, welcome to Alert Microfinance Bank!';
}
