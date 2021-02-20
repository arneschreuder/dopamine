import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { CacheRepository } from '../../repository/cache.repository';
import { SetEvent } from './set.event';

@EventsHandler(SetEvent)
export class SetHandler implements IEventHandler<SetEvent> {
  private readonly logger = new Logger(SetHandler.name);

  constructor(private readonly repository: CacheRepository) {}

  async handle({ cache }: SetEvent) {
    this.logger.debug(util.inspect(cache));
    cache = await this.repository.set(cache.key, cache.value);
    this.logger.debug(util.inspect(cache));
    this.logger.debug('Event => Cache Set');
  }
}
