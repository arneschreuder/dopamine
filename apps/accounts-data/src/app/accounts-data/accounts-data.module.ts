import { ContentDBRepository } from '@dopamine/repositories';
import { PrismaService } from '@dopamine/services';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountsDataService } from './accounts-data.service';
import {
  CreateAccountHandler,
  DeleteAccountHandler,
  UpdateAccountHandler,
} from './commands';
import {
  AccountCreatedHandler,
  AccountDeletedHandler,
  AccountUpdatedHandler,
} from './events';
import { AccountHandler, AccountsHandler } from './queries';

export const COMMAND_HANDLERS = [
  CreateAccountHandler,
  DeleteAccountHandler,
  UpdateAccountHandler,
];
export const EVENT_HANDLERS = [
  AccountCreatedHandler,
  AccountDeletedHandler,
  AccountUpdatedHandler,
];
export const QUERY_HANDLERS = [AccountHandler, AccountsHandler];

@Module({
  exports: [AccountsDataService],
  imports: [CqrsModule],
  providers: [
    ContentDBRepository,
    AccountsDataService,
    PrismaService,
    ...COMMAND_HANDLERS,
    ...EVENT_HANDLERS,
    ...QUERY_HANDLERS,
  ],
})
export class AccountsDataModule {}
