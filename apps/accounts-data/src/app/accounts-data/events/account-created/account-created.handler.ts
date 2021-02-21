import { ContentDBRepository } from '@dopamine/repositories';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountCreatedEvent } from '@dopamine/events';

@EventsHandler(AccountCreatedEvent)
export class AccountCreatedHandler
  implements IEventHandler<AccountCreatedEvent> {
  private readonly logger = new Logger(AccountCreatedHandler.name);

  constructor(private readonly repository: ContentDBRepository) {}

  async handle({ account }: AccountCreatedEvent) {
    this.logger.debug(util.inspect(account));
    return await this.repository.createAccount({
      id: account.id,
      authenticationId: account.authenticationId,
      handle: account.handle,
      description: account.description,
      created: account.created,
    });
  }
}
