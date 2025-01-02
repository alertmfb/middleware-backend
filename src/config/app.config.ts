import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { logger } from './middleware.config';

export function useAppConfig(
  app: NestExpressApplication<
    Server<typeof IncomingMessage, typeof ServerResponse>
  >,
) {
  const config = new ConfigService();

  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      'https://middleware.staging.alertmfb.com.ng',
    ],
  });

  app.disable('x-powered-by');

  app.setGlobalPrefix(config.get('GLOBAL_PREFIX'));

  app.use(logger);
}
