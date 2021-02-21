import { UpdateAccountCommand } from '@dopamine/commands';
import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsDataRepository } from '../../accounts-data.repository';

@CommandHandler(UpdateAccountCommand)
export class UpdateAccountHandler
  implements ICommandHandler<UpdateAccountCommand> {
  private readonly logger = new Logger(UpdateAccountHandler.name);

  constructor(
    private readonly repository: AccountsDataRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute({ request }: UpdateAccountCommand) {
    this.logger.debug(util.inspect(request));

    // Get context
    let account = await this.repository.account({ id: request.id });

    // Check if found
    if (!account) {
      throw new Error('Account not found');
    }

    if (request.handle && account.handle !== request.handle) {
      // Check unique constraint
      const collision = await this.repository.account({
        handle: request.handle,
      });

      if (collision) {
        throw new Error('Account handle already exists');
      }
    }

    // Get context
    account = this.publisher.mergeObjectContext(account);

    // Events
    account.update(request);
    account.commit();

    return account;
  }
}
