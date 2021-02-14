import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Prisma } from '@prisma/client';
import * as util from 'util';
import { AccountsRepository } from '../../repository/accounts.repository';
import { DeleteCommand } from './delete.command';

@CommandHandler(DeleteCommand)
export class DeleteHandler implements ICommandHandler<DeleteCommand> {
  private readonly logger = new Logger(DeleteHandler.name);

  constructor(
    private readonly repository: AccountsRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: DeleteCommand) {
    this.logger.debug(util.inspect(command));

    const { req } = command;
    const data: Prisma.AccountWhereUniqueInput = {
      id: req.id,
      handle: req.handle,
    };

    const account = this.publisher.mergeObjectContext(
      await this.repository.delete(data)
    );
    account.commit();

    return account;
  }
}
