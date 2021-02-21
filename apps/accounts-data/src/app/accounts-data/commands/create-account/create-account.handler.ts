import { IAccount } from '@dopamine/models';
import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as util from 'util';
import { AccountsDataRepository } from '../../accounts-data.repository';
import { Account } from '../../models';
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

    // Check is handle is unique
    let account = await this.repository.account({ handle: request.handle });

    if (account) {
      throw new Error('Account handle already exists');
    }

    // Create new instance of account
    account = this.publisher.mergeObjectContext(
      new Account({
        authenticationId: request.authenticationId,
        handle: request.handle,
      } as IAccount)
    );

    // Events
    // TODO: Add transactions here
    account.create();
    account.commit();

    return account;
  }
}
