import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsDataRepository } from '../../repositories';
import { AccountQuery } from './account.query';

@QueryHandler(AccountQuery)
export class AccountHandler implements IQueryHandler<AccountQuery> {
  private readonly logger = new Logger(AccountHandler.name);

  constructor(private readonly repository: AccountsDataRepository) {}

  async execute({ request }: AccountQuery) {
    this.logger.debug(util.inspect(request));
    return this.repository.account(request);
  }
}
