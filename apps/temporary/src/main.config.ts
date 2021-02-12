import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const APP_OPTIONS: NestApplicationContextOptions & GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:5000',
    package: 'dopamine',
    protoPath: join(
      __dirname,
      './../../libs/accounts-data-lib/accounts-data.proto'
    ),
  },
};
