import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { Cache } from '../../models/cache.model';
import { CacheRepository } from '../../repository/cache.repository';
import { ResetCommand } from './reset.command';

@CommandHandler(ResetCommand)
export class ResetHandler implements ICommandHandler<ResetCommand> {
  private readonly logger = new Logger(ResetHandler.name);

  constructor(
    private readonly repository: CacheRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute({ request }: ResetCommand) {
    this.logger.debug(util.inspect(request));

    // Assign context
    const cache = this.publisher.mergeObjectContext(new Cache());

    // Events
    cache.reset();
    cache.commit();

    return cache;
  }
}
