import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { Account } from '../../models/account.model';
import { AccountsRepository } from '../../repository/accounts.repository';
import { CreateCommand } from './create.command';

@CommandHandler(CreateCommand)
export class CreateHandler implements ICommandHandler<CreateCommand> {
  private readonly logger = new Logger(CreateHandler.name);

  constructor(
    private readonly repository: AccountsRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute({ request }: CreateCommand) {
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
