import { Injectable, Logger } from '@nestjs/common';
import * as util from 'util';
import { Account } from '../models/account.model';
import { AccountRequest } from '../requests/account.request';
import { AccountsRequest } from '../requests/accounts.request';
import { AccountsService } from '../services/accounts.service';

@Injectable()
export class AccountsRepository {
  private readonly logger = new Logger(AccountsRepository.name);

  constructor(private service: AccountsService) {}

  async account({ id, handle }: AccountRequest): Promise<Account | null> {
    this.logger.debug(util.inspect(id));
    this.logger.debug(util.inspect(handle));

    return await this.service
      .account({
        id,
        handle,
      })
      .then((record) => (record ? new Account(record) : null));
  }

  async accounts(request: AccountsRequest): Promise<Account[]> {
    this.logger.debug(util.inspect(request));

    return await this.service
      .accounts({})
      .then((records) => records.map((record) => new Account(record)));
  }

  async create({
    id,
    authenticationId,
    handle,
    description,
    created,
  }: Account): Promise<Account> {
    this.logger.debug(util.inspect(id));
    this.logger.debug(util.inspect(authenticationId));
    this.logger.debug(util.inspect(handle));
    this.logger.debug(util.inspect(description));
    this.logger.debug(util.inspect(created));

    return await this.service
      .create({ id, authenticationId, handle, description, created })
      .then((record) => (record ? new Account(record) : null));
  }

  async update({ id, handle, description }: Account): Promise<Account> {
    this.logger.debug(util.inspect(id));
    this.logger.debug(util.inspect(handle));
    this.logger.debug(util.inspect(description));

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
      .then((record) => (record ? new Account(record) : null));
  }

  async delete({ id }: Account): Promise<Account> {
    this.logger.debug(util.inspect(id));

    return await this.service
      .delete({ id })
      .then((record) => (record ? new Account(record) : null));
  }
}
