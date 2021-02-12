import type { IAccount, ICreateDTO } from '@dopamine/accounts-data-lib';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('accounts-data')
export class AppController {
  @GrpcMethod('AccountsDataService', 'Create')
  create(data: ICreateDTO): IAccount {
    return {
      id: 'xxx',
      email: data.email,
    };
  }
}
