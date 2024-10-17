import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    credentials: true,
    origin: '*'
  })

  app.setGlobalPrefix(config.get('GLOBAL_PREFIX'));

  const docsConfig = new DocumentBuilder()
    .setTitle('MIDDLEWARE API REFERENCE')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, docsConfig, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });

  SwaggerModule.setup('reference', app, document, {
    jsonDocumentUrl: 'reference/json',
  });

  await app.listen(config.get('PORT'), '0.0.0.0');
}
bootstrap();
