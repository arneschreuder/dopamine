import { DeleteAccountCommand } from '@dopamine/commands';
import { AccountsDataRepository } from '@dopamine/repositories';
import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as util from 'util';

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
