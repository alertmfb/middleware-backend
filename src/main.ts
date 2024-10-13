import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix(config.get('GLOBAL_PREFIX'));

  await app.listen(config.get('PORT'), '0.0.0.0');
}
bootstrap();
