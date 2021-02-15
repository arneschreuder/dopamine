import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsRepository } from '../../repository/accounts.repository';
import { CreatedEvent } from './created.event';

@EventsHandler(CreatedEvent)
export class CreatedHandler implements IEventHandler<CreatedEvent> {
  private readonly logger = new Logger(CreatedHandler.name);

  constructor(private readonly repository: AccountsRepository) {}

  async handle({ account }: CreatedEvent) {
    this.logger.debug(util.inspect(account));
    account = await this.repository.create(account);
    this.logger.debug(util.inspect(account));
    this.logger.debug('Event => Account Created');
  }
}
