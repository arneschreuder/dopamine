/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:5000',
        package: 'ai.schreuder.dopamine',
        protoPath: join(__dirname, '../../libs/protobufs/accounts-cache.proto'),
      },
    }
  );

  app.listen(() => {
    Logger.log(`Listening at localhost:5000`);
  });
}

bootstrap();
