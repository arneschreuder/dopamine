import { AccountsQuery } from '@dopamine/queries';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsDataRepository } from '../../accounts-data.repository';

@QueryHandler(AccountsQuery)
export class AccountsHandler implements IQueryHandler<AccountsQuery> {
  private readonly logger = new Logger(AccountsHandler.name);

  constructor(private readonly repository: AccountsDataRepository) {}

  async execute({ request }: AccountsQuery) {
    this.logger.debug(util.inspect(request));
    return this.repository.accounts({});
  }
}
