import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsDataRepository } from '../../repositories';
import { CreateAccountCommand } from './create-account.command';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand> {
  private readonly logger = new Logger(CreateAccountHandler.name);

  constructor(
    private readonly repository: AccountsDataRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute({ request }: CreateAccountCommand) {
    this.logger.debug(util.inspect(request));

    // Get context
    const account = this.publisher.mergeObjectContext(
      await this.repository.account({ handle: request.handle })
    );

    // Check unique constraints
    if (account.handle === request.handle) {
      throw new Error('Account handle already exists');
    }

    // Events
    // TODO: Add transactions here
    account.create(request);
    account.commit();

    return account;
  }
}
