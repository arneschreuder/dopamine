import type {
  AccountRequest,
  AccountsRequest,
  CreateAccountRequest,
  DeleteAccountRequest,
  UpdateAccountRequest,
} from '@dopamine/requests';
import type {
  AccountResponse,
  AccountsResponse,
  CreateAccountResponse,
  DeleteAccountResponse,
  UpdateAccountResponse,
} from '@dopamine/responses';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import * as util from 'util';
import { AccountsCacheService } from './accounts-cache/accounts-cache.service';

@Controller('app')
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly service: AccountsCacheService) {}

  @GrpcMethod('AccountsCache', 'Account')
  async account(request: AccountRequest): Promise<AccountResponse> {
    this.logger.debug(util.inspect(request));

    try {
      return {
        account: await this.service.account(request),
      };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @GrpcMethod('AccountsCache', 'Accounts')
  async accounts(request: AccountsRequest): Promise<AccountsResponse> {
    this.logger.debug(util.inspect(request));

    try {
      return {
        accounts: await this.service.accounts(request),
      };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @GrpcMethod('AccountsCache', 'Create')
  async create(request: CreateAccountRequest): Promise<CreateAccountResponse> {
    this.logger.debug(util.inspect(request));

    try {
      return {
        account: await this.service.create(request),
      };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @GrpcMethod('AccountsCache', 'Update')
  async update(request: UpdateAccountRequest): Promise<UpdateAccountResponse> {
    this.logger.debug(util.inspect(request));

    try {
      return {
        account: await this.service.update(request),
      };
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @GrpcMethod('AccountsCache', 'Delete')
  async delete(request: DeleteAccountRequest): Promise<DeleteAccountResponse> {
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
