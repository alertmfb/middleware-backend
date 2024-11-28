import { ApiProperty } from '@nestjs/swagger';

export class Message {
  @ApiProperty({
    enum: [
      'ALERT_SAVINGS',
      'MOBILE_APP',
      'CONSUMER_BANKING_PRODUCT',
      'BUSINESS_BANKING_PRODUCT',
    ],
  })
  category: string;
  @ApiProperty({ enum: ['MOBILE_NOTIFICATION', 'IN_APP_MESSAGES'] })
  channel: string;
  title: string = 'Scheduled Downtime';
  body: string =
    'Please be informed that there will be a 5 min downtime from 10:00am - 10:05am';
}

export const getMessagesResponse = [
  {
    id: '64f95671-3ed1-492d-b86e-dad17fb7ed97',
    category: 'MOBILE_APP',
    channel: 'MOBILE_NOTIFICATION',
    title: 'Scheduled Downtime',
    body: 'Please be informed that there will be a 5 min downtime from 10:00am - 10:05am',
    createdAt: '2024-11-28T02:02:55.428Z',
    updatedAt: '2024-11-28T02:02:55.428Z',
  },
];

export const createMessageResponse = {
  success: true,
  id: '64f95671-3ed1-492d-b86e-dad17fb7ed97',
};
