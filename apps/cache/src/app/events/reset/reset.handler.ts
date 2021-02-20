import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CacheRepository } from '../../repository/cache.repository';
import { ResetEvent } from './reset.event';

@EventsHandler(ResetEvent)
export class ResetHandler implements IEventHandler<ResetEvent> {
  private readonly logger = new Logger(ResetHandler.name);

  constructor(private readonly repository: CacheRepository) {}

  async handle() {
    await this.repository.reset();
    this.logger.debug('Event => Cache Reset');
  }
}
