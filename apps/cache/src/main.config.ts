import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const APP_OPTIONS: NestApplicationContextOptions & GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:5001',
    package: 'ai.schreuder.dopamine',
    protoPath: join(__dirname, 'assets/cache.proto'),
  },
};
