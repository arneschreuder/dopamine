import { Account } from '@dopamine/models';
import { AccountRequest, AccountsRequest } from '@dopamine/requests';
import { AccountsDataService } from '@dopamine/services';
import { Injectable, Logger } from '@nestjs/common';
import * as util from 'util';

@Injectable()
export class AccountsDataRepository {
  private readonly logger = new Logger(AccountsDataRepository.name);

  constructor(private service: AccountsDataService) {}

  async account(request: AccountRequest): Promise<Account | null> {
    this.logger.debug(util.inspect(request));
    const { id, handle } = request;

    return await this.service
      .account({ id, handle })
      .then((record) => (record ? new Account(record) : null));
  }

  async accounts(request: AccountsRequest): Promise<Account[]> {
    this.logger.debug(util.inspect(request));
    // const {} = request;

    return await this.service
      .accounts({})
      .then((records) => records.map((record) => new Account(record)));
  }

  async create(account: Account): Promise<Account> {
    this.logger.debug(util.inspect(account));

    return await this.service
      .create(account)
      .then((record) => new Account(record));
  }

  async update(account: Account): Promise<Account> {
    this.logger.debug(util.inspect(account));
    const { id, handle, description } = account;

    return await this.service
      .update({
        where: {
          id,
        },
        data: {
          handle,
          description,
        },
      })
      .then((record) => new Account(record));
  }

  async delete(account: Account): Promise<Account> {
    this.logger.debug(util.inspect(account));
    const { id } = account;

    return await this.service
      .delete({ id })
      .then((record) => new Account(record));
  }
}
