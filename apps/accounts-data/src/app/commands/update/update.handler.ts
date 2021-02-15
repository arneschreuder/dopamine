import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsRepository } from '../../repository/accounts.repository';
import { UpdateCommand } from './update.command';

@CommandHandler(UpdateCommand)
export class UpdateHandler implements ICommandHandler<UpdateCommand> {
  private readonly logger = new Logger(UpdateHandler.name);

  constructor(
    private readonly repository: AccountsRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute({ request }: UpdateCommand) {
    this.logger.debug(util.inspect(request));

    // Find context
    let account = await this.repository.account({ id: request.id });
    this.logger.debug(util.inspect(account));

    // Check if found
    if (!account) {
      throw new Error('Account not found');
    }

    // Check unique constraint
    if (request.handle && request.handle !== account.handle) {
      const collision = await this.repository.account({
        handle: request.handle,
      });

      // Unique constraint failed
      if (collision) {
        throw new Error('Account handle already exists');
      }
    }

    // Assign context
    account = this.publisher.mergeObjectContext(account);

    // Events
    account.update(request);
    account.commit();

    return account;
  }
}
