import { Controller } from '@nestjs/common';
import { KybService } from './kyb.service';

@Controller('kyb')
export class KybController {
  constructor(private readonly kybService: KybService) {}
}
