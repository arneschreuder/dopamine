import { CreateHandler } from './commands/create/create.handler';
import { AccountHandler } from './queries/account/account.handler';
import { AccountsHandler } from './queries/accounts/accounts.handler';

export const COMMAND_HANDLERS = [CreateHandler];
export const QUERY_HANDLERS = [AccountHandler, AccountsHandler];
