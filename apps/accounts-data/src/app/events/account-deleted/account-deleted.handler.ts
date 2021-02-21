import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsDataRepository } from '../../repositories';
import { AccountDeletedEvent } from './account-deleted.event';

@EventsHandler(AccountDeletedEvent)
export class AccountDeletedHandler
  implements IEventHandler<AccountDeletedEvent> {
  private readonly logger = new Logger(AccountDeletedHandler.name);

  constructor(private readonly repository: AccountsDataRepository) {}

  async handle({ account }: AccountDeletedEvent) {
    this.logger.debug(util.inspect(account));
    account = await this.repository.delete(account);
    this.logger.debug('Event => Account Deleted');
  }
}
