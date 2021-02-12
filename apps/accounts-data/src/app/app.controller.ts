import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateCommand } from './commands/create/create.command';
import { AccountQuery } from './queries/account/account.query';
import { AccountsQuery } from './queries/accounts/accounts.query';
import { AccountRequest } from './requests/account.request';
import { AccountsRequest } from './requests/accounts.request';
import { CreateRequest } from './requests/create.request';
import { AccountResponse } from './responses/account.response';
import { AccountsResponse } from './responses/accounts.response';
import { CreateResponse } from './responses/create.response';

@Controller('app')
export class AppController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @GrpcMethod('AccountsData', 'Account')
  async account(req: AccountRequest) {
    const account = await this.queryBus.execute(new AccountQuery(req));
    return new AccountResponse(account);
  }

  @GrpcMethod('AccountsData', 'Accounts')
  async accounts(req: AccountsRequest) {
    const accounts = await this.queryBus.execute(new AccountsQuery(req));
    return new AccountsResponse(accounts);
  }

  @GrpcMethod('AccountsData', 'Create')
  async create(req: CreateRequest) {
    const account = await this.commandBus.execute(new CreateCommand(req));
    return new CreateResponse(account);
  }
}
