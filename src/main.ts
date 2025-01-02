import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useSwaggerConfig } from './config/swagger.config';
import { useAppConfig } from './config/app.config';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  useAppConfig(app);
  useSwaggerConfig(app);

  const redisMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.REDIS,
      options: {
        host: config.get('REDIS_HOST') || 'middleware-redis',
        port: config.get('REDIS_PORT'),
      },
    });

  await redisMicroservice.listen();
  await app.listen(config.get('PORT'), '0.0.0.0');
}
bootstrap();
