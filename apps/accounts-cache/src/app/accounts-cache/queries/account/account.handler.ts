import { Account } from '@dopamine/models';
import { AccountQuery } from '@dopamine/queries';
import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsDataRepository } from '../../accounts-data.repository';

@QueryHandler(AccountQuery)
export class AccountHandler implements IQueryHandler<AccountQuery> {
  private readonly logger = new Logger(AccountHandler.name);

  constructor(private readonly repository: AccountsDataRepository) {}

  async execute({ request }: AccountQuery): Promise<Account> {
    this.logger.debug(util.inspect(request));

    if (request.id && request.handle) {
      throw new Error('More than one unique value provided');
    }

    return await this.repository.account({
      id: request.id,
      handle: request.handle,
    });
  }
}
