import { ApiProperty } from '@nestjs/swagger';

export class VerifyNinSelfie {
  last_name?: string = '';
  first_name?: string = '';
  @ApiProperty({
    description:
      'Base64 value of the selfie image NB: Kindly truncate data:image/jpeg;base64, from the selfie_image object and pass only the buffer starting with /9.',
  })
  selfie_image: string =
    '/9j/4AAQScXJSgBBAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLD...';
  nin: string = '70123456789';
}
export class VerifyBvnSelfie {
  @ApiProperty({
    description:
      'Base64 value of the selfie image NB: Kindly truncate data:image/jpeg;base64, from the selfie_image object and pass only the buffer starting with /9.',
  })
  selfie_image: string =
    '/9j/4AAQScXJSgBBAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLD...';
  bvn: string = '22222222222';
}
export class LivelinessCheck {
  @ApiProperty({ description: 'Image format should be in Base64' })
  image: string = 'Base64 image';
}
