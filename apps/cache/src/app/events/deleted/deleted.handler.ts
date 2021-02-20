import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { CacheRepository } from '../../repository/cache.repository';
import { DeletedEvent } from './deleted.event';

@EventsHandler(DeletedEvent)
export class DeletedHandler implements IEventHandler<DeletedEvent> {
  private readonly logger = new Logger(DeletedHandler.name);

  constructor(private readonly repository: CacheRepository) {}

  async handle({ cache }: DeletedEvent) {
    this.logger.debug(util.inspect(cache));
    cache = await this.repository.delete(cache.key);
    this.logger.debug('Event => Cache Deleted');
  }
}
