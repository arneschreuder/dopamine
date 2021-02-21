import { DeleteAccountCommand } from '@dopamine/commands';
import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsDataRepository } from '../../accounts-data.repository';

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

    // Check if found
    let account = await this.repository.account({ id: request.id });

    if (!account) {
      throw new Error('Account not found');
    }

    // Get context
    account = this.publisher.mergeObjectContext(account);

    // Events
    account.delete();
    account.commit();

    return account;
  }
}
