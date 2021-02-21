import { AccountRequest, AccountsRequest } from '@dopamine/requests';
import { Injectable, Logger } from '@nestjs/common';
import * as util from 'util';
import { Account } from '../../models';
import { AccountsDataService } from '../../services';

@Injectable()
export class AccountsDataRepository {
  private readonly logger = new Logger(AccountsDataRepository.name);

  constructor(private service: AccountsDataService) {}

  async account(request: AccountRequest): Promise<Account> {
    this.logger.debug(util.inspect(request));
    return await this.service
      .account({
        id: request.id,
        handle: request.handle,
      })
      .then((dto) => new Account(dto));
  }

  async accounts(request: AccountsRequest): Promise<Account[]> {
    this.logger.debug(util.inspect(request));
    return await this.service
      .accounts({})
      .then((dtos) => dtos.map((dto) => new Account(dto)));
  }

  async create(account: Account): Promise<Account> {
    this.logger.debug(util.inspect(account));
    return await this.service.create(account).then((dto) => new Account(dto));
  }

  async update(account: Account): Promise<Account> {
    this.logger.debug(util.inspect(account));

    return await this.service
      .update({
        where: {
          id: account.id,
        },
        data: {
          handle: account.handle,
          description: account.description,
        },
      })
      .then((dto) => new Account(dto));
  }

  async delete(account: Account): Promise<Account> {
    this.logger.debug(util.inspect(account));
    const { id } = account;

    return await this.service.delete({ id }).then((dto) => new Account(dto));
  }
}
