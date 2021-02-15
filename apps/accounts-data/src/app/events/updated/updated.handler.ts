import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsRepository } from '../../repository/accounts.repository';
import { UpdatedEvent } from './updated.event';

@EventsHandler(UpdatedEvent)
export class UpdatedHandler implements IEventHandler<UpdatedEvent> {
  private readonly logger = new Logger(UpdatedHandler.name);

  constructor(private readonly repository: AccountsRepository) {}

  async handle({ account }: UpdatedEvent) {
    this.logger.debug(util.inspect(account));
    account = await this.repository.update(account);
    this.logger.debug('Event => Account Updated');
  }
}
