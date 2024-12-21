import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PayloadTransformPipe implements PipeTransform {
  constructor(@Inject() private config: ConfigService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    return {
      ...value,
      api_key: this.config.get('TERMII_API_KEY'),
    };
  }
}
