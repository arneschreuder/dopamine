import {
  AccountRequest,
  AccountsRequest,
  CreateAccountRequest,
  DeleteAccountRequest,
  UpdateAccountRequest,
} from '@dopamine/requests';
import {
  AccountResponse,
  AccountsResponse,
  CreateAccountResponse,
  DeleteAccountResponse,
  UpdateAccountResponse,
} from '@dopamine/responses';
import { Controller, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as util from 'util';
import {
  CreateAccountCommand,
  DeleteAccountCommand,
  UpdateAccountCommand,
} from './commands';
import { AccountQuery, AccountsQuery } from './queries';

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
  async create(request: CreateAccountRequest) {
    this.logger.debug(util.inspect(request));

    try {
      const account = await this.commandBus.execute(
        new CreateAccountCommand(request)
      );
      return new CreateAccountResponse(account);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @GrpcMethod('AccountsData', 'Update')
  async update(request: UpdateAccountRequest) {
    this.logger.debug(util.inspect(request));

    try {
      const account = await this.commandBus.execute(
        new UpdateAccountCommand(request)
      );
      this.logger.debug(util.inspect(account));
      return new UpdateAccountResponse(account);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @GrpcMethod('AccountsData', 'Delete')
  async delete(request: DeleteAccountRequest) {
    this.logger.debug(util.inspect(request));
    try {
      const account = await this.commandBus.execute(
        new DeleteAccountCommand(request)
      );
      return new DeleteAccountResponse(account);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
