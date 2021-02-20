import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { Cache } from '../../models/cache.model';
import { CacheRepository } from '../../repository/cache.repository';
import { DeleteCommand } from './delete.command';

@CommandHandler(DeleteCommand)
export class DeleteHandler implements ICommandHandler<DeleteCommand> {
  private readonly logger = new Logger(DeleteHandler.name);

  constructor(
    private readonly repository: CacheRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute({ request }: DeleteCommand) {
    this.logger.debug(util.inspect(request));

    // Assign context
    const cache = this.publisher.mergeObjectContext(new Cache(request.key));

    // Events
    cache.delete(request);
    cache.commit();

    return cache;
  }
}
