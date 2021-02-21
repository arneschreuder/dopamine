import type {
  IAccountRequest,
  IAccountsRequest,
  ICreateAccountRequest,
  IDeleteAccountRequest,
  IUpdateAccountRequest,
} from '@dopamine/requests';
import type {
  IAccountResponse,
  IAccountsResponse,
  ICreateAccountResponse,
  IDeleteAccountResponse,
  IUpdateAccountResponse,
} from '@dopamine/responses';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as util from 'util';
import { AccountsDataService } from './accounts-data/accounts-data.service';

@Controller('app')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly service: AccountsDataService) {}

  @GrpcMethod('AccountsData', 'Account')
  async account(request: IAccountRequest): Promise<IAccountResponse> {
    this.logger.debug(util.inspect(request));

    try {
      return {
        account: await this.service.account(request),
      };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @GrpcMethod('AccountsData', 'Accounts')
  async accounts(request: IAccountsRequest): Promise<IAccountsResponse> {
    this.logger.debug(util.inspect(request));

    try {
      return {
        accounts: await this.service.accounts(request),
      };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @GrpcMethod('AccountsData', 'Create')
  async create(
    request: ICreateAccountRequest
  ): Promise<ICreateAccountResponse> {
    this.logger.debug(util.inspect(request));

    try {
      return {
        account: await this.service.create(request),
      };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @GrpcMethod('AccountsData', 'Update')
  async update(
    request: IUpdateAccountRequest
  ): Promise<IUpdateAccountResponse> {
    this.logger.debug(util.inspect(request));

    try {
      return {
        account: await this.service.update(request),
      };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @GrpcMethod('AccountsData', 'Delete')
  async delete(
    request: IDeleteAccountRequest
  ): Promise<IDeleteAccountResponse> {
    this.logger.debug(util.inspect(request));

    try {
      return {
        account: await this.service.delete(request),
      };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}
