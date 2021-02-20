/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { APP_OPTIONS } from './main.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    APP_OPTIONS
  );

  app.listen(() => {
    Logger.log(`Listening at ${APP_OPTIONS.options.url}`);
  });
}

bootstrap();
