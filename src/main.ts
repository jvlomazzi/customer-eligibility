import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('API_TITLE'))
    .setDescription(configService.get<string>('API_DESCRIPTION'))
    .setVersion(configService.get<string>('API_VERSION'))
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get<number>('API_PORT'));
}
bootstrap();
