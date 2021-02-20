import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { Cache } from '../../models/cache.model';
import { CacheRepository } from '../../repository/cache.repository';
import { SetCommand } from './set.command';

@CommandHandler(SetCommand)
export class SetHandler implements ICommandHandler<SetCommand> {
  private readonly logger = new Logger(SetHandler.name);

  constructor(
    private readonly repository: CacheRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute({ request }: SetCommand) {
    this.logger.debug(util.inspect(request));

    // Set new cache
    const cache = this.publisher.mergeObjectContext(
      new Cache(request.key, request.value)
    );

    // Events
    // TODO: Add transactions here
    cache.set(request);
    cache.commit();

    return cache;
  }
}
