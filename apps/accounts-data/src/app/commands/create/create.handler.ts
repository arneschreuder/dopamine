import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Prisma } from '@prisma/client';
import * as util from 'util';
import { AccountsRepository } from '../../repository/accounts.repository';
import { CreateCommand } from './create.command';

@CommandHandler(CreateCommand)
export class CreateHandler implements ICommandHandler<CreateCommand> {
  private readonly logger = new Logger(CreateHandler.name);

  constructor(
    private readonly repository: AccountsRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCommand) {
    this.logger.debug(util.inspect(command));

    const { req } = command;
    const data: Prisma.AccountCreateInput = {
      authenticationId: req.authenticationId,
      handle: req.handle,
    };
    // CHECK IF USERNAME UNIQUE

    const account = this.publisher.mergeObjectContext(
      await this.repository.create(data)
    );
    account.commit();

    return account;
  }
}
