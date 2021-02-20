import { Controller, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as util from 'util';
import { DeleteCommand } from './commands/delete/delete.command';
import { ResetCommand } from './commands/reset';
import { SetCommand } from './commands/set/set.command';
import { GetQuery } from './queries/get/get.query';
import { ResetRequest } from './requests';
import { DeleteRequest } from './requests/delete.request';
import { GetRequest } from './requests/get.request';
import { SetRequest } from './requests/set.request';
import { DeleteResponse } from './responses/delete.response';
import { GetResponse } from './responses/get.response';
import { ResetResponse } from './responses/reset.response';
import { SetResponse } from './responses/set.response';

@Controller('app')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @GrpcMethod('Cache', 'Get')
  async get(request: GetRequest) {
    this.logger.debug(util.inspect(request));

    try {
      const cache = await this.queryBus.execute(new GetQuery(request));
      this.logger.debug(util.inspect(cache));
      return new GetResponse(cache.value);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @GrpcMethod('Cache', 'Set')
  async set(request: SetRequest) {
    this.logger.debug(util.inspect(request));

    try {
      const cache = await this.commandBus.execute(new SetCommand(request));
      return new SetResponse(cache.value);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @GrpcMethod('Cache', 'Delete')
  async delete(request: DeleteRequest) {
    this.logger.debug(util.inspect(request));
    try {
      const cache = await this.commandBus.execute(new DeleteCommand(request));
      return new DeleteResponse(cache.value);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @GrpcMethod('Cache', 'Reset')
  async reset(request: ResetRequest) {
    this.logger.debug(util.inspect(request));

    try {
      const cache = await this.commandBus.execute(new ResetCommand(request));
      return new ResetResponse(cache.value);
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
