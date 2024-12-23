import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      'https://middleware.staging.alertmfb.com.ng',
      'https://middleware.alertmfb.com.ng',
    ],
  });

  app.disable('x-powered-by');

  app.setGlobalPrefix(config.get('GLOBAL_PREFIX'));

  const docsConfig = new DocumentBuilder()
    .setTitle('Middleware')
    .setDescription('Middleware api reference')
    .addBearerAuth()
    .addServer('http://localhost:3000', 'local')
    .addServer('https://api-middleware-staging.alertmfb.com.ng', 'sandbox')
    .build();

  const document = SwaggerModule.createDocument(app, docsConfig, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  SwaggerModule.setup('reference', app, document, {
    jsonDocumentUrl: 'reference/json',
    swaggerUiEnabled: true,
  });

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
