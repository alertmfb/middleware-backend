import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DojahHttpConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: process.env.DOJAH_BASE_URL,
      headers: {
        Authorization: process.env.DOJAH_API_KEY,
        AppId: process.env.DOJAH_APP_ID,
      },
      withCredentials: true,
    };
  }
}

@Injectable()
export class RegylHttpConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: '',
      headers: {
        Authorization: process.env.DOJAH_API_KEY,
        AppId: process.env.DOJAH_APP_ID,
      },
      withCredentials: true,
    };
  }
}
