import { IncomingMessage, Server, ServerResponse } from 'http';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

export function useSwaggerConfig(
  app: NestExpressApplication<
    Server<typeof IncomingMessage, typeof ServerResponse>
  >,
) {
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
}
