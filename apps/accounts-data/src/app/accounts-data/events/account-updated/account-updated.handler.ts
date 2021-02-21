import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsDataRepository } from '../../accounts-data.repository';
import { AccountUpdatedEvent } from './account-updated.event';

@EventsHandler(AccountUpdatedEvent)
export class AccountUpdatedHandler
  implements IEventHandler<AccountUpdatedEvent> {
  private readonly logger = new Logger(AccountUpdatedHandler.name);

  constructor(private readonly repository: AccountsDataRepository) {}

  async handle({ account }: AccountUpdatedEvent) {
    this.logger.debug(util.inspect(account));
    return await this.repository.update({
      where: {
        id: account.id,
      },
      data: {
        handle: account.handle,
        description: account.description,
      },
    });
  }
}
