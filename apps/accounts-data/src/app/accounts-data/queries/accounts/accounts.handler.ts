import { AccountsQuery } from '@dopamine/queries';
import { ContentDBRepository } from '@dopamine/repositories';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as util from 'util';

@QueryHandler(AccountsQuery)
export class AccountsHandler implements IQueryHandler<AccountsQuery> {
  private readonly logger = new Logger(AccountsHandler.name);

  constructor(private readonly repository: ContentDBRepository) {}

  async execute({ request }: AccountsQuery) {
    this.logger.debug(util.inspect(request));
    return this.repository.accounts({});
  }
}
