import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsDataRepository } from '../../repositories';
import { AccountUpdatedEvent } from './account-updated.event';

@EventsHandler(AccountUpdatedEvent)
export class AccountUpdatedHandler
  implements IEventHandler<AccountUpdatedEvent> {
  private readonly logger = new Logger(AccountUpdatedHandler.name);

  constructor(private readonly repository: AccountsDataRepository) {}

  async handle({ account }: AccountUpdatedEvent) {
    this.logger.debug(util.inspect(account));
    account = await this.repository.update(account);
    this.logger.debug('Event => Account Updated');
  }
}
