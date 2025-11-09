import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  const NODE_ENV = process.env.NODE_ENV || 'development';

  app.enableCors();

  app.setGlobalPrefix('api/v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Orynt API')
    .setDescription('API documentation for the Orynt x402 ai api wrapper')
    .setVersion('1.0')
    .addServer(
      NODE_ENV === 'production'
        ? process.env.PROD_URL || ''
        : `http://localhost:${PORT}`,
      NODE_ENV === 'production'
        ? 'Production Server'
        : 'Local Development Server',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(PORT);
}
bootstrap();
