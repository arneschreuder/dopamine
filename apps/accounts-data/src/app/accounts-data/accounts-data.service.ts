import {
  CreateAccountCommand,
  DeleteAccountCommand,
  UpdateAccountCommand,
} from '@dopamine/commands';
import { Account } from '@dopamine/models';
import { AccountQuery, AccountsQuery } from '@dopamine/queries';
import {
  AccountRequest,
  AccountsRequest,
  CreateAccountRequest,
  DeleteAccountRequest,
  UpdateAccountRequest,
} from '@dopamine/requests';
import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import * as util from 'util';

@Injectable()
export class AccountsDataService {
  private readonly logger = new Logger(AccountsDataService.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async account(request: AccountRequest): Promise<Account> {
    this.logger.debug(util.inspect(request));
    return await this.queryBus.execute<AccountQuery, Account>(
      new AccountQuery(request)
    );
  }

  async accounts(request: AccountsRequest): Promise<Account[]> {
    this.logger.debug(util.inspect(request));
    return await this.queryBus.execute<AccountsQuery, Account[]>(
      new AccountsQuery(request)
    );
  }

  async create(request: CreateAccountRequest): Promise<Account> {
    this.logger.debug(util.inspect(request));
    return await this.commandBus.execute<CreateAccountCommand>(
      new CreateAccountCommand(request)
    );
  }

  async update(request: UpdateAccountRequest): Promise<Account> {
    this.logger.debug(util.inspect(request));
    return await this.commandBus.execute<UpdateAccountCommand>(
      new UpdateAccountCommand(request)
    );
  }

  async delete(request: DeleteAccountRequest): Promise<Account> {
    this.logger.debug(util.inspect(request));
    return await this.commandBus.execute<DeleteAccountCommand>(
      new DeleteAccountCommand(request)
    );
  }
}
