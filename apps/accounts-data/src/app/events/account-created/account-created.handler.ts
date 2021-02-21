import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsDataRepository } from '../../repositories';
import { AccountCreatedEvent } from './account-created.event';

@EventsHandler(AccountCreatedEvent)
export class AccountCreatedHandler
  implements IEventHandler<AccountCreatedEvent> {
  private readonly logger = new Logger(AccountCreatedHandler.name);

  constructor(private readonly repository: AccountsDataRepository) {}

  async handle({ account }: AccountCreatedEvent) {
    this.logger.debug(util.inspect(account));
    account = await this.repository.create(account);
    this.logger.debug(util.inspect(account));
    this.logger.debug('Event => Account Created');
  }
}
