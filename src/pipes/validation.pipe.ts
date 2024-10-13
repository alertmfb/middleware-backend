import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new HttpException(
          {
            success: false,
            message: 'Validation Error',
            reason: error.flatten().fieldErrors,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new BadRequestException('Invalid');
    }
  }
}
