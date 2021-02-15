import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsRepository } from '../../repository/accounts.repository';
import { DeletedEvent } from './deleted.event';

@EventsHandler(DeletedEvent)
export class DeletedHandler implements IEventHandler<DeletedEvent> {
  private readonly logger = new Logger(DeletedHandler.name);

  constructor(private readonly repository: AccountsRepository) {}

  async handle({ account }: DeletedEvent) {
    this.logger.debug(util.inspect(account));
    account = await this.repository.delete(account);
    this.logger.debug('Event => Account Deleted');
  }
}
