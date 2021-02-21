import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsDataRepository } from '../../accounts-data.repository';
import { AccountCreatedEvent } from './account-created.event';

@EventsHandler(AccountCreatedEvent)
export class AccountCreatedHandler
  implements IEventHandler<AccountCreatedEvent> {
  private readonly logger = new Logger(AccountCreatedHandler.name);

  constructor(private readonly repository: AccountsDataRepository) {}

  async handle({ account }: AccountCreatedEvent) {
    this.logger.debug(util.inspect(account));
    return await this.repository.create({
      id: account.id,
      authenticationId: account.authenticationId,
      handle: account.handle,
      description: account.description,
      created: account.created,
    });
  }
}
