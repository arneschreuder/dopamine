import { CreateHandler } from './commands/create/create.handler';
import { CreatedHandler } from './events/created/created.handler';
import { AccountHandler } from './queries/account/account.handler';
import { AccountsHandler } from './queries/accounts/accounts.handler';

export const COMMAND_HANDLERS = [CreateHandler];
export const QUERY_HANDLERS = [AccountHandler, AccountsHandler];
export const EVENT_HANDLERS = [CreatedHandler];
