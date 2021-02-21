import { AccountDeletedEvent } from '@dopamine/events';
import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsDataRepository } from '../../accounts-data.repository';

@EventsHandler(AccountDeletedEvent)
export class AccountDeletedHandler
  implements IEventHandler<AccountDeletedEvent> {
  private readonly logger = new Logger(AccountDeletedHandler.name);

  constructor(private readonly repository: AccountsDataRepository) {}

  async handle({ account }: AccountDeletedEvent) {
    this.logger.debug(util.inspect(account));
    return await this.repository.deleteAccount({
      id: account.id,
    });
  }
}
