import { Controller, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as util from 'util';
import { CreateCommand } from './commands/create/create.command';
import { DeleteCommand } from './commands/delete/delete.command';
import { UpdateCommand } from './commands/update';
import { AccountQuery } from './queries/account/account.query';
import { AccountsQuery } from './queries/accounts/accounts.query';
import { UpdateRequest } from './requests';
import { AccountRequest } from './requests/account.request';
import { AccountsRequest } from './requests/accounts.request';
import { CreateRequest } from './requests/create.request';
import { DeleteRequest } from './requests/delete.request';
import { AccountResponse } from './responses/account.response';
import { AccountsResponse } from './responses/accounts.response';
import { CreateResponse } from './responses/create.response';
import { DeleteResponse } from './responses/delete.response';
import { UpdateResponse } from './responses/update.response';

@Controller('app')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @GrpcMethod('AccountsData', 'Account')
  async account(request: AccountRequest) {
    this.logger.debug(util.inspect(request));

    try {
      const account = await this.queryBus.execute(new AccountQuery(request));
      return new AccountResponse(account);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @GrpcMethod('AccountsData', 'Accounts')
  async accounts(request: AccountsRequest) {
    this.logger.debug(util.inspect(request));

    try {
      const accounts = await this.queryBus.execute(new AccountsQuery(request));
      return new AccountsResponse(accounts);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @GrpcMethod('AccountsData', 'Create')
  async create(request: CreateRequest) {
    this.logger.debug(util.inspect(request));

    try {
      const account = await this.commandBus.execute(new CreateCommand(request));
      return new CreateResponse(account);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @GrpcMethod('AccountsData', 'Update')
  async update(request: UpdateRequest) {
    this.logger.debug(util.inspect(request));

    try {
      const account = await this.commandBus.execute(new UpdateCommand(request));
      this.logger.debug(util.inspect(account));
      return new UpdateResponse(account);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @GrpcMethod('AccountsData', 'Delete')
  async delete(request: DeleteRequest) {
    this.logger.debug(util.inspect(request));
    try {
      const account = await this.commandBus.execute(new DeleteCommand(request));
      return new DeleteResponse(account);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
