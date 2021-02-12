import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountsRepository } from '../../repository/accounts.repository';
import { AccountQuery } from './account.query';

@QueryHandler(AccountQuery)
export class AccountHandler implements IQueryHandler<AccountQuery> {
  constructor(private readonly repository: AccountsRepository) {}

  async execute(query: AccountQuery) {
    console.log('Async GetAccountsQuery...');
    return this.repository.account(query.req);
  }
}
