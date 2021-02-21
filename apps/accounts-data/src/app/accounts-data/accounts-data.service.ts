import {
  IAccountRequest,
  IAccountsRequest,
  ICreateAccountRequest,
  IDeleteAccountRequest,
  IUpdateAccountRequest,
} from '@dopamine/requests';
import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import * as util from 'util';
import {
  CreateAccountCommand,
  DeleteAccountCommand,
  UpdateAccountCommand,
} from './commands';
import { Account } from './models';
import { AccountQuery, AccountsQuery } from './queries';

@Injectable()
export class AccountsDataService {
  private readonly logger = new Logger(AccountsDataService.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async account(request: IAccountRequest): Promise<Account> {
    this.logger.debug(util.inspect(request));
    return await this.queryBus.execute<AccountQuery, Account>(
      new AccountQuery(request)
    );
  }

  async accounts(request: IAccountsRequest): Promise<Account[]> {
    this.logger.debug(util.inspect(request));
    return await this.queryBus.execute<AccountsQuery, Account[]>(
      new AccountsQuery(request)
    );
  }

  async create(request: ICreateAccountRequest): Promise<Account> {
    this.logger.debug(util.inspect(request));
    return await this.commandBus.execute<CreateAccountCommand>(
      new CreateAccountCommand(request)
    );
  }

  async update(request: IUpdateAccountRequest): Promise<Account> {
    this.logger.debug(util.inspect(request));
    return await this.commandBus.execute<UpdateAccountCommand>(
      new UpdateAccountCommand(request)
    );
  }

  async delete(request: IDeleteAccountRequest): Promise<Account> {
    this.logger.debug(util.inspect(request));
    return await this.commandBus.execute<DeleteAccountCommand>(
      new DeleteAccountCommand(request)
    );
  }
}
