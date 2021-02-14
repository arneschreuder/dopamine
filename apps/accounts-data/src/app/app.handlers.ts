import { CreateHandler } from './commands/create/create.handler';
import { DeleteHandler } from './commands/delete/delete.handler';
import { AccountHandler } from './queries/account/account.handler';
import { AccountsHandler } from './queries/accounts/accounts.handler';

export const COMMAND_HANDLERS = [CreateHandler, DeleteHandler];
export const QUERY_HANDLERS = [AccountHandler, AccountsHandler];
