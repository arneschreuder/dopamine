import { CreateAccountCommand } from '@dopamine/commands';
import { IAccount } from '@dopamine/interfaces';
import { Account } from '@dopamine/models';
import { ContentDBRepository } from '@dopamine/repositories';
import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as util from 'util';

@CommandHandler(CreateAccountCommand)
export class CreateAccountHandler
  implements ICommandHandler<CreateAccountCommand> {
  private readonly logger = new Logger(CreateAccountHandler.name);

  constructor(
    private readonly repository: ContentDBRepository,
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
