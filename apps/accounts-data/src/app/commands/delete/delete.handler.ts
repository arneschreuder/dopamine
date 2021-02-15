import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsRepository } from '../../repository/accounts.repository';
import { DeleteCommand } from './delete.command';

@CommandHandler(DeleteCommand)
export class DeleteHandler implements ICommandHandler<DeleteCommand> {
  private readonly logger = new Logger(DeleteHandler.name);

  constructor(
    private readonly repository: AccountsRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute({ request }: DeleteCommand) {
    this.logger.debug(util.inspect(request));

    // Find context
    let account = await this.repository.account({ id: request.id });
    this.logger.debug(util.inspect(account));

    // Check if found
    if (!account) {
      throw new Error('Account not found');
    }

    // Assign context
    account = this.publisher.mergeObjectContext(account);

    // Events
    account.delete(request);
    account.commit();

    return account;
  }
}
