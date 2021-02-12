import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { KillDragonCommand } from './commands/impl/kill-dragon.command';

@Controller('hero')
export class HeroesGameController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @GrpcMethod('AccountsDataService', 'Create')
  async create(dto) {
    // this.commandBus.execute(new CreateCommand(dto));
    this.commandBus.execute(new KillDragonCommand('herere', 'asdasd'));
    return { id: 'test', email: 'test' };
  }
}
