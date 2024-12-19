import { Inject, Injectable } from '@nestjs/common';
import { TERMII_SERVICE } from '../termii/constants';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    @Inject(TERMII_SERVICE) private termiiClient: HttpService,
    private config: ConfigService,
  ) {}
}
