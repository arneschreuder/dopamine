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
import { AccountHandler } from './queries';

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
export const QUERY_HANDLERS = [AccountHandler, AccountHandler];
