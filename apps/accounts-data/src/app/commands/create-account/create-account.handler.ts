import { CreateAccountCommand } from '@dopamine/commands';
import { Account } from '@dopamine/models';
import { AccountsDataRepository } from '@dopamine/repositories';
import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as util from 'util';

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

    // Check unique constraint
    let account = await this.repository.account({ handle: request.handle });

    // Unique constraint failed
    if (account) {
      throw new Error('Account already exists');
    }

    // Create new account
    account = this.publisher.mergeObjectContext(new Account());

    // Events
    // TODO: Add transactions here
    account.create(request);
    account.commit();

    return account;
  }
}
