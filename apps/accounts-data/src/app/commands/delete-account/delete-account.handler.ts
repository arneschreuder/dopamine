import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsDataRepository } from '../../repositories';
import { DeleteAccountCommand } from './delete-account.command';

@CommandHandler(DeleteAccountCommand)
export class DeleteAccountHandler
  implements ICommandHandler<DeleteAccountCommand> {
  private readonly logger = new Logger(DeleteAccountHandler.name);

  constructor(
    private readonly repository: AccountsDataRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute({ request }: DeleteAccountCommand) {
    this.logger.debug(util.inspect(request));

    // Get context
    const account = this.publisher.mergeObjectContext(
      await this.repository.account({ id: request.id })
    );

    // Check if found
    if (account.id !== request.id) {
      throw new Error('Account not found');
    }

    // Events
    account.delete(request);
    account.commit();

    return account;
  }
}
