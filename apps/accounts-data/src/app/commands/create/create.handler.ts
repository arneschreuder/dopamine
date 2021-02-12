import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AccountsRepository } from '../../repository/accounts.repository';
import { CreateCommand } from './create.command';

@CommandHandler(CreateCommand)
export class CreateHandler implements ICommandHandler<CreateCommand> {
  constructor(
    private readonly repository: AccountsRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateCommand) {
    console.log('CreateCommand...');

    const { req } = command;
    const account = this.publisher.mergeObjectContext(
      await this.repository.create(req)
    );

    // Events
    account.created();
    account.commit();

    return account;
  }
}
