import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AccountsRepository } from '../../repository/accounts.repository';
import { AccountsQuery } from './accounts.query';

@QueryHandler(AccountsQuery)
export class AccountsHandler implements IQueryHandler<AccountsQuery> {
  constructor(private readonly repository: AccountsRepository) {}

  async execute(query: AccountsQuery) {
    console.log('Async AccountsQuery...');
    return this.repository.accounts(query.req);
  }
}
