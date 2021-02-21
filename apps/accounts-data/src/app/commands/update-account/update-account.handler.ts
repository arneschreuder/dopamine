import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsDataRepository } from '../../repositories';
import { UpdateAccountCommand } from './update-account.command';

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
    const account = this.publisher.mergeObjectContext(
      await this.repository.account({ id: request.id })
    );

    // Check if found
    if (account.id !== request.id) {
      throw new Error('Account not found');
    }

    if (account.handle && account.handle !== request.handle) {
      // Check unique constraint
      const collision = await this.repository.account({
        handle: request.handle,
      });

      if (collision.handle === request.handle) {
        throw new Error('Account handle already exists');
      }
    }

    // Events
    account.update(request);
    account.commit();

    return account;
  }
}
